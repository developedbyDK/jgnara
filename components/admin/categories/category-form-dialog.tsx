"use client";

import { useState, useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCategory, updateCategory } from "@/lib/category-actions";
import type { CategoryTreeNode } from "@/lib/category-queries";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentId: string | null;
  parentLabel?: string;
  editTarget: CategoryTreeNode | null;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  parentId,
  parentLabel,
  editTarget,
}: CategoryFormDialogProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [group, setGroup] = useState<"heavy" | "freight">("heavy");
  const [categoryValues, setCategoryValues] = useState("");
  const [isPending, startTransition] = useTransition();

  const isEdit = !!editTarget;

  useEffect(() => {
    if (editTarget) {
      setName(editTarget.label);
      setSlug(editTarget.slug);
      setGroup(editTarget.category_group);
      setCategoryValues(editTarget.category_values.join(", "));
    } else {
      setName("");
      setSlug("");
      setCategoryValues("");
    }
  }, [editTarget, open]);

  const title = isEdit
    ? `"${editTarget.label}" 수정`
    : parentLabel
      ? `"${parentLabel}" 하위 카테고리 추가`
      : "최상위 카테고리 추가";

  function handleSubmit() {
    if (!name.trim() || !slug.trim()) return;

    const values = categoryValues
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateCategory(editTarget.id, {
            label: name.trim(),
            slug: slug.trim(),
            categoryValues: values,
          });
        } else {
          await createCategory({
            label: name.trim(),
            slug: slug.trim(),
            parentId: parentId,
            categoryGroup: group,
            categoryValues: values,
          });
        }
        onOpenChange(false);
        setName("");
        setSlug("");
        setCategoryValues("");
      } catch {
        alert(isEdit ? "수정 실패" : "추가 실패");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="cat-name">카테고리명</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 굴삭기"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-slug">슬러그</Label>
            <Input
              id="cat-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="예: excavator"
              className="font-mono"
            />
          </div>
          {!parentId && !isEdit && (
            <div className="space-y-2">
              <Label>그룹</Label>
              <Select
                value={group}
                onValueChange={(v) => setGroup(v as "heavy" | "freight")}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heavy" className="cursor-pointer">
                    중장비
                  </SelectItem>
                  <SelectItem value="freight" className="cursor-pointer">
                    화물특장
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {!parentId && (
            <div className="space-y-2">
              <Label htmlFor="cat-values">매물분류 매핑값</Label>
              <Input
                id="cat-values"
                value={categoryValues}
                onChange={(e) => setCategoryValues(e.target.value)}
                placeholder="쉼표로 구분 (예: 굴삭기, 미니굴삭기)"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                매물등록 폼의 분류 선택에 표시되는 값입니다.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={isPending || !name.trim() || !slug.trim()}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isEdit ? (
              "수정"
            ) : (
              "추가"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
