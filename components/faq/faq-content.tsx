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
  id: string;
  question: string;
  answer: string;
};

type FaqCategory = {
  name: string;
  items: FaqItem[];
};

interface FaqContentProps {
  faqData: FaqCategory[];
}

export function FaqContent({ faqData }: FaqContentProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredData = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(
      (category) =>
        category.items.length > 0 &&
        (!activeCategory || category.name === activeCategory),
    );

  const totalCount = faqData.reduce(
    (acc, category) => acc + category.items.length,
    0,
  );
  const filteredCount = filteredData.reduce(
    (acc, category) => acc + category.items.length,
    0,
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
              : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
          )}
        >
          전체 ({totalCount})
        </button>
        {faqData.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setActiveCategory(
                activeCategory === category.name ? null : category.name,
              )
            }
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition",
              activeCategory === category.name
                ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-950 dark:text-orange-400"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
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
                  {category.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-neutral-200 px-5 dark:border-neutral-800"
                    >
                      <AccordionTrigger className="cursor-pointer py-4 text-sm font-medium text-neutral-800 hover:no-underline dark:text-neutral-200">
                        <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-950 dark:text-orange-400">
                          Q
                        </span>
                        <span className="flex-1 text-left">
                          {item.question}
                        </span>
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
              총{" "}
              <span className="font-semibold text-orange-600">
                {filteredCount}
              </span>
              개의 검색 결과
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
