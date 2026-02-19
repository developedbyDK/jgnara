"use client"

import { useState } from "react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { PhotoUploadSlot } from "@/components/listings/register/photo-upload-slot"
import {
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  CONDITION_OPTIONS,
  REGION_OPTIONS,
  TRANSMISSION_OPTIONS,
  CATEGORY_OPTIONS,
  PAYMENT_OPTIONS,
  UNDERCARRIAGE_TYPE_OPTIONS,
  UNDERCARRIAGE_CONDITION_OPTIONS,
  PHOTO_SLOT_LABELS,
} from "@/lib/constants/listing-options"

interface FormData {
  type: string
  year: string
  month: string
  category: string
  condition: string
  manufacturer: string
  model: string
  engine: string
  transmission: string
  tonnage: string
  price: string
  region: string
  payment: string
  usage: string
  usageUnit: string
  undercarriageType: string
  undercarriageCondition: string
  companyName: string
  contact: string
  youtubeUrl: string
  description: string
  listingType: string
}

const initialFormData: FormData = {
  type: "매매",
  year: "",
  month: "",
  category: "",
  condition: "",
  manufacturer: "",
  model: "",
  engine: "",
  transmission: "",
  tonnage: "",
  price: "",
  region: "",
  payment: "",
  usage: "",
  usageUnit: "KM",
  undercarriageType: "",
  undercarriageCondition: "",
  companyName: "",
  contact: "",
  youtubeUrl: "",
  description: "",
  listingType: "무료",
}

export function ListingRegisterForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [photos, setPhotos] = useState<(File | null)[]>(
    Array(PHOTO_SLOT_LABELS.length).fill(null)
  )

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function updatePhoto(index: number, file: File | null) {
    setPhotos((prev) => {
      const next = [...prev]
      next[index] = file
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: submit logic
    console.log({ formData, photos })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 기본 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">기본 정보</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          {/* 구분 */}
          <Field>
            <FieldLabel>구분</FieldLabel>
            <RadioGroup
              value={formData.type}
              onValueChange={(v) => updateField("type", v)}
              className="flex flex-row gap-4"
            >
              {["매매", "대여", "급매"].map((v) => (
                <Label key={v} className="flex cursor-pointer items-center gap-2">
                  <RadioGroupItem value={v} />
                  {v}
                </Label>
              ))}
            </RadioGroup>
          </Field>

          {/* 제작년월 */}
          <Field>
            <FieldLabel>제작년월</FieldLabel>
            <div className="flex gap-2">
              <Select
                value={formData.year}
                onValueChange={(v) => updateField("year", v)}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="년도" />
                </SelectTrigger>
                <SelectContent>
                  {YEAR_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.month}
                onValueChange={(v) => updateField("month", v)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="월" />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Field>

          {/* 분류 */}
          <Field>
            <FieldLabel>분류</FieldLabel>
            <Select
              value={formData.category}
              onValueChange={(v) => updateField("category", v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="분류 선택" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* 상태등급 */}
          <Field>
            <FieldLabel>상태등급</FieldLabel>
            <Select
              value={formData.condition}
              onValueChange={(v) => updateField("condition", v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 장비 상세 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">장비 상세</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field>
            <FieldLabel>제작사</FieldLabel>
            <Input
              value={formData.manufacturer}
              onChange={(e) => updateField("manufacturer", e.target.value)}
              placeholder="예: 현대, 두산, 볼보"
            />
          </Field>

          <Field>
            <FieldLabel>모델명</FieldLabel>
            <Input
              value={formData.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="예: R220LC-9S"
            />
          </Field>

          <Field>
            <FieldLabel>엔진</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={formData.engine}
                onChange={(e) => updateField("engine", e.target.value)}
                placeholder="엔진 출력"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>마력</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>미션</FieldLabel>
            <Select
              value={formData.transmission}
              onValueChange={(v) => updateField("transmission", v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="미션 선택" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>톤수</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={formData.tonnage}
                onChange={(e) => updateField("tonnage", e.target.value)}
                placeholder="톤수 입력"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>톤</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 가격/위치 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">가격 / 위치</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field>
            <FieldLabel>가격</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="가격 입력"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>만원</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>위치</FieldLabel>
            <Select
              value={formData.region}
              onValueChange={(v) => updateField("region", v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {REGION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>할부/현금</FieldLabel>
            <Select
              value={formData.payment}
              onValueChange={(v) => updateField("payment", v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="결제방식" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>운행 KM/HR</FieldLabel>
            <div className="flex gap-2">
              <InputGroup className="flex-1">
                <InputGroupInput
                  value={formData.usage}
                  onChange={(e) => updateField("usage", e.target.value)}
                  placeholder="운행량 입력"
                />
              </InputGroup>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={formData.usageUnit}
                onValueChange={(v) => {
                  if (v) updateField("usageUnit", v)
                }}
              >
                <ToggleGroupItem value="KM">KM</ToggleGroupItem>
                <ToggleGroupItem value="HR">HR</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 하부 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">하부 정보</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field>
            <FieldLabel>하부타입</FieldLabel>
            <Select
              value={formData.undercarriageType}
              onValueChange={(v) => updateField("undercarriageType", v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="타입 선택" />
              </SelectTrigger>
              <SelectContent>
                {UNDERCARRIAGE_TYPE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>하부상태</FieldLabel>
            <Select
              value={formData.undercarriageCondition}
              onValueChange={(v) => updateField("undercarriageCondition", v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {UNDERCARRIAGE_CONDITION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 연락처 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">연락처</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field>
            <FieldLabel>상호</FieldLabel>
            <Input
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="상호명 입력"
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
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 미디어 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">미디어</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field>
            <FieldLabel>유튜브 URL</FieldLabel>
            <Input
              value={formData.youtubeUrl}
              onChange={(e) => updateField("youtubeUrl", e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </Field>

          <Field className="col-span-2">
            <FieldLabel>사진 업로드</FieldLabel>
            <div className="grid grid-cols-5 gap-3">
              {PHOTO_SLOT_LABELS.map((label, i) => (
                <PhotoUploadSlot
                  key={i}
                  label={label}
                  file={photos[i]}
                  onFileChange={(file) => updatePhoto(i, file)}
                />
              ))}
            </div>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 장비소개 / 등록유형 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">장비소개 / 등록유형</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field className="col-span-2">
            <FieldLabel>장비소개</FieldLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="장비에 대한 상세 설명을 입력해주세요"
              className="min-h-32"
            />
          </Field>

          <Field>
            <FieldLabel>등록유형</FieldLabel>
            <RadioGroup
              value={formData.listingType}
              onValueChange={(v) => updateField("listingType", v)}
              className="flex flex-row gap-4"
            >
              {[
                { value: "무료", desc: "일반 등록" },
                { value: "유료", desc: "상단 노출" },
              ].map((item) => (
                <Label
                  key={item.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <RadioGroupItem value={item.value} />
                  <span>
                    {item.value}{" "}
                    <span className="text-muted-foreground text-xs">
                      ({item.desc})
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </Field>
        </FieldGroup>
      </section>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="cursor-pointer px-8">
          매물 등록
        </Button>
      </div>
    </form>
  )
}
