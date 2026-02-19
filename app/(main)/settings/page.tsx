import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata = {
  title: "설정 - 중기나라",
  description: "계정 보안 및 화면 설정을 관리하세요",
};

export default function SettingsPage() {
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
            설정
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            설정
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            계정 보안 및 화면 설정을 관리하세요
          </p>
        </div>

        {/* Content */}
        <div className="mt-6">
          <SettingsContent />
        </div>
      </div>
    </CategorySidebar>
  );
}
