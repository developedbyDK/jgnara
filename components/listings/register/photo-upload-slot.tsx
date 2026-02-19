"use client"

import { useRef, useEffect, useState } from "react"
import { XIcon, ImagePlusIcon } from "lucide-react"

interface PhotoUploadSlotProps {
  label: string
  file: File | null
  onFileChange: (file: File | null) => void
  existingUrl?: string | null
  onRemoveExisting?: () => void
}

export function PhotoUploadSlot({
  label,
  file,
  onFileChange,
  existingUrl,
  onRemoveExisting,
}: PhotoUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const displayUrl = preview ?? existingUrl ?? null
  const hasImage = !!file || !!existingUrl

  return (
    <div className="relative flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border-input hover:border-ring relative flex size-24 cursor-pointer items-center justify-center overflow-hidden border bg-muted/30 transition-colors"
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            className="size-full object-cover"
          />
        ) : (
          <ImagePlusIcon className="text-muted-foreground size-6" />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0] ?? null
          onFileChange(selected)
          e.target.value = ""
        }}
      />
      <span className="text-muted-foreground text-xs">{label}</span>
      {hasImage && (
        <button
          type="button"
          onClick={() => {
            if (file) {
              onFileChange(null)
            } else if (existingUrl && onRemoveExisting) {
              onRemoveExisting()
            }
          }}
          className="bg-black/70 absolute -top-1 -right-1 flex size-4 cursor-pointer items-center justify-center rounded-full text-white"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  )
}
