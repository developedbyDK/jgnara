"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { IconPlus, IconDots, IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";

type Listing = {
  id: string;
  model: string;
  category: string;
  price: number;
  region: string;
  status: string;
  views: number;
  created_at: string;
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  active: {
    label: "판매중",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  pending: {
    label: "심사중",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  sold: {
    label: "판매완료",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  },
  reserved: {
    label: "예약중",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  },
  rejected: {
    label: "반려",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
  deleted: {
    label: "삭제",
    className:
      "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
  },
};

export function MyListingsTab({ userId }: { userId: string }) {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("listings")
        .select(
          "id, model, category, price, region, status, views, created_at",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setListings(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [userId]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("listings")
        .update({ status: "deleted" })
        .eq("id", deleteTarget);

      if (error) throw error;

      // 낙관적 업데이트
      setListings((prev) =>
        prev.map((item) =>
          item.id === deleteTarget ? { ...item, status: "deleted" } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error("삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  async function handleMarkSold(listingId: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("listings")
        .update({ status: "sold" })
        .eq("id", listingId);

      if (error) throw error;

      setListings((prev) =>
        prev.map((item) =>
          item.id === listingId ? { ...item, status: "sold" } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error("상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          등록된 매물이 없습니다
        </p>
        <Link
          href="/sell"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          <IconPlus className="h-4 w-4" />
          매물등록
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              매물명
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              카테고리
            </th>
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              가격
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 md:table-cell dark:text-neutral-400">
              지역
            </th>
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              상태
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              조회수
            </th>
            <th className="hidden pb-2 font-medium text-neutral-500 md:table-cell dark:text-neutral-400">
              등록일
            </th>
            <th className="pb-2 font-medium text-neutral-500 dark:text-neutral-400">
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item) => {
            const st = STATUS_MAP[item.status] ?? STATUS_MAP["active"];
            return (
              <tr
                key={item.id}
                className="border-b border-neutral-100 dark:border-neutral-800/50"
              >
                <td className="py-3 pr-4">
                  <Link
                    href={`/listing/${item.id}`}
                    className="cursor-pointer font-medium text-neutral-900 transition hover:text-orange-600 dark:text-neutral-100 dark:hover:text-orange-400"
                  >
                    {item.model}
                  </Link>
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                  {item.category}
                </td>
                <td className="py-3 pr-4 font-medium text-neutral-900 dark:text-neutral-100">
                  {Number(item.price).toLocaleString()}만원
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 md:table-cell dark:text-neutral-400">
                  {item.region}
                </td>
                <td className="py-3 pr-4">
                  <Badge className={st.className}>{st.label}</Badge>
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                  {item.views.toLocaleString()}
                </td>
                <td className="hidden py-3 text-neutral-600 md:table-cell dark:text-neutral-400">
                  {item.created_at.slice(0, 10)}
                </td>
                <td className="py-3">
                  {item.status !== "deleted" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <IconDots className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/listings/${item.id}/edit`)
                          }
                        >
                          <IconPencil className="mr-2 size-4" />
                          수정
                        </DropdownMenuItem>
                        {item.status === "active" && (
                          <DropdownMenuItem
                            className="cursor-pointer text-blue-600 focus:text-blue-600 dark:text-blue-400 dark:focus:text-blue-400"
                            onClick={() => handleMarkSold(item.id)}
                          >
                            <IconCheck className="mr-2 size-4" />
                            판매완료 처리
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                          onClick={() => setDeleteTarget(item.id)}
                        >
                          <IconTrash className="mr-2 size-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-xs text-neutral-400">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>매물 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 매물을 삭제하시겠습니까? 삭제된 매물은 복구할 수
              없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
