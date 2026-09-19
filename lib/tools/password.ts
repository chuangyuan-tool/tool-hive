export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function randomInt(max: number): number {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function generatePassword(opts: PasswordOptions): string {
  let pool = '';
  for (const key of ['uppercase', 'lowercase', 'numbers', 'symbols'] as const) {
    if (opts[key]) pool += SETS[key];
  }
  if (!pool) return '';
  let out = '';
  for (let i = 0; i < opts.length; i++) out += pool[randomInt(pool.length)];
  return out;
}

export function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[!@#$%^&*()_+=\-\[\]{}|;:,.<>?]/.test(pw)) score++;
  const ratio = score / 6;
  const label = ratio >= 0.9 ? 'Very Strong' : ratio >= 0.7 ? 'Strong' : ratio >= 0.5 ? 'Fair' : ratio >= 0.3 ? 'Weak' : 'Very Weak';
  const color = ratio >= 0.7 ? 'bg-green-500' : ratio >= 0.5 ? 'bg-blue-500' : ratio >= 0.3 ? 'bg-yellow-500' : 'bg-red-500';
  return { score, label, color };
}

export function crackTimeEstimate(pw: string): string {
  let poolSize = 0;
  if (/[a-z]/.test(pw)) poolSize += 26;
  if (/[A-Z]/.test(pw)) poolSize += 26;
  if (/\d/.test(pw)) poolSize += 10;
  if (/[!@#$%^&*()_+=\-\[\]{}|;:,.<>?]/.test(pw)) poolSize += 32;
  if (poolSize === 0) return 'Instantly';
  const log10Combos = pw.length * Math.log10(poolSize);
  const seconds = Math.pow(10, log10Combos - 10);
  if (isNaN(seconds) || !isFinite(seconds)) return 'Over a million years';
  if (seconds < 1) return 'Instantly';
  if (seconds < 60) return Math.ceil(seconds) + ' seconds';
  if (seconds < 3600) return Math.ceil(seconds / 60) + ' minutes';
  if (seconds < 86400) return Math.ceil(seconds / 3600) + ' hours';
  if (seconds < 31557600) return Math.ceil(seconds / 86400) + ' days';
  if (seconds < 31557600 * 1e6) return Math.ceil(seconds / 31557600) + ' years';
  return 'Over a million years';
}
