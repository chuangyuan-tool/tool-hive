// 时间戳转换（Unix 秒 / 毫秒 <-> ISO / 本地 / UTC）
// 纯函数，无 DOM 依赖，浏览器与 Node（测试）通用。

/** 10 位按秒、13 位按毫秒自动识别，统一转为毫秒。 */
export function unixToMs(unix: number): number {
  return unix >= 1e12 ? unix : unix * 1000;
}

/** Unix（秒或毫秒）-> UTC ISO 字符串。 */
export function unixToIso(unix: number): string {
  return new Date(unixToMs(unix)).toISOString();
}

/** 日期（Date / 时间戳 / 可解析字符串）-> Unix 秒。 */
export function dateToUnix(input: string | number | Date): number {
  let ms: number;
  if (input instanceof Date) ms = input.getTime();
  else if (typeof input === 'number') ms = input >= 1e12 ? input : input * 1000;
  else ms = new Date(input).getTime();
  return Math.floor(ms / 1000);
}

/** 当前 Unix 秒。 */
export function nowUnixSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export interface UnixParts {
  seconds: number;
  milliseconds: number;
  iso: string;
  utc: string;
  weekday: string;
}

/** 拆出一个时间戳的全部表示。 */
export function unixParts(unix: number): UnixParts {
  const ms = unixToMs(unix);
  const d = new Date(ms);
  return {
    seconds: Math.floor(ms / 1000),
    milliseconds: ms,
    iso: d.toISOString(),
    utc: d.toUTCString(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }),
  };
}

/** 闰年判断。 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** 两个时间戳相差的天数（b - a）。 */
export function daysBetween(a: number, b: number): number {
  return Math.round((unixToMs(b) - unixToMs(a)) / 86400000);
}

/** 格式化时间戳为可读字符串，可选指定时区。 */
export function formatUnix(unix: number, opts?: { tz?: string }): string {
  const ms = unixToMs(unix);
  if (opts?.tz) {
    try {
      return new Date(ms).toLocaleString('en-US', { timeZone: opts.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch {
      /* 非法时区回退 */
    }
  }
  return new Date(ms).toISOString();
}
