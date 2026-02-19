import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { AdPaymentContent } from "@/components/advertising/ad-payment-content";

export const metadata = {
  title: "광고결제 - 중기나라",
  description:
    "보유 포인트으로 광고 상품을 결제하세요. 메인배너, 사이드배너, VIP매물, 구인구직광고 등 다양한 광고를 포인트으로 이용할 수 있습니다.",
};

export default function AdPaymentPage() {
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
            href="/advertising"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            광고안내
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            광고결제
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            광고결제
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            보유 포인트으로 광고 상품을 결제하세요
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          <AdPaymentContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
