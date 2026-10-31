import { CurrencyPipe, DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CHAT_CONFIG } from './models/chat.config';
import { ChatStore } from './services/chat-store';
import { ChatTransport } from './services/chat-transport';
import { Product, CheckoutSessionData } from './models/chat.models';
import { Icon } from './utils/icon';
import { KitPanel } from './components/kit-panel/kit-panel';
import { ChatMarkdown } from './utils/markdown';
import { ProductCard } from './components/product-card/product-card';
import { SpeechDictation } from './services/speech-dictation';
import { PrescriptionFiles } from './utils/prescription-files';
import { ChatBlocks } from './models/chat-blocks';
import { purchaseSchema } from './models/chat-event';
import { fetchAddressByCep } from '../services/cep.service';
import { PwaService } from '../services/pwa.service';

@Component({
  selector: 'pm-chat-page',
  imports: [
    CurrencyPipe,
    FormsModule,
    RouterLink,
    Icon,
    KitPanel,
    ChatMarkdown,
    ProductCard,
    ChatBlocks,
  ],
  providers: [SpeechDictation, PrescriptionFiles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-page.html',
  styleUrls: [
    './styles/reference-layout.scss',
    './styles/reference-controls.scss',
    './styles/reference-responsive.scss',
    './chat-adapter.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ChatPage {
  protected readonly store = inject(ChatStore);
  protected readonly config = inject(CHAT_CONFIG);
  protected readonly voice = inject(SpeechDictation);
  protected readonly prescriptions = inject(PrescriptionFiles);
  protected readonly pwa = inject(PwaService);
  protected readonly modal = signal<
    | 'menu'
    | 'kit'
    | 'profile'
    | 'help'
    | 'checkout'
    | 'new'
    | 'product'
    | 'voice'
    | 'confirm-medication'
    | null
  >(null);
  protected readonly product = signal<Product | null>(null);
  protected readonly medicationConfirmed = signal(false);
  protected readonly notice = signal('');
  protected readonly atBottom = signal(true);
  protected readonly checkoutBusy = signal(false);
  protected readonly simulationConsent = signal(true);
  protected delivery: 'pickup' | 'delivery' = 'pickup';
  protected payment: 'pix' | 'card' | 'pickup' | 'google_pay' | 'apple_pay' | 'wallet' = 'pix';
  protected deliveryAddress = 'Rua Pamplona, 680 — Jardins';
  protected deliveryStreet = 'Rua Pamplona, 680';
  protected deliveryNeighborhood = 'Jardins';
  protected deliveryCity = 'São Paulo';
  protected deliveryState = 'SP';
  protected deliveryCep = '01415-000';
  protected readonly deliveryCepLoading = signal(false);
  protected readonly profileCepLoading = signal(false);
  protected readonly cepLookupError = signal('');
  protected readonly checkoutStep = signal<1 | 2 | 3 | 4>(1);
  protected readonly checkoutStepBusy = signal(false);
  protected readonly authEmail = signal('cliente@paguemenos.com.br');
  protected readonly authSenha = signal('Precinho@2026');
  protected readonly authNome = signal('Cliente Pague Menos');
  protected readonly authTelefone = signal('(11) 98765-4321');
  protected readonly authCpf = signal('123.456.789-00');
  protected readonly authMode = signal<'view' | 'login' | 'register'>('view');
  protected readonly authBusy = signal(false);
  protected readonly authError = signal('');
  protected checkoutCouponCode = '';
  protected readonly upsellItems: Product[] = [
    {
      id: '53984',
      name: 'Água Micelar Dauf Sem Álcool 115ml',
      brand: 'Dauf',
      price: 2499,
      image: 'https://paguemenos.vteximg.com.br/arquivos/ids/644438/agua-micelar-dauf-clean-solut-115ml-principal.jpg?v=638008071935030000',
      description: 'Limpa, demaquila, purifica e suaviza a pele sem agredir.',
      category: 'Dermocosméticos',
      medication: false,
      dosage: '',
      requiresPrescription: false,
      stock: 15,
    },
    {
      id: '52295',
      name: 'Hidratante Facial Dauf Vitamina C 50g',
      brand: 'Dauf',
      price: 2799,
      image: 'https://paguemenos.vteximg.com.br/arquivos/ids/643532/hidratante-facial-dauf-vitamina-c-50g-principal.jpg?v=638008059413130000',
      description: 'Ação antioxidante e hidratação iluminadora para todos os tipos de pele.',
      category: 'Dermocosméticos',
      medication: false,
      dosage: '',
      requiresPrescription: false,
      stock: 20,
    },
    {
      id: '113848',
      name: 'Água de Coco Kerococo 330ml',
      brand: 'Kerococo',
      price: 849,
      image: 'https://paguemenos.vteximg.com.br/arquivos/ids/1194739/7896828000482_2.png?v=639177420608930000',
      description: 'Hidratação natural e refrescante para qualquer momento.',
      category: 'Bebidas e Alimentos',
      medication: false,
      dosage: '',
      requiresPrescription: false,
      stock: 30,
    },
  ];
  private checkoutRequestId = crypto.randomUUID();
  protected draft = '';
  protected profileAllergies = '';
  protected profilePostalCode = '';
  private cepAbortController?: AbortController;
  protected readonly intents = [
    {
      title: 'Montar um kit de viagem',
      description: 'Sol, pele e nécessaire para sair com tudo.',
      icon: 'MapPin' as const,
      prompt: 'Quero montar um kit de cuidados para uma viagem.',
      images: ['153418.jpg', '1643917.png', '153892.jpg'],
    },
    {
      title: 'Repor a rotina da casa',
      description: 'Higiene, bebê e a farmacinha do dia a dia.',
      icon: 'House' as const,
      prompt: 'Quero repor os itens de higiene da minha casa.',
      images: ['172508.jpg', '1638967.png', '35356.jpg'],
    },
  ];
  private readonly scroll = viewChild<ElementRef<HTMLElement>>('scroll');
  private readonly prompt = viewChild<ElementRef<HTMLTextAreaElement>>('prompt');
  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly document = inject(DOCUMENT);
  private readonly changes = inject(ChangeDetectorRef);
  private dialogOpener?: HTMLElement;
  private noticeTimer?: ReturnType<typeof setTimeout>;
  protected readonly dynamicPlaceholder = signal('Ex: Remédio para dor de cabeça ou febre...');
  private placeholderTimer?: ReturnType<typeof setTimeout>;
  private readonly suggestions: readonly string[] = [
    'Ex: Remédio para dor de cabeça ou febre...',
    'Ex: Vou viajar na sexta e preciso de um kit...',
    'Ex: Protetor solar facial toque seco FPS 50...',
    'Ex: Fralda descartável e lenço umedecido...',
    'Ex: Hidratante facial com vitamina C...',
    'Ex: Sabonete líquido neutro e algodão...',
    'Ex: Enxaguante bucal e fio dental...',
    'Ex: Dipirona 500mg com 10 comprimidos...',
  ];
  private sendRevision = 0;

  constructor() {
    const activatedRoute = inject(ActivatedRoute, { optional: true });
    const q = activatedRoute?.snapshot.queryParamMap.get('q');
    if (q) {
      this.draft = q;
    }
    afterRenderEffect(() => {
      this.store.messages();
      if (this.atBottom()) this.scrollToBottom();
    });
    afterRenderEffect(() => {
      this.modal();
      const dialog = this.dialog().nativeElement;
      if (dialog.open && !dialog.contains(this.document.activeElement))
        dialog.querySelector<HTMLElement>('button, input, textarea')?.focus();
    });
    afterNextRender(() => {
      this.initDynamicPlaceholder();
    });
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.noticeTimer);
      clearTimeout(this.placeholderTimer);
    });
  }

  protected async send(value = this.draft): Promise<void> {
    if (
      (!value.trim() && !this.prescriptions.hasFiles()) ||
      value.trim().length > 4000 ||
      this.store.busy() ||
      this.prescriptions.busy()
    )
      return;
    const revision = this.sendRevision;
    this.voice.abort();
    try {
      const attachments = this.prescriptions.hasFiles()
        ? await this.prescriptions.upload(this.store.conversationId())
        : [];
      if (revision !== this.sendRevision) return;
      const text = value.trim();
      this.draft = '';
      const isCheckoutStart =
        this.store.count() > 0 &&
        this.store.checkoutAllowed() &&
        /\b(finalizar(\s+pedido|\s+compra)?|fechar\s+(pedido|carrinho|compra)|checkout|comprar)\b/i.test(text) &&
        !/\b(confirmo|confirmar|status|rastre)/i.test(text);

      const response = this.store.send(
        text || 'Enviei uma receita para este atendimento.',
        undefined,
        attachments,
      );
      this.prescriptions.clear();
      if (isCheckoutStart) {
        this.open('checkout');
      }
      await response;
      if (this.voice.handsFree()) {
        const lastMsg = this.store.messages().at(-1);
        if (lastMsg?.role === 'assistant') {
          const textToSpeak =
            lastMsg.content.trim() ||
            (lastMsg.products.length
              ? `Encontrei ${lastMsg.products.length} opções no catálogo para você. Qual delas prefere adicionar ao carrinho?`
              : 'Pronto! Atualizei seu atendimento.');
          this.voice.speak(textToSpeak);
        } else if (this.store.error()) {
          this.voice.speak(this.store.error());
        } else if (false) {
          this.voice.speak(lastMsg?.content ?? '');
        } else {
          this.voice.listenHandsFree();
        }
      }
    } catch {
      return;
    }
  }

  protected keydown(event: KeyboardEvent): void {
    if (this.voice.speaking()) {
      this.voice.stopSpeaking();
    }
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      this.send();
    }
  }

  protected onScroll(): void {
    const element = this.scroll()?.nativeElement;
    if (element)
      this.atBottom.set(element.scrollHeight - element.scrollTop - element.clientHeight < 100);
  }

  protected scrollToBottom(): void {
    const element = this.scroll()?.nativeElement;
    if (element) element.scrollTop = element.scrollHeight;
  }

  protected goToLatest(): void {
    this.atBottom.set(true);
    this.scrollToBottom();
  }

  protected focusComposer(): void {
    if (this.dialog().nativeElement.open) {
      this.dialogOpener = this.prompt()?.nativeElement;
      this.close();
    }
    this.prompt()?.nativeElement.focus();
  }

  protected toggleVoice(): void {
    if (this.voice.active()) this.voice.stop();
    else this.open('voice');
  }

  protected startVoice(): void {
    this.close();
    const before = this.draft.trim();
    this.voice.start((text) => {
      this.draft = [before, text].filter(Boolean).join(' ').slice(0, 4000);
      this.changes.markForCheck();
    });
  }

  protected speakMessage(text: string): void {
    if (this.voice.speaking()) {
      this.voice.stopSpeaking();
    } else {
      this.voice.speak(text);
    }
  }

  protected toggleHandsFree(): void {
    if (this.dialog().nativeElement.open) {
      this.close();
    }
    const active = this.voice.toggleHandsFree((text) => {
      this.announce(`Voz reconhecida: "${text}"`);
      void this.send(text);
      return;
    });
    if (active) {
      const lastMsg = this.store.messages().at(-1);
      if (lastMsg?.role === 'assistant' && lastMsg.content.trim() && !this.store.busy()) {
        this.voice.speak(lastMsg.content);
      } else {
        this.voice.speak('Modo de voz ativado. Como posso ajudar você hoje?');
      }
    }
    this.announce(
      active
        ? 'Modo Mãos Livres ativado. Fale o que precisa que o Precinho responderá por voz.'
        : 'Modo Mãos Livres desativado.',
    );
  }

  protected handleOpenCheckout(session: CheckoutSessionData): void {
    if (session.deliveryType) this.delivery = session.deliveryType;
    if (
      session.paymentMethod &&
      ['pix', 'card', 'pickup', 'google_pay', 'apple_pay', 'wallet'].includes(
        session.paymentMethod,
      )
    ) {
      this.payment = session.paymentMethod as
        | 'pix'
        | 'card'
        | 'pickup'
        | 'google_pay'
        | 'apple_pay'
        | 'wallet';
    }
    if (session.cep) this.deliveryCep = session.cep;
    if (session.address) this.deliveryAddress = session.address;
    if (session.neighborhood) this.deliveryNeighborhood = session.neighborhood;
    if (session.city) this.deliveryCity = session.city;
    if (session.state) this.deliveryState = session.state;
    this.open('checkout');
  }

  protected async handleConfirmCheckout(sessionId: string): Promise<void> {
    if (this.checkoutBusy()) return;
    this.checkoutBusy.set(true);
    try {
      await this.store.confirmCheckoutOrder(sessionId);
      this.announce('Pedido confirmado com sucesso!');
    } catch {
      this.announce('Não foi possível confirmar o pedido.');
    } finally {
      this.checkoutBusy.set(false);
    }
  }

  protected async selectFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    await this.prescriptions.select(files);
  }

  protected attachPrescription(): void {
    this.fileInput()?.nativeElement.click();
  }

  protected open(kind: NonNullable<ReturnType<typeof this.modal>>): void {
    if (kind === 'checkout' && this.modal() !== 'checkout') {
      this.checkoutRequestId = crypto.randomUUID();
      this.checkoutStep.set(1);
      this.simulationConsent.set(true);
      void this.initCheckoutSession();
    }
    this.profileAllergies = this.store.allergies();
    this.profilePostalCode = this.store.postalCode();
    this.modal.set(kind);
    if (!this.dialog().nativeElement.open) {
      this.dialogOpener = this.document.activeElement as HTMLElement;
      this.dialog().nativeElement.showModal();
    }
  }

  protected close(): void {
    this.dialog().nativeElement.close();
    this.modal.set(null);
  }

  protected dialogClosed(): void {
    if (this.dialog().nativeElement.open) return;
    this.modal.set(null);
    this.dialogOpener?.focus();
  }

  protected showProduct(product: Product): void {
    this.product.set(product);
    this.open('product');
  }

  protected add(product: Product): void {
    if (this.store.busy() || this.store.cartBusy()) return;
    if (product.requiresPrescription) {
      this.product.set(product);
      this.medicationConfirmed.set(false);
      this.open('confirm-medication');
      return;
    }
    this.store.add(product);
    this.announce(
      this.config.mode === 'demo' ? 'Item adicionado ao seu kit.' : 'Atualizando seu carrinho.',
    );
  }

  protected confirmMedication(): void {
    const product = this.product();
    if (!product || !this.medicationConfirmed()) return;
    this.store.confirmMedication(product);
    this.store.add(product);
    if (product.requiresPrescription) {
      this.announce('Este medicamento exige receita. Selecione uma imagem ou PDF para enviar ao atendimento.');
      this.attachPrescription();
    }
    this.close();
  }

  protected addFromDetails(product: Product): void {
    this.close();
    this.add(product);
  }

  protected formatCep(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    return digits;
  }

  protected async onDeliveryCepChange(): Promise<void> {
    this.deliveryCep = this.formatCep(this.deliveryCep);
    const clean = this.deliveryCep.replace(/\D/g, '');
    this.cepLookupError.set('');
    if (clean.length !== 8) return;

    this.cepAbortController?.abort();
    this.cepAbortController = new AbortController();
    this.deliveryCepLoading.set(true);

    try {
      const data = await fetchAddressByCep(clean, this.cepAbortController.signal);
      if (data) {
        if (data.logradouro) {
          this.deliveryStreet = data.logradouro;
          this.deliveryAddress = `${data.logradouro}${data.bairro ? ' — ' + data.bairro : ''}`;
        }
        if (data.bairro) this.deliveryNeighborhood = data.bairro;
        if (data.localidade) this.deliveryCity = data.localidade;
        if (data.uf) this.deliveryState = data.uf;
        this.announce(`Endereço localizado: ${data.localidade}/${data.uf}`);
      } else {
        this.cepLookupError.set('CEP não encontrado.');
      }
    } finally {
      this.deliveryCepLoading.set(false);
    }
  }

  protected async onProfilePostalCodeChange(): Promise<void> {
    this.profilePostalCode = this.formatCep(this.profilePostalCode);
    const clean = this.profilePostalCode.replace(/\D/g, '');
    if (clean.length !== 8) return;

    this.profileCepLoading.set(true);
    try {
      const data = await fetchAddressByCep(clean);
      if (data) {
        this.announce(`Localizado: ${data.localidade} - ${data.uf}`);
      }
    } finally {
      this.profileCepLoading.set(false);
    }
  }

  protected saveProfile(): void {
    if (this.profilePostalCode && !/^\d{5}-?\d{3}$/.test(this.profilePostalCode)) return;
    this.store.allergies.set(this.profileAllergies.trim());
    this.store.postalCode.set(this.profilePostalCode.trim());
    this.close();
    this.announce('Preferências atualizadas.');
  }

  protected newConversation(): void {
    this.sendRevision++;
    this.voice.abort();
    this.prescriptions.clear();
    this.store.reset();
    this.draft = '';
    this.dialogOpener = this.prompt()?.nativeElement;
    this.close();
    this.prompt()?.nativeElement.focus();
  }

  protected async copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.announce('Resposta copiada.');
    } catch {
      this.announce('Não foi possível copiar a resposta.');
    }
  }


  protected async initCheckoutSession(): Promise<void> {
    try {
      const user = this.store.currentUser();
      if (user) {
        if (user.cep) this.deliveryCep = user.cep;
        if (user.endereco) this.deliveryAddress = user.endereco;
        if (user.bairro) this.deliveryNeighborhood = user.bairro;
        if (user.cidade) this.deliveryCity = user.cidade;
        if (user.estado) this.deliveryState = user.estado;
        if (user.cep) this.delivery = 'delivery';
      }
      const session = await this.store.startCheckout();
      if (session) {
        if (session.deliveryType) this.delivery = session.deliveryType as 'pickup' | 'delivery';
        if (session.cep) this.deliveryCep = session.cep;
        if (session.address) this.deliveryAddress = session.address;
        if (session.neighborhood) this.deliveryNeighborhood = session.neighborhood;
        if (session.city) this.deliveryCity = session.city;
        if (session.state) this.deliveryState = session.state;
        if (
          session.paymentMethod &&
          ['pix', 'card', 'pickup', 'google_pay', 'apple_pay', 'wallet'].includes(session.paymentMethod)
        ) {
          this.payment = session.paymentMethod as any;
        }
      }
    } catch {}
  }

  protected async doLogin(): Promise<void> {
    if (this.authBusy()) return;
    this.authBusy.set(true);
    this.authError.set('');
    try {
      const user = await this.store.login(this.authEmail(), this.authSenha());
      if (user) {
        if (user.cep) {
          this.deliveryCep = user.cep;
          this.profilePostalCode = user.cep;
        }
        if (user.endereco) this.deliveryAddress = user.endereco;
        if (user.bairro) this.deliveryNeighborhood = user.bairro;
        if (user.cidade) this.deliveryCity = user.cidade;
        if (user.estado) this.deliveryState = user.estado;
        this.authMode.set('view');
        this.announce(`Bem-vindo, ${user.nome}!`);
      }
    } catch (e) {
      this.authError.set(e instanceof Error ? e.message : 'Falha ao autenticar.');
    } finally {
      this.authBusy.set(false);
    }
  }

  protected async doRegister(): Promise<void> {
    if (this.authBusy()) return;
    this.authBusy.set(true);
    this.authError.set('');
    try {
      const user = await this.store.registerUser({
        nome: this.authNome(),
        email: this.authEmail(),
        senha: this.authSenha(),
        telefone: this.authTelefone(),
        cpf: this.authCpf(),
        cep: this.deliveryCep,
        endereco: this.deliveryAddress,
        bairro: this.deliveryNeighborhood,
        cidade: this.deliveryCity,
        estado: this.deliveryState,
      });
      if (user) {
        this.authMode.set('view');
        this.announce(`Cadastro realizado com sucesso! Bem-vindo, ${user.nome}!`);
      }
    } catch (e) {
      this.authError.set(e instanceof Error ? e.message : 'Falha ao cadastrar.');
    } finally {
      this.authBusy.set(false);
    }
  }

  protected async doLogout(): Promise<void> {
    await this.store.logout();
    this.announce('Sessão encerrada.');
  }

  protected fillDefaultUser(): void {
    this.authEmail.set('cliente@paguemenos.com.br');
    this.authSenha.set('Precinho@2026');
    this.authNome.set('Cliente Pague Menos');
  }

  protected async checkout(): Promise<void> {
    if (
      (!this.config.checkout && !this.config.mvpCheckout) ||
      this.checkoutBusy() ||
      !this.store.checkoutAllowed()
    )
      return;
    if (this.delivery === 'delivery' && (!this.deliveryCep.trim() || !this.deliveryAddress.trim())) {
      this.announce('Por favor, informe o CEP e o endereço completo para entrega.');
      return;
    }
    if (!this.simulationConsent()) {
      this.announce('Você deve confirmar que esta compra é uma simulação.');
      return;
    }
    this.checkoutBusy.set(true);
    try {
      const session = this.store.checkoutSession();
      if (session) {
        await this.store.updateCheckoutDelivery(
          this.delivery,
          this.deliveryCep,
          this.deliveryAddress,
          this.deliveryCity,
          this.deliveryState,
          this.deliveryNeighborhood,
        );
        await this.store.updateCheckoutPayment(this.payment);
        await this.store.confirmCheckoutOrder(session.id);
        this.close();
        this.atBottom.set(true);
        return;
      }
      if (!this.config.checkout && this.config.mvpCheckout) {
        const response = await fetch('/api/orders/checkout', {
          method: 'POST',
          headers: { ...(await this.config.headers?.()), 'Content-Type': 'application/json' },
          credentials: this.config.credentials ?? 'same-origin',
          body: JSON.stringify({
            conversationId: this.store.conversationId() ?? (await this.store.ensureConversationId()),
            requestId: this.checkoutRequestId,
            delivery: this.delivery,
            payment: this.payment,
            address: this.deliveryAddress,
            cep: this.deliveryCep,
            city: this.deliveryCity,
            state: this.deliveryState,
            neighborhood: this.deliveryNeighborhood,
            coupon: this.store.appliedCoupon()?.code ?? null,
            simulationConsent: true,
          }),
          signal: AbortSignal.timeout(30_000),
        });
        if (!response.ok) throw new Error('Não foi possível confirmar o pedido.');
        const order = purchaseSchema.parse(await response.json());
        this.store.recordOrder(order);
        this.close();
        this.atBottom.set(true);
        await this.store.refreshCart();
        return;
      }
      if (this.config.mode === 'live') {
        const response = await fetch('/api/checkout/validate', {
          method: 'POST',
          headers: { ...(await this.config.headers?.()), 'Content-Type': 'application/json' },
          credentials: this.config.credentials ?? 'same-origin',
          body: JSON.stringify({ conversationId: this.store.conversationId() }),
          signal: AbortSignal.timeout(30_000),
        });
        if (!response.ok) throw new Error('Checkout bloqueado.');
      }
      await this.config.checkout!(
        this.store
          .cart()
          .map((line) => ({ product: { ...line.product }, quantity: line.quantity })),
      );
      this.close();
    } catch {
      this.announce('Não foi possível abrir a compra. Seu kit foi mantido.');
    } finally {
      this.checkoutBusy.set(false);
    }
  }

  protected isItemInCart(productId: string): boolean {
    return this.store.cart().some((line) => line.product.id === productId);
  }

  protected addUpsellItem(product: Product): void {
    this.store.add(product);
    this.announce(`${product.name} adicionado ao pedido!`);
  }

  protected applyCheckoutCoupon(): void {
    if (this.store.applyCoupon(this.checkoutCouponCode)) {
      this.announce('Cupom aplicado com sucesso!');
      this.checkoutCouponCode = '';
    }
  }

  protected checkoutTotal(): number {
    const sub = this.store.subtotal();
    const discount = this.store.couponDiscount();
    const shipping =
      this.delivery === 'delivery' && this.store.appliedCoupon()?.type !== 'shipping' ? 690 : 0;
    return Math.max(0, sub - discount) + shipping;
  }

  protected paymentMethodLabel(method: string): string {
    switch (method) {
      case 'card':
        return 'Cartão de Crédito';
      case 'google_pay':
        return 'Google Pay';
      case 'apple_pay':
        return 'Apple Pay';
      case 'wallet':
        return 'Carteira Digital (Mercado Pago / PicPay)';
      case 'pickup':
        return 'Pagar na Retirada';
      default:
        return 'Pix';
    }
  }

  protected async nextCheckoutStep(): Promise<void> {
    const step = this.checkoutStep();
    if (step === 1) {
      if (this.delivery === 'delivery') {
        if (!this.deliveryCep?.trim() || !this.deliveryAddress?.trim()) {
          this.announce('Informe o CEP e o endereço completo para entrega.');
          return;
        }
      }
      this.checkoutStepBusy.set(true);
      try {
        let session = this.store.checkoutSession();
        if (!session) {
          session = await this.store.startCheckout();
        }
        if (session) {
          await this.store.updateCheckoutDelivery(
            this.delivery,
            this.deliveryCep,
            this.deliveryAddress,
            this.deliveryCity,
            this.deliveryState,
            this.deliveryNeighborhood,
          );
        }
        if (this.store.currentUser()) {
          void this.store.updateUserAddress({
            cep: this.deliveryCep,
            endereco: this.deliveryAddress,
            bairro: this.deliveryNeighborhood,
            cidade: this.deliveryCity,
            estado: this.deliveryState,
          });
        }
        this.checkoutStep.set(2);
      } catch {
        this.announce('Não foi possível salvar os dados de entrega.');
      } finally {
        this.checkoutStepBusy.set(false);
      }
    } else if (step === 2) {
      this.checkoutStep.set(3);
    } else if (step === 3) {
      this.checkoutStepBusy.set(true);
      try {
        let session = this.store.checkoutSession();
        if (!session) {
          session = await this.store.startCheckout();
        }
        if (session) {
          await this.store.updateCheckoutPayment(this.payment);
        }
        this.checkoutStep.set(4);
      } catch {
        this.announce('Não foi possível salvar a forma de pagamento.');
      } finally {
        this.checkoutStepBusy.set(false);
      }
    }
  }

  protected previousCheckoutStep(): void {
    if (this.checkoutStep() > 1) {
      this.checkoutStep.update((step) => (step - 1) as 1 | 2 | 3 | 4);
    }
  }

  protected trackOrder(): void {
    const order = this.store.lastOrder();
    if (order)
      this.send(
        'Quero acompanhar o pedido ' +
          order.id +
          '. Consulte o status atual e mostre a linha do tempo.',
      );
  }

  protected async advanceOrder(): Promise<void> {
    const order = this.store.lastOrder();
    if (!order || !this.config.mvpCheckout || this.checkoutBusy() || this.store.busy()) return;
    this.checkoutBusy.set(true);
    try {
      const response = await fetch('/api/orders/' + encodeURIComponent(order.id) + '/advance', {
        method: 'POST',
        headers: await this.config.headers?.(),
        credentials: this.config.credentials ?? 'same-origin',
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error('Status indisponível.');
      this.store.recordOrder(purchaseSchema.parse(await response.json()));
      this.atBottom.set(true);
    } catch {
      this.announce('Não foi possível atualizar a demonstração.');
    } finally {
      this.checkoutBusy.set(false);
    }
  }

  private announce(message: string): void {
    clearTimeout(this.noticeTimer);
    this.notice.set(message);
    this.noticeTimer = setTimeout(() => this.notice.set(''), 3500);
  }

  private initDynamicPlaceholder(): void {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let suggestionIdx = 0;
    let charIdx = this.suggestions[0].length;
    let isDeleting = true;

    const tick = () => {
      if (this.draft.trim().length > 0) {
        this.placeholderTimer = setTimeout(tick, 1000);
        return;
      }

      if (prefersReducedMotion) {
        suggestionIdx = (suggestionIdx + 1) % this.suggestions.length;
        this.dynamicPlaceholder.set(this.suggestions[suggestionIdx]);
        this.placeholderTimer = setTimeout(tick, 3500);
        return;
      }

      const currentSuggestion = this.suggestions[suggestionIdx];

      if (isDeleting) {
        charIdx--;
        this.dynamicPlaceholder.set(currentSuggestion.slice(0, charIdx));
        if (charIdx <= 0) {
          isDeleting = false;
          suggestionIdx = (suggestionIdx + 1) % this.suggestions.length;
          charIdx = 0;
          this.placeholderTimer = setTimeout(tick, 400);
          return;
        }
        this.placeholderTimer = setTimeout(tick, 20);
      } else {
        charIdx++;
        this.dynamicPlaceholder.set(currentSuggestion.slice(0, charIdx));
        if (charIdx >= currentSuggestion.length) {
          isDeleting = true;
          this.placeholderTimer = setTimeout(tick, 2800);
          return;
        }
        this.placeholderTimer = setTimeout(tick, 45);
      }
    };

    this.placeholderTimer = setTimeout(tick, 2800);
  }

  protected productImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/brand/favicon.png';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('assets/') || image.startsWith('/assets/')) return image;
    return 'assets/products/' + image;
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && !img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'assets/brand/favicon.png';
    }
  }
}
