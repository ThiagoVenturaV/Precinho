import { DOCUMENT } from '@angular/common';
import { afterRenderEffect, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatStore } from '../../chat/chat-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  menuAberto = signal(false);
  protected readonly store = inject(ChatStore, { optional: true });

  private readonly documento = inject(DOCUMENT);
  private readonly painel = viewChild.required<ElementRef<HTMLDialogElement>>('painelMenu');
  private readonly botaoMenu = viewChild.required<ElementRef<HTMLButtonElement>>('botaoMenu');
  private readonly botaoFechar = viewChild.required<ElementRef<HTMLButtonElement>>('botaoFechar');
  private rolagemAnterior: string | undefined;

  constructor() {
    afterRenderEffect(() => {
      const painel = this.painel().nativeElement;

      if (this.menuAberto() && !painel.open) {
        this.rolagemAnterior = this.documento.body.style.overflow;
        this.documento.body.style.overflow = 'hidden';
        painel.showModal();
        this.botaoFechar().nativeElement.focus();
      } else if (!this.menuAberto() && painel.open) {
        painel.close();
        this.restaurarRolagem();
        this.botaoMenu().nativeElement.focus();
      }
    });

    inject(DestroyRef).onDestroy(() => this.restaurarRolagem());
  }

  fecharPeloFundo(evento: MouseEvent) {
    if (evento.target === this.painel().nativeElement) {
      this.menuAberto.set(false);
    }
  }

  private restaurarRolagem() {
    if (this.rolagemAnterior !== undefined) {
      this.documento.body.style.overflow = this.rolagemAnterior;
      this.rolagemAnterior = undefined;
    }
  }
}

export { HeaderComponent as Header };
