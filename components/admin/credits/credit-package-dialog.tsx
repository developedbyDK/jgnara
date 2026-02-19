"use client";

import { useState, useEffect } from "react";
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
import { IconLoader2 } from "@tabler/icons-react";

export type CreditPackage = {
  id: string;
  name: string;
  slug: string;
  credits: number;
  price: number;
  bonus: number;
  tag: string | null;
  popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

interface CreditPackageDialogProps {
  open: boolean;
  onClose: () => void;
  editingPackage: CreditPackage | null;
}

export function CreditPackageDialog({
  open,
  onClose,
  editingPackage,
}: CreditPackageDialogProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    credits: 0,
    price: 0,
    bonus: 0,
    tag: "",
    popular: false,
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    if (editingPackage) {
      setForm({
        name: editingPackage.name,
        slug: editingPackage.slug,
        credits: editingPackage.credits,
        price: editingPackage.price,
        bonus: editingPackage.bonus,
        tag: editingPackage.tag ?? "",
        popular: editingPackage.popular,
        is_active: editingPackage.is_active,
        sort_order: editingPackage.sort_order,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        credits: 0,
        price: 0,
        bonus: 0,
        tag: "",
        popular: false,
        is_active: true,
        sort_order: 0,
      });
    }
  }, [editingPackage, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.slug || form.credits <= 0 || form.price <= 0)
      return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        tag: form.tag || null,
        ...(editingPackage ? { id: editingPackage.id } : {}),
      };

      const res = await fetch("/api/admin/credits", {
        method: editingPackage ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onClose();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingPackage ? "패키지 수정" : "패키지 추가"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">패키지명 *</Label>
              <Input
                id="name"
                placeholder="예: 프리미엄"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">슬러그 *</Label>
              <Input
                id="slug"
                placeholder="예: premium"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits">기본 포인트 *</Label>
              <Input
                id="credits"
                type="number"
                min={1}
                value={form.credits || ""}
                onChange={(e) =>
                  setForm({ ...form, credits: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus">보너스</Label>
              <Input
                id="bonus"
                type="number"
                min={0}
                value={form.bonus || ""}
                onChange={(e) =>
                  setForm({ ...form, bonus: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">가격 (원) *</Label>
              <Input
                id="price"
                type="number"
                min={1}
                value={form.price || ""}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">태그</Label>
              <Input
                id="tag"
                placeholder="예: 50% 보너스"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">정렬 순서</Label>
              <Input
                id="sort_order"
                type="number"
                min={0}
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="popular"
                checked={form.popular}
                onCheckedChange={(v) => setForm({ ...form, popular: v })}
                className="cursor-pointer"
              />
              <Label htmlFor="popular" className="cursor-pointer">
                인기 표시
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                className="cursor-pointer"
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                활성화
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button type="submit" disabled={saving} className="cursor-pointer">
              {saving ? (
                <>
                  <IconLoader2 className="mr-1 size-4 animate-spin" />
                  저장 중...
                </>
              ) : editingPackage ? (
                "수정"
              ) : (
                "추가"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
