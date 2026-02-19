"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  board_slug: string;
  views: number;
  comments: number;
  created_at: string;
};

const BOARD_LABELS: Record<string, string> = {
  free: "자유게시판",
  review: "이용후기",
  market: "장터",
  qna: "질문답변",
  tips: "정비꿀팁",
  news: "업계뉴스",
};

export function MyPostsTab({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("board_posts")
        .select("id, title, board_slug, views, comments, created_at")
        .eq("user_id", userId)
        .neq("status", "deleted")
        .order("created_at", { ascending: false });

      setPosts(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          작성한 게시글이 없습니다
        </p>
        <Link
          href="/board/free"
          className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          게시판 바로가기
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              제목
            </th>
            <th className="hidden pb-2 pr-4 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              게시판
            </th>
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              조회
            </th>
            <th className="pb-2 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
              댓글
            </th>
            <th className="hidden pb-2 font-medium text-neutral-500 sm:table-cell dark:text-neutral-400">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-neutral-100 dark:border-neutral-800/50"
            >
              <td className="py-3 pr-4">
                <Link
                  href={`/board/${post.board_slug}/${post.id}`}
                  className="cursor-pointer font-medium text-neutral-900 transition hover:text-orange-600 dark:text-neutral-100 dark:hover:text-orange-400"
                >
                  {post.title}
                </Link>
              </td>
              <td className="hidden py-3 pr-4 text-neutral-600 sm:table-cell dark:text-neutral-400">
                {BOARD_LABELS[post.board_slug] ?? post.board_slug}
              </td>
              <td className="py-3 pr-4 text-neutral-600 dark:text-neutral-400">
                {post.views.toLocaleString()}
              </td>
              <td className="py-3 pr-4 text-neutral-600 dark:text-neutral-400">
                {post.comments}
              </td>
              <td className="hidden py-3 text-neutral-600 sm:table-cell dark:text-neutral-400">
                {post.created_at.slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
