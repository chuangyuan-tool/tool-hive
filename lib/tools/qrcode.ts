import qrcode from 'qrcode-generator';

// 生成：text -> SVG 字符串 / dataURL（浏览器 canvas 下载）
export function qrToSvg(text: string, cellSize = 6): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize, margin: 2 });
}

export function qrToDataUrl(text: string, cellSize = 12, margin = 2): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  return qr.createDataURL(cellSize, margin);
}
