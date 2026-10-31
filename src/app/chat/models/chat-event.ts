import { z } from 'zod';
import { ChatEvent } from './chat.models';
import { SseFrame } from '../utils/sse';

export const productSchema = z.object({
  id: z.string().min(1).max(200),
  name: z.string().min(1).max(300),
  brand: z.string().max(100),
  price: z.number().int().nonnegative().max(100_000_000),
  image: z
    .string()
    .refine((value) => /^assets\/[\w./-]+$/.test(value) || /^https:\/\//.test(value)),
  description: z.string().max(2000),
  category: z.string().max(100),
  medication: z.boolean().optional(),
  dosage: z.string().max(100).optional(),
  requiresPrescription: z.boolean().optional(),
  stock: z.number().int().nonnegative().optional(),
  regulatoryKnown: z.boolean().optional(),
});

export const cartSchema = z.object({
  version: z.number().int().nonnegative(),
  lines: z
    .array(
      z.object({
        id: z.string().optional(),
        kitId: z.string().nullable().optional(),
        product: productSchema,
        quantity: z.number().int().min(1).max(99),
        prescriptionStatus: z.enum(['PENDENTE', 'APROVADA', 'REJEITADA']).nullable().optional(),
      }),
    )
    .max(100),
  subtotal: z.number().int().nonnegative(),
  checkoutAllowed: z.boolean(),
  blockers: z.array(z.string().max(500)).max(30),
});

export const checkoutSessionSchema = z.object({
  id: z.string().min(1),
  conversationId: z.string().min(1),
  ownerId: z.string().optional(),
  protocol: z.string(),
  status: z.string(),
  deliveryType: z.enum(['pickup', 'delivery']),
  cep: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  neighborhood: z.string().nullable().optional(),
  paymentMethod: z.string(),
  subtotal: z.number().int().nonnegative(),
  shippingFee: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  items: cartSchema.shape.lines,
  orderId: z.string().nullable().optional(),
});

const uiSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('product_list'),
    dados: z.object({
      products: z.array(productSchema).max(30),
      resolution: z
        .object({
          provider: z.enum(['laya', 'hybrid']),
          fallback: z.boolean(),
          confirmationRequired: z.boolean(),
        })
        .optional(),
    }),
  }),
  z.object({ tipo: z.literal('product_card'), dados: z.object({ product: productSchema }) }),
  z.object({
    tipo: z.literal('kit_card'),
    dados: z.object({
      kit: z.object({
        id: z.string(),
        name: z.string().max(300),
        description: z.string().max(2000),
        price: z.number().int().nonnegative(),
        products: z.array(productSchema).max(30),
      }),
    }),
  }),
  z.object({ tipo: z.literal('cart'), dados: z.object({ cart: cartSchema }) }),
  z.object({ tipo: z.literal('checkout'), dados: z.object({ session: checkoutSessionSchema }) }),
  z.object({
    tipo: z.literal('order_tracking'),
    dados: z.object({
      order: z.object({
        id: z.string(),
        status: z.string().max(200),
        simulated: z.boolean(),
        events: z
          .array(
            z.object({
              label: z.string().max(300),
              completed: z.boolean(),
              date: z.string().nullable().optional(),
            }),
          )
          .max(30),
      }),
    }),
  }),
  z.object({
    tipo: z.literal('prescription_upload'),
    dados: z.object({
      reason: z.string().max(1000),
      prescriptionId: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
]);

const schema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('session'), conversationId: z.string().min(1).max(200) }),
  z.object({ type: z.literal('delta'), text: z.string().max(100_000) }),
  z.object({ type: z.literal('tool-start'), id: z.string().min(1), label: z.string().max(200) }),
  z.object({
    type: z.literal('tool-end'),
    id: z.string().min(1),
    status: z.enum(['completed', 'failed']),
  }),
  z.object({ type: z.literal('products'), products: z.array(productSchema).max(30) }),
  z.object({ type: z.literal('suggestions'), suggestions: z.array(z.string().max(300)).max(5) }),
  z.object({ type: z.literal('done') }),
  z.object({ type: z.literal('error'), message: z.string().max(1000) }),
  z.object({ type: z.literal('cart_updated'), cart: cartSchema }),
  z.object({ type: z.literal('checkout_updated'), session: checkoutSessionSchema }),
]);

export const purchaseSchema = z.object({
  id: z.string().min(1).max(100),
  status: z.string().max(100),
  simulated: z.boolean(),
  total: z.number().int().nonnegative(),
  items: cartSchema.shape.lines,
  delivery: z.enum(['pickup', 'delivery']),
  payment: z.string().max(100),
  events: z
    .array(
      z.object({
        label: z.string().max(300),
        completed: z.boolean(),
        date: z.string().nullable().optional(),
      }),
    )
    .max(30),
});

export function parseChatEvent(frame: SseFrame): ChatEvent {
  try {
    const payload: unknown = JSON.parse(frame.data);
    const event =
      frame.event === 'message' ? payload : { ...(payload as object), type: frame.event };
    if (typeof event === 'object' && event !== null) {
      const fields = event as Record<string, unknown>;
      if (fields['type'] === 'token')
        return { type: 'delta', text: z.string().max(100_000).parse(fields['texto']) };
      if (fields['type'] === 'ui') {
        const component = fields['component'] ?? fields;
        if (
          typeof component === 'object' &&
          component !== null &&
          ![
            'product_list',
            'product_card',
            'kit_card',
            'cart',
            'checkout',
            'order_tracking',
            'prescription_upload',
          ].includes(String((component as Record<string, unknown>)['tipo']))
        )
          return { type: 'ignored' };
        return { type: 'ui', component: uiSchema.parse(component) };
      }
      if (fields['type'] === 'cart_updated')
        return {
          type: 'cart_updated',
          cart: cartSchema.parse(fields['cart'] ?? fields['carrinho']),
        };
      if (fields['type'] === 'checkout_updated')
        return {
          type: 'checkout_updated',
          session: checkoutSessionSchema.parse(fields['session']),
        };
    }
    return schema.parse(event);
  } catch {
    throw new Error('O atendimento recebeu uma resposta incompatível. Tente novamente.');
  }
}
