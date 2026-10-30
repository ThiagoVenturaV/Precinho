let cachedToken: string | null = null;
let pendingSession: Promise<Record<string, string>> | null = null;

function readXsrfCookie(): string | null {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function sessionHeaders(): Promise<Record<string, string>> {
  const cookieToken = readXsrfCookie();
  if (cookieToken) {
    cachedToken = cookieToken;
    return { 'X-XSRF-TOKEN': cookieToken };
  }
  if (cachedToken) {
    return { 'X-XSRF-TOKEN': cachedToken };
  }
  if (pendingSession) return pendingSession;
  const request: Promise<Record<string, string>> = (async (): Promise<Record<string, string>> => {
    try {
      const response = await fetch('/api/session', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Não foi possível iniciar a sessão do atendimento.');
      const body: unknown = await response.json();
      if (
        typeof body !== 'object' ||
        body === null ||
        !('csrfToken' in body) ||
        typeof body.csrfToken !== 'string'
      )
        throw new Error('O servidor não retornou uma sessão válida.');
      cachedToken = body.csrfToken || null;
      const headers: Record<string, string> = body.csrfToken
        ? { 'X-XSRF-TOKEN': body.csrfToken }
        : {};
      return headers;
    } finally {
      pendingSession = null;
    }
  })();
  pendingSession = request;
  return request;
}
