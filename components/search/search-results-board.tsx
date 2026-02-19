"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_LISTINGS,
  gradeStyle,
  type ListingItem,
} from "@/lib/constants/mock-listings";
import { CATEGORIES } from "@/lib/constants/categories";
import { REGION_OPTIONS } from "@/lib/constants/listing-options";
import {
  IconSearch,
  IconSortDescending,
  IconLayoutGrid,
  IconList,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconClock,
  IconTag,
} from "@tabler/icons-react";

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "price-high", label: "가격높은순" },
  { value: "price-low", label: "가격낮은순" },
  { value: "year-new", label: "연식최신순" },
];

const ITEMS_PER_PAGE = 12;

interface SearchResultsBoardProps {
  query: string;
}

export function SearchResultsBoard({ query }: SearchResultsBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    let results = MOCK_LISTINGS;

    // Text search
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.manufacturer.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "전체") {
      results = results.filter((item) => item.categorySlug === selectedCategory);
    }

    // Region filter
    if (selectedRegion !== "전체") {
      results = results.filter((item) => item.region === selectedRegion);
    }

    // Sort
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "year-new":
          return b.year - a.year || b.month - a.month;
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return results;
  }, [query, selectedCategory, selectedRegion, sortBy]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <IconTag className="h-4 w-4" />
          카테고리
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            onClick={() => handleCategoryChange("전체")}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition",
              selectedCategory === "전체"
                ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
            )}
          >
            전체
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition",
                selectedCategory === cat.slug
                  ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <IconMapPin className="h-4 w-4" />
          지역
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            onClick={() => handleRegionChange("전체")}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition",
              selectedRegion === "전체"
                ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
            )}
          >
            전체
          </button>
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.value}
              onClick={() => handleRegionChange(region.value)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition",
                selectedRegion === region.value
                  ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
              )}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: Result count + Sort + View mode */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          검색결과{" "}
          <span className="font-bold text-orange-600">{filteredData.length}</span>건
        </p>
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <IconSortDescending className="h-4 w-4 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {/* View mode */}
          <div className="flex overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "cursor-pointer p-1.5 transition",
                viewMode === "grid"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
                  : "bg-white text-neutral-400 hover:text-neutral-600 dark:bg-neutral-900 dark:hover:text-neutral-300"
              )}
            >
              <IconLayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "cursor-pointer p-1.5 transition",
                viewMode === "list"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
                  : "bg-white text-neutral-400 hover:text-neutral-600 dark:bg-neutral-900 dark:hover:text-neutral-300"
              )}
            >
              <IconList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {paginatedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white py-20 dark:border-neutral-800 dark:bg-neutral-900">
          <IconSearch className="h-12 w-12 text-neutral-300 dark:text-neutral-600" />
          <p className="mt-4 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
            검색 결과가 없습니다
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            다른 검색어나 필터 조건을 시도해 보세요
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {paginatedData.map((item) => (
            <GridCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedData.map((item) => (
            <ListCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="cursor-pointer rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition",
                currentPage === page
                  ? "bg-orange-600 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              )}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="cursor-pointer rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function GridCard({ item }: { item: ListingItem }) {
  return (
    <Link href={item.href} className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute left-2 top-2 text-[10px] font-bold",
              gradeStyle[item.grade]
            )}
          >
            {item.grade}급
          </Badge>
          {item.isVip && (
            <Badge className="absolute right-2 top-2 bg-red-500 text-[10px] font-bold text-white">
              VIP
            </Badge>
          )}
          {item.type === "급매" && (
            <Badge className="absolute bottom-2 left-2 bg-red-600 text-[10px] font-bold text-white">
              급매
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5">
          <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
            {item.title}
          </h3>
          <p className="mt-0.5 text-sm font-bold text-primary">
            {item.priceLabel}
          </p>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span>{item.year}년</span>
            <span>·</span>
            <span>{item.hours}</span>
            <span>·</span>
            <span>{item.region}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ item }: { item: ListingItem }) {
  return (
    <Link href={item.href} className="group cursor-pointer">
      <div className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        {/* Image */}
        <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-36">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute left-1.5 top-1.5 text-[10px] font-bold",
              gradeStyle[item.grade]
            )}
          >
            {item.grade}급
          </Badge>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                {item.title}
              </h3>
              {item.isVip && (
                <Badge className="bg-red-500 text-[10px] font-bold text-white">
                  VIP
                </Badge>
              )}
              {item.type === "급매" && (
                <Badge className="bg-red-600 text-[10px] font-bold text-white">
                  급매
                </Badge>
              )}
            </div>
            <p className="mt-0.5 text-sm font-bold text-primary">
              {item.priceLabel}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <IconClock className="h-3 w-3" />
              {item.year}년 {item.month}월
            </span>
            <span>{item.hours}</span>
            <span className="flex items-center gap-1">
              <IconMapPin className="h-3 w-3" />
              {item.region}
            </span>
            <span className="hidden sm:inline">{item.manufacturer}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
