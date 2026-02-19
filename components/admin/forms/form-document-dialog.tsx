"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tables } from "@/lib/supabase/database.types";

type FormDocument = Tables<"form_documents">;

const CATEGORIES = [
  "매매/계약",
  "등록/신고",
  "검사/정비",
  "세무/회계",
  "보험/안전",
  "기타",
];

interface FormDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  editingDoc: FormDocument | null;
}

export function FormDocumentDialog({
  open,
  onClose,
  editingDoc,
}: FormDocumentDialogProps) {
  const isEdit = !!editingDoc;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("매매/계약");
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // 다이얼로그 열릴 때 초기값 세팅
  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      if (editingDoc) {
        setTitle(editingDoc.title);
        setDescription(editingDoc.description ?? "");
        setCategory(editingDoc.category);
        setIsPublished(editingDoc.is_published ?? true);
        setSortOrder(editingDoc.sort_order ?? 0);
      } else {
        setTitle("");
        setDescription("");
        setCategory("매매/계약");
        setIsPublished(true);
        setSortOrder(0);
      }
      setFile(null);
    }
    if (!nextOpen) {
      onClose();
    }
  }

  async function handleSubmit() {
    if (!title.trim()) return;
    if (!isEdit && !file) return;

    setSaving(true);

    try {
      let filePath = editingDoc?.file_path ?? "";
      let fileSize = editingDoc?.file_size ?? 0;
      let fileType = editingDoc?.file_type ?? "";

      // 파일 업로드 (새 파일이 선택된 경우)
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/admin/forms/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          toast.error(err.error || "파일 업로드에 실패했습니다.");
          setSaving(false);
          return;
        }

        const uploadData = await uploadRes.json();
        filePath = uploadData.filePath;
        fileSize = uploadData.fileSize;

        const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
        fileType = ext;
      }

      const body = {
        ...(isEdit ? { id: editingDoc.id } : {}),
        title: title.trim(),
        description: description.trim() || null,
        category,
        file_type: fileType,
        file_size: fileSize,
        file_path: filePath,
        is_published: isPublished,
        sort_order: sortOrder,
      };

      const res = await fetch("/api/admin/forms", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "저장에 실패했습니다.");
        setSaving(false);
        return;
      }

      onClose();
    } catch {
      toast.error("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "양식 수정" : "양식 추가"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="양식 제목을 입력하세요"
            />
          </div>

          {/* 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="양식에 대한 설명"
            />
          </div>

          {/* 카테고리 */}
          <div className="space-y-2">
            <Label>카테고리 *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c} className="cursor-pointer">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-2">
            <Label>파일 {!isEdit && "*"}</Label>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1"
              >
                <Upload className="size-4" />
                {file
                  ? file.name
                  : isEdit
                    ? "파일 변경 (선택)"
                    : "파일 선택"}
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.xlsx,.hwp,.zip"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {isEdit && !file && (
              <p className="text-xs text-muted-foreground">
                현재 파일: {editingDoc?.file_path?.split("_").slice(1).join("_") ?? ""}
              </p>
            )}
          </div>

          {/* 정렬순서 */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">정렬순서</Label>
            <Input
              id="sortOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-24"
            />
          </div>

          {/* 공개여부 */}
          <div className="flex items-center gap-3">
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
              className="cursor-pointer"
            />
            <Label className="cursor-pointer">공개</Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onClose()}
            disabled={saving}
          >
            취소
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={saving || !title.trim() || (!isEdit && !file)}
          >
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isEdit ? "수정" : "추가"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
