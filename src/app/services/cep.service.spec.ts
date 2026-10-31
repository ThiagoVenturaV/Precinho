import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAddressByCep, formatCep } from './cep.service';

describe('cep.service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('formatCep', () => {
    it('formats 8 digits into XXXXX-XXX format', () => {
      expect(formatCep('60175055')).toBe('60175-055');
    });

    it('cleans non-digits before formatting', () => {
      expect(formatCep('60.175-055')).toBe('60175-055');
      expect(formatCep('abc60175def055')).toBe('60175-055');
    });

    it('returns raw partial digits when length <= 5', () => {
      expect(formatCep('6017')).toBe('6017');
      expect(formatCep('60175')).toBe('60175');
    });

    it('handles empty or null string gracefully', () => {
      expect(formatCep('')).toBe('');
      expect(formatCep(null as unknown as string)).toBe('');
    });
  });

  describe('fetchAddressByCep', () => {
    it('returns null if CEP does not have 8 digits', async () => {
      const result = await fetchAddressByCep('1234');
      expect(result).toBeNull();
    });

    it('returns address data when ViaCEP returns valid response', async () => {
      const mockData = {
        cep: '60175-055',
        logradouro: 'Avenida Santos Dumont',
        complemento: '',
        bairro: 'Aldeota',
        localidade: 'Fortaleza',
        uf: 'CE',
      };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => mockData,
        }),
      );

      const result = await fetchAddressByCep('60175-055');
      expect(result).toEqual(mockData);
    });

    it('returns null when ViaCEP returns erro: "true" string or boolean', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ erro: 'true' }),
        }),
      );

      const result = await fetchAddressByCep('00000-000');
      expect(result).toBeNull();
    });

    it('returns null on fetch network failure or abort', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network error')),
      );

      const result = await fetchAddressByCep('60175-055');
      expect(result).toBeNull();
    });
  });
});
