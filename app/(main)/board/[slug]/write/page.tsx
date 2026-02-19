import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { BoardWriteForm } from "@/components/board/board-write-form";
import { BOARD_CONFIGS, getAllBoardSlugs } from "@/lib/board-config";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBoardSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = BOARD_CONFIGS[slug];
  if (!config) return {};

  return {
    title: `글쓰기 - ${config.title} - 중기나라`,
    description: `${config.title} 글쓰기`,
  };
}

export default async function BoardSlugWritePage({ params }: Props) {
  const { slug } = await params;
  const config = BOARD_CONFIGS[slug];

  if (!config) notFound();

  // "전체" 카테고리 제외
  const writeCategories = config.categories.filter((c) => c !== "전체");

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
          <Link
            href={`/board/${slug}`}
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            {config.title}
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            글쓰기
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            글쓰기
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {config.title}에 글을 작성합니다
          </p>
        </div>

        {/* Form */}
        <div className="mt-6">
          <BoardWriteForm
            categories={writeCategories}
            backUrl={`/board/${slug}`}
          />
        </div>
      </div>
    </CategorySidebar>
  );
}
