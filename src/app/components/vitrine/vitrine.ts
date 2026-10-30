import { ChatStore } from '../../chat/chat-store';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CatalogoMockService } from '../../services/catalogo-mock.service';

export interface ProdutoVitrine {
  readonly id?: string | number;
  readonly nome: string;
  readonly marca: string;
  readonly preco: string;
  readonly imagem: string;
  readonly url: string;
}

function validarKitsGerados(valor: unknown): readonly ProdutoVitrine[] {
  if (!Array.isArray(valor)) return [];

  const urls = new Set<string>();
  return valor.filter((produto: unknown): produto is ProdutoVitrine => {
    if (typeof produto !== 'object' || produto === null) return false;

    const { nome, marca, preco, imagem, url } = produto as Record<string, unknown>;
    if (
      typeof nome !== 'string' || !nome.trim() ||
      typeof marca !== 'string' || !marca.trim() ||
      typeof preco !== 'string' || !preco.trim() ||
      typeof imagem !== 'string' ||
      typeof url !== 'string' || !/^[a-z0-9][a-z0-9-]*\/p$/.test(url) ||
      urls.has(url)
    ) return false;

    try {
      const imagemUrl = new URL(imagem);
      if (
        imagemUrl.origin !== 'https://paguemenos.vtexassets.com' ||
        imagemUrl.username || imagemUrl.password ||
        !imagemUrl.pathname.startsWith('/arquivos/ids/')
      ) return false;
    } catch {
      return false;
    }

    urls.add(url);
    return true;
  }).map((p) => {
    const { id, nome, marca, preco, imagem, url } = p as ProdutoVitrine;
    return id !== undefined
      ? { id, nome, marca, preco, imagem, url }
      : { nome, marca, preco, imagem, url };
  });
}

@Component({
  selector: 'app-vitrine',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.scss',
})
export class Vitrine {
  private readonly router = inject(Router, { optional: true });
  readonly assistenteAberto = signal(false);
  readonly kitsGerados = input<readonly ProdutoVitrine[], unknown>([], {
    transform: validarKitsGerados,
  });
  readonly temKitsGerados = computed(() =>
    this.assistenteAberto() && this.kitsGerados().length > 0,
  );
  private readonly assets = 'https://paguemenos.vtexassets.com/';
  private readonly banners = `${this.assets}assets/vtex.file-manager-graphql/images/`;
  readonly campanha = `${this.banners}57d113e2-9a7b-4453-ae3d-460ad0b541f3___5c767d91e7254236a4254d4c0fc81460.png`;
  readonly campanhaDesktop = `${this.banners}fee043b5-0a8e-4261-9dc7-500641bbca10___d4e5f6231f7502d42dbb6f5427ba6218.png`;
  readonly destaques: ProdutoVitrine[] = [
    {
      id: 'rexona-xtracool',
      nome: 'Rexona Men Xtracool + Impacto 150ml, 2 unidades',
      marca: 'REXONA',
      preco: '24,49',
      imagem: `${this.assets}arquivos/ids/1175306/7891150108288_0.jpg`,
      url: 'kit-desodorante-antitranspirante-aerossol-rexona-men-xtracool-mais-impacto-150ml-spray-edicao-limitada-fifa/p',
    },
    {
      id: 'nutridrink-protein',
      nome: 'Nutridrink Protein Senior Café com Leite 750g',
      marca: 'NUTRIDRINK',
      preco: '151,99',
      imagem: `${this.assets}arquivos/ids/991253/7891025121480_1.jpg`,
      url: 'nutridrink-protein-senior-po-cafe-com-leite-750g/p',
    },
    {
      id: 'aptanutri-3-kit',
      nome: 'Aptanutri Premium 3 800g, kit com 3 unidades',
      marca: 'APTANUTRI',
      preco: '165,22',
      imagem: `${this.assets}arquivos/ids/1143794/Kit-Aptanutri-Premium-3-formula-Infantil-1-a-3-anos-800g-3-Unidades.png`,
      url: 'kit-aptanutri-premium-3-formula-infantil-1-a-3-anos-800g-3-unidades/p',
    },
    {
      id: 'aptanutri-profutura',
      nome: 'Aptanutri Profutura 3 800g + Fortini Plus 400g',
      marca: 'APTANUTRI',
      preco: '143,98',
      imagem: `${this.assets}arquivos/ids/1143934/Kit-Aptanutri-Profutura-3-800g-e-Suplemento-Infantil-Fortini-Plus-Sem-Sabor-400g.png`,
      url: 'kit-aptanutri-profutura-3-800g---suplemento-infantil-fortini-plus-sem-sabor-400g/p',
    },
  ];
  readonly categorias = [
    {
      nome: 'Ofertas',
      imagem: `${this.banners}1e7a20e8-ae6b-4061-b028-851138f89c55___ee5cd4cf84ff522a38870a41d414fac0.png`,
      url: 'ofertas',
      destaque: true,
    },
    {
      nome: 'Skincare',
      imagem: `${this.banners}779ff80d-4a6f-4a62-b944-48c302323a34___0ea0e888a98a139c7ad7552447e7946f.webp`,
      url: 'dermocosmeticos',
    },
    {
      nome: 'Proteção solar',
      imagem: `${this.banners}24e5fea1-5ed1-4ea5-8211-12094b04ba46___9b0829939eedd243aaadbfe907545f1b.webp`,
      url: 'protetor-solar',
    },
  ];
  readonly servicos = [
    {
      nome: 'Serviços de saúde',
      texto: 'Cuidados pensados pra você',
      imagem: `${this.banners}31a1cda9-5413-4355-905b-ee64a36e4eec___2a2b1f95925aa6d8558c923400b5a1b8.png`,
      zoom: 1.1,
      posicao: '45% 0%',
      url: 'servicos-de-saude',
    },
    {
      nome: 'Vacinas',
      texto: 'Proteção em todas as fases',
      imagem: `${this.banners}3871867e-a919-4bc0-9158-54ce7d0b7589___2867c81f3b9c1ea81fd2690e1ad9ac57.png`,
      zoom: 1.1,
      posicao: '50% 0%',
      url: 'vacina',
    },
  ];
  readonly kits = this.destaques.slice(2);
  readonly kitsExibidos = computed(() =>
    this.temKitsGerados() ? this.kitsGerados() : this.kits,
  );
  private readonly catalogo = inject(CatalogoMockService);
  readonly catalogoDestaques = toSignal(this.catalogo.listarDestaques(), { initialValue: [] });

  private readonly store = inject(ChatStore, { optional: true });
  readonly itensAdicionados = signal<Set<string | number>>(new Set());

  adicionarAoCarrinhoVitrine(produto: ProdutoVitrine, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const store = this.store;
    if (!store) return;

    const idKey = this.extrairIdentificador(produto);
    this.catalogo.obterPorId(idKey).subscribe({
      next: (item) => {
        if (item) {
          store.add(this.catalogo.toChatProduct(item));
        } else {
          const precoNumerico = parseFloat(produto.preco.replace(',', '.'));
          store.add({
            id: String(idKey),
            name: produto.nome,
            brand: produto.marca,
            price: Math.round((isNaN(precoNumerico) ? 24.99 : precoNumerico) * 100),
            image: produto.imagem,
            description: produto.nome,
            category: 'Ofertas',
            stock: 50,
            medication: false,
            dosage: '',
            requiresPrescription: false,
          });
        }

        const atual = new Set(this.itensAdicionados());
        atual.add(idKey);
        this.itensAdicionados.set(atual);
        setTimeout(() => {
          const revert = new Set(this.itensAdicionados());
          revert.delete(idKey);
          this.itensAdicionados.set(revert);
        }, 2000);
      },
    });
  }

  foiAdicionado(produto: ProdutoVitrine): boolean {
    return this.itensAdicionados().has(this.extrairIdentificador(produto));
  }

  extrairIdentificador(produto: ProdutoVitrine): string | number {
    if (produto.id !== undefined) return produto.id;
    return produto.url.replace(/\/p$/, '');
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'logo-escuro.png';
    }
  }

  abrirAssistente(destino?: HTMLElement): void {
    this.assistenteAberto.set(true);
    if (this.router) {
      this.router.navigate(['/chat']).catch(() => {
        if (destino) {
          destino.focus({ preventScroll: true });
          destino.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      });
    } else if (destino) {
      destino.focus({ preventScroll: true });
      destino.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }

  readonly publicidade = [
    {
      nome: 'Esmaltes Risqué',
      imagem: `${this.banners}681b3966-be8f-44a5-9960-0f67b2e4c5c7___0fad2306300090ca944d9456e18ceeea.jpg`,
      url: 'risque-esmaltes',
    },
    {
      nome: 'Proteção solar Australian Gold',
      imagem: `${this.banners}585a1449-7f9f-4406-8457-bd5aa6e3c851___03907316c3399192f79cfdff1d2caf31.jpg`,
      url: 'australian-gold',
    },
  ];
}
