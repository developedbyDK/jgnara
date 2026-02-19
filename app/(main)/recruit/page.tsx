import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { RecruitBoard } from "@/components/recruit/recruit-board";
import { VipRecruitCarousel } from "@/components/recruit/vip-recruit-carousel";

export const metadata = {
  title: "구인 - 중기나라",
  description: "건설장비 업계 구인 공고 게시판",
};

export default function RecruitPage() {
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
            구인
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            구인 게시판
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            건설장비 업계 구인 공고를 확인하세요
          </p>
        </div>

        {/* VIP Recruit Carousel */}
        <div className="mt-4">
          <VipRecruitCarousel />
        </div>

        {/* Board */}
        <div className="mt-6">
          <RecruitBoard />
        </div>
      </div>
    </CategorySidebar>
  );
}
