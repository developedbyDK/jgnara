"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { compressImageToWebP } from "@/lib/utils/compress-image"
import type { User } from "@supabase/supabase-js"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PhotoUploadSlot } from "@/components/listings/register/photo-upload-slot"
import {
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  CONDITION_OPTIONS,
  REGION_OPTIONS,
  TRANSMISSION_OPTIONS,
  PAYMENT_OPTIONS,
  UNDERCARRIAGE_TYPE_OPTIONS,
  UNDERCARRIAGE_CONDITION_OPTIONS,
  PHOTO_SLOT_LABELS,
} from "@/lib/constants/listing-options"
import { useHierarchicalCategories } from "@/lib/use-categories"

interface FormData {
  type: string
  year: string
  month: string
  categoryGroup: string
  category: string
  subcategory: string
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
  categoryGroup: "",
  category: "",
  subcategory: "",
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
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { parentOptions, getChildOptions, getLabelById } = useHierarchicalCategories()
  const [photos, setPhotos] = useState<(File | null)[]>(
    Array(PHOTO_SLOT_LABELS.length).fill(null)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): Record<string, string> {
    const e: Record<string, string> = {}
    if (!formData.type) e.type = "구분을 선택해주세요"
    if (!formData.year) e.year = "년도를 선택해주세요"
    if (!formData.month) e.month = "월을 선택해주세요"
    if (!formData.categoryGroup) e.categoryGroup = "카테고리를 선택해주세요"
    if (!formData.category) e.category = "대분류를 선택해주세요"
    if (!formData.subcategory) e.subcategory = "소분류를 선택해주세요"
    if (!formData.condition) e.condition = "상태등급을 선택해주세요"
    if (!formData.manufacturer) e.manufacturer = "제작사를 입력해주세요"
    if (!formData.model) e.model = "모델명을 입력해주세요"
    if (!formData.price) e.price = "가격을 입력해주세요"
    if (!formData.companyName) e.companyName = "상호를 입력해주세요"
    if (!formData.contact) e.contact = "연락처를 입력해주세요"
    if (!photos[0]) e.photo = "대표사진을 등록해주세요"
    return e
  }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      // 카테고리 그룹 변경 시 분류1/분류2 초기화
      if (field === "categoryGroup") {
        next.category = ""
        next.subcategory = ""
      }
      // 분류1 변경 시 분류2 초기화
      if (field === "category") next.subcategory = ""
      return next
    })
    // 입력 시 해당 에러 클리어
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  // 선택된 그룹에 따라 분류1 필터링
  const filteredParentOptions = formData.categoryGroup
    ? parentOptions.filter((o) => o.group === formData.categoryGroup)
    : parentOptions

  function updatePhoto(index: number, file: File | null) {
    setPhotos((prev) => {
      const next = [...prev]
      next[index] = file
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!user) {
      setShowLoginModal(true)
      return
    }

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      // 1) listings 테이블에 데이터 삽입
      const { data: listing, error: insertError } = await supabase
        .from("listings")
        .insert({
          user_id: user.id,
          type: formData.type,
          year: Number(formData.year),
          month: Number(formData.month),
          category: getLabelById(formData.category),
          subcategory: formData.subcategory ? getLabelById(formData.subcategory) : null,
          condition: formData.condition,
          manufacturer: formData.manufacturer,
          model: formData.model,
          engine: formData.engine || null,
          transmission: formData.transmission || null,
          tonnage: formData.tonnage ? Number(formData.tonnage) : null,
          price: Number(formData.price),
          region: formData.region,
          payment: formData.payment || null,
          usage_amount: formData.usage ? Number(formData.usage) : null,
          usage_unit: formData.usage ? formData.usageUnit : null,
          undercarriage_type: formData.undercarriageType || null,
          undercarriage_condition: formData.undercarriageCondition || null,
          company_name: formData.companyName || null,
          contact: formData.contact,
          youtube_url: formData.youtubeUrl || null,
          description: formData.description || null,
          listing_type: formData.listingType,
        })
        .select("id")
        .single()

      if (insertError) throw insertError

      // 2) 사진 WebP 변환 후 업로드 (있는 것만)
      const validPhotos = photos.filter((f): f is File => f !== null)
      if (validPhotos.length > 0) {
        const photoUrls: string[] = []

        for (let i = 0; i < validPhotos.length; i++) {
          const compressed = await compressImageToWebP(validPhotos[i])
          const filePath = `${listing.id}/${i}.webp`

          const { error: uploadError } = await supabase.storage
            .from("listing-photos")
            .upload(filePath, compressed, {
              contentType: "image/webp",
            })

          if (uploadError) throw uploadError

          const { data: urlData } = supabase.storage
            .from("listing-photos")
            .getPublicUrl(filePath)

          photoUrls.push(urlData.publicUrl)
        }

        // 3) photos 배열 업데이트
        const { error: updateError } = await supabase
          .from("listings")
          .update({ photos: photoUrls })
          .eq("id", listing.id)

        if (updateError) throw updateError
      }

      alert("매물이 등록되었습니다.")
      router.push("/")
    } catch (err) {
      console.error(err)
      alert("매물 등록에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const req = <span className="text-destructive">*</span>

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 기본 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">기본 정보</h2>
        <FieldGroup className="grid grid-cols-3 gap-x-6 gap-y-5">
          {/* 구분 */}
          <Field data-invalid={!!errors.type || undefined}>
            <FieldLabel>구분 {req}</FieldLabel>
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
            {errors.type && <FieldError>{errors.type}</FieldError>}
          </Field>

          {/* 제작년월 */}
          <Field data-invalid={!!(errors.year || errors.month) || undefined}>
            <FieldLabel>제작년월 {req}</FieldLabel>
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
            {(errors.year || errors.month) && <FieldError>{errors.year || errors.month}</FieldError>}
          </Field>

          {/* 카테고리 항목 */}
          <Field data-invalid={!!errors.categoryGroup || undefined}>
            <FieldLabel>카테고리 {req}</FieldLabel>
            <Select
              value={formData.categoryGroup}
              onValueChange={(v) => updateField("categoryGroup", v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heavy">중장비</SelectItem>
                <SelectItem value="freight">화물특장</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoryGroup && <FieldError>{errors.categoryGroup}</FieldError>}
          </Field>

          {/* 분류1 (대분류) */}
          <Field data-invalid={!!errors.category || undefined}>
            <FieldLabel>분류1 {req}</FieldLabel>
            <Select
              value={formData.category}
              onValueChange={(v) => updateField("category", v)}
              disabled={!formData.categoryGroup}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder={formData.categoryGroup ? "대분류 선택" : "카테고리를 먼저 선택"} />
              </SelectTrigger>
              <SelectContent>
                {filteredParentOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <FieldError>{errors.category}</FieldError>}
          </Field>

          {/* 분류2 (소분류) */}
          <Field data-invalid={!!errors.subcategory || undefined}>
            <FieldLabel>분류2 {req}</FieldLabel>
            <Select
              value={formData.subcategory}
              onValueChange={(v) => updateField("subcategory", v)}
              disabled={!formData.category}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder={formData.category ? "소분류 선택" : "대분류를 먼저 선택"} />
              </SelectTrigger>
              <SelectContent>
                {formData.category &&
                  getChildOptions(formData.category).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.subcategory && <FieldError>{errors.subcategory}</FieldError>}
          </Field>

          {/* 상태등급 */}
          <Field data-invalid={!!errors.condition || undefined}>
            <FieldLabel>상태등급 {req}</FieldLabel>
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
            {errors.condition && <FieldError>{errors.condition}</FieldError>}
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 장비 상세 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">장비 상세</h2>
        <FieldGroup className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field data-invalid={!!errors.manufacturer || undefined}>
            <FieldLabel>제작사 {req}</FieldLabel>
            <Input
              value={formData.manufacturer}
              onChange={(e) => updateField("manufacturer", e.target.value)}
              placeholder="예: 현대, 두산, 볼보"
            />
            {errors.manufacturer && <FieldError>{errors.manufacturer}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.model || undefined}>
            <FieldLabel>모델명 {req}</FieldLabel>
            <Input
              value={formData.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="예: R220LC-9S"
            />
            {errors.model && <FieldError>{errors.model}</FieldError>}
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
          <Field data-invalid={!!errors.price || undefined}>
            <FieldLabel>가격 {req}</FieldLabel>
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
            {errors.price && <FieldError>{errors.price}</FieldError>}
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
          <Field data-invalid={!!errors.companyName || undefined}>
            <FieldLabel>상호 {req}</FieldLabel>
            <Input
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="상호명 입력"
            />
            {errors.companyName && <FieldError>{errors.companyName}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.contact || undefined}>
            <FieldLabel>연락처 {req}</FieldLabel>
            <Input
              value={formData.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              placeholder="010-0000-0000"
            />
            {errors.contact && <FieldError>{errors.contact}</FieldError>}
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

          <Field className="col-span-2" data-invalid={!!errors.photo || undefined}>
            <FieldLabel>사진 업로드 {req}</FieldLabel>
            <div className="grid grid-cols-5 gap-3">
              {PHOTO_SLOT_LABELS.map((label, i) => (
                <PhotoUploadSlot
                  key={i}
                  label={label}
                  file={photos[i]}
                  onFileChange={(file) => {
                    updatePhoto(i, file)
                    if (i === 0 && file && errors.photo) {
                      setErrors((prev) => {
                        const next = { ...prev }
                        delete next.photo
                        return next
                      })
                    }
                  }}
                />
              ))}
            </div>
            {errors.photo && <FieldError>{errors.photo}</FieldError>}
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
        <Button
          type="submit"
          className="cursor-pointer px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "매물 등록"}
        </Button>
      </div>

      {/* 비회원 로그인 유도 모달 */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>로그인 필요</DialogTitle>
            <DialogDescription>
              매물등록은 회원만 가능합니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowLoginModal(false)}
            >
              닫기
            </Button>
            <Button asChild className="cursor-pointer">
              <Link href="/login">로그인하기</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}
