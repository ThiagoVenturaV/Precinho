import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';

interface RecognitionResult {
  readonly isFinal: boolean;
  readonly 0: { transcript: string };
}

export interface BrowserRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: { results: ArrayLike<RecognitionResult> }) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserRecognition;
  webkitSpeechRecognition?: new () => BrowserRecognition;
};

const FATAL_SPEECH_ERRORS = new Set([
  'not-allowed',
  'service-not-allowed',
  'audio-capture',
  'language-not-supported',
]);

@Injectable()
export class SpeechDictation implements OnDestroy {
  private readonly window = inject(DOCUMENT).defaultView as SpeechWindow | null;
  private recognition?: BrowserRecognition;
  private currentUtterance?: SpeechSynthesisUtterance;
  private currentSpokenText = '';
  private speakStartedAt = 0;
  private silenceTimer?: ReturnType<typeof setTimeout>;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private bargeInTimer?: ReturnType<typeof setTimeout>;
  private handsFreeActive = false;
  private handsFreeCallback?: (text: string) => void;
  private lastTranscribed = '';
  private fatalError = false;

  readonly available = !!(this.window?.SpeechRecognition ?? this.window?.webkitSpeechRecognition);
  readonly ttsAvailable = !!this.window?.speechSynthesis;
  readonly state = signal<'idle' | 'starting' | 'listening' | 'stopping'>('idle');
  readonly active = computed(() => this.state() !== 'idle');
  readonly handsFree = signal(false);
  readonly speaking = signal(false);
  readonly error = signal('');

  start(onText: (text: string) => void, onFinal?: (text: string) => void): void {
    if (this.active()) return;
    clearTimeout(this.reconnectTimer);
    this.error.set('');
    this.lastTranscribed = '';
    this.fatalError = false;
    const Recognition = this.window?.SpeechRecognition ?? this.window?.webkitSpeechRecognition;
    if (!Recognition) {
      this.error.set(
        'O ditado não está disponível neste navegador. Você pode continuar escrevendo.',
      );
      if (this.handsFreeActive) this.disableHandsFree();
      return;
    }
    if (!this.window?.isSecureContext) {
      this.error.set('O microfone precisa de uma conexão HTTPS ou localhost.');
      if (this.handsFreeActive) this.disableHandsFree();
      return;
    }
    const recognition = new Recognition();
    this.recognition = recognition;
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      if (this.recognition === recognition) this.state.set('listening');
    };

    recognition.onresult = (event) => {
      if (this.recognition !== recognition) return;
      const rawText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();
      const text = this.cleanVoiceTranscript(rawText);
      if (text) {
        if (this.speaking()) {
          if (this.isLikelySpeakerEcho(text)) {
            return;
          }
          this.stopSpeaking();
        }
        this.lastTranscribed = text;
        onText(text);

        clearTimeout(this.silenceTimer);
        const hasFinal = Array.from(event.results).some((r) => r.isFinal);
        if (hasFinal && onFinal) {
          this.silenceTimer = setTimeout(() => {
            if (this.lastTranscribed) {
              const sending = this.lastTranscribed;
              this.lastTranscribed = '';
              this.stop();
              onFinal(sending);
            }
          }, 1100);
        }
      }
    };

    recognition.onerror = ({ error }) => {
      if (this.recognition !== recognition || error === 'aborted') return;
      if (FATAL_SPEECH_ERRORS.has(error)) {
        this.fatalError = true;
        if (this.handsFreeActive) this.disableHandsFree();
      }
      if (error === 'no-speech' && this.handsFreeActive) {
        return;
      }
      const messages: Record<string, string> = {
        'not-allowed': 'Acesso ao microfone negado. Verifique a permissão do site no navegador.',
        'service-not-allowed': 'O reconhecimento de voz está bloqueado neste navegador.',
        'audio-capture': 'Nenhum microfone disponível. Verifique a conexão do dispositivo.',
        'no-speech': 'Não ouvimos sua voz. Toque no microfone para tentar novamente.',
        network: 'O serviço de voz não respondeu. Verifique a conexão e tente novamente.',
        'language-not-supported':
          'O serviço de voz deste navegador não oferece suporte a português.',
      };
      this.error.set(messages[error] ?? 'Não foi possível reconhecer a voz. Tente novamente.');
    };

    recognition.onend = () => {
      if (this.recognition !== recognition) return;
      this.recognition = undefined;
      this.state.set('idle');

      if (this.lastTranscribed && onFinal) {
        const text = this.lastTranscribed;
        this.lastTranscribed = '';
        onFinal(text);
        return;
      }

      if (this.handsFreeActive && !this.fatalError) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.listenHandsFree(), 300);
      }
    };

    this.state.set('starting');
    try {
      recognition.start();
    } catch {
      this.abort();
      this.error.set('Não foi possível iniciar o microfone. Tente novamente.');
    }
  }

  toggleHandsFree(onSend: (text: string) => void): boolean {
    if (this.handsFree()) {
      this.disableHandsFree();
      return false;
    } else {
      this.enableHandsFree(onSend);
      return true;
    }
  }

  enableHandsFree(onSend: (text: string) => void): void {
    this.handsFreeActive = true;
    this.handsFreeCallback = onSend;
    this.handsFree.set(true);
    this.listenHandsFree();
  }

  disableHandsFree(): void {
    clearTimeout(this.reconnectTimer);
    clearTimeout(this.bargeInTimer);
    this.handsFreeActive = false;
    this.handsFreeCallback = undefined;
    this.handsFree.set(false);
    this.stopSpeaking();
    this.abort();
  }

  listenHandsFree(): void {
    if (!this.handsFreeActive || !this.handsFreeCallback || this.active()) return;
    this.start(
      () => {},
      (text) => {
        if (text && this.handsFreeActive && this.handsFreeCallback) {
          this.handsFreeCallback(text);
        }
      },
    );
  }

  speak(text: string, onEnd?: () => void): void {
    if (!this.window?.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      onEnd?.();
      if (this.handsFreeActive) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.listenHandsFree(), 250);
      }
      return;
    }
    this.stopSpeaking();

    // Clean markdown syntax and emojis for natural speech
    const clean = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_#`~>•]/g, ' ')
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
      .replace(/R\$\s*(\d+)[,.](\d{2})/g, '$1 reais e $2 centavos')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) {
      onEnd?.();
      if (this.handsFreeActive) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.listenHandsFree(), 250);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    this.currentUtterance = utterance;
    this.currentSpokenText = this.normalizeForComparison(clean);
    this.speakStartedAt = Date.now();
    utterance.lang = 'pt-BR';
    utterance.rate = 1.08;

    const voices = this.window.speechSynthesis.getVoices?.() ?? [];
    const ptVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith('pt-br')) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    const scheduleBargeInListening = () => {
      if (!this.handsFreeActive) return;
      clearTimeout(this.bargeInTimer);
      this.bargeInTimer = setTimeout(() => {
        if (this.handsFreeActive) {
          this.listenHandsFree();
        }
      }, 350);
    };

    utterance.onstart = () => {
      if (this.currentUtterance !== utterance) return;
      this.speakStartedAt = Date.now();
      this.speaking.set(true);
      scheduleBargeInListening();
    };

    const finish = () => {
      if (this.currentUtterance !== utterance) return;
      clearTimeout(this.bargeInTimer);
      this.currentUtterance = undefined;
      this.currentSpokenText = '';
      this.speaking.set(false);
      onEnd?.();
      if (this.handsFreeActive) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.listenHandsFree(), 250);
      }
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    this.speaking.set(true);
    try {
      this.window.speechSynthesis.resume?.();
      this.window.speechSynthesis.speak(utterance);
      scheduleBargeInListening();
    } catch {
      finish();
    }
  }

  stopSpeaking(): void {
    clearTimeout(this.bargeInTimer);
    if (this.currentUtterance) {
      this.currentUtterance.onstart = null;
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance = undefined;
    }
    this.currentSpokenText = '';
    if (
      this.window?.speechSynthesis &&
      (this.window.speechSynthesis.speaking || this.window.speechSynthesis.pending)
    ) {
      try {
        this.window.speechSynthesis.cancel();
      } catch {
        // Ignore browser cancel errors
      }
    }
    this.speaking.set(false);
  }

  private cleanVoiceTranscript(raw: string): string {
    return raw
      .replace(/\b(pagar\s+(?:no|com|via)?\s*)(?:picos|pics|piks|pique|piki|pick|fix)\b/gi, '$1pix')
      .replace(/\b(pagamento\s+(?:no|com|via)?\s*)(?:picos|pics|piks|pique|piki|pick|fix)\b/gi, '$1pix')
      .replace(/\b(via|no|com)\s+(?:picos|pics|piks|pique|piki|pick)\b/gi, '$1 pix');
  }

  private normalizeForComparison(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private isLikelySpeakerEcho(transcript: string): boolean {
    const norm = this.normalizeForComparison(transcript);
    if (!norm) return true;
    const words = norm.split(' ').filter(Boolean);
    const hasBargeInCommand =
      /\b(para|parar|silencio|espera|adicion\w*|coloc\w*|coloqu\w*|inclu\w*|quero|preciso|procuro|busque|nao|sim|ok|fechar|finalizar|comprar|carrinho)\b/.test(
        norm,
      );
    if (hasBargeInCommand && !(words.length >= 3 && this.currentSpokenText.includes(norm))) {
      return false;
    }
    if (this.currentSpokenText && words.length >= 2 && this.currentSpokenText.includes(norm)) {
      return true;
    }
    if (
      Date.now() - this.speakStartedAt < 500 &&
      words.length === 1 &&
      this.currentSpokenText.includes(norm)
    ) {
      return true;
    }
    return false;
  }

  stop(): void {
    clearTimeout(this.silenceTimer);
    clearTimeout(this.reconnectTimer);
    if (!this.recognition || this.state() === 'stopping') return;
    this.state.set('stopping');
    try {
      this.recognition.stop();
    } catch {
      this.abort();
    }
  }

  abort(): void {
    clearTimeout(this.silenceTimer);
    clearTimeout(this.reconnectTimer);
    const recognition = this.recognition;
    this.recognition = undefined;
    this.state.set('idle');
    if (!recognition) return;
    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    try {
      recognition.abort();
    } catch {
      return;
    }
  }

  ngOnDestroy(): void {
    this.disableHandsFree();
    this.stopSpeaking();
    this.abort();
  }
}
