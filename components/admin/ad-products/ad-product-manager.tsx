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
import { AdProductDialog, type AdProduct } from "./ad-product-dialog";

const ICON_LABELS: Record<string, string> = {
  "layout-board": "메인배너",
  "layout-sidebar": "사이드배너",
  crown: "VIP",
  briefcase: "구인구직",
};

const ZONE_LABELS: Record<string, string> = {
  "main-banner": "메인배너",
  "side-banner": "사이드배너",
  "vip-listing": "VIP매물",
  "vip-recruit": "VIP구인",
};

function formatCredits(n: number) {
  return n.toLocaleString("ko-KR");
}

export function AdProductManager() {
  const [products, setProducts] = useState<AdProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdProduct | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/ad-products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.includes(search) ||
      p.slug.includes(search) ||
      p.description.includes(search)
  );

  async function handleToggleActive(product: AdProduct) {
    await fetch("/api/admin/ad-products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id, is_active: !product.is_active }),
    });
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;
    await fetch(`/api/admin/ad-products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  }

  function handleEdit(product: AdProduct) {
    setEditingProduct(product);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setEditingProduct(null);
    fetchProducts();
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
            placeholder="상품명, 슬러그 검색"
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
          상품 추가
        </Button>
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          전체 {products.length}개 / 활성{" "}
          {products.filter((p) => p.is_active).length}개
        </span>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead className="hidden md:table-cell">설명</TableHead>
              <TableHead>아이콘</TableHead>
              <TableHead>영역</TableHead>
              <TableHead>1개월</TableHead>
              <TableHead>3개월</TableHead>
              <TableHead>6개월</TableHead>
              <TableHead className="hidden lg:table-cell">1년</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow
                key={product.id}
                className={!product.is_active ? "opacity-50" : ""}
              >
                <TableCell className="text-center text-sm text-muted-foreground">
                  {product.sort_order}
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    {product.name}
                    <p className="text-xs text-muted-foreground">
                      {product.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {product.description || "-"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[11px]">
                    {ICON_LABELS[product.icon_key] ?? product.icon_key}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[11px]">
                    {ZONE_LABELS[product.ad_zone] ?? product.ad_zone}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatCredits(product.credit_cost_monthly)}C
                </TableCell>
                <TableCell className="text-sm">
                  {formatCredits(product.credit_cost_3month)}C
                </TableCell>
                <TableCell className="text-sm">
                  {formatCredits(product.credit_cost_6month)}C
                </TableCell>
                <TableCell className="hidden text-sm lg:table-cell">
                  {formatCredits(product.credit_cost_yearly)}C
                </TableCell>
                <TableCell>
                  {product.is_active ? (
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
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="mr-2 size-4" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleToggleActive(product)}
                      >
                        {product.is_active ? (
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
                        onClick={() => handleDelete(product.id)}
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
                  colSpan={11}
                  className="h-24 text-center text-muted-foreground"
                >
                  {products.length === 0
                    ? "등록된 광고 상품이 없습니다."
                    : "검색 결과가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <AdProductDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        editingProduct={editingProduct}
      />
    </div>
  );
}
