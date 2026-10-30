import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { Marked } from 'marked';

const markdown = new Marked({
  breaks: true,
  renderer: {
    html: () => '',
    link({ href, title, text }) {
      const cleanHref =
        href.startsWith('http://') || href.startsWith('https://') || href.startsWith('/')
          ? href
          : '#';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${cleanHref}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
  },
});

@Component({
  selector: 'pm-chat-markdown',
  template: '<div [innerHTML]="html()"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: `
    pm-chat-markdown {
      display: block;
    }
    pm-chat-markdown p {
      margin: 0 0 12px;
    }
    pm-chat-markdown p:last-child {
      margin-bottom: 0;
    }
    pm-chat-markdown a {
      color: #0000be;
      text-decoration: underline;
      overflow-wrap: anywhere;
    }
    pm-chat-markdown ul,
    pm-chat-markdown ol {
      padding-left: 24px;
    }
    pm-chat-markdown pre {
      white-space: pre-wrap;
      background: #f5f6fa;
      border-radius: 6px;
      padding: 12px;
      overflow: auto;
    }
    pm-chat-markdown table {
      display: block;
      max-width: 100%;
      overflow: auto;
      border-collapse: collapse;
    }
    pm-chat-markdown th,
    pm-chat-markdown td {
      padding: 8px;
      border: 1px solid #e2e5ef;
    }
  `,
})
export class ChatMarkdown {
  readonly text = input.required<string>();
  protected readonly html = computed(() => markdown.parse(this.text(), { async: false }));
}
