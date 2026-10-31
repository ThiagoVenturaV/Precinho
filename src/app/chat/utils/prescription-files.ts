import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { z } from 'zod';
import { CHAT_CONFIG } from '../models/chat.config';
import { PrescriptionAttachment, PrescriptionReceipt } from '../models/chat.models';

export const PRESCRIPTION_ACCEPT =
  '.pdf,.jpg,.jpeg,.png,.webp,.gif,.bmp,.tif,.tiff,.heic,.heif,.avif,application/pdf,image/*';
export const MAX_PRESCRIPTION_BYTES = 20 * 1024 * 1024;
export const prescriptionReceiptSchema = z.object({
  id: z.string().min(1).max(200),
  status: z.enum(['PENDENTE', 'APROVADA', 'REJEITADA']),
  reason: z.string().max(1000),
  simulated: z.boolean(),
});

export interface SelectedPrescription {
  id: string;
  file: File;
  mime: string;
  state: 'selected' | 'uploading' | 'uploaded' | 'error';
  receipt?: PrescriptionReceipt;
  error?: string;
}

export function prescriptionMime(bytes: Uint8Array): string | null {
  const begins = (...signature: number[]) =>
    signature.every((value, index) => bytes[index] === value);
  const ascii = (start: number, end: number) =>
    new TextDecoder('ascii').decode(bytes.slice(start, end));
  if (ascii(0, 5) === '%PDF-') return 'application/pdf';
  if (begins(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (begins(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return 'image/png';
  if (['GIF87a', 'GIF89a'].includes(ascii(0, 6))) return 'image/gif';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
  if (ascii(0, 2) === 'BM') return 'image/bmp';
  if (begins(0x49, 0x49, 0x2a, 0) || begins(0x4d, 0x4d, 0, 0x2a)) return 'image/tiff';
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12);
    if (['heic', 'heix', 'hevc', 'hevx'].includes(brand)) return 'image/heic';
    if (['mif1', 'msf1', 'heif'].includes(brand)) return 'image/heif';
    if (['avif', 'avis'].includes(brand)) return 'image/avif';
  }
  return null;
}

function prefix(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(new Error('Não foi possível ler esse arquivo.'));
    reader.readAsArrayBuffer(file.slice(0, 32));
  });
}

@Injectable()
export class PrescriptionFiles implements OnDestroy {
  private readonly config = inject(CHAT_CONFIG);
  private controller?: AbortController;
  private revision = 0;
  readonly accept = PRESCRIPTION_ACCEPT;
  readonly files = signal<SelectedPrescription[]>([]);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly consent = signal(false);
  readonly hasFiles = computed(() => this.files().length > 0);

  async select(files: File[]): Promise<void> {
    if (this.busy()) return;
    const revision = this.revision;
    this.error.set('');
    for (const file of files) {
      if (revision !== this.revision) return;
      if (this.files().length >= 3) {
        this.error.set('Anexe no máximo 3 arquivos por mensagem.');
        return;
      }
      if (!file.size || file.size > MAX_PRESCRIPTION_BYTES) {
        this.error.set('Cada receita deve ter conteúdo e no máximo 20 MB.');
        continue;
      }
      try {
        const mime = prescriptionMime(await prefix(file));
        if (revision !== this.revision) return;
        if (!mime) {
          this.error.set(
            'Formato não reconhecido. Use PDF ou uma imagem de receita, como JPG, PNG, HEIC ou TIFF.',
          );
          continue;
        }
        if (this.files().length >= 3) {
          this.error.set('Anexe no máximo 3 arquivos por mensagem.');
          return;
        }
        const mismatch =
          file.type &&
          file.type !== mime &&
          !(
            ['image/heic', 'image/heif'].includes(file.type) &&
            ['image/heic', 'image/heif'].includes(mime)
          );
        if (mismatch && file.type !== 'application/octet-stream') {
          this.error.set(
            'O conteúdo do arquivo não corresponde ao tipo informado. Escolha o documento original.',
          );
          continue;
        }
        if (
          this.files().some(
            (item) =>
              item.file.name === file.name &&
              item.file.size === file.size &&
              item.file.lastModified === file.lastModified,
          )
        )
          continue;
        this.files.update((items) => [
          ...items,
          { id: crypto.randomUUID(), file, mime, state: 'selected' },
        ]);
      } catch {
        this.error.set('Não foi possível ler esse arquivo. Escolha-o novamente.');
      }
    }
  }

  remove(id: string): void {
    if (!this.busy()) this.files.update((items) => items.filter((item) => item.id !== id));
  }

  async upload(conversationId: string | null): Promise<PrescriptionAttachment[]> {
    if (this.busy()) throw new Error('Aguarde o envio dos arquivos.');
    if (!this.consent()) throw new Error('Autorize o envio da receita antes de continuar.');
    const controller = new AbortController();
    this.controller = controller;
    this.busy.set(true);
    this.error.set('');
    try {
      const attachments: PrescriptionAttachment[] = [];
      for (const item of this.files()) {
        controller.signal.throwIfAborted();
        let receipt = item.receipt;
        if (!receipt) {
          this.change(item.id, { state: 'uploading', error: undefined });
          if (this.config.mode === 'demo') {
            receipt = {
              id: crypto.randomUUID(),
              status: 'PENDENTE',
              reason: 'Arquivo recebido apenas nesta demonstração. Nenhuma receita foi validada.',
              simulated: true,
            };
          } else {
            const headers = new Headers(await this.config.headers?.());
            headers.delete('Content-Type');
            headers.set('Accept', 'application/json');
            const form = new FormData();
            form.append('file', item.file, item.file.name);
            form.append('consent', 'true');
            if (conversationId) form.append('conversationId', conversationId);
            const response = await fetch(this.config.prescriptionEndpoint ?? '/api/prescriptions', {
              method: 'POST',
              headers,
              credentials: this.config.credentials ?? 'same-origin',
              body: form,
              signal: AbortSignal.any([controller.signal, AbortSignal.timeout(60_000)]),
            });
            if (!response.ok)
              throw new Error(
                response.status === 413
                  ? 'O servidor recusou o tamanho do arquivo.'
                  : 'Não foi possível enviar a receita. Verifique a sessão e tente novamente.',
              );
            receipt = prescriptionReceiptSchema.parse(await response.json());
          }
          controller.signal.throwIfAborted();
          this.change(item.id, { state: 'uploaded', receipt });
        }
        attachments.push({
          prescriptionId: receipt.id,
          name: item.file.name,
          mime: item.mime,
          size: item.file.size,
        });
      }
      return attachments;
    } catch (error) {
      if (!controller.signal.aborted) {
        const message =
          error instanceof Error && !(error instanceof z.ZodError) && error.name !== 'TypeError'
            ? error.message
            : 'Não foi possível enviar a receita. Tente novamente.';
        this.error.set(message);
        this.files.update((items) =>
          items.map((item) =>
            item.state === 'uploading' ? { ...item, state: 'error', error: message } : item,
          ),
        );
      }
      throw error;
    } finally {
      if (this.controller === controller) {
        this.controller = undefined;
        this.busy.set(false);
      }
    }
  }

  clear(): void {
    this.revision++;
    this.controller?.abort();
    this.controller = undefined;
    this.busy.set(false);
    this.files.set([]);
    this.error.set('');
    this.consent.set(false);
  }

  private change(id: string, change: Partial<SelectedPrescription>): void {
    this.files.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...change } : item)),
    );
  }

  ngOnDestroy(): void {
    this.clear();
  }
}
