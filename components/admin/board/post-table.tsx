"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MoreHorizontal, Eye, EyeOff, Trash2, Pin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_POSTS, getStatusColor } from "@/lib/constants/mock-admin";

const ITEMS_PER_PAGE = 10;

export function PostTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [boardFilter, setBoardFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const boards = useMemo(
    () => [...new Set(MOCK_POSTS.map((p) => p.board))],
    []
  );

  const filtered = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchSearch =
        !search ||
        post.title.includes(search) ||
        post.author.includes(search) ||
        post.id.includes(search);
      const matchStatus = statusFilter === "all" || post.status === statusFilter;
      const matchBoard = boardFilter === "all" || post.board === boardFilter;
      return matchSearch && matchStatus && matchBoard;
    });
  }, [search, statusFilter, boardFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="제목, 작성자, ID 검색"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={boardFilter} onValueChange={(v) => { setBoardFilter(v); setPage(1); }}>
            <SelectTrigger className="w-28 cursor-pointer">
              <SelectValue placeholder="게시판" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">전체</SelectItem>
              {boards.map((b) => (
                <SelectItem key={b} value={b} className="cursor-pointer">{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-28 cursor-pointer">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">전체 상태</SelectItem>
              <SelectItem value="게시중" className="cursor-pointer">게시중</SelectItem>
              <SelectItem value="숨김" className="cursor-pointer">숨김</SelectItem>
              <SelectItem value="삭제" className="cursor-pointer">삭제</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">게시판</TableHead>
              <TableHead className="hidden md:table-cell">작성자</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden lg:table-cell">조회</TableHead>
              <TableHead className="hidden lg:table-cell">댓글</TableHead>
              <TableHead className="hidden lg:table-cell">등록일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((post) => (
              <TableRow key={post.id} className={post.isNotice ? "bg-muted/30" : ""}>
                <TableCell className="font-mono text-xs">{post.id}</TableCell>
                <TableCell className="font-medium max-w-[250px] truncate">
                  <Link
                    href={`/hs-ctrl-x7k9m/board/${post.id}`}
                    className="hover:underline cursor-pointer"
                  >
                    {post.isNotice && (
                      <Pin className="inline-block size-3 mr-1 text-primary" />
                    )}
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">
                  <Badge variant="outline" className="text-[11px]">{post.board}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {post.author}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-[11px] ${getStatusColor(post.status)}`}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {post.views.toLocaleString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {post.comments}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {post.createdAt}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/hs-ctrl-x7k9m/board/${post.id}`}>
                          <Eye className="mr-2 size-4" />
                          상세보기
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <EyeOff className="mr-2 size-4" />
                        {post.status === "숨김" ? "게시 복원" : "숨김 처리"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        <Trash2 className="mr-2 size-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">총 {filtered.length}건</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={page === 1} onClick={() => setPage(page - 1)}>
              이전
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="sm" className="cursor-pointer w-8" onClick={() => setPage(p)}>
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
