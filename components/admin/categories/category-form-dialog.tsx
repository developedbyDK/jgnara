"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
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
  const [isPending, startTransition] = useTransition();

  const isEdit = !!editTarget;

  useEffect(() => {
    if (editTarget) {
      setName(editTarget.label);
      setSlug(editTarget.slug);
      setGroup(editTarget.category_group);
    } else {
      setName("");
      setSlug("");
    }
  }, [editTarget, open]);

  const title = isEdit
    ? `"${editTarget.label}" 수정`
    : parentLabel
      ? `"${parentLabel}" 하위 카테고리 추가`
      : "최상위 카테고리 추가";

  function handleSubmit() {
    if (!name.trim() || !slug.trim()) return;

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateCategory(editTarget.id, {
            label: name.trim(),
            slug: slug.trim(),
          });
        } else {
          await createCategory({
            label: name.trim(),
            slug: slug.trim(),
            parentId: parentId,
            categoryGroup: group,
          });
        }
        onOpenChange(false);
        setName("");
        setSlug("");
      } catch {
        toast.error(isEdit ? "수정에 실패했습니다." : "추가에 실패했습니다.");
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
