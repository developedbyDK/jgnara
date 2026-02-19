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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconLoader2 } from "@tabler/icons-react";

export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const FAQ_CATEGORIES = [
  "회원/계정",
  "매물 등록/관리",
  "거래/결제",
  "업체 등록/찾기",
  "구인/구직",
  "기타",
];

interface FaqDialogProps {
  open: boolean;
  onClose: () => void;
  editingFaq: Faq | null;
}

export function FaqDialog({ open, onClose, editingFaq }: FaqDialogProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    category: "",
    question: "",
    answer: "",
    sort_order: 0,
    is_published: true,
  });

  useEffect(() => {
    if (editingFaq) {
      setForm({
        category: editingFaq.category,
        question: editingFaq.question,
        answer: editingFaq.answer,
        sort_order: editingFaq.sort_order,
        is_published: editingFaq.is_published,
      });
    } else {
      setForm({
        category: "",
        question: "",
        answer: "",
        sort_order: 0,
        is_published: true,
      });
    }
  }, [editingFaq, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category || !form.question || !form.answer) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        ...(editingFaq ? { id: editingFaq.id } : {}),
      };

      const res = await fetch("/api/admin/faqs", {
        method: editingFaq ? "PATCH" : "POST",
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
            {editingFaq ? "FAQ 수정" : "FAQ 추가"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">카테고리 *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger id="category" className="cursor-pointer">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {FAQ_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="cursor-pointer">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <div className="space-y-2">
            <Label htmlFor="question">질문 *</Label>
            <Input
              id="question"
              placeholder="질문을 입력해 주세요"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">답변 *</Label>
            <Textarea
              id="answer"
              placeholder="답변을 입력해 주세요"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_published"
              checked={form.is_published}
              onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              className="cursor-pointer"
            />
            <Label htmlFor="is_published" className="cursor-pointer">
              게시
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
              ) : editingFaq ? (
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
