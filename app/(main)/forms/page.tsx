import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { FormsDownloadContent } from "@/components/forms/forms-download-content";

export const metadata = {
  title: "주요양식 - 중기나라",
  description: "건설장비 업계 주요 양식 및 서류를 다운로드하세요",
};

export default function FormsPage() {
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
            주요양식
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            주요양식 다운로드
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            건설장비 관련 각종 양식 및 서류를 다운로드하세요
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          <FormsDownloadContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
