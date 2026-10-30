import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Vitrine } from './vitrine';

describe('Vitrine', () => {
  let component: Vitrine;
  let fixture: ComponentFixture<Vitrine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vitrine],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Vitrine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the kits area without navigating to an unavailable route', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector<HTMLElement>('#kits-titulo')!;
    title.scrollIntoView = () => {};
    element.querySelector<HTMLButtonElement>('.botao--principal')!.click();
    await fixture.whenStable();

    expect(component.assistenteAberto()).toBe(true);
    expect(element.querySelector('.kits__estado')?.textContent).toContain('indisponível');
    expect(element.querySelector('.botao--principal')?.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders generated kits dynamically in the kits area', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector<HTMLElement>('#kits-titulo')!;
    title.scrollIntoView = () => {};
    component.abrirAssistente(title);
    fixture.componentRef.setInput('kitsGerados', [component.destaques[0]]);
    await fixture.whenStable();

    expect(element.querySelectorAll('#kits .produto').length).toBe(1);
    expect(element.querySelector('#kits .produto h3')?.textContent).toContain('Rexona');
    expect(element.querySelector('#kits-titulo')?.textContent).toContain('personalizados');
  });

  it('rejects malformed inputs without breaking the catalog', async () => {
    for (const valor of [null, undefined, 'invalid', {}, [null, {}, { nome: 'Kit' }]]) {
      fixture.componentRef.setInput('kitsGerados', valor);
      await fixture.whenStable();
      expect(component.kitsGerados()).toEqual([]);
      expect(component.kitsExibidos()).toEqual(component.kits);
    }
  });

  it('rejects untrusted images and invalid product paths', async () => {
    const produto = component.destaques[0];
    const invalidos = [
      { ...produto, imagem: 'https://example.com/tracker.png' },
      { ...produto, imagem: 'https://paguemenos.vtexassets.com.example.com/arquivos/ids/1/a.png' },
      { ...produto, imagem: 'https://user:password@paguemenos.vtexassets.com/arquivos/ids/1/a.png' },
      { ...produto, imagem: 'http://paguemenos.vtexassets.com/arquivos/ids/1/a.png' },
      { ...produto, imagem: 'javascript:alert(1)' },
      { ...produto, imagem: 'data:image/svg+xml,<svg></svg>' },
      { ...produto, url: 'https://example.com/kit/p' },
      { ...produto, url: '../redirect/p' },
      { ...produto, url: 'kit/p?redirect=https://example.com' },
      { ...produto, nome: '' },
      { ...produto, preco: 123 },
    ];
    fixture.componentRef.setInput('kitsGerados', invalidos);
    await fixture.whenStable();
    expect(component.kitsGerados()).toEqual([]);
  });

  it('keeps valid results and removes duplicate product URLs', async () => {
    const produto = component.destaques[0];
    fixture.componentRef.setInput('kitsGerados', [produto, produto]);
    await fixture.whenStable();
    expect(component.kitsGerados()).toEqual([produto]);
  });

  it('does not retain references to externally mutable product objects', async () => {
    const produto = { ...component.destaques[0] };
    const imagemOriginal = produto.imagem;
    fixture.componentRef.setInput('kitsGerados', [produto]);
    await fixture.whenStable();
    produto.imagem = 'https://example.com/tracker.png';

    expect(component.kitsGerados()[0].imagem).toBe(imagemOriginal);
    expect(component.kitsGerados()[0]).not.toBe(produto);
  });

  it('renders untrusted product text without interpreting HTML', async () => {
    const nome = '<img src=x onerror=alert(1)>';
    const title = fixture.nativeElement.querySelector('#kits-titulo') as HTMLElement;
    title.scrollIntoView = () => {};
    component.abrirAssistente(title);
    fixture.componentRef.setInput('kitsGerados', [{ ...component.destaques[0], nome }]);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('main')?.innerHTML).not.toContain('<img src="x"');
    expect(fixture.nativeElement.querySelector('#kits .produto h3')?.textContent).toContain(nome);
  });
});
