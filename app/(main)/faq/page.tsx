import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { FaqContent } from "@/components/faq/faq-content";

export const metadata = {
  title: "자주 묻는 질문 - 중기나라",
  description: "중기나라 이용에 대해 자주 묻는 질문과 답변을 확인해 보세요.",
};

export default function FaqPage() {
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
          <FaqContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
