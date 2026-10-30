import { InjectionToken } from '@angular/core';
import { sessionHeaders } from './api-session';
import { CartLine } from './chat.models';

export interface ChatConfig {
  mode: 'demo' | 'live';
  endpoint: string;
  prescriptionEndpoint?: string;
  cartEndpoint?: string;
  headers?: () => Record<string, string> | Promise<Record<string, string>>;
  credentials?: RequestCredentials;
  checkout?: (lines: readonly CartLine[]) => void | Promise<void>;
  pharmacistUrl?: string;
  mvpCheckout?: boolean;
}

export const CHAT_CONFIG = new InjectionToken<ChatConfig>('PM_CHAT_CONFIG', {
  factory: () => ({
    mode: 'live',
    endpoint: '/api/chat/stream',
    prescriptionEndpoint: '/api/prescriptions',
    cartEndpoint: '/api/cart',
    headers: sessionHeaders,
    credentials: 'same-origin',
    mvpCheckout: true,
  }),
});
