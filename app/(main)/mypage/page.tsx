import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { MypageContent } from "@/components/mypage/mypage-content";

export const metadata = {
  title: "마이페이지 - 중기나라",
  description: "내 프로필, 매물, 게시글, 포인트 내역을 관리하세요",
};

export default function MypagePage() {
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
            마이페이지
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            마이페이지
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            내 프로필, 매물, 게시글, 포인트 내역을 한곳에서 관리하세요
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          <MypageContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
