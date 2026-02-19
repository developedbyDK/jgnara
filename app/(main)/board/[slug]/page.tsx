import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { BoardContent } from "@/components/board/board-content";
import { BOARD_CONFIGS } from "@/lib/board-config";
import { getBoardPosts } from "@/lib/board-queries";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = BOARD_CONFIGS[slug];
  if (!config) return {};

  return {
    title: `${config.title} - 중기나라`,
    description: config.description,
  };
}

export default async function BoardSlugPage({ params }: Props) {
  const { slug } = await params;
  const config = BOARD_CONFIGS[slug];

  if (!config) notFound();

  const posts = await getBoardPosts(slug);

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
            href="/board"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            게시판
          </Link>
          <span>/</span>
          <span className="text-xs text-neutral-400">{config.group}</span>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {config.title}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {config.description}
          </p>
        </div>

        {/* Board */}
        <div className="mt-4">
          <BoardContent
            categories={config.categories}
            categoryColors={config.categoryColors}
            posts={posts}
            boardSlug={slug}
            writeUrl={`/board/${slug}/write`}
          />
        </div>
      </div>
    </CategorySidebar>
  );
}
