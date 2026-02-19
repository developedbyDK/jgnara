import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { BoardWriteForm } from "@/components/board/board-write-form";

export const metadata = {
  title: "글쓰기 - 자유게시판 - 중기나라",
  description: "자유게시판 글쓰기",
};

export default function BoardWritePage() {
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
            자유게시판
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
            자유게시판에 글을 작성합니다
          </p>
        </div>

        {/* Form */}
        <div className="mt-6">
          <BoardWriteForm />
        </div>
      </div>
    </CategorySidebar>
  );
}
