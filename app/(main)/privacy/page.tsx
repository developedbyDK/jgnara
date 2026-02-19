import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { PrivacyContent } from "@/components/legal/privacy-content";

export const metadata = {
  title: "개인정보처리방침 - 중기나라",
  description:
    "중기나라 개인정보처리방침 - 개인정보보호법에 따른 개인정보 처리 및 보호에 관한 사항",
};

export default function PrivacyPage() {
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
            개인정보처리방침
          </span>
        </nav>
        <div className="mt-4">
          <PrivacyContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
