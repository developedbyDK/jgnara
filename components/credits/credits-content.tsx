"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconCoin,
  IconCheck,
  IconSparkles,
  IconInfoCircle,
  IconChevronDown,
  IconLoader2,
} from "@tabler/icons-react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { createClient } from "@/lib/supabase/client";

// ─── Types ───────────────────────────────────────────
type CreditPackage = {
  id: string;
  slug: string;
  name: string;
  credits: number;
  price: number;
  bonus: number;
  tag: string | null;
  popular: boolean;
};

// ─── Constants ───────────────────────────────────────
const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

const CREDIT_USAGE = [
  { label: "매물 등록", cost: "10 포인트" },
  { label: "매물 끌어올리기", cost: "5 포인트" },
  { label: "프리미엄 매물 등록", cost: "30 포인트" },
  { label: "긴급 매물 등록", cost: "20 포인트" },
  { label: "배너 광고 (1일)", cost: "50 포인트" },
];

function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}

function generateOrderId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "credit_";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ─── Component ───────────────────────────────────────
export function CreditsContent() {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [myCredits, setMyCredits] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [usageOpen, setUsageOpen] = useState(false);
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetsRef = useRef<any>(null);
  const initializingRef = useRef(false);

  // 포인트 패키지 조회
  useEffect(() => {
    async function fetchPackages() {
      const supabase = createClient();
      const { data } = await supabase
        .from("credit_packages")
        .select("id, slug, name, credits, price, bonus, tag, popular")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (data && data.length > 0) {
        setPackages(data);
        const popularPkg = data.find((p) => p.popular);
        setSelectedPackage(popularPkg?.id ?? data[0].id);
      }
      setPackagesLoading(false);
    }
    fetchPackages();
  }, []);

  // 사용자 정보 + 포인트 조회
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);
      setUserEmail(user.email ?? "");

      const { data } = await supabase
        .from("profiles")
        .select("credits, full_name")
        .eq("id", user.id)
        .single();

      if (data) {
        setMyCredits(data.credits ?? 0);
        setUserName(data.full_name ?? "");
      }
    }
    fetchUser();
  }, []);

  // 토스페이먼츠 위젯 초기화 (패키지 로딩 완료 후 1회만)
  useEffect(() => {
    if (
      !userId ||
      packages.length === 0 ||
      initializingRef.current ||
      widgetsRef.current
    )
      return;

    if (!TOSS_CLIENT_KEY) {
      console.error(
        "[토스] NEXT_PUBLIC_TOSS_CLIENT_KEY 환경변수가 설정되지 않았습니다.",
      );
      setWidgetError(
        "결제 설정이 완료되지 않았습니다. 관리자에게 문의해주세요.",
      );
      return;
    }

    initializingRef.current = true;

    async function init() {
      try {
        const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
        const widgets = tossPayments.widgets({
          customerKey: userId!,
        });

        const defaultPkg = packages.find((p) => p.popular) ?? packages[0];

        await widgets.setAmount({
          currency: "KRW",
          value: defaultPkg.price,
        });

        await widgets.renderPaymentMethods({
          selector: "#payment-method-widget",
          variantKey: "DEFAULT",
        });

        await widgets.renderAgreement({
          selector: "#agreement-widget",
          variantKey: "AGREEMENT",
        });

        widgetsRef.current = widgets;
        setIsPaymentReady(true);
      } catch (error: unknown) {
        const err = error as { code?: string; message?: string };
        console.error("[토스] 위젯 초기화 실패:", err);
        setWidgetError(
          `결제 위젯 오류: ${err?.message || "알 수 없는 오류"} (${err?.code || "NO_CODE"})`,
        );
        initializingRef.current = false;
      }
    }

    init();
  }, [userId, packages]);

  // 패키지 변경 시 금액만 업데이트
  const handlePackageSelect = async (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = packages.find((p) => p.id === packageId);
    if (pkg && widgetsRef.current) {
      try {
        await widgetsRef.current.setAmount({
          currency: "KRW",
          value: pkg.price,
        });
      } catch (error) {
        console.error("금액 업데이트 실패:", error);
      }
    }
  };

  // 결제 요청
  const handlePayment = async () => {
    if (!widgetsRef.current || !userId || isProcessing) return;

    const selected = packages.find((p) => p.id === selectedPackage);
    if (!selected) return;

    setIsProcessing(true);

    try {
      const supabase = createClient();
      const orderId = generateOrderId();

      // 트랜잭션 레코드 생성
      const { error: insertError } = await supabase
        .from("credit_transactions")
        .insert({
          user_id: userId,
          order_id: orderId,
          package_id: selected.id,
          credits_amount: selected.credits + selected.bonus,
          payment_amount: selected.price,
          status: "pending",
        });

      if (insertError) {
        console.error("트랜잭션 생성 실패:", insertError);
        setIsProcessing(false);
        return;
      }

      // 토스 결제 요청 (Redirect 방식)
      await widgetsRef.current.requestPayment({
        orderId,
        orderName: `중기나라 포인트 - ${selected.name} (${formatPrice(selected.credits + selected.bonus)} 포인트)`,
        successUrl: `${window.location.origin}/credits/success`,
        failUrl: `${window.location.origin}/credits/fail`,
        customerEmail: userEmail || undefined,
        customerName: userName || undefined,
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
      setIsProcessing(false);
    }
  };

  const selected = packages.find((p) => p.id === selectedPackage);

  if (packagesLoading) {
    return (
      <div className="space-y-4">
        <div className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 보유 포인트 */}
      {myCredits !== null && (
        <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
            <IconCoin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              보유 포인트
            </p>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {formatPrice(myCredits)}{" "}
              <span className="text-sm font-normal">포인트</span>
            </p>
          </div>
        </div>
      )}

      {/* 포인트 패키지 선택 */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          충전 패키지 선택
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              className={cn(
                "relative cursor-pointer rounded-xl border p-4 text-left transition",
                selectedPackage === pkg.id
                  ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500 dark:border-orange-500 dark:bg-orange-950/30"
                  : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700",
              )}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2.5 right-3 gap-1 bg-orange-600 text-white hover:bg-orange-600">
                  <IconSparkles className="h-3 w-3" />
                  인기
                </Badge>
              )}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {pkg.name}
                </span>
                {pkg.tag && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-bold text-orange-600 dark:text-orange-400"
                  >
                    {pkg.tag}
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {formatPrice(pkg.credits + pkg.bonus)}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  포인트
                </span>
              </div>
              {pkg.bonus > 0 && (
                <p className="mt-1 text-xs text-orange-600 dark:text-orange-400">
                  기본 {formatPrice(pkg.credits)} + 보너스{" "}
                  {formatPrice(pkg.bonus)}
                </p>
              )}
              <div className="mt-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {formatPrice(pkg.price)}
                </span>
                <span className="ml-0.5 text-sm text-neutral-500">원</span>
              </div>
              {selectedPackage === pkg.id && (
                <div className="absolute right-3 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
                  <IconCheck className="h-3.5 w-3.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 토스페이먼츠 결제 위젯 */}
      {userId && (
        <div>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            결제 수단
          </h2>
          {widgetError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {widgetError}
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div id="payment-method-widget" />
              <div id="agreement-widget" />
            </div>
          )}
        </div>
      )}

      {!userId && myCredits === null && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            결제를 진행하려면 먼저 로그인해주세요.
          </p>
        </div>
      )}

      {/* 결제 요약 및 버튼 */}
      {selected && userId && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            결제 요약
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 dark:text-neutral-400">
                선택 패키지
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {selected.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 dark:text-neutral-400">
                충전 포인트
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {formatPrice(selected.credits + selected.bonus)} 포인트
                {selected.bonus > 0 && (
                  <span className="ml-1 text-xs text-orange-600 dark:text-orange-400">
                    (보너스 +{formatPrice(selected.bonus)})
                  </span>
                )}
              </span>
            </div>
            <div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  결제 금액
                </span>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatPrice(selected.price)}원
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            disabled={!isPaymentReady || isProcessing}
            className="mt-4 w-full cursor-pointer gap-2 bg-orange-600 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700"
          >
            {isProcessing ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                결제 처리 중...
              </>
            ) : (
              <>
                <IconCoin className="h-4 w-4" />
                {formatPrice(selected.price)}원 결제하기
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-500">
            결제 후 즉시 포인트이 충전됩니다
          </p>
        </div>
      )}

      {/* 포인트 사용 안내 */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setUsageOpen(!usageOpen)}
          className="flex w-full cursor-pointer items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <IconInfoCircle className="h-4 w-4 text-neutral-400" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              포인트 사용 안내
            </span>
          </div>
          <IconChevronDown
            className={cn(
              "h-4 w-4 text-neutral-400 transition-transform",
              usageOpen && "rotate-180",
            )}
          />
        </button>
        {usageOpen && (
          <div className="border-t border-neutral-200 px-4 pb-4 pt-3 dark:border-neutral-800">
            <div className="space-y-2">
              {CREDIT_USAGE.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {item.label}
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
              * 포인트은 환불이 불가하며, 충전일로부터 1년간 유효합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
