"use client"

import { useState, useRef } from "react"
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
import { ImagePlus, X } from "lucide-react"

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

interface CompanyFormData {
  category: string
  password: string
  companyName: string
  address: string
  contact: string
  fax: string
  website: string
  description: string
}

const initialFormData: CompanyFormData = {
  category: "",
  password: "",
  companyName: "",
  address: "",
  contact: "",
  fax: "",
  website: "",
  description: "",
}

export function CompanyRegisterForm() {
  const [formData, setFormData] = useState<CompanyFormData>(initialFormData)
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function updateField(field: keyof CompanyFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function removeLogo() {
    setLogo(null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: submit logic
    console.log({ formData, logo })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 업체 분류 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">업체 분류</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>분류</FieldLabel>
            <Select
              value={formData.category}
              onValueChange={(v) => updateField("category", v)}
            >
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
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="비밀번호 입력"
            />
          </Field>

          <Field>
            <FieldLabel>매매업체상호</FieldLabel>
            <Input
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="업체명 입력"
            />
          </Field>

          <Field className="sm:col-span-2">
            <FieldLabel>주소지</FieldLabel>
            <Input
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="주소 입력"
            />
          </Field>

          <Field>
            <FieldLabel>연락처</FieldLabel>
            <Input
              value={formData.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              placeholder="010-0000-0000"
            />
          </Field>

          <Field>
            <FieldLabel>FAX</FieldLabel>
            <Input
              value={formData.fax}
              onChange={(e) => updateField("fax", e.target.value)}
              placeholder="02-0000-0000"
            />
          </Field>

          <Field className="sm:col-span-2">
            <FieldLabel>홈페이지</FieldLabel>
            <Input
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
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
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
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
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {logoPreview ? (
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
        <Button type="submit" className="cursor-pointer px-8">
          업체 등록
        </Button>
      </div>
    </form>
  )
}
