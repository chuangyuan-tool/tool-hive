// Hash 计算器（MD5 / SHA-1 / SHA-256）
// 纯 JS 同步实现，无 DOM 依赖，浏览器与 Node（测试）通用。
// K/H 表按数学定义运行时生成，避免手抄常量出错。
// 注意字节序：MD5 全小端；SHA-1 / SHA-256 全大端（长度字段、消息字、输出）。

function primesUpTo(n: number): number[] {
  const out: number[] = [];
  for (let c = 2; out.length < n; c++) {
    let prime = true;
    for (let p = 2; p * p <= c; p++) {
      if (c % p === 0) { prime = false; break; }
    }
    if (prime) out.push(c);
  }
  return out;
}

const SHA256_K: number[] = (() => {
  const primes = primesUpTo(64);
  const k: number[] = [];
  for (let i = 0; i < 64; i++) {
    const x = Math.cbrt(primes[i]);
    k.push(Math.floor((x - Math.floor(x)) * 4294967296) >>> 0);
  }
  return k;
})();

const SHA256_H: number[] = (() => {
  const primes = primesUpTo(8);
  const h: number[] = [];
  for (let i = 0; i < 8; i++) {
    const x = Math.sqrt(primes[i]);
    h.push(Math.floor((x - Math.floor(x)) * 4294967296) >>> 0);
  }
  return h;
})();

const MD5_K: number[] = (() => {
  const k: number[] = [];
  for (let i = 0; i < 64; i++) k.push(Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0);
  return k;
})();

const MD5_S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

function rotl(x: number, c: number): number {
  return (x << c) | (x >>> (32 - c));
}
function rotr(x: number, c: number): number {
  return (x >>> c) | (x << (32 - c));
}

function padLenFor(len: number): number {
  return (len % 64 < 56) ? (56 - len % 64) : (120 - len % 64);
}

export function md5(input: string): string {
  const msg = new TextEncoder().encode(input);
  const bitLen = msg.length * 8;
  const padLen = padLenFor(msg.length);
  const total = msg.length + padLen + 8;
  const data = new Uint8Array(total);
  data.set(msg, 0);
  data[msg.length] = 0x80;
  const tail = msg.length + padLen;
  const dv = new DataView(data.buffer);
  dv.setUint32(tail, bitLen >>> 0, true); // 低 32 位（小端）
  dv.setUint32(tail + 4, Math.floor(bitLen / 4294967296), true); // 高 32 位（小端）

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
  for (let i = 0; i < total; i += 64) {
    const m: number[] = [];
    for (let j = 0; j < 16; j++) m[j] = dv.getUint32(i + j * 4, true); // 小端
    let A = a0, B = b0, C = c0, D = d0;
    for (let t = 0; t < 64; t++) {
      let f: number, g: number;
      if (t < 16) { f = (B & C) | (~B & D); g = t; }
      else if (t < 32) { f = (D & B) | (~D & C); g = (5 * t + 1) % 16; }
      else if (t < 48) { f = B ^ C ^ D; g = (3 * t + 5) % 16; }
      else { f = C ^ (B | ~D); g = (7 * t) % 16; }
      const tmp = D;
      D = C;
      C = B;
      B = (B + rotl((A + f + MD5_K[t] + m[g]) | 0, MD5_S[t])) | 0;
      A = tmp;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }
  const out = new Uint8Array(16);
  const odv = new DataView(out.buffer);
  odv.setUint32(0, a0 >>> 0, true);
  odv.setUint32(4, b0 >>> 0, true);
  odv.setUint32(8, c0 >>> 0, true);
  odv.setUint32(12, d0 >>> 0, true);
  let hex = '';
  for (let i = 0; i < 16; i++) hex += out[i].toString(16).padStart(2, '0');
  return hex;
}

export function sha1(input: string): string {
  const msg = new TextEncoder().encode(input);
  const bitLen = msg.length * 8;
  const padLen = padLenFor(msg.length);
  const total = msg.length + padLen + 8;
  const data = new Uint8Array(total);
  data.set(msg, 0);
  data[msg.length] = 0x80;
  const tail = msg.length + padLen;
  const dv = new DataView(data.buffer);
  dv.setUint32(tail, Math.floor(bitLen / 4294967296), false); // 高 32 位（大端）
  dv.setUint32(tail + 4, bitLen >>> 0, false); // 低 32 位（大端）

  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
  for (let i = 0; i < total; i += 64) {
    const w: number[] = new Array(80);
    for (let t = 0; t < 16; t++) w[t] = dv.getUint32(i + t * 4, false); // 大端
    for (let t = 16; t < 80; t++) w[t] = rotl((w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]) | 0, 1);
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let t = 0; t < 80; t++) {
      let f: number, k: number;
      if (t < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
      else if (t < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (t < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      const na = (rotl(a, 5) + f + k + w[t] + e) | 0; // FIPS 180-1: S^5(A) + f + K + W[i] + E
      e = d;
      d = c;
      c = rotl(b, 30);
      b = a;
      a = na;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  const out = new Uint8Array(20);
  const odv = new DataView(out.buffer);
  odv.setUint32(0, h0 >>> 0, false);
  odv.setUint32(4, h1 >>> 0, false);
  odv.setUint32(8, h2 >>> 0, false);
  odv.setUint32(12, h3 >>> 0, false);
  odv.setUint32(16, h4 >>> 0, false);
  let hex = '';
  for (let i = 0; i < 20; i++) hex += out[i].toString(16).padStart(2, '0');
  return hex;
}

export function sha256(input: string): string {
  const msg = new TextEncoder().encode(input);
  const bitLen = msg.length * 8;
  const padLen = padLenFor(msg.length);
  const total = msg.length + padLen + 8;
  const data = new Uint8Array(total);
  data.set(msg, 0);
  data[msg.length] = 0x80;
  const tail = msg.length + padLen;
  const dv = new DataView(data.buffer);
  dv.setUint32(tail, Math.floor(bitLen / 4294967296), false); // 高 32 位（大端）
  dv.setUint32(tail + 4, bitLen >>> 0, false); // 低 32 位（大端）

  let h0 = SHA256_H[0], h1 = SHA256_H[1], h2 = SHA256_H[2], h3 = SHA256_H[3];
  let h4 = SHA256_H[4], h5 = SHA256_H[5], h6 = SHA256_H[6], h7 = SHA256_H[7];
  for (let i = 0; i < total; i += 64) {
    const w: number[] = new Array(64);
    for (let t = 0; t < 16; t++) w[t] = dv.getUint32(i + t * 4, false); // 大端
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
      const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA256_K[t] + w[t]) | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0;
      d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0; h5 = (h5 + f) | 0; h6 = (h6 + g) | 0; h7 = (h7 + h) | 0;
  }
  const out = new Uint8Array(32);
  const odv = new DataView(out.buffer);
  odv.setUint32(0, h0 >>> 0, false);
  odv.setUint32(4, h1 >>> 0, false);
  odv.setUint32(8, h2 >>> 0, false);
  odv.setUint32(12, h3 >>> 0, false);
  odv.setUint32(16, h4 >>> 0, false);
  odv.setUint32(20, h5 >>> 0, false);
  odv.setUint32(24, h6 >>> 0, false);
  odv.setUint32(28, h7 >>> 0, false);
  let hex = '';
  for (let i = 0; i < 32; i++) hex += out[i].toString(16).padStart(2, '0');
  return hex;
}
