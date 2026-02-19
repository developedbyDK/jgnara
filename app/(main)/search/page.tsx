import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { SearchResultsBoard } from "@/components/search/search-results-board";

export const metadata = {
  title: "매물 검색결과 - 중기나라",
  description: "중장비 매물 검색 결과를 확인하세요",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

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
            매물 검색결과
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {q ? (
              <>
                <span className="text-orange-600">&ldquo;{q}&rdquo;</span> 검색결과
              </>
            ) : (
              "전체 매물"
            )}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            원하시는 중장비 매물을 찾아보세요
          </p>
        </div>

        {/* Board */}
        <div className="mt-4">
          <SearchResultsBoard query={q} />
        </div>
      </div>
    </CategorySidebar>
  );
}
