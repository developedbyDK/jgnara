import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { FaqContent } from "@/components/faq/faq-content";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "자주 묻는 질문 - 중기나라",
  description: "중기나라 이용에 대해 자주 묻는 질문과 답변을 확인해 보세요.",
};

async function getFaqs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("id, category, question, answer")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (!data || data.length === 0) return [];

  // Group by category preserving sort order
  const categoryMap = new Map<
    string,
    { name: string; items: { id: string; question: string; answer: string }[] }
  >();

  for (const faq of data) {
    if (!categoryMap.has(faq.category)) {
      categoryMap.set(faq.category, { name: faq.category, items: [] });
    }
    categoryMap.get(faq.category)!.items.push({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
  }

  return Array.from(categoryMap.values());
}

export default async function FaqPage() {
  const faqData = await getFaqs();

  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-4 sm:p-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            홈
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            자주 묻는 질문
          </span>
        </nav>

        {/* Content */}
        <div className="mt-4">
          <FaqContent faqData={faqData} />
        </div>
      </div>
    </CategorySidebar>
  );
}
