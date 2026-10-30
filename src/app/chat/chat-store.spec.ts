import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatStore } from './chat-store';
import { ChatTransport } from './chat-transport';
import { ChatEvent, ChatRequest, Product } from './chat.models';
import { CHAT_CONFIG } from './chat.config';

const product: Product = {
  id: 'one',
  name: 'Produto',
  brand: 'Marca',
  price: 599,
  image: 'assets/products/9514.jpg',
  category: 'Cuidado',
  description: 'Descrição',
};

function setup(
  stream: (request: ChatRequest, signal: AbortSignal) => AsyncGenerator<ChatEvent>,
): ChatStore {
  TestBed.configureTestingModule({
    providers: [
      ChatStore,
      { provide: ChatTransport, useValue: { stream } },
      { provide: CHAT_CONFIG, useValue: { mode: 'demo', endpoint: '/api/chat/stream' } },
    ],
  });
  return TestBed.inject(ChatStore);
}

afterEach(() => TestBed.resetTestingModule());

describe('ChatStore', () => {
  it('tracks session, tool activity and structured products independently from text', async () => {
    const store = setup(async function* () {
      yield { type: 'session', conversationId: 'session-1' };
      yield { type: 'tool-start', id: 'catalog', label: 'Catálogo' };
      yield { type: 'tool-end', id: 'catalog', status: 'completed' };
      yield { type: 'delta', text: 'Olá' };
      yield { type: 'products', products: [product] };
      yield { type: 'suggestions', suggestions: ['Continuar'] };
      yield { type: 'done' };
    });
    await store.send('oi');
    expect(store.conversationId()).toBe('session-1');
    expect(store.messages().at(-1)).toMatchObject({
      content: 'Olá',
      status: 'complete',
      products: [product],
      tools: [{ status: 'completed' }],
    });
    expect(store.suggestions()).toEqual(['Continuar']);
    expect(store.busy()).toBe(false);
  });

  it('cancels in-flight responses and marks running tools as interrupted', async () => {
    const store = setup(async function* (_request, signal) {
      yield { type: 'tool-start', id: 'search', label: 'Busca' };
      await new Promise<void>((_resolve, reject) =>
        signal.addEventListener(
          'abort',
          () => reject(new DOMException('Cancelado', 'AbortError')),
          { once: true },
        ),
      );
    });
    const pending = store.send('buscar');
    await vi.waitFor(() => expect(store.messages().at(-1)?.tools.length).toBe(1));
    store.stop();
    await pending;
    expect(store.messages().at(-1)).toMatchObject({
      status: 'interrupted',
      tools: [{ status: 'failed' }],
    });
    expect(store.error()).toBe('');
    expect(store.busy()).toBe(false);
  });

  it('ignores late events from a previous conversation', async () => {
    let release!: () => void;
    const blocked = new Promise<void>((resolve) => {
      release = resolve;
    });
    const store = setup(async function* (request) {
      if (request.message === 'old') await blocked;
      yield { type: 'delta', text: request.message };
      yield { type: 'done' };
    });
    const old = store.send('old');
    store.reset();
    await store.send('new');
    release();
    await old;
    expect(store.messages().map((message) => message.content)).toEqual(['new', 'new']);
    expect(store.busy()).toBe(false);
  });

  it('retries explicitly with the same request ID without duplicating the user turn', async () => {
    const requests: ChatRequest[] = [];
    const store = setup(async function* (request) {
      requests.push(request);
      if (requests.length === 1) throw new Error('Falha de rede');
      yield { type: 'done' };
    });
    await store.send('oi');
    expect(store.messages().at(-1)?.status).toBe('error');
    store.retry();
    await vi.waitFor(() => expect(store.busy()).toBe(false));
    expect(requests[0].requestId).toBe(requests[1].requestId);
    expect(store.messages().filter((message) => message.role === 'user')).toHaveLength(1);
  });

  it('calculates totals in cents, caps quantity and removes zero-quantity lines', () => {
    const store = setup(async function* () {
      yield { type: 'done' };
    });
    store.add(product);
    store.add(product);
    expect(store.subtotal()).toBe(1198);
    store.quantity(product.id, 200);
    expect(store.count()).toBe(99);
    store.quantity(product.id, -99);
    expect(store.cart()).toEqual([]);
  });

  it('handles coupon application, percentage discounts, and removal', () => {
    const store = setup(async function* () {
      yield { type: 'done' };
    });
    store.add(product); // price 599
    store.add(product); // subtotal 1198

    // Valid 10% coupon CUIDADO10
    const ok = store.applyCoupon('cuidado10');
    expect(ok).toBe(true);
    expect(store.appliedCoupon()?.code).toBe('CUIDADO10');
    expect(store.couponDiscount()).toBe(120); // 10% of 1198 = 119.8 rounded to 120
    expect(store.totalWithDiscount()).toBe(1198 - 120);
    expect(store.couponError()).toBe('');

    // Remove coupon
    store.removeCoupon();
    expect(store.appliedCoupon()).toBeNull();
    expect(store.couponDiscount()).toBe(0);
    expect(store.totalWithDiscount()).toBe(1198);

    // Invalid coupon
    const invalid = store.applyCoupon('INVALIDO99');
    expect(invalid).toBe(false);
    expect(store.appliedCoupon()).toBeNull();
    expect(store.couponError()).toContain('inválido');
  });

  it('supports FRETEGRATIS shipping coupon', () => {
    const store = setup(async function* () {
      yield { type: 'done' };
    });
    const ok = store.applyCoupon('FRETEGRATIS');
    expect(ok).toBe(true);
    expect(store.appliedCoupon()?.type).toBe('shipping');
  });
});
