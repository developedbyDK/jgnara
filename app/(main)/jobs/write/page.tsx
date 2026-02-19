import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { JobsWriteForm } from "@/components/jobs/jobs-write-form";

export const metadata = {
  title: "구직 등록 - 중기나라",
  description: "건설장비 업계 구직 등록",
};

export default function JobsWritePage() {
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
          <Link
            href="/jobs"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            구직
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            글쓰기
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            구직 등록
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            구직 정보를 등록해주세요
          </p>
        </div>

        {/* Form */}
        <div className="mt-6">
          <JobsWriteForm />
        </div>
      </div>
    </CategorySidebar>
  );
}
