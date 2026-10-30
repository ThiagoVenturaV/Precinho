export interface SseFrame {
  event: string;
  data: string;
}

export class SseParser {
  private buffer = '';
  private event = 'message';
  private data: string[] = [];

  push(chunk: string): SseFrame[] {
    this.buffer += chunk;
    const frames: SseFrame[] = [];
    while (true) {
      const match = /[\r\n]/.exec(this.buffer);
      if (!match) break;
      const position = match.index;
      if (this.buffer[position] === '\r' && position === this.buffer.length - 1) break;
      const line = this.buffer.slice(0, position);
      const width = this.buffer.slice(position, position + 2) === '\r\n' ? 2 : 1;
      this.buffer = this.buffer.slice(position + width);
      if (line === '') {
        if (this.data.length) frames.push({ event: this.event, data: this.data.join('\n') });
        this.event = 'message';
        this.data = [];
      } else if (!line.startsWith(':')) {
        const colon = line.indexOf(':');
        const field = colon < 0 ? line : line.slice(0, colon);
        const raw = colon < 0 ? '' : line.slice(colon + 1);
        const value = raw.startsWith(' ') ? raw.slice(1) : raw;
        if (field === 'event') this.event = value;
        if (field === 'data') this.data.push(value);
      }
    }
    return frames;
  }
}
