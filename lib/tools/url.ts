// URL 编解码 + 查询参数工具
// 纯函数，无 DOM 依赖，浏览器与 Node（测试）通用。

export function encodeUrl(str: string): string {
  return encodeURIComponent(str);
}

export function decodeUrl(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return str; // 非法转义原样返回，不抛错
  }
}

export function encodeComponent(str: string): string {
  return encodeURIComponent(str);
}

export function decodeComponent(str: string): string {
  return decodeUrl(str);
}

/** 解析查询字符串 -> 对象。容错处理无值键与非法转义。 */
export function parseQuery(qs: string): Record<string, string> {
  const out: Record<string, string> = {};
  const clean = qs.replace(/^[?#&]+/, '');
  if (!clean) return out;
  for (const pair of clean.split('&')) {
    if (!pair) continue;
    const idx = pair.indexOf('=');
    const k = idx === -1 ? pair : pair.slice(0, idx);
    const v = idx === -1 ? '' : pair.slice(idx + 1);
    try {
      out[decodeURIComponent(k)] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

/** 对象 -> 查询字符串。 */
export function buildQuery(params: Record<string, string>): string {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

/** 规整 URL：去首尾空格，缺协议时补 https://。 */
export function normalizeUrl(url: string): string {
  let u = url.trim();
  if (!u) return u;
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u;
}
