"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createBoardPost(formData: FormData) {
  const boardSlug = formData.get("boardSlug") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const password = formData.get("password") as string;
  const content = formData.get("content") as string;
  const images = formData.getAll("images") as string[];

  if (!boardSlug || !title || !category || !author || !content) {
    return { success: false, message: "필수 항목을 모두 입력해주세요." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 비밀번호 해시 (익명 사용자용)
  let passwordHash: string | null = null;
  if (!user && password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    passwordHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  const { error } = await supabase.from("board_posts").insert({
    board_slug: boardSlug,
    category,
    title,
    content,
    images: images.length > 0 ? images : [],
    author_name: user ? user.user_metadata?.name ?? author : author,
    user_id: user?.id ?? null,
    password_hash: passwordHash,
  });

  if (error) {
    return { success: false, message: "게시글 등록에 실패했습니다. 다시 시도해주세요." };
  }

  revalidatePath(`/board/${boardSlug}`);
  revalidatePath("/board");
  redirect(`/board/${boardSlug}`);
}
