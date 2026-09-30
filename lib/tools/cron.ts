// Cron 表达式工具（标准 5 字段：分 时 日 月 周）
// 纯函数，无 DOM 依赖，浏览器与 Node（测试）通用。

export interface CronParseResult {
  valid: boolean;
  error?: string;
  expanded?: number[][]; // [minutes[], hours[], daysOfMonth[], months[], daysOfWeek[]]
  description?: string;
}

const FIELD_RANGE: [number, number][] = [
  [0, 59], // 分
  [0, 23], // 时
  [1, 31], // 日
  [1, 12], // 月
  [0, 7],  // 周（0 或 7 均为周日）
];

function expandField(raw: string, idx: number): number[] | null {
  const [lo, hi] = FIELD_RANGE[idx];
  const nums: number[] = [];
  const addNum = (v: number) => { if (!nums.includes(v)) nums.push(v); };
  for (const part of raw.split(',')) {
    let range = part;
    let step = 1;
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
      range = stepMatch[1];
      step = parseInt(stepMatch[2], 10);
      if (!step || step <= 0) return null;
    }
    let start = lo;
    let end = hi;
    if (range === '*') {
      start = lo;
      end = hi;
    } else if (range.includes('-')) {
      const [a, b] = range.split('-');
      start = parseInt(a, 10);
      end = parseInt(b, 10);
      if (isNaN(start) || isNaN(end) || start < lo || end > hi || start > end) return null;
    } else {
      const v = parseInt(range, 10);
      if (isNaN(v) || v < lo || v > hi) return null;
      start = v;
      end = step > 1 ? hi : v;
    }
    for (let x = start; x <= end; x += step) addNum(x);
  }
  // 周日字段：cron 允许 7 表示周日，统一归并为 0
  if (idx === 4 && nums.includes(7)) {
    const filtered = nums.filter((v) => v !== 7);
    nums.length = 0;
    for (const v of filtered) addNum(v);
    addNum(0);
  }
  return nums.sort((a, b) => a - b);
}

export function parseCron(expr: string): CronParseResult {
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) {
    return { valid: false, error: 'Cron must have 5 fields: minute hour day-of-month month day-of-week' };
  }
  const expanded: number[][] = [];
  for (let i = 0; i < 5; i++) {
    const e = expandField(fields[i], i);
    if (!e || e.length === 0) {
      return { valid: false, error: 'Invalid field ' + (i + 1) + ': "' + fields[i] + '"' };
    }
    expanded.push(e);
  }
  return { valid: true, expanded, description: describeCron(fields, expanded) };
}

export function describeCron(fields: string[], expanded?: number[][]): string {
  if (fields.join(' ') === '* * * * *') return 'Every minute';
  if (fields[0] !== '*' && fields[1] === '*' && fields[2] === '*' && fields[3] === '*' && fields[4] === '*') {
    return 'Every hour at minute ' + fields[0];
  }
  if (expanded) {
    const fmt = (arr: number[], lo: number, hi: number) =>
      arr.length === hi - lo + 1 ? 'any' : arr.join(',');
    return [
      'minute ' + fmt(expanded[0], 0, 59),
      'hour ' + fmt(expanded[1], 0, 23),
      'day-of-month ' + fmt(expanded[2], 1, 31),
      'month ' + fmt(expanded[3], 1, 12),
      'day-of-week ' + fmt(expanded[4], 0, 6),
    ].join(', ');
  }
  return 'min=' + fields[0] + ' hr=' + fields[1] + ' dom=' + fields[2] + ' mon=' + fields[3] + ' dow=' + fields[4];
}

function cronDow(d: Date): number {
  return d.getDay(); // JS: 0=Sun..6=Sat，与 cron（0/7=Sun,1-6=Mon-Sat）对齐
}

/** 计算 cron 表达式在 from 之后的下一次（多次）触发时间。 */
export function nextRuns(expr: string, count = 5, from: Date = new Date()): Date[] {
  const p = parseCron(expr);
  if (!p.valid || !p.expanded) return [];
  const [mins, hours, doms, mons, dows] = p.expanded;
  const out: Date[] = [];
  const t = new Date(from.getTime());
  t.setSeconds(0, 0);
  t.setMinutes(t.getMinutes() + 1); // 从下一分钟开始
  for (let guard = 0; guard < 527040 && out.length < count; guard++) {
    const dayOk =
      // 标准 cron 语义：同日同时限定“日”与“周”时为“或”；否则须都满足
      (doms.length === 31 && dows.length === 7) ||
      doms.includes(t.getDate()) ||
      dows.includes(cronDow(t));
    if (mins.includes(t.getMinutes()) && hours.includes(t.getHours()) && mons.includes(t.getMonth() + 1) && dayOk) {
      out.push(new Date(t));
    }
    t.setMinutes(t.getMinutes() + 1);
  }
  return out;
}
