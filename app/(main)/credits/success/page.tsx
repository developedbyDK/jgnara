"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IconCheck, IconCoin, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [credits, setCredits] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMessage("결제 정보가 올바르지 않습니다.");
      return;
    }

    async function confirmPayment() {
      try {
        const res = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error || "결제 승인에 실패했습니다.");
          return;
        }

        setCredits(data.credits);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage("결제 처리 중 오류가 발생했습니다.");
      }
    }

    confirmPayment();
  }, [searchParams]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <IconLoader2 className="mx-auto h-12 w-12 animate-spin text-orange-500" />
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              결제 확인 중...
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              잠시만 기다려주세요
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <IconCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              결제가 완료되었습니다!
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-orange-600 dark:text-orange-400">
              <IconCoin className="h-5 w-5" />
              {credits.toLocaleString("ko-KR")} 포인트 충전 완료
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Button asChild className="cursor-pointer bg-orange-600 text-white hover:bg-orange-700">
                <Link href="/credits">충전 내역 확인</Link>
              </Button>
              <Button asChild variant="outline" className="cursor-pointer">
                <Link href="/">홈으로 이동</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-2xl">!</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              결제 처리 실패
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {errorMessage}
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <Button asChild className="cursor-pointer bg-orange-600 text-white hover:bg-orange-700">
                <Link href="/credits">다시 시도하기</Link>
              </Button>
              <Button asChild variant="outline" className="cursor-pointer">
                <Link href="/">홈으로 이동</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
}
