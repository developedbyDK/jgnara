"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

type Company = {
  id: string;
  company_name: string;
  category: string;
  address: string;
  contact: string;
  fax: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  status: string;
  is_vip: boolean;
  created_at: string;
};

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  승인: {
    label: "승인",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  심사중: {
    label: "심사중",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  반려: {
    label: "반려",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
  정지: {
    label: "정지",
    className:
      "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
  },
};

export function CompanyTab({ userId }: { userId: string }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", userId)
        .single();

      setCompany(data);
      setLoading(false);
    }
    fetch();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-24 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-48 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          등록된 업체정보가 없습니다
        </p>
      </div>
    );
  }

  const st = STATUS_MAP[company.status] ?? STATUS_MAP["심사중"];

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-start gap-4">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.company_name}
              className="h-16 w-16 rounded-lg border border-neutral-200 object-cover dark:border-neutral-700"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100 text-lg font-bold text-neutral-400 dark:bg-neutral-800">
              {company.company_name.slice(0, 2)}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {company.company_name}
              </h2>
              <Badge className={st.className}>{st.label}</Badge>
              {company.is_vip && (
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  VIP
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {company.category}
            </p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailCard label="주소" value={company.address} />
        <DetailCard label="연락처" value={company.contact} />
        <DetailCard label="팩스" value={company.fax || "-"} />
        <DetailCard
          label="웹사이트"
          value={company.website || "-"}
          isLink={!!company.website}
        />
        <DetailCard
          label="등록일"
          value={company.created_at.slice(0, 10)}
        />
      </div>

      {/* Description */}
      {company.description && (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
            업체 소개
          </p>
          <p className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
            {company.description}
          </p>
        </div>
      )}
    </div>
  );
}

function DetailCard({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      {isLink ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block cursor-pointer font-medium text-orange-600 transition hover:text-orange-700 dark:text-orange-400"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 font-medium text-neutral-900 dark:text-neutral-100">
          {value}
        </p>
      )}
    </div>
  );
}
