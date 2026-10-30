import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BrowserRecognition, SpeechDictation } from './speech-dictation';

class RecognitionMock implements BrowserRecognition {
  static latest: RecognitionMock;
  lang = '';
  continuous = false;
  interimResults = false;
  onstart: BrowserRecognition['onstart'] = null;
  onend: BrowserRecognition['onend'] = null;
  onerror: BrowserRecognition['onerror'] = null;
  onresult: BrowserRecognition['onresult'] = null;
  start = vi.fn(() => this.onstart?.());
  stop = vi.fn(() => this.onend?.());
  abort = vi.fn();
  constructor() {
    RecognitionMock.latest = this;
  }
}

function setup(prefixed = false): SpeechDictation {
  vi.stubGlobal('isSecureContext', true);
  vi.stubGlobal('SpeechRecognition', prefixed ? undefined : RecognitionMock);
  vi.stubGlobal('webkitSpeechRecognition', prefixed ? RecognitionMock : undefined);
  TestBed.configureTestingModule({ providers: [SpeechDictation] });
  return TestBed.inject(SpeechDictation);
}

afterEach(() => {
  TestBed.resetTestingModule();
  vi.unstubAllGlobals();
});

describe('SpeechDictation', () => {
  it('supports the prefixed API used by Chrome and Safari and updates interim text', () => {
    const voice = setup(true);
    const receive = vi.fn();
    voice.start(receive);
    expect(voice.available).toBe(true);
    expect(voice.state()).toBe('listening');
    expect(RecognitionMock.latest.lang).toBe('pt-BR');
    RecognitionMock.latest.onresult?.({
      results: [{ isFinal: false, 0: { transcript: 'quero um kit' } }],
    });
    expect(receive).toHaveBeenLastCalledWith('quero um kit');
    voice.stop();
    expect(voice.active()).toBe(false);
  });

  it('does not start a second session and ignores results after cancellation', () => {
    const voice = setup();
    const receive = vi.fn();
    voice.start(receive);
    const previous = RecognitionMock.latest;
    const late = previous.onresult;
    voice.start(receive);
    expect(previous.start).toHaveBeenCalledTimes(1);
    voice.abort();
    late?.({ results: [{ isFinal: true, 0: { transcript: 'atrasado' } }] });
    expect(receive).not.toHaveBeenCalled();
    expect(previous.abort).toHaveBeenCalled();
  });

  it('explains denied permission without sending any message', () => {
    const voice = setup();
    voice.start(vi.fn());
    RecognitionMock.latest.onerror?.({ error: 'not-allowed' });
    expect(voice.error()).toContain('negado');
    RecognitionMock.latest.onend?.();
    expect(voice.active()).toBe(false);
  });

  it('provides an explicit fallback when the API is absent', () => {
    const voice = setup();
    vi.stubGlobal('SpeechRecognition', undefined);
    voice.start(vi.fn());
    expect(voice.error()).toContain('continuar escrevendo');
  });

  it('reconnects hands-free mode after silence and disables on fatal permission errors', () => {
    vi.useFakeTimers();
    try {
      const voice = setup();
      const onSend = vi.fn();
      voice.enableHandsFree(onSend);
      expect(voice.handsFree()).toBe(true);
      expect(voice.active()).toBe(true);

      // Simulate no-speech timeout from browser
      RecognitionMock.latest.onerror?.({ error: 'no-speech' });
      RecognitionMock.latest.onend?.();
      expect(voice.error()).toBe('');

      vi.advanceTimersByTime(400);
      expect(voice.active()).toBe(true);

      // Simulate fatal permission denial
      RecognitionMock.latest.onerror?.({ error: 'not-allowed' });
      expect(voice.handsFree()).toBe(false);
      expect(voice.error()).toContain('negado');
    } finally {
      vi.useRealTimers();
    }
  });
});
