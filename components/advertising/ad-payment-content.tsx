"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  IconCoin,
  IconCheck,
  IconLayoutBoard,
  IconLayoutSidebar,
  IconCrown,
  IconBriefcase,
  IconLoader2,
  IconShoppingCart,
  IconClock,
  IconInfoCircle,
  IconChevronDown,
  IconCircleCheck,
  IconPhoto,
  IconX,
  IconBrush,
  IconSend,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContact } from "@/lib/contact-actions";
import { createClient } from "@/lib/supabase/client";
import { compressImageToWebP } from "@/lib/utils/compress-image";

// ─── Types ───────────────────────────────────────────
type AdProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_key: string;
  credit_cost_monthly: number;
  credit_cost_2month: number;
  credit_cost_3month: number;
  credit_cost_6month: number;
  credit_cost_yearly: number;
};

type AdPurchase = {
  id: string;
  ad_product_id: string;
  duration: string;
  credits_spent: number;
  status: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  ad_products: { name: string; slug: string } | null;
};

type Duration = "1개월" | "2개월" | "3개월" | "6개월" | "1년";

// ─── Helpers ─────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  "layout-board": <IconLayoutBoard className="h-6 w-6" />,
  "layout-sidebar": <IconLayoutSidebar className="h-6 w-6" />,
  crown: <IconCrown className="h-6 w-6" />,
  briefcase: <IconBriefcase className="h-6 w-6" />,
};

const COLOR_MAP: Record<string, string> = {
  "main-banner":
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  "side-banner":
    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "vip-listing":
    "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  "job-ad":
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const DURATIONS: { value: Duration; label: string; discount?: string }[] = [
  { value: "1개월", label: "1개월" },
  { value: "2개월", label: "2개월", discount: "약 10% 할인" },
  { value: "3개월", label: "3개월", discount: "약 17% 할인" },
  { value: "6개월", label: "6개월", discount: "약 25% 할인" },
  { value: "1년", label: "1년", discount: "약 33% 할인" },
];

function formatCredits(n: number) {
  return n.toLocaleString("ko-KR");
}

function getCreditCost(product: AdProduct, duration: Duration): number {
  switch (duration) {
    case "1개월":
      return product.credit_cost_monthly;
    case "2개월":
      return product.credit_cost_2month;
    case "3개월":
      return product.credit_cost_3month;
    case "6개월":
      return product.credit_cost_6month;
    case "1년":
      return product.credit_cost_yearly;
  }
}

const IMAGE_SIZE_GUIDE: Record<
  string,
  { width: string; height: string; desc: string }
> = {
  "main-banner": {
    width: "1200",
    height: "400",
    desc: "메인 페이지 상단에 전체 너비로 표시됩니다",
  },
  "side-banner": {
    width: "200",
    height: "120",
    desc: "사이드바 영역에 표시됩니다",
  },
  "vip-listing": {
    width: "400",
    height: "140",
    desc: "VIP 매물 캐러셀에 카드형으로 표시됩니다",
  },
  "job-ad": {
    width: "400",
    height: "160",
    desc: "VIP 구인 캐러셀에 카드형으로 표시됩니다",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Component ───────────────────────────────────────
export function AdPaymentContent() {
  const [products, setProducts] = useState<AdProduct[]>([]);
  const [purchases, setPurchases] = useState<AdPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [myCredits, setMyCredits] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("1개월");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  // 배너 제작 문의 모달
  const [bannerInquiryOpen, setBannerInquiryOpen] = useState(false);
  const [bannerInquiryForm, setBannerInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    description: "",
  });
  const [bannerInquirySubmitting, setBannerInquirySubmitting] = useState(false);
  const [bannerInquiryResult, setBannerInquiryResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 링크 URL
  const [linkUrl, setLinkUrl] = useState("");

  // 배너 이미지
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerUploading, setBannerUploading] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // 데이터 로딩
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // 사용자 정보
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", user.id)
          .single();
        if (profile) setMyCredits(profile.credits ?? 0);

        // 구매 내역
        const { data: purchaseData } = await supabase
          .from("ad_purchases")
          .select("*, ad_products(name, slug)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);
        if (purchaseData) setPurchases(purchaseData as AdPurchase[]);
      }

      // 광고 상품
      const { data: productData } = await supabase
        .from("ad_products")
        .select(
          "id, name, slug, description, icon_key, credit_cost_monthly, credit_cost_2month, credit_cost_3month, credit_cost_6month, credit_cost_yearly",
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (productData && productData.length > 0) {
        setProducts(productData);
        setSelectedProduct(productData[0].id);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  // 배너 이미지 선택
  const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    const url = URL.createObjectURL(file);
    setBannerPreview(url);
    e.target.value = "";
  };

  const handleBannerRemove = () => {
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerFile(null);
    setBannerPreview(null);
  };

  // 배너 이미지 업로드
  const uploadBannerImage = async (userId: string): Promise<string | null> => {
    if (!bannerFile) return null;

    setBannerUploading(true);
    try {
      const supabase = createClient();
      const compressed = await compressImageToWebP(bannerFile);
      const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

      const { error } = await supabase.storage
        .from("ad-banners")
        .upload(path, compressed, {
          contentType: "image/webp",
          cacheControl: "31536000",
        });

      if (error) {
        console.error("Banner upload error:", error);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("ad-banners").getPublicUrl(path);

      return publicUrl;
    } catch (e) {
      console.error("Banner processing error:", e);
      return null;
    } finally {
      setBannerUploading(false);
    }
  };

  // 광고 결제 처리
  const handlePurchase = async () => {
    if (!userId || !selectedProduct || isProcessing) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    // 모든 광고 상품은 배너 이미지 필수
    if (!bannerFile) {
      setPurchaseResult({
        success: false,
        message: "광고 이미지를 업로드해야 합니다.",
      });
      return;
    }

    const cost = getCreditCost(product, selectedDuration);

    if (myCredits !== null && myCredits < cost) {
      setPurchaseResult({
        success: false,
        message: `포인트이 부족합니다. (보유: ${formatCredits(myCredits)} / 필요: ${formatCredits(cost)})`,
      });
      return;
    }

    setIsProcessing(true);
    setPurchaseResult(null);

    // 1. 배너 이미지 업로드
    let bannerImageUrl: string | null = null;
    if (bannerFile) {
      bannerImageUrl = await uploadBannerImage(userId);
      if (!bannerImageUrl) {
        setPurchaseResult({
          success: false,
          message: "배너 이미지 업로드에 실패했습니다. 다시 시도해주세요.",
        });
        setIsProcessing(false);
        return;
      }
    }

    // 2. 결제 처리
    const supabase = createClient();
    const { data: rawData, error } = await supabase.rpc("purchase_ad", {
      p_user_id: userId,
      p_ad_product_id: selectedProduct,
      p_duration: selectedDuration,
      p_credits_spent: cost,
    });

    const data = rawData as {
      success: boolean;
      error?: string;
      purchase_id?: string;
      remaining_credits?: number;
    } | null;

    if (error || !data?.success) {
      setPurchaseResult({
        success: false,
        message:
          data?.error || error?.message || "결제 처리 중 오류가 발생했습니다.",
      });
      setIsProcessing(false);
      return;
    }

    // 3. 배너 이미지 URL + 링크 URL 저장
    if (data?.purchase_id) {
      const updateData: Record<string, string> = {};
      if (bannerImageUrl) updateData.banner_image_url = bannerImageUrl;
      if (linkUrl.trim()) updateData.link_url = linkUrl.trim();
      if (Object.keys(updateData).length > 0) {
        await supabase
          .from("ad_purchases")
          .update(updateData)
          .eq("id", data.purchase_id);
      }
    }

    setMyCredits(data.remaining_credits ?? 0);
    setPurchaseResult({
      success: true,
      message: `${product.name} ${selectedDuration} 광고가 결제되었습니다! 관리자 승인 후 광고가 게시됩니다.`,
    });

    // 초기화
    handleBannerRemove();
    setLinkUrl("");

    // 구매 내역 갱신
    const { data: purchaseData } = await supabase
      .from("ad_purchases")
      .select("*, ad_products(name, slug)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    if (purchaseData) setPurchases(purchaseData as AdPurchase[]);

    setIsProcessing(false);
  };

  // 배너 제작 문의 제출
  const handleBannerInquirySubmit = async () => {
    const { name, phone, email, area, description } = bannerInquiryForm;
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !area ||
      !description.trim()
    ) {
      setBannerInquiryResult({
        success: false,
        message: "모든 항목을 입력해주세요.",
      });
      return;
    }

    setBannerInquirySubmitting(true);
    setBannerInquiryResult(null);

    const formData = new FormData();
    formData.set("name", name.trim());
    formData.set("phone", phone.trim());
    formData.set("email", email.trim());
    formData.set("inquiry_type", "other");
    formData.set("subject", `배너 이미지 제작 문의 (${area})`);
    formData.set(
      "message",
      `[배너 이미지 제작 문의]\n\n이름: ${name.trim()}\n연락처: ${phone.trim()}\n이메일: ${email.trim()}\n게시 영역: ${area}\n\n요청 내용:\n${description.trim()}`,
    );

    const result = await submitContact(formData);

    if (result.success) {
      setBannerInquiryResult({
        success: true,
        message: "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      });
      setBannerInquiryForm({
        name: "",
        phone: "",
        email: "",
        area: "",
        description: "",
      });
    } else {
      setBannerInquiryResult({
        success: false,
        message: result.message || "문의 접수에 실패했습니다.",
      });
    }

    setBannerInquirySubmitting(false);
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const currentCost = selectedProductData
    ? getCreditCost(selectedProductData, selectedDuration)
    : 0;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"
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
        <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
              <IconCoin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                보유 포인트
              </p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {formatCredits(myCredits)}{" "}
                <span className="text-sm font-normal">포인트</span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="cursor-pointer"
          >
            <Link href="/credits">충전하기</Link>
          </Button>
        </div>
      )}

      {!userId && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            광고를 결제하려면 먼저{" "}
            <Link
              href="/login"
              className="cursor-pointer font-medium text-orange-600 underline"
            >
              로그인
            </Link>
            해주세요.
          </p>
        </div>
      )}

      {/* 광고 상품 선택 */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          광고 상품 선택
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {products.map((product) => {
            const isSelected = selectedProduct === product.id;
            return (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border p-4 text-left transition",
                  isSelected
                    ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500 dark:border-orange-500 dark:bg-orange-950/30"
                    : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "inline-flex rounded-lg p-2",
                      COLOR_MAP[product.slug] ??
                        "bg-neutral-100 text-neutral-600",
                    )}
                  >
                    {ICON_MAP[product.icon_key] ?? (
                      <IconLayoutBoard className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {product.name}
                    </span>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {product.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium"
                      >
                        1개월 {formatCredits(product.credit_cost_monthly)}P
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium"
                      >
                        3개월 {formatCredits(product.credit_cost_3month)}P
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium"
                      >
                        1년 {formatCredits(product.credit_cost_yearly)}P
                      </Badge>
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
                    <IconCheck className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 기간 선택 */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          광고 기간 선택
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {DURATIONS.map((d) => {
            const isSelected = selectedDuration === d.value;
            const cost = selectedProductData
              ? getCreditCost(selectedProductData, d.value)
              : 0;
            return (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={cn(
                  "relative cursor-pointer rounded-xl border p-4 text-center transition",
                  isSelected
                    ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500 dark:border-orange-500 dark:bg-orange-950/30"
                    : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700",
                )}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <IconClock className="h-4 w-4 text-neutral-400" />
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {d.label}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-bold whitespace-nowrap text-orange-600 dark:text-orange-400">
                  {formatCredits(cost)}
                  <span className="ml-0.5 text-xs font-normal">P</span>
                </p>
                {d.discount && (
                  <p className="mt-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    {d.discount}
                  </p>
                )}
                {isSelected && (
                  <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-white">
                    <IconCheck className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 링크 URL 입력 */}
      {userId && selectedProductData && (
        <div>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            광고 클릭 시 이동 URL
          </h2>
          <Input
            placeholder="https://example.com (광고 클릭 시 이동할 URL을 입력하세요)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="max-w-lg"
          />
          <p className="mt-1.5 text-xs text-neutral-400">
            입력하지 않으면 홈페이지로 이동합니다.
          </p>
        </div>
      )}

      {/* 배너 이미지 업로드 */}
      {userId && selectedProductData && (
        <div>
          <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
            광고 이미지 업로드
            <span className="ml-1 text-xs font-normal text-red-500">
              (필수)
            </span>
          </h2>
          {selectedProductData &&
            IMAGE_SIZE_GUIDE[selectedProductData.slug] && (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/50 dark:bg-blue-950/30">
                <IconInfoCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  <p className="font-semibold">
                    권장 이미지 크기:{" "}
                    {IMAGE_SIZE_GUIDE[selectedProductData.slug].width} x{" "}
                    {IMAGE_SIZE_GUIDE[selectedProductData.slug].height}px
                  </p>
                  <p className="mt-0.5 text-blue-600 dark:text-blue-400">
                    {IMAGE_SIZE_GUIDE[selectedProductData.slug].desc}
                  </p>
                </div>
              </div>
            )}
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerSelect}
          />
          {bannerPreview ? (
            <div className="relative inline-block">
              <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                <Image
                  src={bannerPreview}
                  alt="배너 미리보기"
                  width={400}
                  height={200}
                  className="h-auto max-h-48 w-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={handleBannerRemove}
                className="absolute -right-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600"
              >
                <IconX className="size-3.5" />
              </button>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {bannerFile?.name}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              disabled={bannerUploading}
              className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 px-4 py-8 text-sm text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
            >
              <IconPhoto className="size-8" />
              <span>클릭하여 배너 이미지를 업로드하세요</span>
              <span className="text-xs text-neutral-400">
                자동으로 WebP 변환 및 압축됩니다
              </span>
            </button>
          )}

          {/* 배너 이미지 제작 문의 CTA */}
          <button
            type="button"
            onClick={() => {
              setBannerInquiryOpen(true);
              setBannerInquiryResult(null);
            }}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-orange-300 bg-orange-50/50 px-3 py-3 transition hover:border-orange-400 hover:bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20 dark:hover:border-orange-700 dark:hover:bg-orange-950/30"
          >
            <IconBrush className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              배너이미지가 없으신가요? 제작해드립니다 (클릭)
            </span>
          </button>
        </div>
      )}

      {/* 결제 결과 메시지 */}
      {purchaseResult && (
        <div
          className={cn(
            "rounded-xl border p-4 text-sm",
            purchaseResult.success
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
          )}
        >
          <div className="flex items-center gap-2">
            {purchaseResult.success ? (
              <IconCircleCheck className="h-4 w-4 shrink-0" />
            ) : (
              <IconInfoCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{purchaseResult.message}</span>
            {!purchaseResult.success &&
              myCredits !== null &&
              myCredits < currentCost && (
                <Link
                  href="/credits"
                  className="cursor-pointer ml-2 font-medium underline"
                >
                  포인트 충전하기
                </Link>
              )}
          </div>
        </div>
      )}

      {/* 결제 요약 및 버튼 */}
      {selectedProductData && userId && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            결제 요약
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 dark:text-neutral-400">
                광고 상품
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {selectedProductData.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 dark:text-neutral-400">
                광고 기간
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {selectedDuration}
              </span>
            </div>
            <div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  결제 포인트
                </span>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatCredits(currentCost)} 포인트
                </span>
              </div>
            </div>
            {myCredits !== null && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">결제 후 잔여 포인트</span>
                <span
                  className={cn(
                    "font-medium",
                    myCredits >= currentCost
                      ? "text-neutral-600 dark:text-neutral-300"
                      : "text-red-500",
                  )}
                >
                  {myCredits >= currentCost
                    ? `${formatCredits(myCredits - currentCost)} 포인트`
                    : "포인트 부족"}
                </span>
              </div>
            )}
          </div>
          <Button
            onClick={handlePurchase}
            disabled={
              isProcessing || (myCredits !== null && myCredits < currentCost)
            }
            className="mt-4 w-full cursor-pointer gap-2 bg-orange-600 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700"
          >
            {isProcessing ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                결제 처리 중...
              </>
            ) : (
              <>
                <IconShoppingCart className="h-4 w-4" />
                {formatCredits(currentCost)} 포인트으로 결제하기
              </>
            )}
          </Button>
          {myCredits !== null && myCredits < currentCost && (
            <p className="mt-2 text-center text-xs text-red-500">
              포인트이 부족합니다.{" "}
              <Link
                href="/credits"
                className="cursor-pointer font-medium underline"
              >
                충전하러 가기
              </Link>
            </p>
          )}
        </div>
      )}

      {/* 구매 내역 */}
      {userId && purchases.length > 0 && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="flex w-full cursor-pointer items-center justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <IconClock className="h-4 w-4 text-neutral-400" />
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                최근 광고 구매 내역
              </span>
              <Badge variant="secondary" className="text-[10px]">
                {purchases.length}
              </Badge>
            </div>
            <IconChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-transform",
                historyOpen && "rotate-180",
              )}
            />
          </button>
          {historyOpen && (
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "inline-flex rounded-lg p-1.5",
                          COLOR_MAP[purchase.ad_products?.slug ?? ""] ??
                            "bg-neutral-100 text-neutral-600",
                        )}
                      >
                        {ICON_MAP[
                          products.find((p) => p.id === purchase.ad_product_id)
                            ?.icon_key ?? "layout-board"
                        ] ?? <IconLayoutBoard className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {purchase.ad_products?.name ?? "광고"} (
                          {purchase.duration})
                        </p>
                        <p className="text-xs text-neutral-400">
                          {formatDate(purchase.starts_at)} ~{" "}
                          {formatDate(purchase.ends_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                        -{formatCredits(purchase.credits_spent)}P
                      </p>
                      <Badge
                        variant={
                          purchase.status === "진행중" ? "default" : "secondary"
                        }
                        className={cn(
                          "text-[10px]",
                          purchase.status === "진행중" &&
                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                          purchase.status === "승인대기" &&
                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                          purchase.status === "거절" &&
                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                        )}
                      >
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 안내사항 */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-start gap-2">
          <IconInfoCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
          <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
            <p>
              * 광고는 결제 후 관리자 승인 시점부터 선택한 기간 동안 노출됩니다.
            </p>
            <p>* 관리자가 거절할 경우 사용된 포인트이 환불됩니다.</p>
            <p>* 모든 광고 상품은 결제 시 광고 이미지 업로드가 필수입니다.</p>
            <p>
              * 광고 상품에 대한 자세한 내용은{" "}
              <Link
                href="/advertising"
                className="cursor-pointer font-medium text-orange-600 underline dark:text-orange-400"
              >
                광고안내
              </Link>{" "}
              페이지를 참고해주세요.
            </p>
          </div>
        </div>
      </div>

      {/* 배너 이미지 제작 문의 모달 */}
      <Dialog open={bannerInquiryOpen} onOpenChange={setBannerInquiryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconBrush className="h-5 w-5 text-orange-500" />
              배너 이미지 제작 문의
            </DialogTitle>
            <DialogDescription>
              배너 이미지 제작을 원하시면 아래 정보를 입력해주세요. 빠르게
              연락드리겠습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner-inquiry-name">이름 / 업체명</Label>
              <Input
                id="banner-inquiry-name"
                placeholder="이름 또는 업체명을 입력하세요"
                value={bannerInquiryForm.name}
                onChange={(e) =>
                  setBannerInquiryForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner-inquiry-phone">연락처</Label>
              <Input
                id="banner-inquiry-phone"
                placeholder="010-0000-0000"
                value={bannerInquiryForm.phone}
                onChange={(e) =>
                  setBannerInquiryForm((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner-inquiry-email">이메일</Label>
              <Input
                id="banner-inquiry-email"
                type="email"
                placeholder="example@email.com"
                value={bannerInquiryForm.email}
                onChange={(e) =>
                  setBannerInquiryForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>배너 게시 영역</Label>
              <Select
                value={bannerInquiryForm.area}
                onValueChange={(value) =>
                  setBannerInquiryForm((prev) => ({
                    ...prev,
                    area: value,
                  }))
                }
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="게시 영역을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="메인배너" className="cursor-pointer">
                    메인배너
                  </SelectItem>
                  <SelectItem value="사이드배너" className="cursor-pointer">
                    사이드배너
                  </SelectItem>
                  <SelectItem value="VIP매물" className="cursor-pointer">
                    VIP매물
                  </SelectItem>
                  <SelectItem value="구인구직광고" className="cursor-pointer">
                    구인구직광고
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner-inquiry-desc">요청 내용</Label>
              <Textarea
                id="banner-inquiry-desc"
                placeholder="원하시는 배너 이미지에 대해 설명해주세요 (크기, 내용, 참고 이미지 등)"
                rows={4}
                value={bannerInquiryForm.description}
                onChange={(e) =>
                  setBannerInquiryForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {bannerInquiryResult && (
              <div
                className={cn(
                  "rounded-lg border p-3 text-sm",
                  bannerInquiryResult.success
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
                )}
              >
                {bannerInquiryResult.message}
              </div>
            )}

            <Button
              onClick={handleBannerInquirySubmit}
              disabled={bannerInquirySubmitting}
              className="w-full cursor-pointer gap-2 bg-orange-600 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700"
            >
              {bannerInquirySubmitting ? (
                <>
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                  접수 중...
                </>
              ) : (
                <>
                  <IconSend className="h-4 w-4" />
                  문의 접수하기
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
