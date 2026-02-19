"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
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
import { getStatusColor } from "@/lib/constants/mock-admin";
import { updateListingStatus } from "@/lib/listing-actions";
import type { AdminListingView } from "@/lib/listing-queries";

const ITEMS_PER_PAGE = 10;

interface ListingTableProps {
  listings: AdminListingView[];
}

export function ListingTable({ listings }: ListingTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const categories = useMemo(
    () => [...new Set(listings.map((l) => l.category))],
    [listings]
  );

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      const matchSearch =
        !search ||
        listing.title.includes(search) ||
        listing.seller.includes(search) ||
        listing.id.includes(search);
      const matchStatus = statusFilter === "all" || listing.status === statusFilter;
      const matchCategory = categoryFilter === "all" || listing.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [listings, search, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleAction(id: string, dbStatus: string) {
    startTransition(async () => {
      await updateListingStatus(id, dbStatus);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="제목, 판매자, ID 검색"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-28 cursor-pointer">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">전체 상태</SelectItem>
              <SelectItem value="판매중" className="cursor-pointer">판매중</SelectItem>
              <SelectItem value="예약중" className="cursor-pointer">예약중</SelectItem>
              <SelectItem value="판매완료" className="cursor-pointer">판매완료</SelectItem>
              <SelectItem value="심사중" className="cursor-pointer">심사중</SelectItem>
              <SelectItem value="반려" className="cursor-pointer">반려</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
            <SelectTrigger className="w-28 cursor-pointer">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">전체</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="cursor-pointer">
                  {cat}
                </SelectItem>
              ))}
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
              <TableHead className="hidden md:table-cell">카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead className="hidden lg:table-cell">판매자</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden lg:table-cell">조회</TableHead>
              <TableHead className="hidden lg:table-cell">등록일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-mono text-xs">{listing.id.slice(0, 8)}</TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  <Link
                    href={`/hs-ctrl-x7k9m/listings/${listing.id}`}
                    className="hover:underline cursor-pointer"
                  >
                    {listing.title}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {listing.category}
                </TableCell>
                <TableCell className="text-sm font-medium">{listing.price}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {listing.seller}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`text-[11px] ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {listing.views.toLocaleString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {listing.createdAt}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 cursor-pointer" disabled={isPending}>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/hs-ctrl-x7k9m/listings/${listing.id}`}>
                          <Eye className="mr-2 size-4" />
                          상세보기
                        </Link>
                      </DropdownMenuItem>
                      {listing.status !== "판매중" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleAction(listing.id, "active")}
                        >
                          <CheckCircle className="mr-2 size-4" />
                          승인
                        </DropdownMenuItem>
                      )}
                      {listing.status !== "반려" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleAction(listing.id, "rejected")}
                        >
                          <XCircle className="mr-2 size-4" />
                          반려
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => handleAction(listing.id, "deleted")}
                      >
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
