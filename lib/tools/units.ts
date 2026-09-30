// 单位换算（纯前端，无依赖）

type Factor = number; // 到基准单位的系数；温度单独处理

export const UNIT_CATEGORIES: Record<string, { base: string; units: Record<string, Factor> }> = {
  length: {
    base: 'm',
    units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  },
  mass: {
    base: 'g',
    units: { mg: 0.001, g: 1, kg: 1000, t: 1e6, oz: 28.3495, lb: 453.592, st: 6350.29 },
  },
  data: {
    base: 'B',
    units: { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, PB: 1024 ** 5 },
  },
  time: {
    base: 's',
    units: { ms: 0.001, s: 1, min: 60, h: 3600, d: 86400, wk: 604800 },
  },
};

export const TEMPERATURE_UNITS = ['C', 'F', 'K'] as const;

export function convert(value: number, from: string, to: string, category: string): number {
  if (category === 'temperature') {
    // 归一到摄氏
    const toC = (v: number, u: string) => (u === 'C' ? v : u === 'F' ? ((v - 32) * 5) / 9 : v - 273.15);
    const fromC = (v: number, u: string) => (u === 'C' ? v : u === 'F' ? (v * 9) / 5 + 32 : v + 273.15);
    return fromC(toC(value, from), to);
  }
  const cat = UNIT_CATEGORIES[category];
  if (!cat) throw new Error('unknown category: ' + category);
  const f = cat.units[from];
  const t = cat.units[to];
  if (f === undefined || t === undefined) throw new Error('unknown unit');
  return (value * f) / t;
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return '∞';
  return String(Math.round(n * 1e6) / 1e6);
}
