import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CHAT_CONFIG } from './chat.config';
import { ChatTransport } from './chat-transport';
import { ChatEvent, ChatRequest } from './chat.models';
import { parseChatEvent } from './chat-event';

const request: ChatRequest = {
  requestId: 'r1',
  conversationId: null,
  message: 'Olá',
  context: { allergies: '', postalCode: '', cart: [] },
};

function transport(): ChatTransport {
  TestBed.configureTestingModule({
    providers: [
      ChatTransport,
      { provide: CHAT_CONFIG, useValue: { mode: 'live', endpoint: '/api/chat/stream' } },
    ],
  });
  return TestBed.inject(ChatTransport);
}

async function consume(
  service: ChatTransport,
  signal = new AbortController().signal,
): Promise<ChatEvent[]> {
  const events: ChatEvent[] = [];
  for await (const event of service.stream(request, signal)) events.push(event);
  return events;
}

afterEach(() => {
  vi.unstubAllGlobals();
  TestBed.resetTestingModule();
});

describe('ChatTransport', () => {
  it('posts the request and decodes fragmented UTF-8 and tool events', async () => {
    const bytes = new TextEncoder().encode(
      'event: delta\ndata: {"text":"Olá"}\n\nevent: tool-start\ndata: {"id":"1","label":"Catálogo"}\n\nevent: tool-end\ndata: {"id":"1","status":"completed"}\n\nevent: done\ndata: {}\n\n',
    );
    const body = new ReadableStream({
      start(controller) {
        for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
        controller.close();
      },
    });
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(body, { headers: { 'Content-Type': 'text/event-stream' } }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await consume(transport())).toEqual([
      { type: 'delta', text: 'Olá' },
      { type: 'tool-start', id: '1', label: 'Catálogo' },
      { type: 'tool-end', id: '1', status: 'completed' },
      { type: 'done' },
    ]);
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(request);
  });

  it('rejects invalid product data instead of trusting tool output', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('event: products\ndata: {"products":[{"id":"bad"}]}\n\n', {
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      ),
    );
    await expect(consume(transport())).rejects.toThrow('incompatível');
  });

  it('reports a truncated stream rather than treating it as success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('data: {"type":"delta","text":"parcial"}\n\n', {
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      ),
    );
    await expect(consume(transport())).rejects.toThrow('antes da resposta');
  });

  it('rejects authentication errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));
    await expect(consume(transport())).rejects.toThrow('sessão expirou');
  });

  it('does not send an aborted request', async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(consume(transport(), controller.signal)).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('normalizes v3 tokens and ignores future UI blocks while preserving text', () => {
    expect(parseChatEvent({ event: 'token', data: '{"texto":"Olá"}' })).toEqual({
      type: 'delta',
      text: 'Olá',
    });
    expect(parseChatEvent({ event: 'ui', data: '{"tipo":"future_widget","dados":{}}' })).toEqual({
      type: 'ignored',
    });
    expect(
      parseChatEvent({
        event: 'ui',
        data: '{"tipo":"prescription_upload","dados":{"reason":"Envie sua receita"}}',
      }),
    ).toMatchObject({ type: 'ui', component: { tipo: 'prescription_upload' } });
  });

  it('validates server cart snapshots and rejects negative prices', () => {
    expect(
      parseChatEvent({
        event: 'cart_updated',
        data: '{"carrinho":{"version":2,"lines":[],"subtotal":0,"checkoutAllowed":false,"blockers":[]}}',
      }),
    ).toMatchObject({ type: 'cart_updated', cart: { version: 2 } });
    expect(() =>
      parseChatEvent({
        event: 'cart_updated',
        data: '{"carrinho":{"version":2,"lines":[],"subtotal":-1,"checkoutAllowed":true,"blockers":[]}}',
      }),
    ).toThrow('incompatível');
  });
});
