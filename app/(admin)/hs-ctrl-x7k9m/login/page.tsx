"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { IconShieldLock } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.app_metadata?.role === "admin") {
        router.replace("/hs-ctrl-x7k9m");
      }
    });
  }, [router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.user) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
      return;
    }

    // 관리자 권한 확인 (app_metadata.role)
    const role = data.user.app_metadata?.role;
    if (role !== "admin") {
      await supabase.auth.signOut();
      setError("관리자 권한이 없습니다.");
      setLoading(false);
      return;
    }

    router.push("/hs-ctrl-x7k9m");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm px-6">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 ring-1 ring-zinc-700">
            <IconShieldLock className="h-7 w-7 text-zinc-300" />
          </div>
          <h1 className="mt-6 text-xl font-bold text-white">관리자 로그인</h1>
          <p className="mt-2 text-sm text-zinc-500">
            중기나라 관리자 전용 페이지입니다.
          </p>
        </div>

        <div className="mt-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-950/50 px-4 py-3 text-sm text-red-400 ring-1 ring-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-zinc-400"
              >
                이메일
              </label>
              <input
                id="admin-email"
                type="email"
                placeholder="admin@jungginara.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-lg border-0 bg-zinc-900 px-4 py-2.5 text-sm text-white ring-1 ring-zinc-800 placeholder:text-zinc-600 focus:ring-2 focus:ring-zinc-600 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-zinc-400"
              >
                비밀번호
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-lg border-0 bg-zinc-900 px-4 py-2.5 text-sm text-white ring-1 ring-zinc-800 placeholder:text-zinc-600 focus:ring-2 focus:ring-zinc-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          &copy; 중기나라 관리자 시스템
        </p>
      </div>
    </div>
  );
}
