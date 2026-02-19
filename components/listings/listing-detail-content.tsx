"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  IconPhone,
  IconChevronLeft,
  IconChevronRight,
  IconBrandYoutube,
} from "@tabler/icons-react";
import type { ListingItem } from "@/lib/constants/mock-listings";
import { gradeStyle } from "@/lib/constants/mock-listings";

// ─── Type Badge Color ────────────────────────────────
const typeStyle: Record<string, string> = {
  매매: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  대여: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  급매: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

// ─── Info Table Row ──────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
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
  listing: ListingItem;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const prevImage = () =>
    setSelectedImage((i) =>
      i === 0 ? listing.images.length - 1 : i - 1
    );
  const nextImage = () =>
    setSelectedImage((i) =>
      i === listing.images.length - 1 ? 0 : i + 1
    );

  return (
    <div className="mt-4">
      {/* ═══ Top: Title + Price + Badges ═══ */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={cn("text-xs font-bold", gradeStyle[listing.grade])}>
          {listing.grade}급
        </Badge>
        <Badge className={cn("text-xs font-medium", typeStyle[listing.type])}>
          {listing.type}
        </Badge>
        {listing.isVip && (
          <Badge className="bg-orange-600 text-xs font-bold text-white">
            VIP
          </Badge>
        )}
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
        {listing.priceLabel}
      </p>

      {/* ═══ Image Gallery + Contact ═══ */}
      <div className="mt-5 flex flex-col gap-6 lg:flex-row">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
            <img
              src={listing.images[selectedImage]}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
            {listing.images.length > 1 && (
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
            <div className="absolute right-2 bottom-2 bg-black/60 px-2 py-0.5 text-xs text-white">
              {selectedImage + 1} / {listing.images.length}
            </div>
          </div>
          {listing.images.length > 1 && (
            <div className="mt-2 flex gap-1.5 overflow-x-auto">
              {listing.images.map((img, i) => (
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
          {/* ── 연락처 ── */}
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

      {/* ═══ Spec Sections (등록폼 구조와 동일) ═══ */}
      <div className="mt-8 space-y-6">
        {/* ── 기본 정보 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              기본 정보
            </h2>
          </div>
          <dl>
            <InfoRow label="구분" value={
              <Badge className={cn("text-xs font-medium", typeStyle[listing.type])}>
                {listing.type}
              </Badge>
            } />
            <InfoRow
              label="제작년월"
              value={`${listing.year}년 ${String(listing.month).padStart(2, "0")}월`}
            />
            <InfoRow label="분류" value={listing.category} />
            <InfoRow label="상태등급" value={
              <Badge className={cn("text-xs font-bold", gradeStyle[listing.grade])}>
                {listing.grade}급
              </Badge>
            } />
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
            <InfoRow label="엔진" value={`${listing.engine}마력`} />
            <InfoRow label="미션" value={listing.transmission} />
            <InfoRow label="톤수" value={`${listing.tonnage}톤`} />
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
                <span className="font-bold text-primary">{listing.priceLabel}</span>
              }
            />
            <InfoRow label="위치" value={listing.region} />
            <InfoRow label="할부/현금" value={listing.payment} />
            <InfoRow label="운행 KM/HR" value={listing.hours} />
          </dl>
        </section>

        {/* ── 하부 정보 ── */}
        <section className="border border-neutral-200 dark:border-neutral-800">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              하부 정보
            </h2>
          </div>
          <dl>
            <InfoRow label="하부타입" value={listing.undercarriageType} />
            <InfoRow label="하부상태" value={listing.undercarriageCondition} />
          </dl>
        </section>

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
