"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  IconPencil,
  IconEye,
  IconSearch,
  IconMessage,
  IconPin,
} from "@tabler/icons-react";

// ─── Types ───────────────────────────────────────────
type BoardPost = {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  views: number;
  comments: number;
  isPinned?: boolean;
};

type SortType = "latest" | "views" | "comments";

// ─── Default Constants ──────────────────────────────
const DEFAULT_CATEGORIES = ["전체", "잡담", "질문", "정보공유", "후기", "기타"];

const DEFAULT_CATEGORY_COLORS: Record<string, string> = {
  잡담: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  질문: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  정보공유: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  후기: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  기타: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

const DEFAULT_MOCK_DATA: BoardPost[] = [
  { id: 1, title: "[공지] 중기나라 자유게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 1542, comments: 3, isPinned: true },
  { id: 2, title: "[공지] 허위 매물 신고 안내 및 주의사항", author: "관리자", category: "정보공유", date: "2025-01-10", views: 987, comments: 5, isPinned: true },
  { id: 30, title: "굴착기 면허 취득 후기 공유합니다", author: "장비맨", category: "후기", date: "2025-01-15", views: 342, comments: 12 },
  { id: 29, title: "두산 DX225 vs 현대 R220 어떤게 나을까요?", author: "건설왕", category: "질문", date: "2025-01-15", views: 567, comments: 23 },
  { id: 28, title: "올해 중장비 시장 전망 어떻게 보시나요", author: "중기사랑", category: "잡담", date: "2025-01-14", views: 423, comments: 18 },
  { id: 27, title: "CAT 336 유압펌프 교체 비용 문의", author: "정비초보", category: "질문", date: "2025-01-14", views: 234, comments: 8 },
  { id: 26, title: "건설기계 보험료 비교 정보 공유", author: "보험전문", category: "정보공유", date: "2025-01-14", views: 678, comments: 15 },
  { id: 25, title: "경기도 현장 일감 요즘 어떤가요", author: "자유인", category: "잡담", date: "2025-01-13", views: 312, comments: 21 },
  { id: 24, title: "볼보 EC210B 3만시간 사용 후기", author: "볼보매니아", category: "후기", date: "2025-01-13", views: 456, comments: 9 },
  { id: 23, title: "중장비 운송비 평균 얼마나 하나요?", author: "물류맨", category: "질문", date: "2025-01-13", views: 289, comments: 14 },
  { id: 22, title: "겨울철 장비 관리 팁 공유합니다", author: "정비마스터", category: "정보공유", date: "2025-01-12", views: 534, comments: 7 },
  { id: 21, title: "20톤 굴착기 일일 대여료 시세 문의", author: "현장소장", category: "질문", date: "2025-01-12", views: 378, comments: 11 },
  { id: 20, title: "타워크레인 T/C 면허 학원 추천 부탁", author: "면허준비생", category: "질문", date: "2025-01-12", views: 198, comments: 6 },
  { id: 19, title: "건설기계 등록번호 변경 절차 안내", author: "행정전문", category: "정보공유", date: "2025-01-11", views: 445, comments: 4 },
  { id: 18, title: "덤프 기사님들 요즘 유가 부담 어떠세요", author: "덤프기사", category: "잡담", date: "2025-01-11", views: 267, comments: 19 },
  { id: 17, title: "히타치 ZX200-5G 구매 후기", author: "장비수집가", category: "후기", date: "2025-01-11", views: 389, comments: 8 },
  { id: 16, title: "건설현장 안전사고 예방 수칙", author: "안전관리자", category: "정보공유", date: "2025-01-10", views: 623, comments: 3 },
  { id: 15, title: "중고 브레이커 어디서 구하면 좋을까요", author: "파쇄맨", category: "질문", date: "2025-01-10", views: 156, comments: 10 },
  { id: 14, title: "지게차 운전 시 주의사항 정리", author: "물류담당", category: "정보공유", date: "2025-01-09", views: 412, comments: 5 },
  { id: 13, title: "이번 달 성남 현장 마무리했습니다", author: "현장일기", category: "잡담", date: "2025-01-09", views: 189, comments: 7 },
  { id: 12, title: "코벨코 SK200 엔진 오일 교환 주기 문의", author: "초보운전", category: "질문", date: "2025-01-08", views: 234, comments: 9 },
  { id: 11, title: "건설기계 GPS 부착 의무화 관련 정보", author: "IT건설", category: "정보공유", date: "2025-01-08", views: 567, comments: 12 },
  { id: 10, title: "로더 L 면허로 운전 가능한 장비 종류", author: "면허궁금", category: "질문", date: "2025-01-07", views: 345, comments: 8 },
  { id: 9, title: "두산 DX340 6천시간 장기사용 후기", author: "두산팬", category: "후기", date: "2025-01-07", views: 478, comments: 14 },
  { id: 8, title: "새해 인사드립니다 올해도 안전운행!", author: "안전제일", category: "잡담", date: "2025-01-06", views: 312, comments: 25 },
];

const ITEMS_PER_PAGE = 10;

// ─── Component ───────────────────────────────────────
interface BoardContentProps {
  categories?: string[];
  categoryColors?: Record<string, string>;
  posts?: BoardPost[];
  writeUrl?: string;
}

export function BoardContent({
  categories = DEFAULT_CATEGORIES,
  categoryColors = DEFAULT_CATEGORY_COLORS,
  posts = DEFAULT_MOCK_DATA,
  writeUrl = "/board/write",
}: BoardContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const pinnedPosts = posts.filter((p) => p.isPinned);

  const filteredData = useMemo(() => {
    return posts.filter((item) => {
      if (item.isPinned) return false;
      if (selectedCategory !== "전체" && item.category !== selectedCategory) return false;
      if (searchQuery && !item.title.includes(searchQuery) && !item.author.includes(searchQuery)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "comments") return b.comments - a.comments;
      return b.id - a.id;
    });
  }, [selectedCategory, sortBy, searchQuery, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="제목 또는 작성자 검색"
          className="pl-9"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
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

      {/* Sort + Write */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {([
            ["latest", "최신순"],
            ["views", "조회순"],
            ["comments", "댓글순"],
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
          <Link href={writeUrl}>
            <IconPencil className="size-3.5" />
            글쓰기
          </Link>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center text-sm">번호</TableHead>
              <TableHead className="text-sm">제목</TableHead>
              <TableHead className="w-20 text-sm">작성자</TableHead>
              <TableHead className="w-24 text-sm">등록일</TableHead>
              <TableHead className="w-16 text-center text-sm">조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Pinned */}
            {pinnedPosts.map((post) => (
              <TableRow key={`pin-${post.id}`} className="cursor-pointer bg-neutral-50/50 dark:bg-neutral-800/20">
                <TableCell className="text-center">
                  <IconPin className="mx-auto h-4 w-4 text-red-500" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={categoryColors[post.category] || ""}>
                      {post.category}
                    </Badge>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {post.title}
                    </span>
                    {post.comments > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-xs text-blue-500">
                        <IconMessage className="h-3 w-3" />
                        {post.comments}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-neutral-700 dark:text-neutral-300">{post.author}</TableCell>
                <TableCell className="text-sm text-neutral-500 dark:text-neutral-400">{post.date}</TableCell>
                <TableCell className="text-center text-sm text-neutral-500">
                  <span className="inline-flex items-center gap-0.5">
                    <IconEye className="size-3.5" />
                    {post.views}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {/* Regular */}
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-sm text-neutral-500">
                  등록된 게시글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((post) => (
                <TableRow key={post.id} className="cursor-pointer">
                  <TableCell className="text-center text-sm text-neutral-500">{post.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[post.category] || ""}>
                        {post.category}
                      </Badge>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {post.title}
                      </span>
                      {post.comments > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-xs text-blue-500">
                          <IconMessage className="h-3 w-3" />
                          {post.comments}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700 dark:text-neutral-300">{post.author}</TableCell>
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
        {/* Pinned mobile */}
        {pinnedPosts.map((post) => (
          <div
            key={`pin-m-${post.id}`}
            className="cursor-pointer border border-red-200 bg-red-50/30 p-3.5 transition hover:bg-red-50 dark:border-red-900/30 dark:bg-red-900/10 dark:hover:bg-red-900/20"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <IconPin className="h-3.5 w-3.5 text-red-500" />
              <Badge variant="outline" className={categoryColors[post.category] || ""}>
                {post.category}
              </Badge>
            </div>
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {post.title}
            </p>
            <div className="mt-2 flex items-center justify-between text-sm text-neutral-400">
              <span>{post.author} · {post.date}</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-0.5">
                  <IconEye className="size-3.5" />
                  {post.views}
                </span>
                <span className="inline-flex items-center gap-0.5 text-blue-500">
                  <IconMessage className="size-3.5" />
                  {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Regular mobile */}
        {paginatedData.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-500">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          paginatedData.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer border border-neutral-200 bg-white p-3.5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/70"
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <Badge variant="outline" className={categoryColors[post.category] || ""}>
                  {post.category}
                </Badge>
              </div>
              <p className="truncate text-base font-medium text-neutral-900 dark:text-neutral-100">
                {post.title}
              </p>
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-400">
                <span>{post.author} · {post.date}</span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-0.5">
                    <IconEye className="size-3.5" />
                    {post.views}
                  </span>
                  {post.comments > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-blue-500">
                      <IconMessage className="size-3.5" />
                      {post.comments}
                    </span>
                  )}
                </div>
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
        총 {filteredData.length}건의 게시글
      </div>
    </div>
  );
}
