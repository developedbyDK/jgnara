"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { IconCoin } from "@tabler/icons-react";
import Link from "next/link";

type Transaction = {
  id: string;
  credits_amount: number;
  payment_amount: number;
  status: string;
  created_at: string;
  order_id: string;
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending: {
    label: "대기",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  confirmed: {
    label: "완료",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  failed: {
    label: "실패",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
  cancelled: {
    label: "취소",
    className:
      "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
  },
};

export function CreditsTab({
  userId,
  credits,
}: {
  userId: string;
  credits: number;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("credit_transactions")
        .select(
          "id, credits_amount, payment_amount, status, created_at, order_id",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setTransactions(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [userId]);

  return (
    <div className="space-y-6">
      {/* Credits Balance */}
      <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
          <IconCoin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            보유 포인트
          </p>
          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {credits.toLocaleString()}{" "}
            <span className="text-sm font-normal">포인트</span>
          </p>
        </div>
        <Link
          href="/credits"
          className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          충전하기
        </Link>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          포인트 내역
        </h3>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"
              />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 py-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              포인트 내역이 없습니다
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                  <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
                    일시
                  </th>
                  <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
                    내용
                  </th>
                  <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
                    포인트
                  </th>
                  <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
                    결제금액
                  </th>
                  <th className="pb-2 font-medium text-neutral-500 dark:text-neutral-400">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const st =
                    STATUS_MAP[tx.status] ?? STATUS_MAP["pending"];
                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-neutral-100 dark:border-neutral-800/50"
                    >
                      <td className="py-3 pr-4 text-neutral-600 dark:text-neutral-400">
                        {tx.created_at.slice(0, 10)}
                      </td>
                      <td className="py-3 pr-4 text-neutral-900 dark:text-neutral-100">
                        포인트 충전
                      </td>
                      <td className="py-3 pr-4 font-medium text-orange-600 dark:text-orange-400">
                        +{tx.credits_amount.toLocaleString()}
                      </td>
                      <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                        {tx.payment_amount.toLocaleString()}원
                      </td>
                      <td className="py-3">
                        <Badge className={st.className}>
                          {st.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
