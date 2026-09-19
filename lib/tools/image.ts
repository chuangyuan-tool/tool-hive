export interface CompressionResult {
  blob: Blob;
  url: string;
  size: number;
  width: number;
  height: number;
}

export function compressImage(
  file: File,
  quality: number,
  format: 'image/jpeg' | 'image/webp'
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas not supported'));
        return;
      }
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, url: URL.createObjectURL(blob), size: blob.size, width: img.width, height: img.height });
          } else {
            reject(new Error('Compression failed'));
          }
        },
        format,
        Math.max(0.01, Math.min(1, quality))
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not load image'));
    };
    img.src = objectUrl;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
