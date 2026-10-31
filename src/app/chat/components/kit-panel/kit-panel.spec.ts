import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { CartLine } from '../../models/chat.models';
import { KitPanel } from './kit-panel';

registerLocaleData(localePt);

const mockProduct = {
  id: 'prod-1',
  name: 'Vitamina C 1000mg',
  brand: 'Pague Menos',
  category: 'Vitaminas',
  description: 'Suplemento alimentar de Vitamina C',
  price: 5000,
  dosage: '1 comprimido ao dia',
  image: 'vitc.jpg',
  requiresPrescription: false,
};

const mockLine: CartLine = {
  id: 'line-1',
  product: mockProduct,
  quantity: 2,
};

describe('KitPanel', () => {
  let component: KitPanel;
  let fixture: ComponentFixture<KitPanel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KitPanel],
    });
    fixture = TestBed.createComponent(KitPanel);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('lines', [mockLine]);
    fixture.detectChanges();
  });

  it('calculates total, count, and catalogTotal correctly', () => {
    expect(component.count()).toBe(2);
    expect(component.total()).toBe(10000);
    expect(component.catalogTotal()).toBe(10000);
  });

  it('computes finalTotal with couponDiscount', () => {
    fixture.componentRef.setInput('couponDiscount', 1000);
    fixture.detectChanges();
    expect(component.finalTotal()).toBe(9000);
  });

  it('detects prescription blocker in blockers list', () => {
    expect(component.hasPrescriptionBlocker()).toBe(false);

    fixture.componentRef.setInput('blockers', ['Envie a receita médica para continuar']);
    fixture.detectChanges();
    expect(component.hasPrescriptionBlocker()).toBe(true);
  });

  it('emits applyCoupon on onApplyCoupon without losing input text prematurely', () => {
    const spy = vi.fn();
    component.applyCoupon.subscribe(spy);

    // Simulate user typing coupon
    (component as unknown as { couponCode: string }).couponCode = 'CUIDADO10';
    (component as unknown as { onApplyCoupon: () => void }).onApplyCoupon();

    expect(spy).toHaveBeenCalledWith('CUIDADO10');
    // couponCode should not be wiped before server/store confirms
    expect((component as unknown as { couponCode: string }).couponCode).toBe('CUIDADO10');
  });

  it('does not emit applyCoupon if input is blank', () => {
    const spy = vi.fn();
    component.applyCoupon.subscribe(spy);

    (component as unknown as { couponCode: string }).couponCode = '   ';
    (component as unknown as { onApplyCoupon: () => void }).onApplyCoupon();

    expect(spy).not.toHaveBeenCalled();
  });
});
