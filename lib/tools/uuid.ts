// UUID v4（浏览器/Node 内置 crypto）

export function newUuid(): string {
  return crypto.randomUUID();
}

export function generateUuids(count: number): string[] {
  const n = Math.max(1, Math.min(200, Math.floor(count) || 1));
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(newUuid());
  return out;
}

export function isUuidV4(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}
