"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
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
import { MOCK_RECRUITS, getStatusColor } from "@/lib/constants/mock-admin";

const ITEMS_PER_PAGE = 10;

export function RecruitTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_RECRUITS.filter((recruit) => {
      const matchSearch =
        !search ||
        recruit.title.includes(search) ||
        recruit.company.includes(search) ||
        recruit.location.includes(search);
      const matchStatus = statusFilter === "all" || recruit.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="제목, 업체, 지역 검색"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-28 cursor-pointer">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">전체 상태</SelectItem>
            <SelectItem value="모집중" className="cursor-pointer">모집중</SelectItem>
            <SelectItem value="마감" className="cursor-pointer">마감</SelectItem>
            <SelectItem value="삭제" className="cursor-pointer">삭제</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">업체</TableHead>
              <TableHead className="hidden md:table-cell">지역</TableHead>
              <TableHead className="hidden lg:table-cell">급여</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden lg:table-cell">유형</TableHead>
              <TableHead className="hidden lg:table-cell">지원자</TableHead>
              <TableHead className="hidden lg:table-cell">마감일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((recruit) => (
              <TableRow key={recruit.id}>
                <TableCell className="font-mono text-xs">{recruit.id}</TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {recruit.title}
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {recruit.company}
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {recruit.location}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm">
                  {recruit.salary}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-[11px] ${getStatusColor(recruit.status)}`}>
                    {recruit.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm">
                  <Badge variant="outline" className="text-[11px]">{recruit.type}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {recruit.applicants}명
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {recruit.deadline}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="mr-2 size-4" />
                        상세보기
                      </DropdownMenuItem>
                      {recruit.status === "모집중" && (
                        <DropdownMenuItem className="cursor-pointer">
                          <XCircle className="mr-2 size-4" />
                          마감 처리
                        </DropdownMenuItem>
                      )}
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
                <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
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
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={page === 1} onClick={() => setPage(page - 1)}>이전</Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="sm" className="cursor-pointer w-8" onClick={() => setPage(p)}>{p}</Button>
            ))}
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={page === totalPages} onClick={() => setPage(page + 1)}>다음</Button>
          </div>
        </div>
      )}
    </div>
  );
}
