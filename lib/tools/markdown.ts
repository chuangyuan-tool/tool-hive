import { marked } from 'marked';

export function markdownToHtml(md: string): string {
  return String(marked.parse(md));
}
