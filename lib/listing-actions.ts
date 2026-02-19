"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateListingStatus(id: string, status: string) {
  const validStatuses = [
    "active",
    "pending",
    "sold",
    "deleted",
    "reserved",
    "rejected",
  ];

  if (!validStatuses.includes(status)) {
    return { success: false, message: "유효하지 않은 상태입니다." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("listings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("updateListingStatus error:", error);
    return { success: false, message: "상태 변경에 실패했습니다." };
  }

  revalidatePath("/hs-ctrl-x7k9m/listings");
  revalidatePath(`/hs-ctrl-x7k9m/listings/${id}`);
  return { success: true };
}
