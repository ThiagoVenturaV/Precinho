import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UiComponent, Product, CheckoutSessionData } from './chat.models';
import { ProductCard } from './product-card';
import { Icon } from './icon';

@Component({
  selector: 'pm-chat-blocks',
  imports: [CurrencyPipe, ProductCard, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (component().tipo) {
      @case ('product_list') {
        @if (component(); as block) {
          @if (block.tipo === 'product_list') {
            @if (block.dados.resolution; as resolution) {
              <p class="resolution-note" [attr.data-provider]="resolution.provider">
                {{
                  resolution.provider === 'laya'
                    ? 'Opções do catálogo para você confirmar.'
                    : 'Busca do catálogo: confirme o produto desejado.'
                }}{{
                  resolution.fallback ? ' O resolvedor local não respondeu; usamos o catálogo.' : ''
                }}
              </p>
            }
            <div class="product-rail" (pointerdown)="startRailDrag($event)" (pointermove)="moveRailDrag($event)" (pointerup)="endRailDrag($event)" (pointercancel)="endRailDrag($event)" [class.is-dragging]="draggingRail">
              @for (product of block.dados.products; track product.id) {
                <pm-product-card
                  [product]="product"
                  (add)="add.emit($event)"
                  (details)="details.emit($event)"
                />
              }
            </div>
          }
        }
      }
      @case ('product_card') {
        @if (component(); as block) {
          @if (block.tipo === 'product_card') {
            <div class="product-rail" (pointerdown)="startRailDrag($event)" (pointermove)="moveRailDrag($event)" (pointerup)="endRailDrag($event)" (pointercancel)="endRailDrag($event)" [class.is-dragging]="draggingRail">
              <pm-product-card
                [product]="block.dados.product"
                (add)="add.emit($event)"
                (details)="details.emit($event)"
              />
            </div>
          }
        }
      }
      @case ('kit_card') {
        @if (component(); as block) {
          @if (block.tipo === 'kit_card') {
            <section class="agent-widget">
              <div class="agent-widget-head">
                <h3>{{ block.dados.kit.name }}</h3>
                <p>{{ block.dados.kit.description }}</p>
              </div>
              <div class="product-rail" (pointerdown)="startRailDrag($event)" (pointermove)="moveRailDrag($event)" (pointerup)="endRailDrag($event)" (pointercancel)="endRailDrag($event)" [class.is-dragging]="draggingRail">
                @for (product of block.dados.kit.products; track product.id) {
                  <pm-product-card
                    [product]="product"
                    (add)="add.emit($event)"
                    (details)="details.emit($event)"
                  />
                }
              </div>
              <div class="agent-widget-foot">
                <strong>{{
                  block.dados.kit.price / 100 | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR'
                }}</strong
                >@if (!block.dados.kit.id.startsWith('recommendation-')) {<button
                  class="button button-primary"
                  type="button"
                  (pointerdown)="$event.stopPropagation()"
                  (click)="addKit.emit(block.dados.kit.id); $event.stopPropagation()"
                >
                  Adicionar kit <pm-icon name="Plus" />
                </button>} @else {<button
                  class="button button-primary"
                  type="button"
                  (pointerdown)="$event.stopPropagation()"
                  (click)="addRecommendedKit(block.dados.kit.products); $event.stopPropagation()"
                >
                  Adicionar itens <pm-icon name="Plus" />
                </button>}
              </div>
            </section>
          }
        }
      }
      @case ('cart') {
        @if (component(); as block) {
          @if (block.tipo === 'cart') {
            <section class="agent-widget">
              <div class="agent-widget-head">
                <h3>Carrinho atualizado</h3>
                <p>
                  {{ block.dados.cart.lines.length }}
                  {{ block.dados.cart.lines.length === 1 ? 'produto' : 'produtos' }} ·
                  {{
                    block.dados.cart.subtotal / 100 | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR'
                  }}
                </p>
              </div>
              <div class="agent-widget-foot">
                <p>
                  {{
                    block.dados.cart.checkoutAllowed
                      ? 'Revise o kit para continuar.'
                      : block.dados.cart.blockers.join(' ')
                  }}
                </p>
                <button class="button button-secondary" type="button" (click)="review.emit()">
                  Ver meu kit <pm-icon name="ShoppingBag" />
                </button>
              </div>
            </section>
          }
        }
      }
      @case ('checkout') {
        @if (component(); as block) {
          @if (block.tipo === 'checkout') {
            <section class="agent-widget checkout-agent-widget">
              <div class="agent-widget-head">
                <div class="widget-kicker-row">
                  <span class="widget-kicker"><pm-icon name="ShieldCheck" /> Compra Segura</span>
                  <span class="badge" [attr.data-status]="block.dados.session.status">
                    {{
                      block.dados.session.status === 'READY'
                        ? 'Pronto para confirmar'
                        : block.dados.session.status === 'COMPLETED'
                          ? 'Pedido Confirmado'
                          : block.dados.session.status === 'CANCELED'
                            ? 'Cancelado'
                            : 'Em andamento'
                    }}
                  </span>
                </div>
                <h3>Sessão de Checkout</h3>
                <p>
                  {{ block.dados.session.items.length }} {{ block.dados.session.items.length === 1 ? 'item' : 'itens' }} ·
                  Total: {{ block.dados.session.total / 100 | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}
                </p>
              </div>

              <div class="checkout-summary-lines">
                <div class="summary-line">
                  <span class="line-label"><pm-icon [name]="block.dados.session.deliveryType === 'pickup' ? 'ShoppingBag' : 'MapPin'" /> Recebimento:</span>
                  <strong>
                    {{
                      block.dados.session.deliveryType === 'pickup'
                        ? 'Retirada na Unidade (Grátis)'
                        : (block.dados.session.cep ? 'Entrega em ' + (block.dados.session.neighborhood || block.dados.session.city || block.dados.session.cep) : 'Entrega expressa (Aguardando CEP)')
                    }}
                  </strong>
                </div>
                <div class="summary-line">
                  <span class="line-label"><pm-icon name="ShieldCheck" /> Pagamento:</span>
                  <strong>
                    {{
                      block.dados.session.paymentMethod === 'pix'
                        ? 'Pix (Demonstração)'
                        : block.dados.session.paymentMethod === 'card'
                          ? 'Cartão final 4242'
                          : block.dados.session.paymentMethod === 'google_pay'
                            ? 'Google Pay'
                            : block.dados.session.paymentMethod === 'apple_pay'
                              ? 'Apple Pay'
                              : block.dados.session.paymentMethod === 'wallet'
                                ? 'Carteira Digital (Mercado Pago / PicPay)'
                                : 'Pagar na retirada'
                    }}
                  </strong>
                </div>
              </div>

              @if (block.dados.session.status === 'COMPLETED') {
                <div class="checkout-completed-notice">
                  <pm-icon name="Check" /> Pedido <strong>{{ block.dados.session.orderId }}</strong> confirmado com sucesso!
                </div>
              } @else {
                <p class="voice-hint">
                  <pm-icon name="Mic" />
                  <span>Você pode responder por voz ou texto: <em>"Meu CEP é..."</em>, <em>"Pagar no cartão"</em>, ou <em>"Confirmo o pedido"</em>.</span>
                </p>

                <div class="agent-widget-foot">
                  <button class="button button-secondary" type="button" (click)="openCheckout.emit(block.dados.session)">
                    Escolher Entrega e Pagamento <pm-icon name="ArrowRight" />
                  </button>
                  <button
                    class="button button-primary"
                    type="button"
                    [disabled]="block.dados.session.status === 'CANCELED' || block.dados.session.status === 'COMPLETED'"
                    (click)="openCheckout.emit(block.dados.session)"
                  >
                    Revisar etapas <pm-icon name="Check" />
                  </button>
                </div>
              }
            </section>
          }
        }
      }
      @case ('order_tracking') {
        @if (component(); as block) {
          @if (block.tipo === 'order_tracking') {
            <section class="agent-widget">
              <div class="agent-widget-head">
                <h3>Acompanhe seu pedido</h3>
                <p>{{ block.dados.order.id }} · {{ block.dados.order.status }}</p>
                @if (block.dados.order.simulated) {
                  <p>Pedido de demonstração. Não representa uma compra real.</p>
                }
              </div>
              <ol class="tracking-events">
                @for (event of block.dados.order.events; track $index) {
                  <li [class.complete]="event.completed">
                    <pm-icon [name]="event.completed ? 'Check' : 'LoaderCircle'" />
                    <div>
                      <strong>{{ event.label }}</strong>
                      @if (event.date) {
                        <small>{{ event.date }}</small>
                      }
                    </div>
                  </li>
                }
              </ol>
            </section>
          }
        }
      }
      @case ('prescription_upload') {
        @if (component(); as block) {
          @if (block.tipo === 'prescription_upload') {
            <section class="agent-widget">
              <div class="agent-widget-head">
                <div class="widget-kicker-row">
                  <span class="widget-kicker"><pm-icon name="FileText" /> Receita médica</span>
                  @if (block.dados.status) {
                    <span
                      class="badge"
                      [class.badge-success]="block.dados.status === 'APROVADA'"
                      [class.badge-warning]="block.dados.status !== 'APROVADA'"
                    >
                      {{ block.dados.status }}
                    </span>
                  }
                </div>
                <h3>Sua receita</h3>
                <p>{{ block.dados.reason }}</p>
              </div>
              <div class="agent-widget-foot">
                <button class="button button-primary" type="button" (click)="prescription.emit()">
                  <pm-icon name="Paperclip" />Anexar receita
                </button>
              </div>
            </section>
          }
        }
      }
    }
  `,
})
export class ChatBlocks {
  readonly component = input.required<UiComponent>();
  readonly add = output<Product>();
  readonly details = output<Product>();
  readonly addKit = output<string>();
  readonly review = output<void>();
  protected draggingRail = false;
  private rail: HTMLElement | null = null;
  private railStartX = 0;
  private railStartScroll = 0;

  protected addRecommendedKit(products: Product[]): void {
    for (const item of products) {
      if (!item.medication) {
        this.add.emit(item);
      }
    }
  }

  protected startRailDrag(event: PointerEvent): void {
    const interactive = (event.target as HTMLElement | null)?.closest('button, a, input, select, textarea');
    if (interactive) return;
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement) || event.button !== 0) return;
    this.rail = target;
    this.railStartX = event.clientX;
    this.railStartScroll = target.scrollLeft;
    this.draggingRail = false;
    target.setPointerCapture(event.pointerId);
  }

  protected moveRailDrag(event: PointerEvent): void {
    if (!this.rail) return;
    const distance = event.clientX - this.railStartX;
    if (Math.abs(distance) < 4) return;
    this.draggingRail = true;
    event.preventDefault();
    this.rail.scrollLeft = this.railStartScroll - distance;
  }

  protected endRailDrag(event: PointerEvent): void {
    if (this.rail?.hasPointerCapture(event.pointerId)) this.rail.releasePointerCapture(event.pointerId);
    this.rail = null;
    this.draggingRail = false;
  }
  readonly prescription = output<void>();
  readonly openCheckout = output<CheckoutSessionData>();
  readonly confirmCheckout = output<string>();
}
