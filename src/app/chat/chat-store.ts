import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { ChatTransport } from './chat-transport';
import {
  CartLine,
  CartSnapshot,
  ChatEvent,
  ChatMessage,
  CheckoutSessionData,
  Product,
  PrescriptionAttachment,
  Purchase,
  Coupon,
  UserProfile,
} from './chat.models';
import { CHAT_CONFIG } from './chat.config';
import { cartSchema } from './chat-event';

@Injectable({
  providedIn: 'root',
})
export class ChatStore implements OnDestroy {
  constructor() {
    this.loadPersistedCart();
    void this.loadCurrentUser();
  }
  private readonly transport = inject(ChatTransport);
  private readonly config = inject(CHAT_CONFIG);
  private controller?: AbortController;
  readonly messages = signal<ChatMessage[]>([]);
  readonly cart = signal<CartLine[]>([]);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly conversationId = signal<string | null>(null);
  readonly allergies = signal('');
  readonly postalCode = signal('');
  readonly cartBusy = signal(false);
  readonly checkoutAllowed = signal(true);
  readonly cartBlockers = signal<string[]>([]);
  readonly lastOrder = signal<Purchase | null>(null);
  readonly checkoutSession = signal<CheckoutSessionData | null>(null);
  readonly currentUser = signal<UserProfile | null>(null);
  private cartVersion = -1;
  private confirmedProduct = new Map<string, string>();
  private readonly serverSubtotal = signal(0);
  private confirmedTurn: { productId: string; dosage: string }[] = [];
  private cartController?: AbortController;
  private cartQueue: Promise<void> = Promise.resolve();
  readonly count = computed(() => this.cart().reduce((sum, line) => sum + line.quantity, 0));
  readonly subtotal = computed(() =>
    this.config.mode === 'live'
      ? this.serverSubtotal()
      : this.cart().reduce((sum, line) => sum + line.quantity * line.product.price, 0),
  );
  readonly appliedCoupon = signal<Coupon | null>(null);
  readonly couponError = signal<string>('');
  readonly couponDiscount = computed(() => {
    const coupon = this.appliedCoupon();
    if (!coupon) return 0;
    const base = this.subtotal();
    if (coupon.type === 'percentage') {
      return Math.round((base * coupon.value) / 100);
    }
    if (coupon.type === 'fixed') {
      return Math.min(base, coupon.value);
    }
    return 0;
  });
  readonly totalWithDiscount = computed(() =>
    Math.max(0, this.subtotal() - this.couponDiscount()),
  );
  readonly suggestions = computed(() => this.messages().at(-1)?.suggestions ?? []);

  applyCoupon(rawCode: string): boolean {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      this.couponError.set('Informe um código de cupom.');
      return false;
    }
    const coupons: Record<string, Coupon> = {
      CUIDADO10: { code: 'CUIDADO10', type: 'percentage', value: 10, description: '10% de desconto' },
      PAGUEMENOS10: { code: 'PAGUEMENOS10', type: 'percentage', value: 10, description: '10% de desconto' },
      PRIMEIRACOMPRA: { code: 'PRIMEIRACOMPRA', type: 'percentage', value: 10, description: '10% de desconto' },
      BEMVINDO15: { code: 'BEMVINDO15', type: 'percentage', value: 15, description: '15% de desconto' },
      CARE20: { code: 'CARE20', type: 'percentage', value: 20, description: '20% de desconto' },
      OFF15: { code: 'OFF15', type: 'fixed', value: 1500, description: 'R$ 15,00 de desconto' },
      FRETEGRATIS: { code: 'FRETEGRATIS', type: 'shipping', value: 0, description: 'Frete Grátis' },
    };
    const found = coupons[code];
    if (found) {
      this.appliedCoupon.set(found);
      this.couponError.set('');
      return true;
    }
    this.couponError.set('Cupom inválido ou expirado. Tente CUIDADO10 ou BEMVINDO15.');
    return false;
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
    this.couponError.set('');
  }

  async send(
    value: string,
    retryId?: string,
    attachments: PrescriptionAttachment[] = [],
  ): Promise<void> {
    const text = value.trim();
    if (!text || text.length > 4000 || this.busy()) return;
    const controller = new AbortController();
    this.controller = controller;
    this.busy.set(true);
    this.error.set('');
    const userId = retryId ?? crypto.randomUUID();
    const assistantId = crypto.randomUUID();
    const message = (id: string, role: 'user' | 'assistant', content: string): ChatMessage => ({
      id,
      role,
      content,
      status: role === 'user' ? 'complete' : 'streaming',
      products: [],
      tools: [],
      suggestions: [],
    });
    this.messages.update((items) => [
      ...items,
      ...(retryId
        ? []
        : [{ ...message(userId, 'user', text), ...(attachments.length ? { attachments } : {}) }]),
      message(assistantId, 'assistant', ''),
    ]);
    try {
      const request = {
        requestId: userId,
        conversationId: this.conversationId(),
        message: text,
        ...(attachments.length ? { attachments } : {}),
        context: {
          allergies: this.allergies(),
          postalCode: this.postalCode(),
          cart: this.cart().map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
          })),
          confirmedProducts: this.confirmedTurn.splice(0),
        },
      };
      for await (const event of this.transport.stream(request, controller.signal)) {
        if (controller.signal.aborted || this.controller !== controller) return;
        if (event.type === 'error')
          throw new Error('O atendimento não conseguiu concluir a resposta. Tente novamente.');
        if (event.type === 'session') this.conversationId.set(event.conversationId);
        else this.apply(assistantId, event);
      }
    } catch (error: unknown) {
      if (this.controller !== controller) return;
      if (controller.signal.aborted)
        this.update(assistantId, (item) => ({
          ...item,
          status: 'interrupted',
          tools: item.tools.map((tool) =>
            tool.status === 'running' ? { ...tool, status: 'failed' } : tool,
          ),
        }));
      else {
        this.error.set(
          error instanceof Error && error.name !== 'TypeError' && error.name !== 'TimeoutError'
            ? error.message
            : 'A conexão não respondeu. Verifique sua rede e tente novamente.',
        );
        this.update(assistantId, (item) => ({
          ...item,
          status: 'error',
          tools: item.tools.map((tool) =>
            tool.status === 'running' ? { ...tool, status: 'failed' } : tool,
          ),
        }));
      }
    } finally {
      if (this.controller === controller) {
        this.busy.set(false);
        this.controller = undefined;
      }
    }
  }

  retry(): void {
    if (this.busy() || !['error', 'interrupted'].includes(this.messages().at(-1)?.status ?? ''))
      return;
    const user = [...this.messages()].reverse().find((item) => item.role === 'user');
    if (!user) return;
    this.messages.update((items) => items.slice(0, -1));
    void this.send(user.content, user.id, user.attachments);
  }

  stop(): void {
    this.controller?.abort();
    this.messages.update((items) =>
      items.map((item) =>
        item.status === 'streaming'
          ? {
              ...item,
              status: 'interrupted',
              tools: item.tools.map((tool) =>
                tool.status === 'running' ? { ...tool, status: 'failed' } : tool,
              ),
            }
          : item,
      ),
    );
  }

  reset(): void {
    this.stop();
    this.controller = undefined;
    this.busy.set(false);
    this.messages.set([]);
    this.conversationId.set(null);
    this.error.set('');
    this.cart.set([]);
    this.cartController?.abort();
    this.cartController = undefined;
    this.cartQueue = Promise.resolve();
    this.cartBusy.set(false);
    this.cartVersion = -1;
    this.serverSubtotal.set(0);
    this.cartBlockers.set([]);
    this.checkoutAllowed.set(true);
    this.confirmedProduct.clear();
    this.confirmedTurn = [];
    this.lastOrder.set(null);
    this.checkoutSession.set(null);
    this.appliedCoupon.set(null);
    this.couponError.set('');
  }

  add(product: Product): void {
    this.cart.update((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);
      return existing
        ? lines.map((line) =>
            line.product.id === product.id
              ? { ...line, quantity: Math.min(99, line.quantity + 1) }
              : line,
          )
        : [...lines, { product, quantity: 1 }];
    });
    this.persistCart();
    if (this.config.mode === 'live') {
      void this.mutateCart({ action: 'add', productId: product.id, quantity: 1 }).catch(() => {});
    }
  }

  quantity(id: string, delta: number): void {
    this.cart.update((lines) =>
      lines
        .map((line) =>
          line.id === id || line.product.id === id
            ? { ...line, quantity: Math.min(99, line.quantity + delta) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
    this.persistCart();
    if (this.config.mode === 'live') {
      const line = this.cart().find((item) => item.id === id || item.product.id === id);
      if (line?.kitId) {
        if (delta === -line.quantity)
          void this.mutateCart({ action: 'remove', productId: line.id }).catch(() => {});
        else
          this.error.set(
            'Os itens do kit são alterados como um grupo. Remova o kit para escolher itens avulsos.',
          );
      } else if (line) {
        void this.mutateCart({
          action: 'quantity',
          productId: line.product.id,
          quantity: line.quantity + delta,
        }).catch(() => {});
      }
    }
  }

  private apply(id: string, event: Exclude<ChatEvent, { type: 'session' | 'error' }>): void {
    if (event.type === 'cart_updated') {
      this.applyCart(event.cart);
      return;
    }
    if (event.type === 'checkout_updated') {
      this.checkoutSession.set(event.session);
      return;
    }
    if (event.type === 'ui' && event.component.tipo === 'cart')
      this.applyCart(event.component.dados.cart);
    if (event.type === 'ui' && event.component.tipo === 'checkout')
      this.checkoutSession.set(event.component.dados.session);
    if (event.type === 'ui' && event.component.tipo === 'order_tracking')
      this.lastOrder.set(event.component.dados.order as unknown as Purchase);
    this.update(id, (item) => {
      switch (event.type) {
        case 'delta':
          return { ...item, content: item.content + event.text };
        case 'products':
          return { ...item, products: event.products };
        case 'suggestions':
          return { ...item, suggestions: event.suggestions };
        case 'ui':
          return { ...item, components: [...(item.components ?? []), event.component] };
        case 'ignored':
          return item;
        case 'tool-start':
          return {
            ...item,
            tools: [
              ...item.tools.filter((tool) => tool.id !== event.id),
              { id: event.id, label: event.label, status: 'running' },
            ],
          };
        case 'tool-end':
          return {
            ...item,
            tools: item.tools.map((tool) =>
              tool.id === event.id ? { ...tool, status: event.status } : tool,
            ),
          };
        case 'done':
          return {
            ...item,
            status: 'complete',
            tools: item.tools.map((tool) =>
              tool.status === 'running' ? { ...tool, status: 'failed' } : tool,
            ),
          };
      }
    });
  }

  confirmMedication(product: Product): void {
    this.confirmedProduct.set(product.id, product.dosage ?? '');
    this.confirmedTurn = [{ productId: product.id, dosage: product.dosage ?? '' }];
  }

  addKit(kitId: string): void {
    if (this.config.mode === 'live') void this.mutateCart({ action: 'add-kit', kitId });
  }

  private applyCart(cart: CartSnapshot): void {
    if (cart.version < this.cartVersion) return;
    this.cartVersion = cart.version;
    if (cart.lines && cart.lines.length > 0) {
      this.cart.set(cart.lines);
      this.serverSubtotal.set(cart.subtotal);
    } else if (this.cart().length === 0) {
      this.cart.set([]);
      this.serverSubtotal.set(0);
    }
    this.checkoutAllowed.set(cart.checkoutAllowed);
    this.cartBlockers.set(cart.blockers);
    this.persistCart();
  }

  recordOrder(order: Purchase): void {
    this.lastOrder.set(order);
    this.messages.update((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        status: 'complete',
        content:
          order.status === 'CONFIRMADO'
            ? 'Pedido de demonstração confirmado. Nenhuma cobrança foi realizada. Você pode acompanhar as próximas etapas aqui na conversa.'
            : 'O status do pedido de demonstração foi atualizado.',
        products: [],
        tools: [],
        suggestions: [],
        components: [{ tipo: 'order_tracking', dados: { order } }],
      },
    ]);
  }

  async ensureConversationId(): Promise<string | null> {
    let id = this.conversationId();
    if (id) return id;
    try {
      const resp = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
      });
      if (resp.ok) {
        const body = (await resp.json()) as { conversationId?: string };
        if (body?.conversationId) {
          id = body.conversationId;
          this.conversationId.set(id);
          return id;
        }
      }
    } catch {}
    return null;
  }

  async refreshCart(): Promise<void> {
    if (!this.conversationId()) return;
    const baseOrigin =
      typeof location !== 'undefined' && location.origin ? location.origin : 'http://localhost';
    const endpoint = new URL(this.config.cartEndpoint ?? '/api/cart', baseOrigin);
    endpoint.searchParams.set('conversationId', this.conversationId()!);
    const response = await fetch(endpoint, {
      headers: await this.config.headers?.(),
      credentials: this.config.credentials ?? 'same-origin',
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error('Não foi possível atualizar o carrinho.');
    this.applyCart(cartSchema.parse(await response.json()));
  }

  private mutateCart(change: Record<string, unknown>): Promise<void> {
    const next = this.cartQueue.then(() => this.runMutateCart(change));
    this.cartQueue = next.catch(() => {});
    return next;
  }

  private async runMutateCart(change: Record<string, unknown>): Promise<void> {
    let waitCount = 0;
    while (this.busy() && waitCount < 30) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      waitCount++;
    }
    let conversationId = this.conversationId();
    if (!conversationId) {
      try {
        const resp = await fetch('/api/conversations', {
          method: 'POST',
          headers: {
            ...(await this.config.headers?.()),
            Accept: 'application/json',
          },
          credentials: this.config.credentials ?? 'same-origin',
        });
        if (resp.ok) {
          const body = (await resp.json()) as { conversationId?: string };
          if (body?.conversationId) {
            conversationId = body.conversationId;
            this.conversationId.set(conversationId);
          }
        }
      } catch {}
    }
    if (!conversationId) {
      this.error.set('Inicie uma conversa antes de alterar o carrinho.');
      return;
    }
    const controller = new AbortController();
    this.cartController = controller;
    this.cartBusy.set(true);
    this.error.set('');
    try {
      const response = await fetch(this.config.cartEndpoint ?? '/api/cart', {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify({
          ...change,
          conversationId,
          requestId: crypto.randomUUID(),
          confirmedProductId: this.confirmedProduct.has(String(change['productId']))
            ? change['productId']
            : null,
          confirmedDosage: this.confirmedProduct.get(String(change['productId'])) ?? null,
        }),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(30_000)]),
      });
      if (!response.ok)
        throw new Error(
          'O carrinho não foi alterado. Confira estoque, receita e sua sessão antes de tentar novamente.',
        );
      const cart = cartSchema.parse(await response.json());
      if (this.cartController === controller) this.applyCart(cart);
    } catch (error) {
      if (!controller.signal.aborted)
        this.error.set(
          error instanceof Error && error.name !== 'TypeError'
            ? error.message
            : 'Não foi possível atualizar o carrinho.',
        );
    } finally {
      if (this.cartController === controller) {
        this.cartController = undefined;
        this.cartBusy.set(false);
      }
    }
  }

  private update(id: string, update: (message: ChatMessage) => ChatMessage): void {
    this.messages.update((items) => items.map((item) => (item.id === id ? update(item) : item)));
  }

  async startCheckout(): Promise<CheckoutSessionData | null> {
    let conversationId = this.conversationId();
    if (!conversationId) {
      try {
        const resp = await fetch('/api/conversations', {
          method: 'POST',
          headers: {
            ...(await this.config.headers?.()),
            Accept: 'application/json',
          },
          credentials: this.config.credentials ?? 'same-origin',
        });
        if (resp.ok) {
          const body = (await resp.json()) as { conversationId?: string };
          if (body?.conversationId) {
            conversationId = body.conversationId;
            this.conversationId.set(conversationId);
          }
        }
      } catch {}
    }
    if (!conversationId) {
      this.error.set('Inicie uma conversa antes de fechar o pedido.');
      return null;
    }
    try {
      const response = await fetch('/api/checkout/sessions', {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify({ conversationId }),
      });
      if (!response.ok) throw new Error('Não foi possível iniciar o checkout.');
      const data = (await response.json()) as CheckoutSessionData;
      this.checkoutSession.set(data);
      return data;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha ao iniciar checkout.');
      return null;
    }
  }

  async updateCheckoutDelivery(
    deliveryType: 'pickup' | 'delivery',
    cep?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    neighborhood?: string | null,
  ): Promise<CheckoutSessionData | null> {
    const current = this.checkoutSession();
    if (!current) return null;
    try {
      const response = await fetch(
        `/api/checkout/sessions/${encodeURIComponent(current.id)}/delivery`,
        {
          method: 'PUT',
          headers: {
            ...(await this.config.headers?.()),
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: this.config.credentials ?? 'same-origin',
          body: JSON.stringify({
            deliveryType,
            cep: cep ?? current.cep,
            address: address ?? current.address,
            city: city ?? current.city,
            state: state ?? current.state,
            neighborhood: neighborhood ?? current.neighborhood,
          }),
        },
      );
      if (!response.ok) throw new Error('Não foi possível atualizar entrega.');
      const data = (await response.json()) as CheckoutSessionData;
      this.checkoutSession.set(data);
      return data;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha ao atualizar entrega.');
      return null;
    }
  }

  async updateCheckoutPayment(
    paymentMethod: 'pix' | 'card' | 'pickup' | string,
  ): Promise<CheckoutSessionData | null> {
    const current = this.checkoutSession();
    if (!current) return null;
    try {
      const response = await fetch(
        `/api/checkout/sessions/${encodeURIComponent(current.id)}/payment`,
        {
          method: 'PUT',
          headers: {
            ...(await this.config.headers?.()),
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: this.config.credentials ?? 'same-origin',
          body: JSON.stringify({ paymentMethod }),
        },
      );
      if (!response.ok) throw new Error('Não foi possível atualizar pagamento.');
      const data = (await response.json()) as CheckoutSessionData;
      this.checkoutSession.set(data);
      return data;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha ao atualizar pagamento.');
      return null;
    }
  }

  async confirmCheckoutOrder(sessionId?: string): Promise<Purchase | null> {
    const id = sessionId ?? this.checkoutSession()?.id;
    if (!id) return null;
    try {
      const response = await fetch(`/api/checkout/sessions/${encodeURIComponent(id)}/complete`, {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
      });
      if (!response.ok) throw new Error('Não foi possível confirmar o pedido.');
      const order = (await response.json()) as Purchase;
      this.recordOrder(order);
      if (this.checkoutSession()?.id === id) {
        this.checkoutSession.update((prev) =>
          prev ? { ...prev, status: 'COMPLETED', orderId: order.id } : null,
        );
      }
      await this.refreshCart();
      return order;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha ao confirmar pedido.');
      return null;
    }
  }

  async cancelCheckout(sessionId?: string): Promise<void> {
    const id = sessionId ?? this.checkoutSession()?.id;
    if (!id) return;
    try {
      const response = await fetch(`/api/checkout/sessions/${encodeURIComponent(id)}/cancel`, {
        method: 'POST',
        headers: await this.config.headers?.(),
        credentials: this.config.credentials ?? 'same-origin',
      });
      if (response.ok) {
        const data = (await response.json()) as CheckoutSessionData;
        this.checkoutSession.set(data);
      }
    } catch {
      // Ignored
    }
  }

  async loadCurrentUser(): Promise<UserProfile | null> {
    try {
      const resp = await fetch('/api/auth/me', {
        headers: {
          ...(await this.config.headers?.()),
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
      });
      if (resp.ok) {
        const data = (await resp.json()) as { authenticated: boolean; user?: UserProfile };
        if (data.authenticated && data.user) {
          this.currentUser.set(data.user);
          if (data.user.cep && !this.postalCode()) {
            this.postalCode.set(data.user.cep);
          }
          return data.user;
        }
      }
    } catch {}
    this.currentUser.set(null);
    return null;
  }

  async login(email: string, senha: string): Promise<UserProfile | null> {
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify({ email, senha }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'E-mail ou senha incorretos.');
      }
      const data = (await resp.json()) as { user: UserProfile };
      this.currentUser.set(data.user);
      if (data.user.cep) {
        this.postalCode.set(data.user.cep);
      }
      return data.user;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha no login.');
      throw e;
    }
  }

  async registerUser(user: Partial<UserProfile> & { senha: string }): Promise<UserProfile | null> {
    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify(user),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Falha ao registrar usuário.');
      }
      const data = (await resp.json()) as { user: UserProfile };
      this.currentUser.set(data.user);
      if (data.user.cep) {
        this.postalCode.set(data.user.cep);
      }
      return data.user;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Falha no cadastro.');
      throw e;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: await this.config.headers?.(),
        credentials: this.config.credentials ?? 'same-origin',
      });
    } catch {}
    this.currentUser.set(null);
  }

  async updateUserAddress(address: {
    cep?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  }): Promise<UserProfile | null> {
    try {
      const resp = await fetch('/api/auth/me/address', {
        method: 'PUT',
        headers: {
          ...(await this.config.headers?.()),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: this.config.credentials ?? 'same-origin',
        body: JSON.stringify(address),
      });
      if (resp.ok) {
        const data = (await resp.json()) as { user: UserProfile };
        this.currentUser.set(data.user);
        return data.user;
      }
    } catch {}
    return null;
  }

  ngOnDestroy(): void {
    this.stop();
    this.cartController?.abort();
  }

  private loadPersistedCart(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const savedCart = localStorage.getItem('pm_care_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.cart.set(parsed);
        }
      }
      const savedConv = localStorage.getItem('pm_care_conversation_id');
      if (savedConv && !this.conversationId()) {
        this.conversationId.set(savedConv);
      }
    } catch {}
  }

  private persistCart(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('pm_care_cart', JSON.stringify(this.cart()));
      const conv = this.conversationId();
      if (conv) {
        localStorage.setItem('pm_care_conversation_id', conv);
      }
    } catch {}
  }
}
