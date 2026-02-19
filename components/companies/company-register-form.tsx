"use client"

import { useState, useRef, useActionState, useEffect } from "react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ImagePlus, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { registerCompany } from "@/app/(main)/companies/register/actions"

const COMPANY_CATEGORY_OPTIONS = [
  { value: "건설기계임대차", label: "건설기계임대차" },
  { value: "건설기계매매", label: "건설기계매매" },
  { value: "정비업체", label: "정비업체" },
  { value: "부품업체", label: "부품업체" },
  { value: "제조 및 수출입업체", label: "제조 및 수출입업체" },
  { value: "건설기계지입사", label: "건설기계지입사" },
  { value: "추레라업체", label: "추레라업체" },
  { value: "기타건설관련업", label: "기타건설관련업" },
  { value: "기타일반업", label: "기타일반업" },
]

const MAX_SIZE = 50 * 1024 // 50KB

function compressToWebp(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) return reject(new Error("Canvas not supported"))
      ctx.drawImage(img, 0, 0)

      let quality = 0.9
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression failed"))
            if (blob.size <= MAX_SIZE || quality <= 0.1) {
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" }))
            } else {
              quality -= 0.1
              tryCompress()
            }
          },
          "image/webp",
          quality
        )
      }
      tryCompress()
    }
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = URL.createObjectURL(file)
  })
}

export function CompanyRegisterForm() {
  const [state, formAction, isPending] = useActionState(registerCompany, null)
  const [category, setCategory] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
      formRef.current?.reset()
      setCategory("")
      setLogo(null)
      setLogoPreview(null)
    } else {
      toast.error(state.message)
    }
  }, [state])

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsConverting(true)
    try {
      const webpFile = await compressToWebp(file)
      setLogo(webpFile)
      setLogoPreview(URL.createObjectURL(webpFile))
    } catch {
      toast.error("이미지 변환에 실패했습니다.")
    } finally {
      setIsConverting(false)
    }
  }

  function removeLogo() {
    setLogo(null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <form
      ref={formRef}
      action={(fd) => {
        if (logo) {
          fd.delete("logo")
          fd.append("logo", logo)
        }
        formAction(fd)
      }}
      className="space-y-6"
    >
      {/* hidden field for category (Select doesn't use native input) */}
      <input type="hidden" name="category" value={category} />

      {/* ── 업체 분류 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">업체 분류</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>분류</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full max-w-xs cursor-pointer">
                <SelectValue placeholder="분류 선택" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_CATEGORY_OPTIONS.map((o) => (
                  <SelectItem
                    key={o.value}
                    value={o.value}
                    className="cursor-pointer"
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 업체 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">업체 정보</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호 입력"
              required
            />
          </Field>

          <Field>
            <FieldLabel>매매업체상호</FieldLabel>
            <Input
              name="companyName"
              placeholder="업체명 입력"
              required
            />
          </Field>

          <Field className="sm:col-span-2">
            <FieldLabel>주소지</FieldLabel>
            <Input
              name="address"
              placeholder="주소 입력"
              required
            />
          </Field>

          <Field>
            <FieldLabel>연락처</FieldLabel>
            <Input
              name="contact"
              placeholder="010-0000-0000"
              required
            />
          </Field>

          <Field>
            <FieldLabel>FAX</FieldLabel>
            <Input
              name="fax"
              placeholder="02-0000-0000"
            />
          </Field>

          <Field className="sm:col-span-2">
            <FieldLabel>홈페이지</FieldLabel>
            <Input
              name="website"
              placeholder="https://"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 업체 소개 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">업체 소개</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>업체소개</FieldLabel>
            <Textarea
              name="description"
              placeholder="업체에 대한 소개를 입력해주세요"
              className="min-h-32"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 업체 로고 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">업체 로고</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>업체로고</FieldLabel>
            <div className="flex items-start gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleLogoChange}
                className="hidden"
              />
              {isConverting ? (
                <div className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="text-xs">변환 중...</span>
                </div>
              ) : logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="업체 로고 미리보기"
                    className="h-32 w-32 rounded-md border object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    WebP · {(logo?.size ?? 0) < 1024 ? `${logo?.size}B` : `${((logo?.size ?? 0) / 1024).toFixed(1)}KB`}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:text-foreground"
                >
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-xs">로고 업로드</span>
                </button>
              )}
            </div>
          </Field>
        </FieldGroup>
      </section>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending} className="cursor-pointer px-8">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              등록 중...
            </>
          ) : (
            "업체 등록"
          )}
        </Button>
      </div>
    </form>
  )
}
