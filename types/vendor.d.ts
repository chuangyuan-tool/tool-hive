declare module 'qrcode-generator' {
  interface QRCode {
    addData(data: string, mode?: string): void;
    make(): void;
    createSvgTag(opts?: { cellSize?: number; margin?: number; scalings?: number }): string;
    createImgTag(opts?: { cellSize?: number; margin?: number }): string;
    createDataURL(cellSize?: number, margin?: number): string;
    modules: boolean[][];
  }
  const qrcode: (typeNumber: number, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H') => QRCode;
  export = qrcode;
}

declare module 'jsqr' {
  export default function jsQR(
    imageData: Uint8ClampedArray,
    width: number,
    height: number,
  ): { data: string; location: unknown } | null;
}
