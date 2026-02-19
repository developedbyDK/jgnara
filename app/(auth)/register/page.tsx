"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <RegisterForm />
      <AuthSidePanel />
    </div>
  );
}

function RegisterForm() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitted form");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="w-full max-w-md px-4 sm:px-6 lg:px-20 xl:px-24">
        <div>
          <Link
            href="/"
            className="flex cursor-pointer items-center text-2xl font-extrabold tracking-tight"
            style={{ fontFamily: "'EutmanEungtteong', sans-serif" }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-xl font-bold text-white">J</span>
            <span className="ml-1.5 text-orange-500">중기</span>
            <span className="text-orange-600">나라</span>
          </Link>
          <h2 className="mt-8 text-2xl leading-9 font-bold tracking-tight text-black dark:text-white">
            회원가입
          </h2>
        </div>

        <div className="mt-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
              >
                이름
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
              >
                비밀번호
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password-confirm"
                className="block text-sm leading-6 font-medium text-neutral-700 dark:text-neutral-400"
              >
                비밀번호 확인
              </label>
              <div className="mt-2">
                <input
                  id="password-confirm"
                  type="password"
                  placeholder="••••••••"
                  className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative z-10 flex w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl"
              >
                회원가입
              </button>
              <p
                className={cn(
                  "mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400",
                )}
              >
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/login"
                  className="cursor-pointer font-medium text-black dark:text-white"
                >
                  로그인
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm leading-6 font-medium">
                <span className="bg-gray-50 px-6 text-neutral-400 dark:bg-neutral-950 dark:text-neutral-500">
                  또는
                </span>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3">
              <button
                type="button"
                className="relative z-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FEE500] px-4 py-2 text-sm font-semibold text-[#191919] transition duration-200 hover:bg-[#FDD835]"
              >
                카카오로 시작하기
              </button>
              <button
                type="button"
                className="relative z-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#03C75A] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#02b351]"
              >
                네이버로 시작하기
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
              가입 시{" "}
              <Link
                href="#"
                className="cursor-pointer text-neutral-500 dark:text-neutral-300"
              >
                이용약관
              </Link>{" "}
              및{" "}
              <Link
                href="#"
                className="cursor-pointer text-neutral-500 dark:text-neutral-300"
              >
                개인정보처리방침
              </Link>
              에 동의합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
