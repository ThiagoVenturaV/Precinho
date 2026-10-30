export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean | string;
}

export function formatCep(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export async function fetchAddressByCep(
  cep: string,
  signal?: AbortSignal,
): Promise<ViaCepResponse | null> {
  const cleanCep = (cep || '').replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const requestSignal = signal ?? AbortSignal.timeout(8000);
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      signal: requestSignal,
    });
    if (!response.ok) return null;
    const data = (await response.json()) as ViaCepResponse;
    if (data.erro === true || data.erro === 'true') return null;
    return data;
  } catch {
    return null;
  }
}
