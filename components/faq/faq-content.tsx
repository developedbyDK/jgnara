"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  name: string;
  items: FaqItem[];
};

const faqData: FaqCategory[] = [
  {
    name: "회원/계정",
    items: [
      {
        question: "회원가입은 어떻게 하나요?",
        answer:
          "중기나라 홈페이지 우측 상단의 '회원가입' 버튼을 클릭하여 가입할 수 있습니다. 이메일, 비밀번호, 이름, 연락처 등 기본 정보를 입력하면 가입이 완료됩니다. 사업자 회원의 경우 사업자등록번호를 추가로 입력해야 합니다.",
      },
      {
        question: "비밀번호를 잊어버렸어요.",
        answer:
          "로그인 페이지에서 '비밀번호 찾기'를 클릭하시면, 가입 시 등록한 이메일 또는 휴대폰 번호로 비밀번호 재설정 링크를 받으실 수 있습니다. 링크를 통해 새로운 비밀번호를 설정해 주세요.",
      },
      {
        question: "회원 탈퇴는 어떻게 하나요?",
        answer:
          "마이페이지 > 계정 설정 > 회원 탈퇴에서 진행하실 수 있습니다. 탈퇴 시 등록하신 매물 및 게시글은 모두 삭제되며, 삭제된 데이터는 복구할 수 없습니다. 탈퇴 후 동일 이메일로 재가입은 30일 후 가능합니다.",
      },
      {
        question: "회원 등급은 어떻게 결정되나요?",
        answer:
          "회원 등급은 매물 등록 수, 거래 완료 건수, 활동 기간 등을 종합적으로 평가하여 결정됩니다. 등급이 높을수록 매물 노출 우선순위, 프리미엄 배너 등 다양한 혜택을 받으실 수 있습니다.",
      },
    ],
  },
  {
    name: "매물 등록/관리",
    items: [
      {
        question: "매물 등록은 어떻게 하나요?",
        answer:
          "로그인 후 상단 메뉴의 '매물등록' 버튼을 클릭하면 등록 페이지로 이동합니다. 장비 종류, 제조사, 모델명, 연식, 가격, 상태, 사진 등의 정보를 입력하고 등록하면 됩니다. 사진은 최대 20장까지 업로드 가능합니다.",
      },
      {
        question: "매물 등록 비용이 있나요?",
        answer:
          "일반 매물 등록은 무료입니다. 다만, 매물을 상단에 노출시키는 프리미엄 등록이나 배너 광고는 별도 비용이 발생합니다. 자세한 요금은 고객센터로 문의해 주세요.",
      },
      {
        question: "등록한 매물을 수정하거나 삭제하려면?",
        answer:
          "마이페이지 > 내 매물 관리에서 등록한 매물의 수정 및 삭제가 가능합니다. 매물 정보 변경 시 수정 후 재승인이 필요할 수 있으며, 삭제된 매물은 복구할 수 없으니 주의해 주세요.",
      },
      {
        question: "매물 사진은 몇 장까지 올릴 수 있나요?",
        answer:
          "매물 1건당 최대 20장의 사진을 업로드할 수 있습니다. 사진은 JPG, PNG 형식으로 각 10MB 이내의 파일만 등록 가능합니다. 장비의 전면, 측면, 후면, 실내, 엔진룸 등 다양한 각도의 사진을 올리시면 구매자에게 더 좋은 인상을 줄 수 있습니다.",
      },
      {
        question: "매물이 판매 완료되면 어떻게 하나요?",
        answer:
          "마이페이지 > 내 매물 관리에서 해당 매물의 상태를 '판매완료'로 변경해 주세요. 판매완료된 매물은 검색 결과에서 제외되며, 거래 이력으로 보관됩니다.",
      },
    ],
  },
  {
    name: "거래/결제",
    items: [
      {
        question: "중기나라에서 직접 거래를 중개하나요?",
        answer:
          "중기나라은 매물 등록 및 검색 플랫폼으로, 직접적인 거래 중개는 하지 않습니다. 매도자와 매수자가 직접 연락하여 거래를 진행합니다. 다만, 안전거래 서비스를 통해 거래 과정의 안전성을 높일 수 있습니다.",
      },
      {
        question: "안전거래 서비스란 무엇인가요?",
        answer:
          "안전거래 서비스는 거래 대금을 중기나라이 임시로 보관한 뒤, 장비 인수가 완료되면 매도자에게 지급하는 에스크로 서비스입니다. 거래 사기를 예방하고 양측 모두 안전한 거래를 할 수 있도록 도와드립니다.",
      },
      {
        question: "거래 시 주의해야 할 점이 있나요?",
        answer:
          "거래 전 반드시 장비를 직접 확인하시고, 등록증 및 소유자 정보를 확인해 주세요. 과도하게 저렴한 매물이나 선입금을 요구하는 경우 사기를 의심해 볼 수 있습니다. 의심스러운 매물은 신고 기능을 이용해 주세요.",
      },
    ],
  },
  {
    name: "업체 등록/찾기",
    items: [
      {
        question: "업체 등록은 어떻게 하나요?",
        answer:
          "상단 메뉴의 '업체찾기/등록 > 업체등록'에서 등록할 수 있습니다. 사업자등록증, 업체 정보(상호명, 주소, 연락처, 취급 장비 종류 등)를 입력하면 관리자 검토 후 등록이 완료됩니다.",
      },
      {
        question: "업체 정보를 수정하고 싶어요.",
        answer:
          "마이페이지 > 업체 관리에서 등록된 업체 정보를 수정할 수 있습니다. 상호명, 대표자명 등 주요 정보 변경 시에는 증빙 서류가 필요할 수 있습니다.",
      },
      {
        question: "업체 등록 비용이 있나요?",
        answer:
          "기본 업체 등록은 무료입니다. 프리미엄 업체 프로필(상단 노출, 배너 광고, 로고 표시 등)을 원하시면 별도 요금이 적용됩니다.",
      },
    ],
  },
  {
    name: "구인/구직",
    items: [
      {
        question: "구인 공고는 어떻게 등록하나요?",
        answer:
          "상단 메뉴의 '구인/구직 > 구인'에서 구인 공고를 등록할 수 있습니다. 채용 직종, 근무지역, 급여 조건, 자격 요건 등을 상세히 작성하시면 구직자들이 쉽게 찾을 수 있습니다.",
      },
      {
        question: "구직 등록은 무료인가요?",
        answer:
          "네, 구직 등록은 완전 무료입니다. 자신의 경력, 보유 자격증, 희망 근무지역 및 급여 등을 등록하면 구인 업체에서 연락을 받으실 수 있습니다.",
      },
      {
        question: "이력서는 어떻게 관리하나요?",
        answer:
          "마이페이지 > 이력서 관리에서 이력서를 작성, 수정, 삭제할 수 있습니다. 이력서는 최대 3개까지 등록 가능하며, 공개/비공개 설정이 가능합니다.",
      },
    ],
  },
  {
    name: "기타",
    items: [
      {
        question: "중기나라 앱은 어디서 다운로드하나요?",
        answer:
          "현재 중기나라 모바일 앱은 준비 중이며, 출시 시 홈페이지 및 공지사항을 통해 안내드릴 예정입니다. 모바일 웹 브라우저에서도 최적화된 환경으로 이용하실 수 있습니다.",
      },
      {
        question: "문의 및 불만 접수는 어디로 하나요?",
        answer:
          "홈페이지 하단의 '문의하기' 또는 고객센터 전화(1234-5678)로 문의해 주세요. 운영시간은 평일 09:00~18:00이며, 이메일(support@junggiin.com)로도 접수 가능합니다. 접수된 문의는 영업일 기준 1~2일 내에 답변드립니다.",
      },
      {
        question: "허위 매물을 신고하고 싶어요.",
        answer:
          "매물 상세 페이지의 '신고하기' 버튼을 눌러 허위 매물을 신고하실 수 있습니다. 신고 사유를 선택하고 상세 내용을 작성해 주시면 관리자가 확인 후 적절한 조치를 취합니다. 허위 매물 등록자는 경고 또는 계정 정지 등의 제재를 받을 수 있습니다.",
      },
      {
        question: "개인정보는 안전하게 보호되나요?",
        answer:
          "중기나라은 개인정보보호법에 따라 회원님의 개인정보를 안전하게 보호합니다. 모든 데이터는 암호화되어 저장되며, 개인정보 처리방침에 따라 엄격하게 관리됩니다. 자세한 내용은 하단의 '개인정보처리방침'을 확인해 주세요.",
      },
    ],
  },
];

export function FaqContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredData = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.items.length > 0 &&
        (!activeCategory || category.name === activeCategory)
    );

  const totalCount = faqData.reduce(
    (acc, category) => acc + category.items.length,
    0
  );
  const filteredCount = filteredData.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  return (
    <div>
      {/* 페이지 타이틀 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          자주 묻는 질문
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          중기나라 이용에 대해 궁금한 점을 확인해 보세요.
        </p>
      </div>

      {/* 검색 */}
      <div className="relative mb-6">
        <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          placeholder="질문을 검색해 보세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 rounded-lg border-neutral-300 pl-10 pr-4 dark:border-neutral-700"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition",
            !activeCategory
              ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-950 dark:text-orange-400"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
          )}
        >
          전체 ({totalCount})
        </button>
        {faqData.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setActiveCategory(
                activeCategory === category.name ? null : category.name
              )
            }
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition",
              activeCategory === category.name
                ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-950 dark:text-orange-400"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
            )}
          >
            {category.name} ({category.items.length})
          </button>
        ))}
      </div>

      {/* FAQ 목록 */}
      {filteredData.length > 0 ? (
        <div className="space-y-8">
          {filteredData.map((category) => (
            <div key={category.name}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                <span className="inline-block h-5 w-1 rounded-full bg-orange-500" />
                {category.name}
              </h2>
              <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                <Accordion type="multiple">
                  {category.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${category.name}-${idx}`}
                      className="border-neutral-200 px-5 dark:border-neutral-800"
                    >
                      <AccordionTrigger className="cursor-pointer py-4 text-sm font-medium text-neutral-800 hover:no-underline dark:text-neutral-200">
                        <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                          Q
                        </span>
                        <span className="flex-1 text-left">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-9 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}

          {/* 검색 결과 수 */}
          {search && (
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              총 <span className="font-semibold text-orange-600">{filteredCount}</span>개의 검색 결과
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950">
          <IconSearch className="mb-3 h-10 w-10 text-neutral-300 dark:text-neutral-600" />
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            검색 결과가 없습니다.
          </p>
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            다른 키워드로 검색해 보세요.
          </p>
        </div>
      )}

      {/* 추가 안내 */}
      <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          원하시는 답변을 찾지 못하셨나요?
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          고객센터로 문의해 주시면 친절하게 안내해 드리겠습니다.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="tel:1234-5678"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
          >
            전화 문의: 1234-5678
          </a>
          <a
            href="mailto:support@junggiin.com"
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            이메일: support@junggiin.com
          </a>
        </div>
        <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
          운영시간: 평일 09:00 ~ 18:00 (주말/공휴일 휴무)
        </p>
      </div>
    </div>
  );
}
