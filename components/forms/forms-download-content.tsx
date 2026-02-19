"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconFileTypePdf,
  IconFileTypeDocx,
  IconFileSpreadsheet,
  IconFileTypeZip,
  IconDownload,
  IconSearch,
  IconFolder,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";

// ─── Types ───────────────────────────────────────────
type FileType = "pdf" | "docx" | "xlsx" | "hwp" | "zip";
type FormDocument = Tables<"form_documents">;

// ─── Constants ───────────────────────────────────────
const CATEGORY_LIST = [
  "전체",
  "매매/계약",
  "등록/신고",
  "검사/정비",
  "세무/회계",
  "보험/안전",
  "기타",
];

const FILE_TYPE_ICON: Record<FileType, React.ReactNode> = {
  pdf: <IconFileTypePdf className="h-8 w-8 text-red-500" />,
  docx: <IconFileTypeDocx className="h-8 w-8 text-blue-500" />,
  xlsx: <IconFileSpreadsheet className="h-8 w-8 text-green-600" />,
  hwp: <IconFileTypeDocx className="h-8 w-8 text-sky-500" />,
  zip: <IconFileTypeZip className="h-8 w-8 text-amber-500" />,
};

const FILE_TYPE_BADGE: Record<FileType, string> = {
  pdf: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  docx: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  xlsx: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  hwp: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  zip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// ─── Component ───────────────────────────────────────
export function FormsDownloadContent() {
  const [documents, setDocuments] = useState<FormDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchDocuments() {
      const supabase = createClient();
      const { data } = await supabase
        .from("form_documents")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (data) setDocuments(data);
      setLoading(false);
    }
    fetchDocuments();
  }, []);

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCategory !== "전체" && doc.category !== selectedCategory)
        return false;
      if (
        searchQuery &&
        !doc.title.includes(searchQuery) &&
        !doc.description?.includes(searchQuery)
      )
        return false;
      return true;
    });
  }, [documents, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return CATEGORY_LIST.reduce(
      (acc, cat) => {
        acc[cat] =
          cat === "전체"
            ? documents.length
            : documents.filter((d) => d.category === cat).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [documents]);

  async function handleDownload(doc: FormDocument) {
    const supabase = createClient();
    supabase.rpc("increment_download_count", { doc_id: doc.id });

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/forms/${doc.file_path}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.file_path.split("_").slice(1).join("_") || doc.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 로컬 카운트 즉시 업데이트
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id
          ? { ...d, download_count: (d.download_count ?? 0) + 1 }
          : d
      )
    );
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-1.5">
          {CATEGORY_LIST.map((cat) => (
            <Skeleton key={cat} className="h-9 w-20" />
          ))}
        </div>
        <Skeleton className="h-5 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="양식명을 검색하세요"
          className="pl-9"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_LIST.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-sm transition",
              selectedCategory === cat
                ? "bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800",
            )}
          >
            {cat}
            <span className="ml-1 text-xs opacity-60">
              ({categoryCounts[cat] ?? 0})
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        총 <span className="font-semibold text-neutral-900 dark:text-neutral-100">{filtered.length}</span>건의 양식
      </p>

      {/* Document list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <IconFolder className="mb-3 h-10 w-10 text-neutral-300 dark:text-neutral-600" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              검색 결과가 없습니다
            </p>
          </div>
        ) : (
          filtered.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-4 border border-neutral-200 bg-white p-4 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/70"
            >
              {/* File icon */}
              <div className="hidden flex-shrink-0 sm:block">
                {FILE_TYPE_ICON[doc.file_type as FileType] ?? FILE_TYPE_ICON.pdf}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">
                    {doc.title}
                  </h3>
                  <Badge
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      FILE_TYPE_BADGE[doc.file_type as FileType] ?? "",
                    )}
                  >
                    {doc.file_type.toUpperCase()}
                  </Badge>
                </div>
                {doc.description && (
                  <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                    {doc.description}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                  <span>{doc.category}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>{formatFileSize(doc.file_size)}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>
                    {doc.created_at
                      ? new Date(doc.created_at).toLocaleDateString("ko-KR")
                      : "-"}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>다운로드 {(doc.download_count ?? 0).toLocaleString()}회</span>
                </div>
              </div>

              {/* Download button */}
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer gap-1.5 flex-shrink-0"
                onClick={() => handleDownload(doc)}
              >
                <IconDownload className="h-4 w-4" />
                <span className="hidden sm:inline">다운로드</span>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
