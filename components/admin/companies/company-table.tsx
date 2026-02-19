"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Ban } from "lucide-react";
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
import { MOCK_COMPANIES, getStatusColor } from "@/lib/constants/mock-admin";

const ITEMS_PER_PAGE = 10;

export function CompanyTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_COMPANIES.filter((company) => {
      const matchSearch =
        !search ||
        company.name.includes(search) ||
        company.representative.includes(search) ||
        company.businessNumber.includes(search);
      const matchStatus = statusFilter === "all" || company.status === statusFilter;
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
            placeholder="업체명, 대표자, 사업자번호 검색"
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
            <SelectItem value="승인" className="cursor-pointer">승인</SelectItem>
            <SelectItem value="심사중" className="cursor-pointer">심사중</SelectItem>
            <SelectItem value="반려" className="cursor-pointer">반려</SelectItem>
            <SelectItem value="정지" className="cursor-pointer">정지</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>업체명</TableHead>
              <TableHead className="hidden md:table-cell">대표자</TableHead>
              <TableHead className="hidden lg:table-cell">연락처</TableHead>
              <TableHead className="hidden lg:table-cell">유형</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden lg:table-cell">매물수</TableHead>
              <TableHead className="hidden lg:table-cell">등록일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-mono text-xs">{company.id}</TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/hs-ctrl-x7k9m/companies/${company.id}`}
                    className="hover:underline cursor-pointer"
                  >
                    {company.name}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {company.representative}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {company.phone}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm">
                  <Badge variant="outline" className="text-[11px]">{company.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-[11px] ${getStatusColor(company.status)}`}>
                    {company.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {company.listingCount}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {company.registeredAt}
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
                        <Link href={`/hs-ctrl-x7k9m/companies/${company.id}`}>
                          <Eye className="mr-2 size-4" />
                          상세보기
                        </Link>
                      </DropdownMenuItem>
                      {company.status === "심사중" && (
                        <>
                          <DropdownMenuItem className="cursor-pointer">
                            <CheckCircle className="mr-2 size-4" />
                            승인
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <XCircle className="mr-2 size-4" />
                            반려
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        <Ban className="mr-2 size-4" />
                        정지
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
          <p className="text-sm text-muted-foreground">총 {filtered.length}개</p>
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
