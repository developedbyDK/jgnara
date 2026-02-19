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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconLoader2 } from "@tabler/icons-react";

export type AdProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_key: string;
  ad_zone: string;
  credit_cost_monthly: number;
  credit_cost_2month: number;
  credit_cost_3month: number;
  credit_cost_6month: number;
  credit_cost_yearly: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const ICON_OPTIONS = [
  { value: "layout-board", label: "메인배너 아이콘" },
  { value: "layout-sidebar", label: "사이드배너 아이콘" },
  { value: "crown", label: "VIP 아이콘" },
  { value: "briefcase", label: "구인구직 아이콘" },
];

const ZONE_OPTIONS = [
  { value: "main-banner", label: "메인배너" },
  { value: "side-banner", label: "사이드배너" },
  { value: "vip-listing", label: "VIP매물" },
  { value: "vip-recruit", label: "VIP구인" },
];

interface AdProductDialogProps {
  open: boolean;
  onClose: () => void;
  editingProduct: AdProduct | null;
}

export function AdProductDialog({
  open,
  onClose,
  editingProduct,
}: AdProductDialogProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon_key: "layout-board",
    ad_zone: "main-banner",
    credit_cost_monthly: 0,
    credit_cost_2month: 0,
    credit_cost_3month: 0,
    credit_cost_6month: 0,
    credit_cost_yearly: 0,
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        slug: editingProduct.slug,
        description: editingProduct.description,
        icon_key: editingProduct.icon_key,
        ad_zone: editingProduct.ad_zone,
        credit_cost_monthly: editingProduct.credit_cost_monthly,
        credit_cost_2month: editingProduct.credit_cost_2month,
        credit_cost_3month: editingProduct.credit_cost_3month,
        credit_cost_6month: editingProduct.credit_cost_6month,
        credit_cost_yearly: editingProduct.credit_cost_yearly,
        is_active: editingProduct.is_active,
        sort_order: editingProduct.sort_order,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        description: "",
        icon_key: "layout-board",
        ad_zone: "main-banner",
        credit_cost_monthly: 0,
        credit_cost_2month: 0,
        credit_cost_3month: 0,
        credit_cost_6month: 0,
        credit_cost_yearly: 0,
        is_active: true,
        sort_order: 0,
      });
    }
  }, [editingProduct, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.slug ||
      form.credit_cost_monthly <= 0 ||
      form.credit_cost_2month <= 0 ||
      form.credit_cost_3month <= 0 ||
      form.credit_cost_6month <= 0 ||
      form.credit_cost_yearly <= 0
    )
      return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        ...(editingProduct ? { id: editingProduct.id } : {}),
      };

      const res = await fetch("/api/admin/ad-products", {
        method: editingProduct ? "PATCH" : "POST",
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "광고 상품 수정" : "광고 상품 추가"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">상품명 *</Label>
              <Input
                id="name"
                placeholder="예: 메인배너"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">슬러그 *</Label>
              <Input
                id="slug"
                placeholder="예: main-banner"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              placeholder="예: 메인 페이지 상단 배너 광고"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon_key">아이콘</Label>
              <Select
                value={form.icon_key}
                onValueChange={(v) => setForm({ ...form, icon_key: v })}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad_zone">광고 영역 *</Label>
              <Select
                value={form.ad_zone}
                onValueChange={(v) => setForm({ ...form, ad_zone: v })}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ZONE_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

          <div>
            <p className="mb-2 text-sm font-medium">기간별 포인트 비용 *</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="credit_cost_monthly" className="text-xs">
                  1개월
                </Label>
                <Input
                  id="credit_cost_monthly"
                  type="number"
                  min={1}
                  value={form.credit_cost_monthly || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      credit_cost_monthly: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credit_cost_2month" className="text-xs">
                  2개월
                </Label>
                <Input
                  id="credit_cost_2month"
                  type="number"
                  min={1}
                  value={form.credit_cost_2month || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      credit_cost_2month: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credit_cost_3month" className="text-xs">
                  3개월
                </Label>
                <Input
                  id="credit_cost_3month"
                  type="number"
                  min={1}
                  value={form.credit_cost_3month || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      credit_cost_3month: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credit_cost_6month" className="text-xs">
                  6개월
                </Label>
                <Input
                  id="credit_cost_6month"
                  type="number"
                  min={1}
                  value={form.credit_cost_6month || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      credit_cost_6month: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credit_cost_yearly" className="text-xs">
                  1년
                </Label>
                <Input
                  id="credit_cost_yearly"
                  type="number"
                  min={1}
                  value={form.credit_cost_yearly || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      credit_cost_yearly: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
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
              ) : editingProduct ? (
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
