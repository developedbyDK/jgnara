"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "UNKNOWN_ERROR";
  const message =
    searchParams.get("message") ?? "결제 처리 중 오류가 발생했습니다.";

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <IconAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            결제에 실패했습니다
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {message}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            에러 코드: {code}
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Button
              asChild
              className="cursor-pointer bg-orange-600 text-white hover:bg-orange-700"
            >
              <Link href="/credits">다시 시도하기</Link>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/">홈으로 이동</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense>
      <PaymentFailContent />
    </Suspense>
  );
}
