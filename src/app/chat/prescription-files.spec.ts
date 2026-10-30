import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CHAT_CONFIG } from './chat.config';
import { PrescriptionFiles, prescriptionMime } from './prescription-files';

afterEach(() => {
  TestBed.resetTestingModule();
  vi.unstubAllGlobals();
});

describe('PrescriptionFiles', () => {
  it('detects PDF and images by signature, not filename', () => {
    expect(prescriptionMime(new TextEncoder().encode('%PDF-1.7'))).toBe('application/pdf');
    expect(prescriptionMime(new Uint8Array([0xff, 0xd8, 0xff]))).toBe('image/jpeg');
    expect(prescriptionMime(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 13, 10, 26, 10]))).toBe(
      'image/png',
    );
    expect(prescriptionMime(new TextEncoder().encode('0000ftypheic'))).toBe('image/heic');
    expect(prescriptionMime(new TextEncoder().encode('MZ executable'))).toBeNull();
  });

  it('requires consent, uploads multipart and trusts only a validated server receipt', async () => {
    TestBed.configureTestingModule({
      providers: [
        PrescriptionFiles,
        { provide: CHAT_CONFIG, useValue: { mode: 'live', endpoint: '/api/chat/stream' } },
      ],
    });
    const service = TestBed.inject(PrescriptionFiles);
    await service.select([new File(['%PDF-1.7'], 'receita.pdf', { type: 'application/pdf' })]);
    expect(service.files()).toHaveLength(1);
    await expect(service.upload(null)).rejects.toThrow('Autorize');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 'prescription-1',
          status: 'PENDENTE',
          reason: 'Aguardando',
          simulated: false,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    service.consent.set(true);
    expect(await service.upload('conversation-1')).toMatchObject([
      { prescriptionId: 'prescription-1', mime: 'application/pdf' },
    ]);
    const options = fetchMock.mock.calls[0][1];
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.headers.has('Content-Type')).toBe(false);
    expect(options.body.get('consent')).toBe('true');
    expect(service.files()[0].receipt?.status).toBe('PENDENTE');
  });

  it('rejects disguised executables and empty files', async () => {
    TestBed.configureTestingModule({ providers: [PrescriptionFiles] });
    const service = TestBed.inject(PrescriptionFiles);
    await service.select([new File(['MZ not an image'], 'receita.jpg', { type: 'image/jpeg' })]);
    expect(service.files()).toHaveLength(0);
    expect(service.error()).toContain('Formato');
    await service.select([new File([], 'receita.pdf', { type: 'application/pdf' })]);
    expect(service.files()).toHaveLength(0);
  });
});
