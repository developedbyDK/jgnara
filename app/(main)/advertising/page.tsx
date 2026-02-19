import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { AdvertisingContent } from "@/components/advertising/advertising-content";

export const metadata = {
  title: "광고안내 - 중기나라",
  description:
    "중기나라 광고안내 - 메인배너, 사이드배너, VIP매물, 구인구직광고 등 다양한 광고 상품을 확인하세요.",
};

export default function AdvertisingPage() {
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
            광고안내
          </span>
        </nav>

        {/* Content */}
        <div className="mt-4">
          <AdvertisingContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
