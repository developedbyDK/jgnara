"use client";

import { useState } from "react";
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

// ─── Types ───────────────────────────────────────────
type FileType = "pdf" | "docx" | "xlsx" | "hwp" | "zip";

interface FormDocument {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: FileType;
  fileSize: string;
  downloadUrl: string;
  date: string;
  downloadCount: number;
}

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

const MOCK_DOCUMENTS: FormDocument[] = [
  {
    id: 1,
    title: "건설기계 매매계약서",
    description: "중장비 매매 시 사용하는 표준 매매계약서 양식",
    category: "매매/계약",
    fileType: "hwp",
    fileSize: "52KB",
    downloadUrl: "#",
    date: "2025-01-10",
    downloadCount: 1842,
  },
  {
    id: 2,
    title: "건설기계 임대차 계약서",
    description: "건설기계 임대(대여) 시 사용하는 표준 임대차 계약서",
    category: "매매/계약",
    fileType: "hwp",
    fileSize: "48KB",
    downloadUrl: "#",
    date: "2025-01-08",
    downloadCount: 1356,
  },
  {
    id: 3,
    title: "건설기계 양도증명서",
    description: "건설기계 소유권 이전 시 필요한 양도증명서 양식",
    category: "등록/신고",
    fileType: "pdf",
    fileSize: "125KB",
    downloadUrl: "#",
    date: "2025-01-05",
    downloadCount: 2103,
  },
  {
    id: 4,
    title: "건설기계 등록신청서",
    description: "신규 건설기계 등록 시 시/군/구청에 제출하는 신청서",
    category: "등록/신고",
    fileType: "pdf",
    fileSize: "98KB",
    downloadUrl: "#",
    date: "2024-12-20",
    downloadCount: 1678,
  },
  {
    id: 5,
    title: "건설기계 폐기신고서",
    description: "건설기계 말소(폐기) 신고 시 필요한 서류 양식",
    category: "등록/신고",
    fileType: "pdf",
    fileSize: "87KB",
    downloadUrl: "#",
    date: "2024-12-15",
    downloadCount: 892,
  },
  {
    id: 6,
    title: "건설기계 정기검사 신청서",
    description: "건설기계 정기검사(2년 주기) 신청 시 제출하는 양식",
    category: "검사/정비",
    fileType: "pdf",
    fileSize: "110KB",
    downloadUrl: "#",
    date: "2024-12-10",
    downloadCount: 1245,
  },
  {
    id: 7,
    title: "건설기계 정비확인서",
    description: "정비 완료 후 발급하는 정비 내역 확인서 양식",
    category: "검사/정비",
    fileType: "docx",
    fileSize: "38KB",
    downloadUrl: "#",
    date: "2024-12-05",
    downloadCount: 978,
  },
  {
    id: 8,
    title: "건설기계 구조변경 검사신청서",
    description: "건설기계 구조 변경 시 검사 신청에 필요한 서류",
    category: "검사/정비",
    fileType: "pdf",
    fileSize: "95KB",
    downloadUrl: "#",
    date: "2024-11-28",
    downloadCount: 567,
  },
  {
    id: 9,
    title: "세금계산서 발행 요청서",
    description: "건설기계 거래 시 세금계산서 발행 요청 양식",
    category: "세무/회계",
    fileType: "xlsx",
    fileSize: "24KB",
    downloadUrl: "#",
    date: "2024-11-20",
    downloadCount: 1534,
  },
  {
    id: 10,
    title: "건설기계 매매 영수증",
    description: "중장비 매매 대금 수령 확인용 영수증 양식",
    category: "세무/회계",
    fileType: "xlsx",
    fileSize: "18KB",
    downloadUrl: "#",
    date: "2024-11-15",
    downloadCount: 1123,
  },
  {
    id: 11,
    title: "건설기계 부가세 신고 참고자료",
    description: "건설기계 거래 관련 부가가치세 신고 시 참고 자료",
    category: "세무/회계",
    fileType: "pdf",
    fileSize: "256KB",
    downloadUrl: "#",
    date: "2024-11-10",
    downloadCount: 845,
  },
  {
    id: 12,
    title: "건설기계 보험가입 신청서",
    description: "건설기계 종합보험 및 책임보험 가입 신청 양식",
    category: "보험/안전",
    fileType: "pdf",
    fileSize: "142KB",
    downloadUrl: "#",
    date: "2024-11-05",
    downloadCount: 1067,
  },
  {
    id: 13,
    title: "건설기계 안전교육 수료증 양식",
    description: "건설기계 조종사 안전교육 수료 확인 양식",
    category: "보험/안전",
    fileType: "docx",
    fileSize: "32KB",
    downloadUrl: "#",
    date: "2024-10-30",
    downloadCount: 723,
  },
  {
    id: 14,
    title: "건설기계 사고보고서",
    description: "건설기계 사고 발생 시 보고용 양식",
    category: "보험/안전",
    fileType: "hwp",
    fileSize: "45KB",
    downloadUrl: "#",
    date: "2024-10-25",
    downloadCount: 456,
  },
  {
    id: 15,
    title: "건설기계 조종사 면허증 사본 양식",
    description: "건설기계 조종사 면허증 사본 제출용 표지 양식",
    category: "기타",
    fileType: "docx",
    fileSize: "22KB",
    downloadUrl: "#",
    date: "2024-10-20",
    downloadCount: 634,
  },
  {
    id: 16,
    title: "건설기계 서류 종합 패키지",
    description: "매매계약서, 양도증명서, 영수증 등 주요 서류 모음 (ZIP)",
    category: "기타",
    fileType: "zip",
    fileSize: "1.2MB",
    downloadUrl: "#",
    date: "2024-10-15",
    downloadCount: 2876,
  },
];

// ─── Component ───────────────────────────────────────
export function FormsDownloadContent() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_DOCUMENTS.filter((doc) => {
    if (selectedCategory !== "전체" && doc.category !== selectedCategory)
      return false;
    if (
      searchQuery &&
      !doc.title.includes(searchQuery) &&
      !doc.description.includes(searchQuery)
    )
      return false;
    return true;
  });

  const categoryCounts = CATEGORY_LIST.reduce(
    (acc, cat) => {
      acc[cat] =
        cat === "전체"
          ? MOCK_DOCUMENTS.length
          : MOCK_DOCUMENTS.filter((d) => d.category === cat).length;
      return acc;
    },
    {} as Record<string, number>,
  );

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
              ({categoryCounts[cat]})
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
                {FILE_TYPE_ICON[doc.fileType]}
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
                      FILE_TYPE_BADGE[doc.fileType],
                    )}
                  >
                    {doc.fileType === "hwp" ? "HWP" : doc.fileType.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                  {doc.description}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                  <span>{doc.category}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>{doc.fileSize}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>{doc.date}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span>다운로드 {doc.downloadCount.toLocaleString()}회</span>
                </div>
              </div>

              {/* Download button */}
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer gap-1.5 flex-shrink-0"
                asChild
              >
                <a href={doc.downloadUrl} download>
                  <IconDownload className="h-4 w-4" />
                  <span className="hidden sm:inline">다운로드</span>
                </a>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
