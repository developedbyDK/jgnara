import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { CookiesContent } from "@/components/legal/cookies-content";

export const metadata = {
  title: "쿠키정책 - 중기나라",
  description: "중기나라 쿠키정책 - 쿠키 사용에 관한 안내",
};

export default function CookiesPage() {
  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-4 sm:p-6">
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            홈
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            쿠키정책
          </span>
        </nav>
        <div className="mt-4">
          <CookiesContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
