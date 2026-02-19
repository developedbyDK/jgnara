"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ── Public: Submit contact form ──

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = (formData.get("phone") as string) || null;
  const email = formData.get("email") as string;
  const inquiryType = formData.get("inquiry_type") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !inquiryType || !subject || !message) {
    return { success: false, message: "필수 항목을 모두 입력해주세요." };
  }

  const validTypes = [
    "general",
    "listing",
    "company",
    "recruit",
    "payment",
    "report",
    "partnership",
    "other",
  ];
  if (!validTypes.includes(inquiryType)) {
    return { success: false, message: "유효하지 않은 문의유형입니다." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contacts").insert({
    name,
    phone,
    email,
    inquiry_type: inquiryType,
    subject,
    message,
  });

  if (error) {
    console.error("submitContact error:", error);
    return { success: false, message: "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요." };
  }

  return { success: true };
}

// ── Admin: Update contact status ──

export async function updateContactStatus(id: string, status: string, adminNote?: string) {
  const validStatuses = ["대기", "답변완료", "보류"];
  if (!validStatuses.includes(status)) {
    return { success: false, message: "유효하지 않은 상태입니다." };
  }

  const supabase = await createClient();

  const updateData: Record<string, string> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (adminNote !== undefined) {
    updateData.admin_note = adminNote;
  }

  const { error } = await supabase
    .from("contacts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("updateContactStatus error:", error);
    return { success: false, message: "상태 변경에 실패했습니다." };
  }

  revalidatePath("/hs-ctrl-x7k9m/contacts");
  return { success: true };
}

// ── Admin: Delete contact ──

export async function deleteContact(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    console.error("deleteContact error:", error);
    return { success: false, message: "삭제에 실패했습니다." };
  }

  revalidatePath("/hs-ctrl-x7k9m/contacts");
  return { success: true };
}
