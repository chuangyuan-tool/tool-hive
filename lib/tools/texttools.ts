// 文本工具（纯前端，无依赖）

export function dedupeLines(text: string): string {
  const seen = new Set<string>();
  return text
    .split(/\r?\n/)
    .filter((l) => {
      const k = l.trim();
      if (k === '' || seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .join('\n');
}

export function removeEmptyLines(text: string): string {
  return text.split(/\r?\n/).filter((l) => l.trim() !== '').join('\n');
}

export function normalizeSpaces(text: string): string {
  return text.replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').trim();
}

export interface TextStats {
  chars: number;
  charsNoSpace: number;
  words: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  uniqueWords: number;
}

export function textStats(text: string): TextStats {
  const lines = text.split(/\r?\n/);
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const sentences = (text.match(/[.!?…]+(?=\s|$)/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  return {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: words.length,
    lines: lines.length,
    sentences,
    paragraphs,
    uniqueWords: new Set(words.map((w) => w.toLowerCase())).size,
  };
}
