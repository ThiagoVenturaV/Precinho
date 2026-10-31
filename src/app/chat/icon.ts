import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  AudioLines,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Cross,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Heart,
  House,
  LoaderCircle,
  MapPin,
  Menu,
  Mic,
  Minus,
  Paperclip,
  Percent,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Square,
  Stethoscope,
  Tag,
  Trash2,
  UserRound,
  Volume2,
  Wallet,
  X,
  createElement,
} from 'lucide';

const icons = {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  AudioLines,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Cross,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Heart,
  House,
  LoaderCircle,
  MapPin,
  Menu,
  Mic,
  Minus,
  Paperclip,
  Percent,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Square,
  Stethoscope,
  Tag,
  Trash2,
  UserRound,
  Volume2,
  Wallet,
  X,
};
export type IconName = keyof typeof icons;

@Component({
  selector: 'pm-icon',
  template: '',
  host: {
    'aria-hidden': 'true',
    style:
      'display:inline-flex;flex:none;width:20px;height:20px;align-items:center;justify-content:center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect(() => {
      this.element.nativeElement.replaceChildren(
        createElement(icons[this.name()], {
          width: 20,
          height: 20,
          'stroke-width': 1.7,
          'aria-hidden': 'true',
        }),
      );
    });
  }
}
