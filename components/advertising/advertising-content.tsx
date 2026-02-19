"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconLayoutBoard,
  IconLayoutSidebar,
  IconCrown,
  IconBriefcase,
  IconCheck,
  IconPhone,
  IconMail,
  IconSend,
  IconMessageCircle,
  IconEye,
  IconClick,
  IconClock,
  IconStar,
} from "@tabler/icons-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Ad Products Data ───────────────────────────────
const AD_PRODUCTS = [
  {
    id: "main-banner",
    icon: <IconLayoutBoard className="h-8 w-8" />,
    title: "메인배너",
    shortDesc: "메인 페이지 최상단 노출",
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    id: "side-banner",
    icon: <IconLayoutSidebar className="h-8 w-8" />,
    title: "사이드배너",
    shortDesc: "전 페이지 사이드 영역 노출",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "vip-listing",
    icon: <IconCrown className="h-8 w-8" />,
    title: "VIP매물",
    shortDesc: "매물 목록 최상단 프리미엄 노출",
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "job-ad",
    icon: <IconBriefcase className="h-8 w-8" />,
    title: "구인구직광고",
    shortDesc: "구인구직 페이지 상단 노출",
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
];

// ─── Detailed Sections Data ─────────────────────────
const AD_DETAILS = [
  {
    id: "main-banner",
    icon: <IconLayoutBoard className="h-6 w-6" />,
    title: "메인배너 광고",
    description:
      "중기나라 메인 페이지 최상단에 노출되는 대형 배너 광고입니다. 사이트 방문 시 가장 먼저 눈에 들어오는 핵심 광고 영역으로, 브랜드 인지도 향상과 신규 고객 유입에 최적화되어 있습니다.",
    features: [
      "메인 페이지 최상단 슬라이드 배너 노출",
      "PC/모바일 반응형 디자인 지원",
      "클릭 시 지정 URL로 랜딩 페이지 연결",
      "노출 수 및 클릭 수 통계 리포트 제공",
      "이미지/동영상 배너 모두 가능",
    ],
    specs: [
      { label: "배너 사이즈", value: "1200 x 400px (권장)" },
      { label: "파일 형식", value: "JPG, PNG, GIF, MP4" },
      { label: "최대 용량", value: "이미지 2MB / 영상 10MB" },
      { label: "게재 기간", value: "1주 / 2주 / 1개월 단위" },
      { label: "최대 게재 수", value: "5개 (순환 노출)" },
    ],
    stats: [
      {
        icon: <IconEye className="h-4 w-4" />,
        label: "일 평균 노출",
        value: "15,000+",
      },
      {
        icon: <IconClick className="h-4 w-4" />,
        label: "평균 클릭률",
        value: "2.8%",
      },
    ],
  },
  {
    id: "side-banner",
    icon: <IconLayoutSidebar className="h-6 w-6" />,
    title: "사이드배너 광고",
    description:
      "사이트 전체 페이지의 사이드(우측) 영역에 고정 노출되는 배너 광고입니다. 사용자가 어떤 페이지를 탐색하든 지속적으로 노출되어, 높은 광고 효과를 기대할 수 있습니다.",
    features: [
      "전 페이지 사이드 영역 고정 노출",
      "스크롤 시에도 따라오는 스티키 배너 옵션",
      "매물 목록, 게시판, 업체찾기 등 모든 페이지 노출",
      "클릭 시 지정 URL로 랜딩 페이지 연결",
      "노출/클릭 통계 리포트 제공",
    ],
    specs: [
      { label: "배너 사이즈", value: "300 x 250px (권장)" },
      { label: "파일 형식", value: "JPG, PNG, GIF" },
      { label: "최대 용량", value: "1MB" },
      { label: "게재 기간", value: "1주 / 2주 / 1개월 단위" },
      { label: "노출 위치", value: "사이드바 상단/중단/하단 선택" },
    ],
    stats: [
      {
        icon: <IconEye className="h-4 w-4" />,
        label: "일 평균 노출",
        value: "30,000+",
      },
      {
        icon: <IconClick className="h-4 w-4" />,
        label: "평균 클릭률",
        value: "1.5%",
      },
    ],
  },
  {
    id: "vip-listing",
    icon: <IconCrown className="h-6 w-6" />,
    title: "VIP매물 광고",
    description:
      "매물 목록 페이지 최상단에 프리미엄 태그와 함께 노출되는 VIP 매물 광고입니다. 일반 매물보다 눈에 띄는 디자인과 상단 고정 노출로, 빠른 매물 판매를 돕습니다.",
    features: [
      "매물 목록 최상단 프리미엄 영역 고정 노출",
      "VIP 뱃지 및 하이라이트 디자인 적용",
      "메인 페이지 VIP 매물 캐러셀 노출",
      "카테고리별 상단 노출 지원",
      "매물 상세 페이지 조회수 통계 제공",
    ],
    specs: [
      { label: "매물 이미지", value: "최대 20장 등록 가능" },
      { label: "상세 설명", value: "제한 없음" },
      { label: "게재 기간", value: "1주 / 2주 / 1개월 단위" },
      { label: "노출 위치", value: "매물목록 상단 + 메인 캐러셀" },
      { label: "추가 혜택", value: "SNS 홍보 지원" },
    ],
    stats: [
      {
        icon: <IconEye className="h-4 w-4" />,
        label: "일 평균 노출",
        value: "8,000+",
      },
      {
        icon: <IconStar className="h-4 w-4" />,
        label: "문의 전환율",
        value: "5.2%",
      },
    ],
  },
  {
    id: "job-ad",
    icon: <IconBriefcase className="h-6 w-6" />,
    title: "구인구직 광고",
    description:
      "구인구직 페이지 상단에 프리미엄으로 노출되는 채용 광고입니다. 건설장비 전문 인력을 빠르게 채용하고 싶은 업체에 최적화된 광고 상품입니다.",
    features: [
      "구인구직 목록 최상단 프리미엄 노출",
      "프리미엄 뱃지 및 강조 디자인 적용",
      "구인 상세 페이지 상단 배너 노출 옵션",
      "지역별/직종별 타겟팅 노출 지원",
      "지원자 통계 리포트 제공",
    ],
    specs: [
      { label: "게재 내용", value: "업체명, 직종, 급여, 근무지 등" },
      { label: "이미지 첨부", value: "최대 5장" },
      { label: "게재 기간", value: "1주 / 2주 / 1개월 단위" },
      { label: "노출 위치", value: "구인구직 상단 + 메인 사이드" },
      { label: "추가 혜택", value: "긴급 채용 태그 지원" },
    ],
    stats: [
      {
        icon: <IconEye className="h-4 w-4" />,
        label: "일 평균 노출",
        value: "5,000+",
      },
      {
        icon: <IconClock className="h-4 w-4" />,
        label: "평균 채용기간",
        value: "3.5일",
      },
    ],
  },
];

// ─── Ad Inquiry Types ───────────────────────────────
const AD_INQUIRY_TYPES = [
  { value: "main-banner", label: "메인배너 광고" },
  { value: "side-banner", label: "사이드배너 광고" },
  { value: "vip-listing", label: "VIP매물 광고" },
  { value: "job-ad", label: "구인구직 광고" },
  { value: "package", label: "패키지 (복수 상품)" },
  { value: "other", label: "기타 문의" },
];

// ─── Component ──────────────────────────────────────
export function AdvertisingContent() {
  const [adType, setAdType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-10">
        <section className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <IconMessageCircle className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            광고 문의가 접수되었습니다
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            담당자가 확인 후 빠른 시간 내에 연락드리겠습니다. 감사합니다.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsSubmitted(false)}
            >
              추가 문의하기
            </Button>
            <Button asChild className="cursor-pointer">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ═══ Hero ═══ */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl dark:text-neutral-100">
          광고안내
        </h1>
        <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
          중기나라는 월간 방문자 50만 명 이상의 건설장비 전문 플랫폼입니다.
          <br className="hidden sm:block" />
          타겟 고객에게 효과적으로 도달할 수 있는 다양한 광고 상품을 제공합니다.
        </p>
      </section>

      {/* ═══ Ad Products Overview ═══ */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AD_PRODUCTS.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              document.getElementById(product.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="cursor-pointer border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
          >
            <div className={`inline-flex rounded-lg p-2.5 ${product.color}`}>
              {product.icon}
            </div>
            <h3 className="mt-3 text-base font-bold text-neutral-900 dark:text-neutral-100">
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {product.shortDesc}
            </p>
          </div>
        ))}
      </section>

      {/* ═══ Detailed Ad Sections ═══ */}
      {AD_DETAILS.map((ad) => (
        <section
          key={ad.id}
          id={ad.id}
          className="scroll-mt-48 border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
            <div className="text-primary">{ad.icon}</div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {ad.title}
            </h2>
          </div>

          <div className="space-y-6 p-5">
            {/* Description */}
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              {ad.description}
            </p>

            {/* Stats */}
            <div className="flex gap-3">
              {ad.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-800/50"
                >
                  <span className="text-primary">{stat.icon}</span>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Features */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  주요 특징
                </h3>
                <ul className="mt-3 space-y-2">
                  {ad.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  광고 규격
                </h3>
                <div className="mt-3 divide-y divide-neutral-100 border border-neutral-100 dark:divide-neutral-800 dark:border-neutral-800">
                  {ad.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center px-3 py-2.5"
                    >
                      <span className="w-24 shrink-0 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {spec.label}
                      </span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ Contact Info ═══ */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="text-primary">
            <IconPhone className="h-5 w-5" />
          </div>
          <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            광고 문의 전화
          </p>
          <p className="mt-0.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">
            1588-0000
          </p>
        </div>
        <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="text-primary">
            <IconMail className="h-5 w-5" />
          </div>
          <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            광고 문의 이메일
          </p>
          <p className="mt-0.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">
            ad@hsheavy.co.kr
          </p>
        </div>
      </section>

      {/* ═══ Inquiry Form ═══ */}
      <section className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            광고 문의하기
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Row 1: Company + Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-sm font-medium">
                업체명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="업체명을 입력하세요"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                담당자명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="담당자 이름을 입력하세요"
                required
              />
            </div>
          </div>

          {/* Row 2: Phone + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium">
                연락처 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Row 3: Ad Type */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              광고 상품 <span className="text-red-500">*</span>
            </Label>
            <Select value={adType} onValueChange={setAdType} required>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="광고 상품을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {AD_INQUIRY_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="cursor-pointer"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-sm font-medium">
              문의 내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="광고 희망 기간, 예산, 기타 요청사항 등을 자세히 작성해주세요."
              className="min-h-32"
              required
            />
          </div>

          {/* Privacy Agreement */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 h-4 w-4 cursor-pointer accent-orange-600"
            />
            <Label
              htmlFor="privacy"
              className="cursor-pointer text-sm text-neutral-600 dark:text-neutral-400"
            >
              <Link
                href="/privacy"
                className="cursor-pointer font-medium text-neutral-900 underline dark:text-neutral-200"
              >
                개인정보처리방침
              </Link>
              에 동의하며, 광고 상담을 위해 개인정보를 수집·이용하는 것에
              동의합니다.
            </Label>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer gap-2 bg-orange-600 px-6 text-white hover:bg-orange-700"
            >
              <IconSend className="h-4 w-4" />
              {isSubmitting ? "전송 중..." : "광고 문의하기"}
            </Button>
          </div>
        </form>
      </section>

      {/* ═══ General Contact Shortcut ═══ */}
      <section className="border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-800/50">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              기타 문의사항이 있으신가요?
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              광고 외 일반 문의는 문의하기 페이지를 이용해주세요.
            </p>
          </div>
          <Button variant="outline" asChild className="cursor-pointer">
            <Link href="/contact">문의하기 바로가기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
