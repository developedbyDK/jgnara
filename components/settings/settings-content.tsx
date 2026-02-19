"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  IconLock,
  IconMail,
  IconTrash,
  IconSun,
  IconMoon,
  IconLoader2,
  IconLogin,
  IconCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Link from "next/link";

type UserInfo = {
  id: string;
  email: string;
};

export function SettingsContent() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser({ id: user.id, email: user.email ?? "" });
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-64 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <IconLogin className="h-10 w-10 text-neutral-400" />
        <div className="text-center">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
            로그인이 필요합니다
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            설정 페이지를 이용하려면 먼저 로그인해주세요.
          </p>
        </div>
        <Link
          href="/login"
          className="cursor-pointer rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SecuritySection user={user} />
      <DisplaySection />
    </div>
  );
}

/* ─────────────────────────────────────────────
   1. 계정 보안
   ───────────────────────────────────────────── */

function SecuritySection({ user }: { user: UserInfo }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
        계정 보안
      </h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        비밀번호 변경, 이메일 변경, 회원 탈퇴를 관리할 수 있습니다
      </p>

      <div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
        <PasswordChangeRow />
        <EmailChangeRow currentEmail={user.email} />
        <AccountDeleteRow />
      </div>
    </section>
  );
}

/* ── 비밀번호 변경 ── */

function PasswordChangeRow() {
  const [open, setOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setError(null);
    setSuccess(false);
  };

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (!v) reset();
  };

  const handleSave = async () => {
    setError(null);

    if (newPw.length < 6) {
      setError("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (newPw !== confirmPw) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    // 현재 비밀번호 확인 (재로그인)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setError("사용자 정보를 확인할 수 없습니다.");
      setSaving(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPw,
    });

    if (signInError) {
      setError("현재 비밀번호가 올바르지 않습니다.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPw,
    });

    if (updateError) {
      setError("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      setSuccess(true);
    }
    setSaving(false);
  };

  return (
    <>
      <SettingRow
        icon={<IconLock className="h-5 w-5" />}
        title="비밀번호 변경"
        description="계정 비밀번호를 변경합니다"
        action={
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => handleOpen(true)}
          >
            변경
          </Button>
        }
      />

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
            <DialogDescription>
              현재 비밀번호를 입력한 후 새 비밀번호를 설정하세요.
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <IconCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                비밀번호가 변경되었습니다
              </p>
              <Button
                className="cursor-pointer"
                onClick={() => handleOpen(false)}
              >
                확인
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <Field label="현재 비밀번호">
                  <Input
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="현재 비밀번호"
                  />
                </Field>
                <Field label="새 비밀번호">
                  <Input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="6자 이상"
                  />
                </Field>
                <Field label="새 비밀번호 확인">
                  <Input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="새 비밀번호 재입력"
                  />
                </Field>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleOpen(false)}
                  className="cursor-pointer"
                >
                  취소
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !currentPw || !newPw || !confirmPw}
                  className="cursor-pointer gap-1.5 bg-orange-600 text-white hover:bg-orange-700"
                >
                  {saving && <IconLoader2 className="h-4 w-4 animate-spin" />}
                  변경하기
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── 이메일 변경 ── */

function EmailChangeRow({ currentEmail }: { currentEmail: string }) {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setNewEmail("");
    setError(null);
    setSuccess(false);
  };

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (!v) reset();
  };

  const handleSave = async () => {
    setError(null);

    if (!newEmail.includes("@")) {
      setError("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    if (newEmail === currentEmail) {
      setError("현재 이메일과 동일합니다.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (updateError) {
      setError("이메일 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      setSuccess(true);
    }
    setSaving(false);
  };

  return (
    <>
      <SettingRow
        icon={<IconMail className="h-5 w-5" />}
        title="이메일 변경"
        description={currentEmail}
        action={
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => handleOpen(true)}
          >
            변경
          </Button>
        }
      />

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이메일 변경</DialogTitle>
            <DialogDescription>
              새 이메일 주소를 입력하면 인증 메일이 발송됩니다.
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <IconMail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  인증 메일이 발송되었습니다
                </p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  새 이메일({newEmail})로 발송된 인증 링크를 클릭하면 변경이
                  완료됩니다.
                </p>
              </div>
              <Button
                className="cursor-pointer"
                onClick={() => handleOpen(false)}
              >
                확인
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <Field label="현재 이메일">
                  <Input value={currentEmail} disabled />
                </Field>
                <Field label="새 이메일">
                  <Input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="새 이메일 주소"
                  />
                </Field>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleOpen(false)}
                  className="cursor-pointer"
                >
                  취소
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !newEmail}
                  className="cursor-pointer gap-1.5 bg-orange-600 text-white hover:bg-orange-700"
                >
                  {saving && <IconLoader2 className="h-4 w-4 animate-spin" />}
                  인증 메일 발송
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── 회원 탈퇴 ── */

function AccountDeleteRow() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setConfirmText("");
    setError(null);
  };

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (!v) reset();
  };

  const handleDelete = async () => {
    if (confirmText !== "탈퇴합니다") {
      setError('"탈퇴합니다"를 정확히 입력해주세요.');
      return;
    }

    setSaving(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("사용자 정보를 확인할 수 없습니다.");
      setSaving(false);
      return;
    }

    // 프로필 상태를 '탈퇴'로 변경
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ status: "탈퇴" })
      .eq("id", user.id);

    if (updateError) {
      setError("탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSaving(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <SettingRow
        icon={<IconTrash className="h-5 w-5 text-red-500" />}
        title="회원 탈퇴"
        description="계정과 모든 데이터가 삭제됩니다"
        action={
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
            onClick={() => handleOpen(true)}
          >
            탈퇴
          </Button>
        }
      />

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <IconAlertTriangle className="h-5 w-5" />
              회원 탈퇴
            </DialogTitle>
            <DialogDescription>
              탈퇴하면 등록한 매물, 게시글, 포인트 등 모든 데이터가 복구할 수
              없습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              <p className="font-medium">탈퇴 시 아래 정보가 모두 삭제됩니다:</p>
              <ul className="mt-1.5 list-inside list-disc space-y-0.5">
                <li>등록한 매물 및 게시글</li>
                <li>보유 포인트 및 결제 내역</li>
                <li>업체 정보 및 구인공고</li>
              </ul>
            </div>

            <Field label='확인을 위해 "탈퇴합니다"를 입력해주세요'>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="탈퇴합니다"
              />
            </Field>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleOpen(false)}
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button
              onClick={handleDelete}
              disabled={saving || confirmText !== "탈퇴합니다"}
              className="cursor-pointer gap-1.5 bg-red-600 text-white hover:bg-red-700"
            >
              {saving && <IconLoader2 className="h-4 w-4 animate-spin" />}
              탈퇴하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ─────────────────────────────────────────────
   3. 화면 설정
   ───────────────────────────────────────────── */

function DisplaySection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          화면 설정
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          화면 테마를 변경할 수 있습니다
        </p>
        <div className="mt-4 h-24 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800" />
      </section>
    );
  }

  const options = [
    {
      value: "light",
      label: "라이트 모드",
      icon: <IconSun className="h-5 w-5" />,
      description: "밝은 배경의 기본 테마",
    },
    {
      value: "dark",
      label: "다크 모드",
      icon: <IconMoon className="h-5 w-5" />,
      description: "어두운 배경으로 눈의 피로를 줄여줍니다",
    },
  ] as const;

  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
        화면 설정
      </h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        화면 테마를 변경할 수 있습니다
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isActive = theme === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
                isActive
                  ? "border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20"
                  : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isActive
                    ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                    : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                }`}
              >
                {opt.icon}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    isActive
                      ? "text-orange-700 dark:text-orange-300"
                      : "text-neutral-900 dark:text-neutral-100"
                  }`}
                >
                  {opt.label}
                </p>
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                  {opt.description}
                </p>
              </div>
              {isActive && (
                <IconCheck className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   공통 컴포넌트
   ───────────────────────────────────────────── */

function SettingRow({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </p>
        <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      {children}
    </div>
  );
}
