import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProdutoPage } from './produto-page';
import { CatalogoMockService } from '../../services/catalogo-mock.service';
import { ChatStore } from '../../chat/chat-store';
import { ChatTransport } from '../../chat/chat-transport';
import { CHAT_CONFIG } from '../../chat/chat.config';

describe('ProdutoPage', () => {
  let component: ProdutoPage;
  let fixture: ComponentFixture<ProdutoPage>;
  let router: Router;
  let catalogo: CatalogoMockService;
  let store: ChatStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null),
              },
            },
          },
        },
        { provide: ChatTransport, useValue: { stream: async function* () {} } },
        { provide: CHAT_CONFIG, useValue: { mode: 'demo', endpoint: '/api/chat/stream' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    catalogo = TestBed.inject(CatalogoMockService);
    store = TestBed.inject(ChatStore);
    await fixture.whenStable();
  });

  it('should create and load product by id', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component).toBeTruthy();
    expect(component.carregando()).toBe(false);
    expect(component.produto()).not.toBeNull();
    expect(component.produto()?.nome).toContain('Protetor Solar');
    expect(component.produto()?.imagemUrl).toContain('https://paguemenos.vteximg.com.br');
  });

  it('displays not found message when product does not exist', async () => {
    vi.spyOn(catalogo, 'obterPorId').mockReturnValue(of(undefined));
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.produto()).toBeNull();
    expect(component.carregando()).toBe(false);
  });

  it('increments and decrements product quantity within limits', () => {
    expect(component.quantidade()).toBe(1);
    component.aumentarQtd();
    expect(component.quantidade()).toBe(2);
    component.diminuirQtd();
    expect(component.quantidade()).toBe(1);
    component.diminuirQtd();
    expect(component.quantidade()).toBe(1); // min 1
  });

  it('adds product to ChatStore cart with quantity', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    component.aumentarQtd(); // qtd = 2
    component.adicionarAoCarrinho();

    expect(component.adicionado()).toBe(true);
    expect(store.count()).toBe(2);
  });

  it('navigates to chat with prefilled question when clicking Falar com o Precinho', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.falarComPrecinho();

    expect(navigateSpy).toHaveBeenCalledWith(['/chat'], {
      queryParams: {
        q: expect.stringContaining('Protetor Solar'),
      },
    });
  });

  it('falls back to default logo on image load error', () => {
    const img = document.createElement('img');
    const event = { target: img } as unknown as Event;

    component.onImgError(event);
    expect(img.src).toContain('logo-escuro.png');
    expect(img.dataset['fallback']).toBe('true');
  });
});
