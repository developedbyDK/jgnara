"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { createClient } from "@/lib/supabase/client"
import { useHierarchicalCategories } from "@/lib/use-categories"
import {
  ListingRegisterForm,
  type ListingFormData,
} from "@/components/listings/register/listing-register-form"
import { PHOTO_SLOT_LABELS } from "@/lib/constants/listing-options"

export default function ListingEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [initialData, setInitialData] = useState<ListingFormData | null>(null)
  const [initialPhotos, setInitialPhotos] = useState<(string | null)[]>(
    Array(PHOTO_SLOT_LABELS.length).fill(null)
  )
  const [error, setError] = useState<string | null>(null)
  const { getIdByLabel, getGroupById, getParentId, loading: catLoading } =
    useHierarchicalCategories()

  useEffect(() => {
    if (catLoading) return

    async function fetchListing() {
      const supabase = createClient()

      // 현재 사용자 확인
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.replace("/login")
        return
      }

      // 매물 데이터 fetch
      const { data: listing, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError || !listing) {
        setError("매물을 찾을 수 없습니다.")
        setLoading(false)
        return
      }

      // 소유권 검증
      if (listing.user_id !== user.id) {
        setError("수정 권한이 없습니다.")
        setLoading(false)
        return
      }

      // 카테고리 역매핑
      const categoryId = getIdByLabel(listing.category)
      const subcategoryId = listing.subcategory
        ? getIdByLabel(listing.subcategory)
        : ""
      const parentId = categoryId ? getParentId(categoryId) : null
      const categoryGroup = categoryId
        ? getGroupById(categoryId)
        : parentId
          ? getGroupById(parentId)
          : ""

      // 카테고리가 부모인지 자식인지 판별
      // DB의 category는 부모 라벨, subcategory는 자식 라벨
      const resolvedParentId = parentId ?? categoryId
      const resolvedCategoryGroup = resolvedParentId
        ? getGroupById(resolvedParentId)
        : categoryGroup

      // DB 값 → FormData 변환
      const formData: ListingFormData = {
        type: listing.type ?? "매매",
        year: listing.year ? String(listing.year) : "",
        month: listing.month
          ? String(listing.month).padStart(2, "0")
          : "",
        categoryGroup: resolvedCategoryGroup,
        category: categoryId,
        subcategory: subcategoryId,
        condition: listing.condition ?? "",
        manufacturer: listing.manufacturer ?? "",
        model: listing.model ?? "",
        engine: listing.engine ?? "",
        transmission: listing.transmission ?? "",
        tonnage: listing.tonnage ? String(listing.tonnage) : "",
        price: listing.price ? String(listing.price) : "",
        region: listing.region ?? "",
        payment: listing.payment ?? "",
        usage: listing.usage_amount ? String(listing.usage_amount) : "",
        usageUnit: listing.usage_unit ?? "KM",
        undercarriageType: listing.undercarriage_type ?? "",
        undercarriageCondition: listing.undercarriage_condition ?? "",
        companyName: listing.company_name ?? "",
        contact: listing.contact ?? "",
        youtubeUrl: listing.youtube_url ?? "",
        description: listing.description ?? "",
        listingType: listing.listing_type ?? "무료",
      }

      setInitialData(formData)

      // photos 배열 매핑 (10칸)
      if (listing.photos && Array.isArray(listing.photos)) {
        const mapped: (string | null)[] = Array(
          PHOTO_SLOT_LABELS.length
        ).fill(null)
        listing.photos.forEach((url: string, i: number) => {
          if (i < mapped.length) mapped[i] = url
        })
        setInitialPhotos(mapped)
      }

      setLoading(false)
    }

    fetchListing()
  }, [id, catLoading, router, getIdByLabel, getGroupById, getParentId])

  if (loading || catLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 cursor-pointer text-sm text-neutral-500 underline hover:text-neutral-700"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (!initialData) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">매물 수정</h1>
      <ListingRegisterForm
        mode="edit"
        listingId={id}
        initialData={initialData}
        initialPhotos={initialPhotos}
      />
    </div>
  )
}
