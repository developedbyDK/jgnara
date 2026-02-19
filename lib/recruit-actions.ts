"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateRecruitStatus(id: string, status: string) {
  const validStatuses = ["모집중", "마감", "삭제"];

  if (!validStatuses.includes(status)) {
    return { success: false, message: "유효하지 않은 상태입니다." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("recruits")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("updateRecruitStatus error:", error);
    return { success: false, message: "상태 변경에 실패했습니다." };
  }

  revalidatePath("/hs-ctrl-x7k9m/recruit");
  return { success: true };
}

export async function deleteRecruit(id: string) {
  return updateRecruitStatus(id, "삭제");
}
