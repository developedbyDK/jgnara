"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  IconMapPin,
  IconClock,
  IconCrown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  getListingsByCategory,
  gradeStyle,
  type ListingItem,
} from "@/lib/constants/mock-listings";

// ─── Types ───────────────────────────────────────────
type SortOption = "latest" | "price-asc" | "price-desc" | "grade";

const gradeOrder: Record<string, number> = {
  "A+": 0, A: 1, "A-": 2, "B+": 3, B: 4, "B-": 5, "C+": 6, C: 7, "C-": 8,
};

// ─── Sort Options ────────────────────────────────────
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "price-asc", label: "낮은가격순" },
  { value: "price-desc", label: "높은가격순" },
  { value: "grade", label: "등급순" },
];

const ITEMS_PER_PAGE = 10;

// ─── Default listings fallback ───────────────────────
function generateDefaultListings(slug: string): ListingItem[] {
  const grades = ["A+", "A", "A-", "B+", "B", "B-"] as const;
  const regions = ["경기", "서울", "충남", "경남", "부산", "인천", "전북", "대전"];
  const manufacturers = ["현대", "두산", "볼보", "CAT", "코벨코", "히타치"];
  const IMG = [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621922688758-8d99e2bead70?q=80&w=600&auto=format&fit=crop",
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: 9000 + i,
    title: `${manufacturers[i % manufacturers.length]} ${slug} 장비 ${i + 1}`,
    price: 2000 + i * 1200,
    priceLabel: `${(2000 + i * 1200).toLocaleString()}만원`,
    grade: grades[i % grades.length],
    year: 2019 + (i % 5),
    month: (i % 12) + 1,
    region: regions[i % regions.length],
    hours: `${(1500 + i * 800).toLocaleString()}HR`,
    images: [IMG[i % IMG.length]],
    href: "#",
    createdAt: `2025-01-${String(15 - i).padStart(2, "0")}`,
    manufacturer: manufacturers[i % manufacturers.length],
    model: `Model-${i + 1}`,
    category: slug,
    categorySlug: slug,
    isVip: i < 3,
    type: "매매" as const,
    engine: String(100 + i * 20),
    transmission: "자동",
    tonnage: String(5 + i * 3),
    payment: "협의",
    usageUnit: "HR" as const,
    undercarriageType: "철(STEEL)",
    undercarriageCondition: "중",
    companyName: `${regions[i % regions.length]}중기`,
    contact: "010-0000-0000",
    youtubeUrl: "",
    description: "",
    listingType: "무료" as const,
  }));
}

// ─── Component ───────────────────────────────────────
export function CategoryListingContent({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const [sort, setSort] = useState<SortOption>("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const allListings = (() => {
    const fromMock = getListingsByCategory(categorySlug);
    return fromMock.length > 0 ? fromMock : generateDefaultListings(categorySlug);
  })();

  const vipListings = allListings.filter((item) => item.isVip);
  const regularListings = allListings.filter((item) => !item.isVip);

  const sortedRegular = useMemo(() => {
    const sorted = [...regularListings];
    switch (sort) {
      case "latest":
        return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "grade":
        return sorted.sort(
          (a, b) => (gradeOrder[a.grade] ?? 99) - (gradeOrder[b.grade] ?? 99)
        );
      default:
        return sorted;
    }
  }, [regularListings, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedRegular.length / ITEMS_PER_PAGE));
  const paginatedRegular = sortedRegular.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* ═══════════════ VIP 매물 (사진 그리드) ═══════════════ */}
      {vipListings.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <IconCrown className="h-5 w-5 text-orange-500" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              VIP 매물
            </h2>
            <span className="text-xs text-neutral-400">
              {vipListings.length}건
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {vipListings.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden border border-orange-200 bg-white transition-shadow hover:shadow-md dark:border-orange-900/50 dark:bg-neutral-900">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge
                      className={cn(
                        "absolute top-2 left-2 text-[10px] font-bold",
                        gradeStyle[item.grade]
                      )}
                    >
                      {item.grade}급
                    </Badge>
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-orange-600 px-1.5 py-0.5">
                      <IconCrown className="h-3 w-3 text-white" />
                      <span className="text-[10px] font-bold text-white">
                        VIP
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-bold text-primary">
                      {item.priceLabel}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span>{item.year}년</span>
                      <span className="text-neutral-300 dark:text-neutral-600">|</span>
                      <span className="flex items-center gap-0.5">
                        <IconMapPin className="h-3 w-3" />
                        {item.region}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-600">|</span>
                      <span className="flex items-center gap-0.5">
                        <IconClock className="h-3 w-3" />
                        {item.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ 일반 매물 (게시판 형태) ═══════════════ */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              일반 매물
            </h2>
            <span className="text-xs text-neutral-400">
              {regularListings.length}건
            </span>
          </div>
          {/* Sort */}
          <div className="flex gap-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSort(option.value);
                  setCurrentPage(1);
                }}
                className={cn(
                  "cursor-pointer px-2.5 py-1 text-xs transition",
                  sort === option.value
                    ? "bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div className="mt-3 hidden border-y border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-500 sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto_auto] sm:items-center sm:gap-2 sm:px-3 sm:py-2.5 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
          <span>매물명</span>
          <span className="w-20 text-center">등급</span>
          <span className="w-24 text-right">가격</span>
          <span className="w-16 text-center">연식</span>
          <span className="w-16 text-center">지역</span>
          <span className="w-20 text-center">등록일</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-neutral-100 border-b border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {paginatedRegular.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group cursor-pointer"
            >
              {/* Desktop row */}
              <div className="hidden items-center gap-2 px-3 py-3 transition-colors hover:bg-neutral-50 sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto_auto] dark:hover:bg-neutral-800/50">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-700">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-neutral-900 group-hover:text-orange-600 dark:text-neutral-100 dark:group-hover:text-orange-400">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-neutral-400">
                      {item.manufacturer} · {item.hours}
                    </p>
                  </div>
                </div>
                <span className="w-20 text-center">
                  <Badge
                    className={cn(
                      "text-[10px] font-bold",
                      gradeStyle[item.grade]
                    )}
                  >
                    {item.grade}급
                  </Badge>
                </span>
                <span className="w-24 text-right text-sm font-bold text-primary">
                  {item.priceLabel}
                </span>
                <span className="w-16 text-center text-xs text-neutral-600 dark:text-neutral-400">
                  {item.year}년
                </span>
                <span className="w-16 text-center text-xs text-neutral-600 dark:text-neutral-400">
                  {item.region}
                </span>
                <span className="w-20 text-center text-xs text-neutral-400">
                  {item.createdAt.slice(5).replace("-", ".")}
                </span>
              </div>

              {/* Mobile row */}
              <div className="flex items-center gap-3 px-2 py-3 transition-colors hover:bg-neutral-50 sm:hidden dark:hover:bg-neutral-800/50">
                <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-bold text-primary">
                    {item.priceLabel}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400">
                    <Badge
                      className={cn(
                        "px-1 py-0 text-[9px] font-bold",
                        gradeStyle[item.grade]
                      )}
                    >
                      {item.grade}
                    </Badge>
                    <span>{item.year}년</span>
                    <span>{item.region}</span>
                    <span>{item.hours}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {sortedRegular.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              등록된 일반 매물이 없습니다
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer p-1.5 text-neutral-400 transition hover:text-neutral-900 disabled:cursor-default disabled:opacity-30 dark:hover:text-neutral-200"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "h-8 w-8 cursor-pointer text-sm transition",
                  currentPage === page
                    ? "bg-neutral-900 font-bold text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer p-1.5 text-neutral-400 transition hover:text-neutral-900 disabled:cursor-default disabled:opacity-30 dark:hover:text-neutral-200"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
