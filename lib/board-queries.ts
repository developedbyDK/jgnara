import { createClient } from "@/lib/supabase/server";

export type BoardPostView = {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  views: number;
  comments: number;
  isPinned: boolean;
};

export type BoardPostDetail = {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  board_slug: string;
  date: string;
  views: number;
  comments: number;
  isPinned: boolean;
  images: string[];
  updated_at: string | null;
};

export type BoardStats = {
  board_slug: string;
  post_count: number;
  total_views: number;
};

export async function getBoardPosts(boardSlug: string): Promise<BoardPostView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("board_posts")
    .select("id, title, author_name, category, created_at, views, comments, is_pinned")
    .eq("board_slug", boardSlug)
    .order("is_pinned", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.error("getBoardPosts error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author_name,
    category: row.category,
    date: row.created_at.slice(0, 10),
    views: row.views,
    comments: row.comments,
    isPinned: row.is_pinned,
  }));
}

export async function incrementBoardPostViews(id: number): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_board_post_views", { post_id: id });
}

export async function getBoardPost(
  id: number,
): Promise<BoardPostDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("board_posts")
    .select(
      "id, title, content, author_name, category, board_slug, created_at, updated_at, views, comments, is_pinned, images",
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getBoardPost error:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    author: data.author_name,
    category: data.category,
    board_slug: data.board_slug,
    date: data.created_at.slice(0, 10),
    views: data.views,
    comments: data.comments,
    isPinned: data.is_pinned,
    images: data.images ?? [],
    updated_at: data.updated_at,
  };
}

export async function getBoardStats(): Promise<Record<string, BoardStats>> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_board_stats");

  if (error) {
    console.error("getBoardStats error:", error);
    return {};
  }

  const map: Record<string, BoardStats> = {};
  for (const row of data ?? []) {
    map[row.board_slug] = row;
  }
  return map;
}
