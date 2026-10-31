import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { sessionHeaders } from '../utils/api-session';
import { CHAT_CONFIG } from './chat.config';

describe('CHAT_CONFIG', () => {
  it('provides default configuration with sessionHeaders and live stream endpoint', () => {
    TestBed.configureTestingModule({});
    const config = TestBed.inject(CHAT_CONFIG);

    expect(config.mode).toBe('live');
    expect(config.endpoint).toBe('/api/chat/stream');
    expect(config.prescriptionEndpoint).toBe('/api/prescriptions');
    expect(config.cartEndpoint).toBe('/api/cart');
    expect(config.credentials).toBe('same-origin');
    expect(config.headers).toBe(sessionHeaders);
  });
});
