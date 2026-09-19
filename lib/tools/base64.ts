export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export function decodeBase64(input: string): string {
  const cleaned = input.trim().replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  const pad = cleaned.length % 4 === 0 ? 0 : 4 - (cleaned.length % 4);
  const bin = atob(cleaned + '='.repeat(pad));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
