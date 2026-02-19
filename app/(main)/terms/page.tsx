import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata = {
  title: "이용약관 - 중기나라",
  description: "중기나라 이용약관 - 서비스 이용에 관한 기본적인 사항",
};

export default function TermsPage() {
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
            이용약관
          </span>
        </nav>
        <div className="mt-4">
          <TermsContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
