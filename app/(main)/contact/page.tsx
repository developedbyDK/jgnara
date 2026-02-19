import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata = {
  title: "문의하기 - 중기나라",
  description: "중기나라 문의하기 - 궁금하신 점이나 건의사항을 남겨주세요.",
};

export default function ContactPage() {
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
            문의하기
          </span>
        </nav>

        {/* Content */}
        <div className="mt-4">
          <ContactContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
