import { createClient } from "@/lib/supabase/server";
import type { AdminContactView, ContactStatus } from "@/lib/contact-types";

export type { AdminContactView, ContactStatus } from "@/lib/contact-types";
export { getInquiryTypeLabel } from "@/lib/contact-types";

// ── Queries ──

export async function getContacts(): Promise<AdminContactView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contacts")
    .select("id, name, phone, email, inquiry_type, subject, message, status, admin_note, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getContacts error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    inquiryType: row.inquiry_type,
    subject: row.subject,
    message: row.message,
    status: row.status as ContactStatus,
    adminNote: row.admin_note,
    createdAt: row.created_at.slice(0, 10),
  }));
}
