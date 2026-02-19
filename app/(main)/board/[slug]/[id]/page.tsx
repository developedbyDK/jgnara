import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { BOARD_CONFIGS } from "@/lib/board-config";
import { getBoardPost, incrementBoardPostViews } from "@/lib/board-queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconArrowLeft, IconEye, IconMessage } from "@tabler/icons-react";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;
  const config = BOARD_CONFIGS[slug];
  if (!config) return {};

  const post = await getBoardPost(Number(id));
  if (!post) return {};

  return {
    title: `${post.title} - ${config.title} - 중기나라`,
    description: post.content.slice(0, 160),
  };
}

export default async function BoardPostPage({ params }: Props) {
  const { slug, id } = await params;
  const config = BOARD_CONFIGS[slug];

  if (!config) notFound();

  const postId = Number(id);
  await incrementBoardPostViews(postId);
  const post = await getBoardPost(postId);

  if (!post || post.board_slug !== slug) notFound();

  const categoryColors = config.categoryColors ?? {};

  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-4 sm:p-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
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
          <Link
            href={`/board/${slug}`}
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            {config.title}
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            게시글
          </span>
        </nav>

        {/* Post Header */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={categoryColors[post.category] || ""}
            >
              {post.category}
            </Badge>
            {post.isPinned && (
              <Badge variant="destructive" className="text-xs">
                공지
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {post.author}
            </span>
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-0.5">
              <IconEye className="size-3.5" />
              {post.views}
            </span>
            {post.comments > 0 && (
              <span className="inline-flex items-center gap-0.5 text-blue-500">
                <IconMessage className="size-3.5" />
                {post.comments}
              </span>
            )}
          </div>
        </div>

        <Separator className="my-5" />

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed sm:text-base">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </article>

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              첨부 이미지 ({post.images.length})
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {post.images.map((url, i) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <Image
                    src={url}
                    alt={`첨부 이미지 ${i + 1}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-5" />

        {/* Back Button */}
        <div className="flex">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
            asChild
          >
            <Link href={`/board/${slug}`}>
              <IconArrowLeft className="size-4" />
              목록으로
            </Link>
          </Button>
        </div>
      </div>
    </CategorySidebar>
  );
}
