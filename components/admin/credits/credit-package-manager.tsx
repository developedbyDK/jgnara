"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
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
  CreditPackageDialog,
  type CreditPackage,
} from "./credit-package-dialog";

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}

export function CreditPackageManager() {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<CreditPackage | null>(null);

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/credits");
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const filtered = packages.filter(
    (pkg) =>
      !search ||
      pkg.name.includes(search) ||
      pkg.slug.includes(search) ||
      pkg.tag?.includes(search)
  );

  async function handleToggleActive(pkg: CreditPackage) {
    await fetch("/api/admin/credits", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pkg.id, is_active: !pkg.is_active }),
    });
    fetchPackages();
  }

  async function handleTogglePopular(pkg: CreditPackage) {
    await fetch("/api/admin/credits", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pkg.id, popular: !pkg.popular }),
    });
    fetchPackages();
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;
    await fetch(`/api/admin/credits?id=${id}`, { method: "DELETE" });
    fetchPackages();
  }

  function handleEdit(pkg: CreditPackage) {
    setEditingPkg(pkg);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditingPkg(null);
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setEditingPkg(null);
    fetchPackages();
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 animate-pulse rounded bg-muted" />
        <div className="h-64 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="패키지명, 슬러그 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          className="cursor-pointer gap-1"
          onClick={handleAdd}
        >
          <Plus className="size-4" />
          패키지 추가
        </Button>
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          전체 {packages.length}개 / 활성{" "}
          {packages.filter((p) => p.is_active).length}개
        </span>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>패키지명</TableHead>
              <TableHead>포인트</TableHead>
              <TableHead>보너스</TableHead>
              <TableHead>총 포인트</TableHead>
              <TableHead>가격</TableHead>
              <TableHead className="hidden md:table-cell">태그</TableHead>
              <TableHead>인기</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pkg) => (
              <TableRow
                key={pkg.id}
                className={!pkg.is_active ? "opacity-50" : ""}
              >
                <TableCell className="text-center text-sm text-muted-foreground">
                  {pkg.sort_order}
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    {pkg.name}
                    <p className="text-xs text-muted-foreground">{pkg.slug}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {formatPrice(pkg.credits)}
                </TableCell>
                <TableCell className="text-sm">
                  {pkg.bonus > 0 ? (
                    <span className="text-orange-600 dark:text-orange-400">
                      +{formatPrice(pkg.bonus)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm font-semibold">
                  {formatPrice(pkg.credits + pkg.bonus)}
                </TableCell>
                <TableCell className="text-sm">
                  {formatPrice(pkg.price)}원
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {pkg.tag ? (
                    <Badge
                      variant="secondary"
                      className="text-[11px] text-orange-600 dark:text-orange-400"
                    >
                      {pkg.tag}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {pkg.popular ? (
                    <Badge className="gap-1 bg-orange-100 text-[11px] text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300">
                      <Sparkles className="size-3" />
                      인기
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {pkg.is_active ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-[11px] text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      활성
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-neutral-100 text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      비활성
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEdit(pkg)}
                      >
                        <Pencil className="mr-2 size-4" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleTogglePopular(pkg)}
                      >
                        <Sparkles className="mr-2 size-4" />
                        {pkg.popular ? "인기 해제" : "인기 설정"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleToggleActive(pkg)}
                      >
                        {pkg.is_active ? (
                          <>
                            <EyeOff className="mr-2 size-4" />
                            비활성화
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 size-4" />
                            활성화
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-muted-foreground"
                >
                  {packages.length === 0
                    ? "등록된 패키지가 없습니다."
                    : "검색 결과가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <CreditPackageDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        editingPackage={editingPkg}
      />
    </div>
  );
}
