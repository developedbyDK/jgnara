import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { JobsBoard } from "@/components/jobs/jobs-board";

export const metadata = {
  title: "구직 - 중기나라",
  description: "건설장비 업계 구직 게시판",
};

export default function JobsPage() {
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
            구직
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            구직 게시판
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            건설장비 업계 구직 정보를 확인하세요
          </p>
        </div>

        {/* Board */}
        <div className="mt-4">
          <JobsBoard />
        </div>
      </div>
    </CategorySidebar>
  );
}
