"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ─── Status Mapping (Korean → DB) ───────────────────
const STATUS_REVERSE_MAP: Record<string, string> = {
  게시중: "active",
  숨김: "hidden",
  삭제: "deleted",
};

export async function updatePostStatus(id: number, status: string) {
  const dbStatus = STATUS_REVERSE_MAP[status] ?? status;
  const supabase = await createClient();

  const { error } = await supabase
    .from("board_posts")
    .update({ status: dbStatus, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("updatePostStatus error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/hs-ctrl-x7k9m/board");
  revalidatePath(`/hs-ctrl-x7k9m/board/${id}`);
  return { success: true };
}

export async function togglePostPin(id: number, currentPinned: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("board_posts")
    .update({
      is_pinned: !currentPinned,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("togglePostPin error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/hs-ctrl-x7k9m/board");
  revalidatePath(`/hs-ctrl-x7k9m/board/${id}`);
  return { success: true };
}
