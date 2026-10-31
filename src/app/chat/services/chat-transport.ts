import { Injectable, inject } from '@angular/core';
import { CHAT_CONFIG } from '../models/chat.config';
import { parseChatEvent } from '../models/chat-event';
import { ChatEvent, ChatRequest } from '../models/chat.models';
import { SseParser } from '../utils/sse';

@Injectable({
  providedIn: 'root',
})
export class ChatTransport {
  private readonly config = inject(CHAT_CONFIG);

  async *stream(request: ChatRequest, signal: AbortSignal): AsyncGenerator<ChatEvent> {
    if (this.config.mode === 'demo') {
      const { demoStream } = await import('../utils/demo');
      yield* demoStream(request, signal);
      return;
    }
    const headers = await this.config.headers?.();
    signal.throwIfAborted();
    let response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: { ...headers, Accept: 'text/event-stream', 'Content-Type': 'application/json' },
      credentials: this.config.credentials ?? 'same-origin',
      body: JSON.stringify(request),
      signal: AbortSignal.any([signal, AbortSignal.timeout(120_000)]),
    });
    if (response.status === 404 && request.conversationId) {
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.removeItem('pm_care_conversation_id');
        } catch {}
      }
      const freshRequest = { ...request, conversationId: null };
      response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: { ...headers, Accept: 'text/event-stream', 'Content-Type': 'application/json' },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify(freshRequest),
        signal: AbortSignal.any([signal, AbortSignal.timeout(120_000)]),
      });
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403)
        throw new Error('Sua sessão expirou. Entre novamente para continuar.');
      if (response.status === 429)
        throw new Error('Muitas solicitações. Aguarde um pouco antes de tentar novamente.');
      throw new Error('Não foi possível conectar ao atendimento. Tente novamente em instantes.');
    }
    if (!response.headers.get('content-type')?.includes('text/event-stream') || !response.body) {
      throw new Error('O servidor não iniciou uma conversa válida. Tente novamente.');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const parser = new SseParser();
    try {
      while (true) {
        const chunk = await reader.read();
        const frames = parser.push(decoder.decode(chunk.value, { stream: !chunk.done }));
        for (const frame of frames) {
          signal.throwIfAborted();
          const event = parseChatEvent(frame);
          yield event;
          if (event.type === 'done' || event.type === 'error') return;
        }
        if (chunk.done)
          throw new Error('A conexão terminou antes da resposta. Você pode tentar novamente.');
      }
    } finally {
      await reader.cancel().catch(() => undefined);
      reader.releaseLock();
    }
  }
}
