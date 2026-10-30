export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
  medication?: boolean;
  dosage?: string;
  requiresPrescription?: boolean;
  stock?: number;
  regulatoryKnown?: boolean;
}

export interface ToolActivity {
  id: string;
  label: string;
  status: 'running' | 'completed' | 'failed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status: 'streaming' | 'complete' | 'interrupted' | 'error';
  products: Product[];
  tools: ToolActivity[];
  suggestions: string[];
  attachments?: PrescriptionAttachment[];
  components?: UiComponent[];
}

export type ChatEvent =
  | { type: 'session'; conversationId: string }
  | { type: 'delta'; text: string }
  | { type: 'tool-start'; id: string; label: string }
  | { type: 'tool-end'; id: string; status: 'completed' | 'failed' }
  | { type: 'products'; products: Product[] }
  | { type: 'suggestions'; suggestions: string[] }
  | { type: 'ui'; component: UiComponent }
  | { type: 'cart_updated'; cart: CartSnapshot }
  | { type: 'checkout_updated'; session: CheckoutSessionData }
  | { type: 'ignored' }
  | { type: 'done' }
  | { type: 'error'; message: string };

export interface CheckoutSessionData {
  id: string;
  conversationId: string;
  ownerId?: string;
  protocol: string;
  status: 'OPEN' | 'READY' | 'COMPLETED' | 'CANCELED' | string;
  deliveryType: 'pickup' | 'delivery';
  cep?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  neighborhood?: string | null;
  paymentMethod: 'pix' | 'card' | 'pickup' | string;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: CartLine[];
  orderId?: string | null;
}

export interface ChatRequest {
  requestId: string;
  conversationId: string | null;
  message: string;
  attachments?: PrescriptionAttachment[];
  context: {
    allergies: string;
    postalCode: string;
    cart: { productId: string; quantity: number }[];
  };
}

export interface CartLine {
  id?: string;
  kitId?: string | null;
  product: Product;
  quantity: number;
  prescriptionStatus?: 'PENDENTE' | 'APROVADA' | 'REJEITADA' | null;
}

export interface CartSnapshot {
  version: number;
  lines: CartLine[];
  subtotal: number;
  checkoutAllowed: boolean;
  blockers: string[];
}

export interface CatalogKit {
  id: string;
  name: string;
  description: string;
  price: number;
  products: Product[];
}

export interface OrderTracking {
  id: string;
  status: string;
  simulated: boolean;
  events: { label: string; completed: boolean; date?: string | null }[];
}

export interface Purchase extends OrderTracking {
  total: number;
  items: CartLine[];
  delivery: 'pickup' | 'delivery';
  payment: string;
}

export type UiComponent =
  | {
      tipo: 'product_list';
      dados: {
        products: Product[];
        resolution?: {
          provider: 'laya' | 'hybrid';
          fallback: boolean;
          confirmationRequired: boolean;
        };
      };
    }
  | { tipo: 'product_card'; dados: { product: Product } }
  | { tipo: 'kit_card'; dados: { kit: CatalogKit } }
  | { tipo: 'cart'; dados: { cart: CartSnapshot } }
  | { tipo: 'checkout'; dados: { session: CheckoutSessionData } }
  | { tipo: 'order_tracking'; dados: { order: OrderTracking } }
  | { tipo: 'prescription_upload'; dados: { reason: string; prescriptionId?: string; status?: string } };

export interface PrescriptionAttachment {
  prescriptionId: string;
  name: string;
  mime: string;
  size: number;
}

export interface PrescriptionReceipt {
  id: string;
  status: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  reason: string;
  simulated: boolean;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  description: string;
}
