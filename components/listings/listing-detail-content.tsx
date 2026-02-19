"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconPhone,
  IconChevronLeft,
  IconChevronRight,
  IconBrandYoutube,
} from "@tabler/icons-react";
import type { PublicListingDetail } from "@/lib/listing-queries";

// ─── Grade Badge Color ───────────────────────────────
const gradeStyle: Record<string, string> = {
  "A+": "bg-orange-600 text-white",
  A: "bg-emerald-500 text-white",
  "A-": "bg-emerald-400 text-white",
  "B+": "bg-blue-500 text-white",
  B: "bg-neutral-500 text-white",
  "B-": "bg-neutral-400 text-white",
  "C+": "bg-neutral-300 text-neutral-700",
  C: "bg-neutral-300 text-neutral-700",
  "C-": "bg-neutral-200 text-neutral-600",
};

// ─── Type Badge Color ────────────────────────────────
const typeStyle: Record<string, string> = {
  매매: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  대여: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  급매: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

// ─── Info Table Row ──────────────────────────────────
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex border-b border-neutral-100 dark:border-neutral-800">
      <dt className="w-28 flex-shrink-0 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-500 sm:w-32 dark:bg-neutral-800/50 dark:text-neutral-400">
        {label}
      </dt>
      <dd className="flex-1 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100">
        {value}
      </dd>
    </div>
  );
}

// ─── Component ───────────────────────────────────────
export function ListingDetailContent({
  listing,
}: {
  listing: PublicListingDetail;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  // 조회수 증가 (일별 + 총합)
  useEffect(() => {
    const supabase = createClient();
    supabase
      .rpc("increment_listing_views", { p_listing_id: listing.id })
      .then(({ error }) => {
        if (error) console.error("조회수 증가 실패:", error.message);
      });
  }, [listing.id]);

  const images = listing.photos;

  const prevImage = () =>
    setSelectedImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setSelectedImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="mt-4">
      {/* ═══ Top: Title + Price + Badges ═══ */}
      <div className="flex flex-wrap items-center gap-2">
        {gradeStyle[listing.grade] && (
          <Badge
            className={cn("text-xs font-bold", gradeStyle[listing.grade])}
          >
            {listing.grade}급
          </Badge>
        )}
        <Badge className={cn("text-xs font-medium", typeStyle[listing.type])}>
          {listing.type}
        </Badge>
        {listing.listingType === "유료" && (
          <Badge className="bg-orange-100 text-xs font-medium text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
            프리미엄
          </Badge>
        )}
      </div>

      <h1 className="mt-3 text-xl font-bold text-neutral-900 sm:text-2xl dark:text-neutral-100">
        {listing.title}
      </h1>
      <p className="mt-2 text-2xl font-extrabold text-primary sm:text-3xl">
        {listing.price}
      </p>

      {/* ═══ Image Gallery + Contact ═══ */}
      <div className="mt-5 flex flex-col gap-6 lg:flex-row">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                이미지 없음
              </div>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer bg-black/50 p-1.5 text-white transition hover:bg-black/70"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer bg-black/50 p-1.5 text-white transition hover:bg-black/70"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {images.length > 0 && (
              <div className="absolute right-2 bottom-2 bg-black/60 px-2 py-0.5 text-xs text-white">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-2 flex gap-1.5 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "h-16 w-20 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition",
                    selectedImage === i
                      ? "border-neutral-900 dark:border-neutral-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img
                    src={img}
                    alt={`${listing.title} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contact Panel */}
        <div className="flex-1">
          <div className="border border-neutral-200 dark:border-neutral-800">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                연락처
              </h2>
            </div>
            <div className="p-4">
              <InfoRow label="상호" value={listing.companyName} />
              <InfoRow label="연락처" value={listing.contact} />
              <div className="mt-4">
                <Button
                  size="lg"
                  className="w-full cursor-pointer gap-2"
                  asChild
                >
                  <a href={`tel:${listing.contact}`}>
                    <IconPhone className="h-4 w-4" />
                    전화 문의
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-neutral-400">
            등록일 {listing.createdAt}
          </p>
        </div>
      </div>

      {/* ═══ Spec Sections ═══ */}
      <div className="mt-8 space-y-6">
        {/* ── 기본 정보 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              기본 정보
            </h2>
          </div>
          <dl>
            <InfoRow
              label="구분"
              value={
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    typeStyle[listing.type]
                  )}
                >
                  {listing.type}
                </Badge>
              }
            />
            <InfoRow
              label="제작년월"
              value={`${listing.year}년 ${String(listing.month).padStart(2, "0")}월`}
            />
            <InfoRow label="분류" value={listing.category} />
            <InfoRow
              label="상태등급"
              value={
                gradeStyle[listing.grade] ? (
                  <Badge
                    className={cn(
                      "text-xs font-bold",
                      gradeStyle[listing.grade]
                    )}
                  >
                    {listing.grade}급
                  </Badge>
                ) : (
                  listing.grade
                )
              }
            />
          </dl>
        </section>

        {/* ── 장비 상세 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              장비 상세
            </h2>
          </div>
          <dl>
            <InfoRow label="제작사" value={listing.manufacturer} />
            <InfoRow label="모델명" value={listing.model} />
            {listing.engine && (
              <InfoRow label="엔진" value={`${listing.engine}마력`} />
            )}
            {listing.transmission && (
              <InfoRow label="미션" value={listing.transmission} />
            )}
            {listing.tonnage && (
              <InfoRow label="톤수" value={`${listing.tonnage}톤`} />
            )}
          </dl>
        </section>

        {/* ── 가격 / 위치 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              가격 / 위치
            </h2>
          </div>
          <dl>
            <InfoRow
              label="가격"
              value={
                <span className="font-bold text-primary">{listing.price}</span>
              }
            />
            <InfoRow label="위치" value={listing.region} />
            {listing.payment && (
              <InfoRow label="할부/현금" value={listing.payment} />
            )}
            <InfoRow label="운행 KM/HR" value={listing.usageLabel} />
          </dl>
        </section>

        {/* ── 하부 정보 ── */}
        {(listing.undercarriageType || listing.undercarriageCondition) && (
          <section className="border border-neutral-200 dark:border-neutral-800">
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                하부 정보
              </h2>
            </div>
            <dl>
              {listing.undercarriageType && (
                <InfoRow label="하부타입" value={listing.undercarriageType} />
              )}
              {listing.undercarriageCondition && (
                <InfoRow
                  label="하부상태"
                  value={listing.undercarriageCondition}
                />
              )}
            </dl>
          </section>
        )}

        {/* ── 장비소개 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              장비소개
            </h2>
          </div>
          <div className="whitespace-pre-line p-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {listing.description || "등록된 장비 소개가 없습니다."}
          </div>
        </section>

        {/* ── 미디어 (유튜브) ── */}
        {listing.youtubeUrl && (
          <section className="border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
              <IconBrandYoutube className="h-4 w-4 text-red-500" />
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                영상
              </h2>
            </div>
            <div className="p-4">
              <div className="aspect-video w-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <iframe
                  src={listing.youtubeUrl
                    .replace("watch?v=", "embed/")
                    .replace("youtu.be/", "youtube.com/embed/")}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
