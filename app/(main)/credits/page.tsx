import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { CreditsContent } from "@/components/credits/credits-content";

export const metadata = {
  title: "포인트충전 - 중기나라",
  description: "중기나라 포인트을 충전하고 프리미엄 서비스를 이용하세요",
};

export default function CreditsPage() {
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
            포인트충전
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            포인트충전
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            포인트을 충전하여 매물 등록, 끌어올리기 등 다양한 서비스를
            이용하세요
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          <CreditsContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
