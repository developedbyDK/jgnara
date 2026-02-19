"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { IconCoin, IconEdit, IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";

type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  company: string | null;
  avatar_url: string | null;
  credits: number;
  created_at: string;
};

const ROLE_COLORS: Record<string, string> = {
  일반: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  업체: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  VIP: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  관리자: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const STATUS_COLORS: Record<string, string> = {
  활성: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  정지: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  탈퇴: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
};

export function ProfileTab({
  profile,
  onUpdate,
}: {
  profile: UserProfile;
  onUpdate: (p: UserProfile) => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: profile.full_name,
    phone: profile.phone,
    company: profile.company ?? "",
  });

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        company: form.company || null,
      })
      .eq("id", profile.id);

    if (!error) {
      onUpdate({
        ...profile,
        full_name: form.full_name,
        phone: form.phone,
        company: form.company || null,
      });
      setEditOpen(false);
    }
    setSaving(false);
  };

  const initials = profile.full_name
    ? profile.full_name.slice(0, 2)
    : profile.email.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url ?? undefined} />
            <AvatarFallback className="bg-orange-100 text-lg font-bold text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {profile.full_name || "이름 미설정"}
              </h2>
              <Badge
                className={
                  ROLE_COLORS[profile.role] ?? ROLE_COLORS["일반"]
                }
              >
                {profile.role}
              </Badge>
              <Badge
                className={
                  STATUS_COLORS[profile.status] ?? STATUS_COLORS["활성"]
                }
              >
                {profile.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {profile.email}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              가입일: {profile.created_at.slice(0, 10)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setForm({
                full_name: profile.full_name,
                phone: profile.phone,
                company: profile.company ?? "",
              });
              setEditOpen(true);
            }}
            className="cursor-pointer gap-1.5"
          >
            <IconEdit className="h-4 w-4" />
            편집
          </Button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard label="전화번호" value={profile.phone || "미등록"} />
        <InfoCard label="회사/소속" value={profile.company || "미등록"} />
      </div>

      {/* Credits */}
      <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
          <IconCoin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            보유 포인트
          </p>
          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {profile.credits.toLocaleString()}{" "}
            <span className="text-sm font-normal">포인트</span>
          </p>
        </div>
        <Link
          href="/credits"
          className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          충전하기
        </Link>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필 편집</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                이름
              </label>
              <Input
                value={form.full_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, full_name: e.target.value }))
                }
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                전화번호
              </label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="전화번호를 입력하세요"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                회사/소속
              </label>
              <Input
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                placeholder="회사명을 입력하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="cursor-pointer gap-1.5 bg-orange-600 text-white hover:bg-orange-700"
            >
              {saving && <IconLoader2 className="h-4 w-4 animate-spin" />}
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
    </div>
  );
}
