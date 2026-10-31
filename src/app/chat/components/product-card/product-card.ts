import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icon } from '../../utils/icon';
import { Product } from '../../models/chat.models';

@Component({
  selector: 'pm-product-card',
  imports: [CurrencyPipe, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="product-card">
      <button
        class="product-media"
        type="button"
        (pointerdown)="$event.stopPropagation()"
        (mousedown)="$event.stopPropagation()"
        (click)="details.emit(product()); $event.stopPropagation()"
        [attr.aria-label]="'Ver detalhes de ' + product().name"
      >
        <img
          [src]="productImageUrl(product().image)"
          [alt]="product().name"
          width="112"
          height="112"
          loading="lazy"
          (error)="imageError($event)"
        />
      </button>
      <span class="product-brand">{{ product().brand }}</span>
      <h3 class="product-name">
        <button
          type="button"
          (pointerdown)="$event.stopPropagation()"
          (mousedown)="$event.stopPropagation()"
          (click)="details.emit(product()); $event.stopPropagation()"
        >
          {{ product().name }}
        </button>
      </h3>
      <div class="product-price-row">
        <strong class="product-price">{{
          product().price / 100 | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR'
        }}</strong>
      </div>
      <button
        class="product-add"
        type="button"
        (pointerdown)="$event.stopPropagation()"
        (mousedown)="$event.stopPropagation()"
        (click)="add.emit(product()); $event.stopPropagation()"
        [attr.aria-label]="'Adicionar ' + product().name + ' ao kit'"
        title="Adicionar ao kit"
      >
        <pm-icon name="Plus" /> Adicionar
      </button>
    </article>
  `,
  styles: `
    :host {
      display: flex;
      flex: none;
      min-width: 0;
    }
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly add = output<Product>();
  readonly details = output<Product>();

  protected productImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/brand/favicon.png';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('assets/') || image.startsWith('/assets/')) return image;
    return 'assets/products/' + image;
  }

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.dataset['fallback']) {
      image.dataset['fallback'] = 'true';
      image.src = 'assets/brand/favicon.png';
    } else {
      image.style.visibility = 'hidden';
    }
  }
}
