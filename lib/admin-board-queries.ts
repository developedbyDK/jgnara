import { createClient } from "@/lib/supabase/server";
import { BOARD_CONFIGS } from "@/lib/board-config";

// ─── Status Mapping ──────────────────────────────────
const STATUS_MAP: Record<string, string> = {
  active: "게시중",
  hidden: "숨김",
  deleted: "삭제",
};

function mapStatus(dbStatus: string): string {
  return STATUS_MAP[dbStatus] ?? dbStatus;
}

function getBoardTitle(slug: string): string {
  return BOARD_CONFIGS[slug]?.title ?? slug;
}

// ─── Types ───────────────────────────────────────────
export type AdminBoardPost = {
  id: number;
  title: string;
  boardSlug: string;
  boardTitle: string;
  author: string;
  status: string;
  createdAt: string;
  views: number;
  comments: number;
  category: string;
  isPinned: boolean;
};

export type AdminBoardPostDetail = {
  id: number;
  title: string;
  content: string;
  boardSlug: string;
  boardTitle: string;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  views: number;
  comments: number;
  category: string;
  isPinned: boolean;
  images: string[];
};

// ─── Queries ─────────────────────────────────────────
export async function getAdminBoardPosts(): Promise<AdminBoardPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("board_posts")
    .select(
      "id, title, board_slug, author_name, status, created_at, views, comments, category, is_pinned",
    )
    .order("id", { ascending: false });

  if (error) {
    console.error("getAdminBoardPosts error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    boardSlug: row.board_slug,
    boardTitle: getBoardTitle(row.board_slug),
    author: row.author_name,
    status: mapStatus(row.status),
    createdAt: row.created_at.slice(0, 10),
    views: row.views,
    comments: row.comments,
    category: row.category,
    isPinned: row.is_pinned,
  }));
}

export async function getAdminBoardPost(
  id: number,
): Promise<AdminBoardPostDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("board_posts")
    .select(
      "id, title, content, board_slug, author_name, status, created_at, updated_at, views, comments, category, is_pinned, images",
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getAdminBoardPost error:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    boardSlug: data.board_slug,
    boardTitle: getBoardTitle(data.board_slug),
    author: data.author_name,
    status: mapStatus(data.status),
    createdAt: data.created_at.slice(0, 10),
    updatedAt: data.updated_at,
    views: data.views,
    comments: data.comments,
    category: data.category,
    isPinned: data.is_pinned,
    images: data.images ?? [],
  };
}
