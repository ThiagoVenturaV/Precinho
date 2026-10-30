import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { Produto } from '../../models/produto.model';
import { CatalogoMockService } from '../../services/catalogo-mock.service';
import { ChatStore } from '../../chat/chat-store';

@Component({
  selector: 'app-produto-page',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink, HeaderComponent],
  templateUrl: './produto-page.html',
  styleUrl: './produto-page.scss',
})
export class ProdutoPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogo = inject(CatalogoMockService);
  private readonly store = inject(ChatStore, { optional: true });

  readonly produto = signal<Produto | null>(null);
  readonly carregando = signal(true);
  readonly quantidade = signal(1);
  readonly adicionado = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.carregando.set(false);
      return;
    }

    this.catalogo.obterPorId(id).subscribe({
      next: (item) => {
        this.produto.set(item ?? null);
        this.carregando.set(false);
      },
      error: () => {
        this.produto.set(null);
        this.carregando.set(false);
      },
    });
  }

  aumentarQtd(): void {
    this.quantidade.update((q) => Math.min(99, q + 1));
  }

  diminuirQtd(): void {
    this.quantidade.update((q) => Math.max(1, q - 1));
  }

  adicionarAoCarrinho(): void {
    const p = this.produto();
    if (!p) return;

    if (this.store) {
      const chatProd = this.catalogo.toChatProduct(p);
      for (let i = 0; i < this.quantidade(); i++) {
        this.store.add(chatProd);
      }
    }

    this.adicionado.set(true);
    setTimeout(() => this.adicionado.set(false), 3500);
  }

  falarComPrecinho(): void {
    const p = this.produto();
    const q = p
      ? `Tenho dúvidas sobre o produto ${p.nome}. Pode me ajudar?`
      : 'Olá Precinho, pode me ajudar com os produtos?';
    this.router.navigate(['/chat'], { queryParams: { q } });
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'logo-escuro.png';
    }
  }
}
