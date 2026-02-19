"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader2 } from "@tabler/icons-react";

type AdPurchase = {
  id: string;
  user_id: string;
  ad_product_id: string;
  duration: string;
  credits_spent: number;
  status: string;
  starts_at: string;
  ends_at: string;
  banner_image_url: string | null;
  link_url: string | null;
  admin_note: string | null;
  approved_at: string | null;
  created_at: string;
  ad_products: { name: string; slug: string; ad_zone: string } | null;
  profiles: { full_name: string; email: string } | null;
};

const ZONE_LABELS: Record<string, string> = {
  "main-banner": "메인배너",
  "side-banner": "사이드배너",
  "vip-listing": "VIP매물",
  "vip-recruit": "VIP구인",
};

const STATUS_TABS = ["전체", "승인대기", "진행중", "만료", "거절"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCredits(n: number) {
  return n.toLocaleString("ko-KR");
}

function getStatusBadge(status: string) {
  switch (status) {
    case "승인대기":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
          승인대기
        </Badge>
      );
    case "진행중":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          진행중
        </Badge>
      );
    case "만료":
      return (
        <Badge variant="secondary">만료</Badge>
      );
    case "거절":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          거절
        </Badge>
      );
    case "취소":
      return (
        <Badge variant="secondary" className="text-neutral-500">
          취소
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function AdPurchaseManager() {
  const [purchases, setPurchases] = useState<AdPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("전체");
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    purchase: AdPurchase | null;
    action: "approve" | "reject";
  }>({ open: false, purchase: null, action: "approve" });
  const [adminNote, setAdminNote] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchPurchases = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/ad-purchases?status=${encodeURIComponent(activeTab)}`
      );
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    setLoading(true);
    fetchPurchases();
  }, [fetchPurchases]);

  const filtered = purchases.filter(
    (p) =>
      !search ||
      p.profiles?.full_name?.includes(search) ||
      p.profiles?.email?.includes(search) ||
      p.ad_products?.name?.includes(search)
  );

  async function handleAction() {
    if (!actionDialog.purchase) return;
    setProcessing(true);

    try {
      const res = await fetch("/api/admin/ad-purchases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: actionDialog.purchase.id,
          action: actionDialog.action,
          admin_note: adminNote || null,
        }),
      });

      if (res.ok) {
        setActionDialog({ open: false, purchase: null, action: "approve" });
        setAdminNote("");
        fetchPurchases();
      }
    } finally {
      setProcessing(false);
    }
  }

  function openAction(purchase: AdPurchase, action: "approve" | "reject") {
    setActionDialog({ open: true, purchase, action });
    setAdminNote("");
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
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {STATUS_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="cursor-pointer">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="구매자명, 이메일, 상품명 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>검색 결과: {filtered.length}건</span>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>구매자</TableHead>
              <TableHead>상품</TableHead>
              <TableHead>영역</TableHead>
              <TableHead>기간</TableHead>
              <TableHead>포인트</TableHead>
              <TableHead>배너</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>신청일</TableHead>
              <TableHead className="w-24">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">
                      {purchase.profiles?.full_name ?? "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {purchase.profiles?.email ?? "-"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {purchase.ad_products?.name ?? "-"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[11px]">
                    {ZONE_LABELS[purchase.ad_products?.ad_zone ?? ""] ??
                      purchase.ad_products?.ad_zone ??
                      "-"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{purchase.duration}</TableCell>
                <TableCell className="text-sm">
                  {formatCredits(purchase.credits_spent)}P
                </TableCell>
                <TableCell>
                  {purchase.banner_image_url ? (
                    <div className="relative h-10 w-16 overflow-hidden rounded border">
                      <Image
                        src={purchase.banner_image_url}
                        alt="배너"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(purchase.created_at)}
                </TableCell>
                <TableCell>
                  {purchase.status === "승인대기" && (
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 cursor-pointer text-green-600 hover:text-green-700"
                        onClick={() => openAction(purchase, "approve")}
                        title="승인"
                      >
                        <CheckCircle2 className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 cursor-pointer text-red-600 hover:text-red-700"
                        onClick={() => openAction(purchase, "reject")}
                        title="거절"
                      >
                        <XCircle className="size-4" />
                      </Button>
                    </div>
                  )}
                  {purchase.status === "진행중" && (
                    <span className="text-xs text-muted-foreground">
                      ~{formatDate(purchase.ends_at)}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-muted-foreground"
                >
                  {purchases.length === 0
                    ? "광고 구매 내역이 없습니다."
                    : "검색 결과가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(v) =>
          !v &&
          setActionDialog({ open: false, purchase: null, action: "approve" })
        }
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === "approve"
                ? "광고 구매 승인"
                : "광고 구매 거절"}
            </DialogTitle>
          </DialogHeader>

          {actionDialog.purchase && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-3 text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">구매자:</span>{" "}
                  {actionDialog.purchase.profiles?.full_name}
                </p>
                <p>
                  <span className="text-muted-foreground">상품:</span>{" "}
                  {actionDialog.purchase.ad_products?.name} (
                  {actionDialog.purchase.duration})
                </p>
                <p>
                  <span className="text-muted-foreground">포인트:</span>{" "}
                  {formatCredits(actionDialog.purchase.credits_spent)}P
                </p>
                {actionDialog.purchase.link_url && (
                  <p>
                    <span className="text-muted-foreground">링크:</span>{" "}
                    {actionDialog.purchase.link_url}
                  </p>
                )}
              </div>

              {actionDialog.purchase.banner_image_url && (
                <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={actionDialog.purchase.banner_image_url}
                    alt="배너 미리보기"
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {actionDialog.action === "reject" && (
                <p className="text-sm text-red-600">
                  거절 시 사용된 포인트({formatCredits(actionDialog.purchase.credits_spent)}P)이
                  구매자에게 환불됩니다.
                </p>
              )}

              {actionDialog.action === "approve" && (
                <p className="text-sm text-green-600">
                  승인 시 광고 기간이 지금부터 {actionDialog.purchase.duration} 동안 시작됩니다.
                </p>
              )}

              <div className="space-y-2">
                <Label>관리자 메모 (선택)</Label>
                <Textarea
                  placeholder="메모를 입력하세요..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setActionDialog({
                  open: false,
                  purchase: null,
                  action: "approve",
                })
              }
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button
              onClick={handleAction}
              disabled={processing}
              className={`cursor-pointer ${
                actionDialog.action === "reject"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : ""
              }`}
            >
              {processing ? (
                <>
                  <IconLoader2 className="mr-1 size-4 animate-spin" />
                  처리 중...
                </>
              ) : actionDialog.action === "approve" ? (
                "승인"
              ) : (
                "거절"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
