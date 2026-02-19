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
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Link from "next/link";
import { IconPencil, IconEye } from "@tabler/icons-react";

type RecruitPost = {
  id: number;
  title: string;
  company: string;
  region: string;
  salary: string;
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

const MOCK_DATA: RecruitPost[] = [
  { id: 25, title: "25톤 크레인 운전기사 모집 (경력 5년 이상)", company: "대한건설", region: "서울", salary: "월 400만원~", category: "운전기사", date: "2025-01-15", views: 342 },
  { id: 24, title: "굴착기 운전원 급구 - 장기근무 가능자", company: "성진중기", region: "경기", salary: "월 350만원~", category: "운전기사", date: "2025-01-14", views: 287 },
  { id: 23, title: "중장비 정비사 채용 (유압 전문)", company: "중기나라", region: "인천", salary: "월 380만원~", category: "정비사", date: "2025-01-14", views: 195 },
  { id: 22, title: "현장 관리자 모집 - 아파트 신축현장", company: "우진건설", region: "경기", salary: "월 450만원~", category: "현장관리", date: "2025-01-13", views: 421 },
  { id: 21, title: "지게차 운전기사 (주간근무)", company: "삼성물류", region: "충남", salary: "월 300만원~", category: "운전기사", date: "2025-01-13", views: 156 },
  { id: 20, title: "경리/사무직 채용 - 건설장비 회사", company: "태양기계", region: "서울", salary: "월 280만원~", category: "사무직", date: "2025-01-12", views: 234 },
  { id: 19, title: "타워크레인 운전원 모집 (T/C 면허 소지자)", company: "극동건설", region: "경남", salary: "월 500만원~", category: "운전기사", date: "2025-01-12", views: 512 },
  { id: 18, title: "불도저 운전기사 채용", company: "현대중공업", region: "경북", salary: "월 380만원~", category: "운전기사", date: "2025-01-11", views: 178 },
  { id: 17, title: "건설장비 엔진 정비기사 모집", company: "두산중기", region: "전남", salary: "월 400만원~", category: "정비사", date: "2025-01-11", views: 203 },
  { id: 16, title: "현장 안전관리자 (산업안전기사 우대)", company: "포스코건설", region: "충북", salary: "월 420만원~", category: "현장관리", date: "2025-01-10", views: 367 },
  { id: 15, title: "페이로더 운전기사 급구", company: "금호건설", region: "강원", salary: "일 25만원", category: "운전기사", date: "2025-01-10", views: 145 },
  { id: 14, title: "건설기계 영업직 채용", company: "볼보건설기계", region: "서울", salary: "월 350만원+인센티브", category: "사무직", date: "2025-01-09", views: 298 },
  { id: 13, title: "항타기 운전원 모집 (경력 3년↑)", company: "대림건설", region: "전북", salary: "월 450만원~", category: "운전기사", date: "2025-01-09", views: 189 },
  { id: 12, title: "중장비 도장/판금 기술자", company: "한국중기정비", region: "경기", salary: "월 350만원~", category: "정비사", date: "2025-01-08", views: 132 },
  { id: 11, title: "콘크리트 펌프카 운전기사", company: "쌍용건설", region: "인천", salary: "월 400만원~", category: "운전기사", date: "2025-01-08", views: 267 },
];

const ITEMS_PER_PAGE = 10;

type SortType = "latest" | "salary" | "views";

export function RecruitBoard() {
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
    if (sortBy === "salary") {
      const extractNumber = (s: string) => parseInt(s.replace(/[^0-9]/g, "")) || 0;
      return extractNumber(b.salary) - extractNumber(a.salary);
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
              ["salary", "급여순"],
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
            <Link href="/recruit/write">
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
              <TableHead className="w-24 text-sm">회사명</TableHead>
              <TableHead className="w-20 text-sm">지역</TableHead>
              <TableHead className="w-32 text-sm">급여</TableHead>
              <TableHead className="w-24 text-sm">등록일</TableHead>
              <TableHead className="w-16 text-center text-sm">조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-sm text-neutral-500">
                  등록된 구인 공고가 없습니다.
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
                  <TableCell className="text-sm text-neutral-700 dark:text-neutral-300">{post.company}</TableCell>
                  <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">{post.region}</TableCell>
                  <TableCell className="text-sm font-medium text-blue-600 dark:text-blue-400">{post.salary}</TableCell>
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
            등록된 구인 공고가 없습니다.
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
                  </div>
                  <p className="truncate text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {post.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{post.company}</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{post.salary}</span>
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
        총 {filteredData.length}건의 구인 공고
      </div>
    </div>
  );
}
