import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartLine, Coupon } from '../../models/chat.models';
import { Icon } from '../../utils/icon';

@Component({
  selector: 'pm-kit-panel',
  imports: [CurrencyPipe, Icon, FormsModule],
  templateUrl: './kit-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPanel {
  readonly lines = input.required<CartLine[]>();
  readonly serverSubtotal = input<number | null>(null);
  readonly blockers = input<string[]>([]);
  readonly checkoutAllowed = input<boolean>(true);
  readonly appliedCoupon = input<Coupon | null>(null);
  readonly couponDiscount = input<number>(0);
  readonly couponError = input<string>('');
  readonly review = output<void>();
  readonly continueChat = output<void>();
  readonly changeQuantity = output<{ id: string; delta: number }>();
  readonly attachPrescription = output<void>();
  readonly applyCoupon = output<string>();
  readonly removeCoupon = output<void>();

  protected couponCode = '';

  protected onApplyCoupon(): void {
    const code = this.couponCode.trim();
    if (code) {
      this.applyCoupon.emit(code);
    }
  }

  readonly hasPrescriptionBlocker = computed(() =>
    this.blockers().some((b) => b.toLowerCase().includes('receita')),
  );
  readonly total = computed(
    () =>
      this.serverSubtotal() ??
      this.lines().reduce((sum, line) => sum + line.quantity * line.product.price, 0),
  );
  readonly count = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));
  readonly catalogTotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity * line.product.price, 0),
  );
  readonly discount = computed(() => Math.max(0, this.catalogTotal() - this.total()));
  readonly finalTotal = computed(() => Math.max(0, this.total() - this.couponDiscount()));

  protected productImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/brand/favicon.png';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('assets/') || image.startsWith('/assets/')) return image;
    return 'assets/products/' + image;
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && !img.dataset['fallback']) {
      img.dataset['fallback'] = 'true';
      img.src = 'assets/brand/favicon.png';
    }
  }
}
