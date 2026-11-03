import { InjectionToken } from '@angular/core';
import { sessionHeaders } from '../utils/api-session';
import { CartLine } from './chat.models';
import { environment } from '../../../environments/environment';

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
  factory: () => {
    const base = environment.apiUrl.replace(/\/$/, '');
    return {
      mode: 'live',
      endpoint: `${base}/chat/stream`,
      prescriptionEndpoint: `${base}/prescriptions`,
      cartEndpoint: `${base}/cart`,
      headers: sessionHeaders,
      credentials: 'same-origin',
      mvpCheckout: true,
    };
  },
});
