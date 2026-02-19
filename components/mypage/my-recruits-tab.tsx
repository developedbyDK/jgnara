"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Recruit = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  applicants: number;
  deadline: string;
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  모집중: {
    label: "모집중",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  마감: {
    label: "마감",
    className:
      "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
  },
  삭제: {
    label: "삭제",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
};

export function MyRecruitsTab({ userId }: { userId: string }) {
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("recruits")
        .select(
          "id, title, company, location, status, applicants, deadline",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setRecruits(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [userId]);

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

  if (recruits.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          등록된 구인공고가 없습니다
        </p>
        <Link
          href="/recruit"
          className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          구인공고 바로가기
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
              제목
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              회사
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 md:table-cell dark:text-neutral-400">
              지역
            </th>
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              상태
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              지원자
            </th>
            <th className="hidden pb-2 font-medium text-neutral-500 md:table-cell dark:text-neutral-400">
              마감일
            </th>
          </tr>
        </thead>
        <tbody>
          {recruits.map((item) => {
            const st = STATUS_MAP[item.status] ?? STATUS_MAP["모집중"];
            return (
              <tr
                key={item.id}
                className="border-b border-neutral-100 dark:border-neutral-800/50"
              >
                <td className="py-3 pr-4">
                  <Link
                    href={`/recruit/${item.id}`}
                    className="cursor-pointer font-medium text-neutral-900 transition hover:text-orange-600 dark:text-neutral-100 dark:hover:text-orange-400"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                  {item.company}
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 md:table-cell dark:text-neutral-400">
                  {item.location}
                </td>
                <td className="py-3 pr-4">
                  <Badge className={st.className}>{st.label}</Badge>
                </td>
                <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                  {item.applicants}명
                </td>
                <td className="hidden py-3 text-neutral-600 md:table-cell dark:text-neutral-400">
                  {item.deadline}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
