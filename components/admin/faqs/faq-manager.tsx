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
import { FaqDialog, type Faq } from "./faq-dialog";

export function FaqManager() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const filtered = faqs.filter(
    (faq) =>
      !search ||
      faq.question.includes(search) ||
      faq.answer.includes(search) ||
      faq.category.includes(search)
  );

  async function handleTogglePublished(faq: Faq) {
    await fetch("/api/admin/faqs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: faq.id, is_published: !faq.is_published }),
    });
    fetchFaqs();
  }

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    await fetch(`/api/admin/faqs?id=${deleteTargetId}`, { method: "DELETE" });
    setDeleteTargetId(null);
    fetchFaqs();
  }

  function handleEdit(faq: Faq) {
    setEditingFaq(faq);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditingFaq(null);
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setEditingFaq(null);
    fetchFaqs();
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
            placeholder="질문, 답변, 카테고리 검색"
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
          FAQ 추가
        </Button>
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>
          전체 {faqs.length}개 / 게시{" "}
          {faqs.filter((f) => f.is_published).length}개
        </span>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">순서</TableHead>
              <TableHead className="w-28">카테고리</TableHead>
              <TableHead>질문</TableHead>
              <TableHead className="hidden lg:table-cell">답변</TableHead>
              <TableHead className="w-16">상태</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((faq) => (
              <TableRow
                key={faq.id}
                className={!faq.is_published ? "opacity-50" : ""}
              >
                <TableCell className="text-center text-sm text-muted-foreground">
                  {faq.sort_order}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[11px]">
                    {faq.category}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm font-medium">
                  {faq.question}
                </TableCell>
                <TableCell className="hidden max-w-sm truncate text-sm text-muted-foreground lg:table-cell">
                  {faq.answer}
                </TableCell>
                <TableCell>
                  {faq.is_published ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-[11px] text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      게시
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-neutral-100 text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      비게시
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
                        onClick={() => handleEdit(faq)}
                      >
                        <Pencil className="mr-2 size-4" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleTogglePublished(faq)}
                      >
                        {faq.is_published ? (
                          <>
                            <EyeOff className="mr-2 size-4" />
                            비게시
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 size-4" />
                            게시
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => setDeleteTargetId(faq.id)}
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
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {faqs.length === 0
                    ? "등록된 FAQ가 없습니다."
                    : "검색 결과가 없습니다."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <FaqDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        editingFaq={editingFaq}
      />

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>FAQ 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
