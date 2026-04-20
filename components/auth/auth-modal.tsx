"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type AuthView = "login" | "register";

type AuthModalContextType = {
  openAuthModal: (view?: AuthView) => void;
  closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType>({
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export function useAuthModal() {
  return useContext(AuthModalContext);
}

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const openAuthModal = useCallback((v: AuthView = "login") => {
    setView(v);
    setOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm gap-0 p-0">
          {view === "login" ? (
            <LoginView
              onSwitchToRegister={() => setView("register")}
              onClose={() => setOpen(false)}
            />
          ) : (
            <RegisterView
              onSwitchToLogin={() => setView("login")}
              onClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </AuthModalContext.Provider>
  );
}

function LoginView({
  onSwitchToRegister,
  onClose,
}: {
  onSwitchToRegister: () => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    onClose();
    router.refresh();
  }

  async function handleOAuthLogin(provider: "kakao" | "google") {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">로그인</DialogTitle>
        <DialogDescription className="text-sm text-neutral-500">
          중기나라에 오신 것을 환영합니다
        </DialogDescription>
      </DialogHeader>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-medium">
            이메일
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-password" className="text-sm font-medium">
            비밀번호
          </label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {showPassword ? (
                <IconEyeOff className="h-4 w-4" />
              ) : (
                <IconEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer"
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-neutral-400">또는</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => handleOAuthLogin("kakao")}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#FEE500] px-4 py-2.5 text-sm font-semibold text-[#191919] transition hover:bg-[#FDD835] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <KakaoLogo />
          카카오 로그인
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <GoogleLogo />
          Google 로그인
        </button>
      </div>

      <p className="text-center text-sm text-neutral-500">
        계정이 없으신가요?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="cursor-pointer font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          회원가입
        </button>
      </p>

      <p className="text-center text-xs text-neutral-400">
        로그인 시{" "}
        <Link href="/terms" className="cursor-pointer underline">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="/privacy" className="cursor-pointer underline">
          개인정보처리방침
        </Link>
        에 동의합니다.
      </p>
    </div>
  );
}

function RegisterView({
  onSwitchToLogin,
  onClose,
}: {
  onSwitchToLogin: () => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const [memberType, setMemberType] = useState<"individual" | "business">("individual");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessVerified, setBusinessVerified] = useState<boolean | null>(null);
  const [businessVerifying, setBusinessVerifying] = useState(false);
  const [businessVerifyMessage, setBusinessVerifyMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (memberType === "business") {
      if (!companyName.trim()) {
        setError("회사명을 입력해주세요.");
        return;
      }
      if (!businessNumber.trim()) {
        setError("사업자등록번호를 입력해주세요.");
        return;
      }
      if (!businessVerified) {
        setError("사업자등록번호 인증을 완료해주세요.");
        return;
      }
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          member_type: memberType,
          ...(memberType === "business" && {
            company_name: companyName,
            business_number: businessNumber,
          }),
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      onClose();
      router.refresh();
    } else {
      setMessage("이메일 인증 링크를 발송했습니다. 이메일을 확인해주세요.");
    }
  }

  async function handleVerifyBusiness() {
    setBusinessVerifying(true);
    setBusinessVerifyMessage(null);

    try {
      const res = await fetch("/api/verify-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ b_no: businessNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBusinessVerified(false);
        setBusinessVerifyMessage(data.error || "인증에 실패했습니다.");
        return;
      }

      if (data.valid) {
        setBusinessVerified(true);
        setBusinessVerifyMessage(`인증 성공 (${data.b_stt})`);
      } else {
        setBusinessVerified(false);
        setBusinessVerifyMessage(
          `사업자 상태: ${data.b_stt || "확인 불가"} - 계속사업자만 가입 가능합니다.`,
        );
      }
    } catch {
      setBusinessVerified(false);
      setBusinessVerifyMessage("인증 요청 중 오류가 발생했습니다.");
    } finally {
      setBusinessVerifying(false);
    }
  }

  async function handleOAuthLogin(provider: "kakao" | "google") {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">회원가입</DialogTitle>
        <DialogDescription className="text-sm text-neutral-500">
          중기나라 계정을 만들어보세요
        </DialogDescription>
      </DialogHeader>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-950 dark:text-green-400">
          {message}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMemberType("individual")}
          className={`flex-1 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition ${
            memberType === "individual"
              ? "border-orange-600 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-950/30 dark:text-orange-400"
              : "border-neutral-300 text-neutral-500 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600"
          }`}
        >
          일반회원
        </button>
        <button
          type="button"
          onClick={() => setMemberType("business")}
          className={`flex-1 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition ${
            memberType === "business"
              ? "border-orange-600 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-950/30 dark:text-orange-400"
              : "border-neutral-300 text-neutral-500 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600"
          }`}
        >
          사업자회원
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="register-name" className="text-sm font-medium">
            이름
          </label>
          <Input
            id="register-name"
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="register-email" className="text-sm font-medium">
            이메일
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {memberType === "business" && (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-company" className="text-sm font-medium">
                회사명
              </label>
              <Input
                id="register-company"
                type="text"
                placeholder="회사명을 입력하세요"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-business-number" className="text-sm font-medium">
                사업자등록번호
              </label>
              <div className="flex gap-2">
                <Input
                  id="register-business-number"
                  type="text"
                  placeholder="000-00-00000"
                  value={businessNumber}
                  onChange={(e) => {
                    setBusinessNumber(e.target.value);
                    setBusinessVerified(null);
                    setBusinessVerifyMessage(null);
                  }}
                  required
                  disabled={businessVerified === true}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant={businessVerified ? "outline" : "default"}
                  disabled={businessVerifying || !businessNumber.trim()}
                  onClick={handleVerifyBusiness}
                  className="shrink-0 cursor-pointer"
                >
                  {businessVerifying
                    ? "확인 중..."
                    : businessVerified
                      ? "인증완료"
                      : "인증하기"}
                </Button>
              </div>
              {businessVerifyMessage && (
                <p
                  className={`text-xs ${
                    businessVerified
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {businessVerifyMessage}
                </p>
              )}
            </div>
          </>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="register-password" className="text-sm font-medium">
            비밀번호
          </label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="6자 이상 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {showPassword ? (
                <IconEyeOff className="h-4 w-4" />
              ) : (
                <IconEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-password-confirm"
            className="text-sm font-medium"
          >
            비밀번호 확인
          </label>
          <Input
            id="register-password-confirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer"
        >
          {loading ? "처리 중..." : "회원가입"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-neutral-400">또는</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => handleOAuthLogin("kakao")}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#FEE500] px-4 py-2.5 text-sm font-semibold text-[#191919] transition hover:bg-[#FDD835] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <KakaoLogo />
          카카오로 시작하기
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          <GoogleLogo />
          Google로 시작하기
        </button>
      </div>

      <p className="text-center text-sm text-neutral-500">
        이미 계정이 있으신가요?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="cursor-pointer font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          로그인
        </button>
      </p>

      <p className="text-center text-xs text-neutral-400">
        가입 시{" "}
        <Link href="/terms" className="cursor-pointer underline">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="/privacy" className="cursor-pointer underline">
          개인정보처리방침
        </Link>
        에 동의합니다.
      </p>
    </div>
  );
}

function KakaoLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.6C4.032 0.6 0 3.732 0 7.554C0 9.834 1.434 11.856 3.6 13.086L2.682 16.566C2.616 16.812 2.892 17.01 3.108 16.872L7.23 14.214C7.812 14.334 8.4 14.4 9 14.4C13.968 14.4 18 11.268 18 7.446C18 3.732 13.968 0.6 9 0.6Z"
        fill="#191919"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
