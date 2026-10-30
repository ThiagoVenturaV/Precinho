import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { HeaderComponent, Header } from './header';

describe('Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let painel: HTMLDialogElement;
  let botaoMenu: HTMLButtonElement;
  let rolagemAnterior: string;

  beforeEach(async () => {
    rolagemAnterior = document.body.style.overflow;
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    painel = fixture.nativeElement.querySelector('dialog');
    botaoMenu = fixture.nativeElement.querySelector('[aria-controls="menu-principal"]');
    painel.showModal = vi.fn(() => painel.setAttribute('open', ''));
    painel.close = vi.fn(() => painel.removeAttribute('open'));
  });

  afterEach(() => {
    fixture.destroy();
    document.body.style.overflow = rolagemAnterior;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens a modal, focuses the close button and locks body scrolling', async () => {
    botaoMenu.click();
    await fixture.whenStable();

    expect(painel.showModal).toHaveBeenCalled();
    expect(botaoMenu.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(painel.querySelector('button'));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes with Escape and restores focus and body scrolling', async () => {
    botaoMenu.click();
    await fixture.whenStable();
    painel.dispatchEvent(new Event('cancel', { cancelable: true }));
    await fixture.whenStable();

    expect(component.menuAberto()).toBe(false);
    expect(painel.open).toBe(false);
    expect(document.activeElement).toBe(botaoMenu);
    expect(document.body.style.overflow).toBe(rolagemAnterior);
  });

  it('only closes background clicks outside the panel content', async () => {
    botaoMenu.click();
    await fixture.whenStable();
    painel.querySelector('nav')!.click();
    expect(component.menuAberto()).toBe(true);
    painel.click();
    await fixture.whenStable();
    expect(component.menuAberto()).toBe(false);
  });

  it('closes with the visible close button and keeps all menu links', async () => {
    botaoMenu.click();
    await fixture.whenStable();
    expect(painel.querySelectorAll('a').length).toBe(4);
    expect(painel.textContent).toContain('Precinho');
    expect(painel.textContent).toContain('Novo');
    painel.querySelector('button')!.click();
    await fixture.whenStable();
    expect(component.menuAberto()).toBe(false);
    expect(document.activeElement).toBe(botaoMenu);
  });

  it('restores the previous body overflow on destruction', async () => {
    document.body.style.overflow = 'auto';
    botaoMenu.click();
    await fixture.whenStable();
    fixture.destroy();
    expect(document.body.style.overflow).toBe('auto');
  });
});
