"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BoardPostView } from "@/lib/board-queries";
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

const ITEMS_PER_PAGE = 10;

// ─── Component ───────────────────────────────────────
interface BoardContentProps {
  categories?: string[];
  categoryColors?: Record<string, string>;
  posts: BoardPostView[];
  boardSlug: string;
  writeUrl?: string;
}

export function BoardContent({
  categories = DEFAULT_CATEGORIES,
  categoryColors = DEFAULT_CATEGORY_COLORS,
  posts,
  boardSlug,
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
              <TableRow
                key={`pin-${post.id}`}
                className="cursor-pointer bg-neutral-50/50 dark:bg-neutral-800/20"
                onClick={() => (window.location.href = `/board/${boardSlug}/${post.id}`)}
              >
                <TableCell className="text-center">
                  <IconPin className="mx-auto h-4 w-4 text-red-500" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={categoryColors[post.category] || ""}>
                      {post.category}
                    </Badge>
                    <Link
                      href={`/board/${boardSlug}/${post.id}`}
                      className="text-sm font-semibold text-neutral-900 hover:underline dark:text-neutral-100"
                    >
                      {post.title}
                    </Link>
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
                <TableRow
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => (window.location.href = `/board/${boardSlug}/${post.id}`)}
                >
                  <TableCell className="text-center text-sm text-neutral-500">{post.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[post.category] || ""}>
                        {post.category}
                      </Badge>
                      <Link
                        href={`/board/${boardSlug}/${post.id}`}
                        className="text-sm font-medium text-neutral-900 hover:underline dark:text-neutral-100"
                      >
                        {post.title}
                      </Link>
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
          <Link
            key={`pin-m-${post.id}`}
            href={`/board/${boardSlug}/${post.id}`}
            className="block cursor-pointer border border-red-200 bg-red-50/30 p-3.5 transition hover:bg-red-50 dark:border-red-900/30 dark:bg-red-900/10 dark:hover:bg-red-900/20"
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
          </Link>
        ))}

        {/* Regular mobile */}
        {paginatedData.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-500">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          paginatedData.map((post) => (
            <Link
              key={post.id}
              href={`/board/${boardSlug}/${post.id}`}
              className="block cursor-pointer border border-neutral-200 bg-white p-3.5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/70"
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
            </Link>
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
