"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { IconPencil, IconEye } from "@tabler/icons-react";

type JobPost = {
  id: number;
  title: string;
  name: string;
  experience: string;
  region: string;
  desiredSalary: string;
  category: string;
  date: string;
  views: number;
};

const CATEGORIES = ["전체", "운전기사", "정비사", "현장관리", "사무직", "기타"];
const REGIONS = ["전체", "서울", "경기", "인천", "충남", "충북", "전남", "전북", "경남", "경북", "강원", "제주"];

const CATEGORY_COLORS: Record<string, string> = {
  운전기사: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  정비사: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  현장관리: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  사무직: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  기타: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300",
};

const MOCK_DATA: JobPost[] = [
  { id: 20, title: "굴착기 운전 경력 10년, 성실한 기사입니다", name: "김○○", experience: "10년", region: "서울", desiredSalary: "월 400만원~", category: "운전기사", date: "2025-01-15", views: 198 },
  { id: 19, title: "크레인 25톤/50톤 운전 가능합니다", name: "이○○", experience: "8년", region: "경기", desiredSalary: "월 380만원~", category: "운전기사", date: "2025-01-14", views: 256 },
  { id: 18, title: "중장비 유압/엔진 정비 전문", name: "박○○", experience: "15년", region: "인천", desiredSalary: "월 420만원~", category: "정비사", date: "2025-01-14", views: 312 },
  { id: 17, title: "건설현장 관리 경험 풍부 (안전관리자 자격)", name: "최○○", experience: "12년", region: "경기", desiredSalary: "월 450만원~", category: "현장관리", date: "2025-01-13", views: 287 },
  { id: 16, title: "지게차/페이로더 운전 가능", name: "정○○", experience: "5년", region: "충남", desiredSalary: "월 300만원~", category: "운전기사", date: "2025-01-13", views: 134 },
  { id: 15, title: "건설기계 사무/경리 경력자", name: "한○○", experience: "7년", region: "서울", desiredSalary: "월 280만원~", category: "사무직", date: "2025-01-12", views: 189 },
  { id: 14, title: "타워크레인 T/C 면허 보유 운전원", name: "강○○", experience: "6년", region: "경남", desiredSalary: "월 480만원~", category: "운전기사", date: "2025-01-12", views: 401 },
  { id: 13, title: "불도저/로더 운전 경력자 구직합니다", name: "윤○○", experience: "9년", region: "경북", desiredSalary: "월 370만원~", category: "운전기사", date: "2025-01-11", views: 165 },
  { id: 12, title: "디젤엔진 및 유압장치 정비 전문기술자", name: "장○○", experience: "20년", region: "전남", desiredSalary: "월 450만원~", category: "정비사", date: "2025-01-11", views: 278 },
  { id: 11, title: "안전관리자 1급 보유, 현장관리 희망", name: "임○○", experience: "11년", region: "충북", desiredSalary: "월 400만원~", category: "현장관리", date: "2025-01-10", views: 223 },
  { id: 10, title: "콘크리트 펌프카 운전 전문", name: "오○○", experience: "7년", region: "강원", desiredSalary: "월 380만원~", category: "운전기사", date: "2025-01-10", views: 156 },
  { id: 9, title: "건설장비 영업 경력 5년", name: "서○○", experience: "5년", region: "서울", desiredSalary: "월 350만원+인센티브", category: "사무직", date: "2025-01-09", views: 201 },
  { id: 8, title: "항타기/천공기 운전 가능합니다", name: "조○○", experience: "13년", region: "전북", desiredSalary: "월 430만원~", category: "운전기사", date: "2025-01-09", views: 178 },
  { id: 7, title: "중장비 도장/판금 기술 보유", name: "신○○", experience: "8년", region: "경기", desiredSalary: "월 340만원~", category: "정비사", date: "2025-01-08", views: 112 },
  { id: 6, title: "덤프트럭 운전 경력 15년", name: "권○○", experience: "15년", region: "인천", desiredSalary: "월 350만원~", category: "운전기사", date: "2025-01-08", views: 189 },
];

const ITEMS_PER_PAGE = 10;

type SortType = "latest" | "experience" | "views";

export function JobsBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [sortBy, setSortBy] = useState<SortType>("latest");

  const filteredData = MOCK_DATA.filter((item) => {
    if (selectedCategory !== "전체" && item.category !== selectedCategory) return false;
    if (selectedRegion !== "전체" && item.region !== selectedRegion) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "experience") {
      const extractNumber = (s: string) => parseInt(s.replace(/[^0-9]/g, "")) || 0;
      return extractNumber(b.experience) - extractNumber(a.experience);
    }
    return b.id - a.id;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="space-y-3">
        {/* Region filter */}
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              size="xs"
              className="cursor-pointer"
              onClick={() => {
                setSelectedRegion(region);
                setCurrentPage(1);
              }}
            >
              {region}
            </Button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="xs"
              className="cursor-pointer"
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Sort + Write button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {([
              ["latest", "최신순"],
              ["experience", "경력순"],
              ["views", "조회순"],
            ] as [SortType, string][]).map(([key, label]) => (
              <Button
                key={key}
                variant={sortBy === key ? "secondary" : "ghost"}
                size="xs"
                className="cursor-pointer"
                onClick={() => setSortBy(key)}
              >
                {label}
              </Button>
            ))}
          </div>
          <Button size="sm" className="cursor-pointer gap-1" asChild>
            <Link href="/jobs/write">
              <IconPencil className="size-3.5" />
              글쓰기
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center text-sm">번호</TableHead>
              <TableHead className="text-sm">제목</TableHead>
              <TableHead className="w-20 text-sm">이름</TableHead>
              <TableHead className="w-16 text-sm">경력</TableHead>
              <TableHead className="w-20 text-sm">지역</TableHead>
              <TableHead className="w-32 text-sm">희망급여</TableHead>
              <TableHead className="w-24 text-sm">등록일</TableHead>
              <TableHead className="w-16 text-center text-sm">조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-sm text-neutral-500">
                  등록된 구직 글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((post) => (
                <TableRow key={post.id} className="cursor-pointer">
                  <TableCell className="text-center text-sm text-neutral-500">{post.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={CATEGORY_COLORS[post.category] || ""}
                      >
                        {post.category}
                      </Badge>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {post.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700 dark:text-neutral-300">{post.name}</TableCell>
                  <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">{post.experience}</TableCell>
                  <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">{post.region}</TableCell>
                  <TableCell className="text-sm font-medium text-blue-600 dark:text-blue-400">{post.desiredSalary}</TableCell>
                  <TableCell className="text-sm text-neutral-500 dark:text-neutral-400">{post.date}</TableCell>
                  <TableCell className="text-center text-sm text-neutral-500">
                    <span className="inline-flex items-center gap-0.5">
                      <IconEye className="size-3.5" />
                      {post.views}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="space-y-2 sm:hidden">
        {paginatedData.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-500">
            등록된 구직 글이 없습니다.
          </div>
        ) : (
          paginatedData.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer border border-neutral-200 bg-white p-3.5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/70"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className={CATEGORY_COLORS[post.category] || ""}
                    >
                      {post.category}
                    </Badge>
                    <span className="text-sm text-neutral-500">{post.region}</span>
                    <span className="text-sm text-neutral-400">|</span>
                    <span className="text-sm text-neutral-500">경력 {post.experience}</span>
                  </div>
                  <p className="truncate text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {post.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{post.name}</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{post.desiredSalary}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-400">
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-0.5">
                  <IconEye className="size-3.5" />
                  {post.views}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="이전"
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                text="다음"
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Total count */}
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        총 {filteredData.length}건의 구직 등록
      </div>
    </div>
  );
}
