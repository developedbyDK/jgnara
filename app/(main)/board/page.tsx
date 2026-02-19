import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { BOARD_CONFIGS } from "@/lib/board-config";
import { getBoardStats } from "@/lib/board-queries";
import { IconChevronRight, IconMessage, IconEye } from "@tabler/icons-react";

export const metadata = {
  title: "게시판 - 중기나라",
  description: "중기나라 게시판 목록",
};

const GROUPS = [
  {
    name: "매매",
    slugs: ["buy", "sell", "plate-buy", "plate-sell"],
  },
  {
    name: "자격증/시험/취업",
    slugs: ["license-info", "license-review", "job-info"],
  },
  {
    name: "기타",
    slugs: ["free", "work-review", "daily"],
  },
];

export default async function BoardIndexPage() {
  const stats = await getBoardStats();

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
            게시판
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            게시판
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            카테고리별 게시판을 이용하세요
          </p>
        </div>

        {/* Board Groups */}
        <div className="mt-6 space-y-6">
          {GROUPS.map((group) => (
            <section key={group.name}>
              <h2 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {group.name}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.slugs.map((slug) => {
                  const config = BOARD_CONFIGS[slug];
                  if (!config) return null;

                  const boardStats = stats[slug];
                  const totalPosts = boardStats?.post_count ?? 0;
                  const totalViews = boardStats?.total_views ?? 0;

                  return (
                    <Link
                      key={slug}
                      href={`/board/${slug}`}
                      className="group cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-700"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-neutral-900 group-hover:text-orange-600 dark:text-neutral-100 dark:group-hover:text-orange-400">
                          {config.title}
                        </h3>
                        <IconChevronRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
                      </div>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {config.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <IconMessage className="h-3.5 w-3.5" />
                          게시글 {totalPosts}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <IconEye className="h-3.5 w-3.5" />
                          조회 {totalViews.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </CategorySidebar>
  );
}
