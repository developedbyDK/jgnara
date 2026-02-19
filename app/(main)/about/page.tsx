import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { AboutContent } from "@/components/about/about-content";

export const metadata = {
  title: "회사소개 - 중기나라",
  description: "중기나라 회사소개 - 대한민국 No.1 건설장비 종합 플랫폼",
};

export default function AboutPage() {
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
            회사소개
          </span>
        </nav>

        {/* Content */}
        <div className="mt-4">
          <AboutContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
