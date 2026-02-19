const MAX_SIZE = 50 * 1024; // 50KB
const MAX_DIMENSION = 1200;

/**
 * 이미지 파일을 WebP로 변환하고 ~50KB 이하로 압축합니다.
 */
export async function compressImageToWebP(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  // 최대 크기 제한 (비율 유지)
  let { width, height } = bitmap;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  // quality를 줄여가며 50KB 이하 달성
  let quality = 0.8;
  let blob = await canvas.convertToBlob({ type: "image/webp", quality });

  while (blob.size > MAX_SIZE && quality > 0.1) {
    quality -= 0.1;
    blob = await canvas.convertToBlob({ type: "image/webp", quality });
  }

  // 그래도 크면 해상도를 줄여서 재시도
  if (blob.size > MAX_SIZE) {
    const scale = Math.sqrt(MAX_SIZE / blob.size);
    const sw = Math.round(width * scale);
    const sh = Math.round(height * scale);
    const smallCanvas = new OffscreenCanvas(sw, sh);
    const sctx = smallCanvas.getContext("2d")!;
    sctx.drawImage(canvas, 0, 0, sw, sh);
    blob = await smallCanvas.convertToBlob({ type: "image/webp", quality: 0.7 });
  }

  const name = file.name.replace(/\.[^.]+$/, ".webp");
  return new File([blob], name, { type: "image/webp" });
}
