"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconSend,
  IconMessageCircle,
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

// ─── Inquiry Types ──────────────────────────────────
const INQUIRY_TYPES = [
  { value: "general", label: "일반 문의" },
  { value: "listing", label: "매물 관련" },
  { value: "company", label: "업체등록 관련" },
  { value: "recruit", label: "구인/구직 관련" },
  { value: "payment", label: "결제/환불 관련" },
  { value: "report", label: "신고/제보" },
  { value: "partnership", label: "제휴/협력" },
  { value: "other", label: "기타" },
];

// ─── Component ──────────────────────────────────────
export function ContactContent() {
  const [inquiryType, setInquiryType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
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
            문의가 접수되었습니다
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            빠른 시간 내에 답변드리겠습니다. 감사합니다.
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
          문의하기
        </h1>
        <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
          궁금하신 점이나 건의사항이 있으시면 아래 양식을 통해 문의해주세요.
          <br className="hidden sm:block" />
          영업일 기준 1~2일 이내에 답변드리겠습니다.
        </p>
      </section>

      {/* ═══ Contact Info ═══ */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ContactInfoCard
          icon={<IconPhone className="h-5 w-5" />}
          label="대표전화"
          value="1588-0000"
          href="tel:1588-0000"
        />
        <ContactInfoCard
          icon={<IconMail className="h-5 w-5" />}
          label="이메일"
          value="info@hsheavy.co.kr"
          href="mailto:info@hsheavy.co.kr"
        />
        <ContactInfoCard
          icon={<IconMapPin className="h-5 w-5" />}
          label="주소"
          value="경기도 화성시 동탄대로 123"
        />
        <ContactInfoCard
          icon={<IconClock className="h-5 w-5" />}
          label="운영시간"
          value="평일 09:00 ~ 18:00"
        />
      </section>

      {/* ═══ Contact Form ═══ */}
      <section className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            문의 양식
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Row 1: Name + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium">
                연락처
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          {/* Row 2: Email + Inquiry Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                문의유형 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={inquiryType}
                onValueChange={setInquiryType}
                required
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="문의유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {INQUIRY_TYPES.map((type) => (
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
          </div>

          {/* Row 3: Subject */}
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-sm font-medium">
              제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="문의 제목을 입력하세요"
              required
            />
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-sm font-medium">
              내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="문의하실 내용을 자세히 작성해주세요."
              className="min-h-40"
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
              에 동의하며, 문의 답변을 위해 개인정보를 수집·이용하는 것에
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
              {isSubmitting ? "전송 중..." : "문의하기"}
            </Button>
          </div>
        </form>
      </section>

      {/* ═══ FAQ Shortcut ═══ */}
      <section className="border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-800/50">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              자주 묻는 질문을 확인해보세요
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              많은 분들이 궁금해하시는 내용을 정리해두었습니다.
            </p>
          </div>
          <Button variant="outline" asChild className="cursor-pointer">
            <Link href="/faq">자주 묻는 질문 바로가기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// ─── Sub-Component ──────────────────────────────────
function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="text-primary">{icon}</div>
      <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="cursor-pointer transition hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
