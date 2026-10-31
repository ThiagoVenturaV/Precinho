import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ChatStore } from '../../chat/services/chat-store';
import { CatalogoMockService } from '../../services/catalogo-mock.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './product-card.component.scss',
  template: `
    <article class="card" [attr.aria-label]="produto.nome">
      @if (produto.produtoProprio) {
        <span class="badge-proprio">Marca Própria Pague Menos</span>
      }

      @if (produto.classificacaoVenda !== 'LIVRE') {
        <span class="badge-receita">
          Exige apresentação de receita na entrega
        </span>
      }

      <a [routerLink]="['/produto', produto.id]" class="card-link-imagem" [attr.aria-label]="'Ver detalhes de ' + produto.nome">
        <img [src]="produto.imagemUrl" [alt]="produto.nome" (error)="onImgError($event)" loading="lazy" />
      </a>

      <h3>
        <a [routerLink]="['/produto', produto.id]" class="card-titulo-link">
          {{ produto.nome }}
        </a>
      </h3>
      <p class="categoria">{{ produto.categoria }}</p>
      <p class="marca">{{ produto.marca }}</p>
      <p class="preco">R$ {{ produto.preco | number:'1.2-2' }}</p>

      <button type="button" class="btn-comprar" (click)="adicionarAoCarrinho($event)">
        {{ adicionado() ? '✓ No carrinho' : 'Adicionar ao carrinho' }}
      </button>
    </article>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) produto!: Produto;
  private readonly store = inject(ChatStore, { optional: true });
  private readonly catalogo = inject(CatalogoMockService);
  readonly adicionado = signal(false);

  adicionarAoCarrinho(event: Event): void {
    event.stopPropagation();
    if (this.store) {
      this.store.add(this.catalogo.toChatProduct(this.produto));
      this.adicionado.set(true);
      setTimeout(() => this.adicionado.set(false), 2000);
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'logo-escuro.png';
    }
  }
}
