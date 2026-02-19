"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Download,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { FormDocumentDialog } from "./form-document-dialog";
import type { Tables } from "@/lib/supabase/database.types";

type FormDocument = Tables<"form_documents">;

const CATEGORIES = [
  "전체",
  "매매/계약",
  "등록/신고",
  "검사/정비",
  "세무/회계",
  "보험/안전",
  "기타",
];

const FILE_TYPE_COLORS: Record<string, string> = {
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

const ITEMS_PER_PAGE = 10;

export function FormDocumentManager() {
  const [documents, setDocuments] = useState<FormDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<FormDocument | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/forms");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch {
      // 에러 무시
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        !search ||
        doc.title.includes(search) ||
        doc.description?.includes(search);
      const matchCategory =
        categoryFilter === "전체" || doc.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [documents, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  async function handleTogglePublish(doc: FormDocument) {
    await fetch("/api/admin/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: doc.id, is_published: !doc.is_published }),
    });
    fetchDocuments();
  }

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    await fetch(`/api/admin/forms?id=${deleteTargetId}`, { method: "DELETE" });
    setDeleteTargetId(null);
    fetchDocuments();
  }

  function handleEdit(doc: FormDocument) {
    setEditingDoc(doc);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditingDoc(null);
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setEditingDoc(null);
    fetchDocuments();
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="제목, 설명 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-32 cursor-pointer">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c} className="cursor-pointer">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="cursor-pointer gap-1"
            onClick={handleAdd}
          >
            <Plus className="size-4" />
            양식 추가
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead className="hidden md:table-cell">카테고리</TableHead>
              <TableHead>파일유형</TableHead>
              <TableHead className="hidden lg:table-cell">용량</TableHead>
              <TableHead className="hidden lg:table-cell">다운로드</TableHead>
              <TableHead>공개</TableHead>
              <TableHead className="hidden lg:table-cell">등록일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium max-w-[250px] truncate">
                  {doc.title}
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">
                  <Badge variant="outline" className="text-[11px]">
                    {doc.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`text-[10px] font-bold uppercase ${FILE_TYPE_COLORS[doc.file_type] ?? ""}`}
                  >
                    {doc.file_type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {formatFileSize(doc.file_size)}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="size-3" />
                    {(doc.download_count ?? 0).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {doc.is_published ? (
                    <Badge
                      variant="secondary"
                      className="text-[11px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      공개
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-[11px] bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      비공개
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {doc.created_at
                    ? new Date(doc.created_at).toLocaleDateString("ko-KR")
                    : "-"}
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
                        onClick={() => handleEdit(doc)}
                      >
                        <Pencil className="mr-2 size-4" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleTogglePublish(doc)}
                      >
                        {doc.is_published ? (
                          <>
                            <EyeOff className="mr-2 size-4" />
                            비공개 전환
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 size-4" />
                            공개 전환
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => setDeleteTargetId(doc.id)}
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
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  {documents.length === 0
                    ? "등록된 양식이 없습니다."
                    : "검색 결과가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">총 {filtered.length}건</p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              이전
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                className="cursor-pointer w-8"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {/* Dialog */}
      <FormDocumentDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        editingDoc={editingDoc}
      />

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>양식 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
