import { describe, expect, it } from 'vitest';
import { SseParser } from './sse';

describe('SseParser', () => {
  it('preserves frames split across chunks and CRLF boundaries', () => {
    const parser = new SseParser();
    expect(parser.push('event: delta\r')).toEqual([]);
    expect(parser.push('\ndata: {"text":"Olá"}\r\n\r')).toEqual([]);
    expect(parser.push('\n')).toEqual([{ event: 'delta', data: '{"text":"Olá"}' }]);
  });

  it('handles comments, multiline data and multiple frames', () => {
    const parser = new SseParser();
    expect(
      parser.push(': heartbeat\ndata: first\ndata: second\n\nevent: done\ndata: {}\n\n'),
    ).toEqual([
      { event: 'message', data: 'first\nsecond' },
      { event: 'done', data: '{}' },
    ]);
  });

  it('does not dispatch an incomplete frame', () => {
    expect(new SseParser().push('data: unfinished')).toEqual([]);
  });
});
