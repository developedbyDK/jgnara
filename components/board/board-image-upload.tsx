"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { IconPhoto, IconX, IconLoader2 } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { compressImageToWebP } from "@/lib/utils/compress-image";

const MAX_IMAGES = 5;

interface BoardImageUploadProps {
  /** 업로드된 이미지 URL 목록 */
  images: string[];
  /** URL 목록 변경 콜백 */
  onChange: (urls: string[]) => void;
}

export function BoardImageUpload({ images, onChange }: BoardImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      const fileArr = Array.from(files).slice(0, MAX_IMAGES - images.length);
      if (fileArr.length === 0) return;

      setUploading(true);
      const supabase = createClient();
      const newUrls: string[] = [];

      for (const raw of fileArr) {
        try {
          const compressed = await compressImageToWebP(raw);
          const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

          const { error } = await supabase.storage
            .from("board-images")
            .upload(path, compressed, {
              contentType: "image/webp",
              cacheControl: "31536000",
            });

          if (error) {
            console.error("Upload error:", error);
            continue;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("board-images").getPublicUrl(path);

          newUrls.push(publicUrl);
        } catch (e) {
          console.error("Image processing error:", e);
        }
      }

      if (newUrls.length > 0) {
        onChange([...images, ...newUrls]);
      }
      setUploading(false);
    },
    [images, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (images.length >= MAX_IMAGES || uploading) return;
      upload(e.dataTransfer.files);
    },
    [images.length, uploading, upload],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      upload(e.target.files);
      e.target.value = "";
    },
    [upload],
  );

  const remove = useCallback(
    (index: number) => {
      onChange(images.filter((_, i) => i !== index));
    },
    [images, onChange],
  );

  return (
    <div className="space-y-3">
      {/* 드래그앤드롭 영역 */}
      {images.length < MAX_IMAGES && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          disabled={uploading}
          className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 px-4 py-8 text-sm text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
        >
          {uploading ? (
            <>
              <IconLoader2 className="size-8 animate-spin" />
              <span>이미지 업로드 중...</span>
            </>
          ) : (
            <>
              <IconPhoto className="size-8" />
              <span>
                클릭 또는 드래그하여 이미지 업로드 (최대 {MAX_IMAGES}장)
              </span>
              <span className="text-xs text-neutral-400">
                자동으로 WebP 변환 및 50KB 이하로 압축됩니다
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />

      {/* 미리보기 */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((url, i) => (
            <div key={url} className="group relative aspect-square">
              <Image
                src={url}
                alt={`첨부 이미지 ${i + 1}`}
                fill
                className="rounded-lg border border-neutral-200 object-cover dark:border-neutral-700"
                sizes="(max-width: 640px) 33vw, 20vw"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute -right-1.5 -top-1.5 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
              >
                <IconX className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
