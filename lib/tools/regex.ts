// 正则测试工具
// 纯函数，无 DOM 依赖，浏览器与 Node（测试）通用。

export interface RegexTestResult {
  valid: boolean;
  error?: string;
  match: boolean;
  matched?: string;
  index?: number;
}

export interface RegexMatchInfo {
  index: number;
  matched: string;
  groups: (string | undefined)[];
}

export function testRegex(pattern: string, flags: string, text: string): RegexTestResult {
  let re: RegExp;
  try {
    re = new RegExp(pattern, flags);
  } catch (e) {
    return { valid: false, error: (e as Error).message, match: false };
  }
  const m = re.exec(text); // 带 g 时用 exec 才能拿到 index（match 带 g 只返回命中串数组）
  if (!m) return { valid: true, match: false };
  return { valid: true, match: true, matched: m[0], index: m.index };
}

export function findMatches(pattern: string, flags: string, text: string, limit = 100): RegexMatchInfo[] {
  let re: RegExp;
  try {
    re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
  } catch {
    return [];
  }
  const out: RegexMatchInfo[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null && out.length < limit) {
    out.push({ index: m.index, matched: m[0], groups: m.slice(1) });
    if (m[0].length === 0) re.lastIndex++; // 防止零宽匹配死循环
  }
  return out;
}

export function replaceWithPattern(pattern: string, flags: string, text: string, replacement: string): string {
  let re: RegExp;
  try {
    re = new RegExp(pattern, flags);
  } catch {
    return text;
  }
  return text.replace(re, replacement);
}

export function explainFlags(flags: string): { flag: string; label: string }[] {
  const map: Record<string, string> = {
    g: 'Global — find all matches, not just the first',
    i: 'Case-insensitive matching',
    m: 'Multiline — ^ and $ match line starts/ends',
    s: 'DotAll — . also matches newline characters',
    u: 'Unicode — treat pattern as UTF-16 code points',
    y: 'Sticky — match only from lastIndex onward',
    d: 'Capture indices for capturing groups',
  };
  const out: { flag: string; label: string }[] = [];
  for (const f of flags) {
    if (map[f]) out.push({ flag: f, label: map[f] });
  }
  return out;
}
