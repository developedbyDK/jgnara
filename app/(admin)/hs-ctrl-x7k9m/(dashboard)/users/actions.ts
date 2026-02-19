"use server";

import { createClient } from "@/lib/supabase/server";

export interface AdminUserRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: "일반" | "업체" | "VIP" | "관리자";
  status: "활성" | "정지" | "탈퇴";
  company: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  listing_count: number;
  post_count: number;
  last_sign_in_at: string | null;
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_admin_users");

  if (error) {
    console.error("Failed to fetch admin users:", error);
    return [];
  }

  return (data ?? []) as AdminUserRow[];
}

export async function getAdminUserById(
  userId: string
): Promise<AdminUserRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_admin_users");

  if (error) {
    console.error("Failed to fetch admin user:", error);
    return null;
  }

  const users = (data ?? []) as AdminUserRow[];
  return users.find((u) => u.id === userId) ?? null;
}

export async function updateUserStatus(
  userId: string,
  status: "활성" | "정지" | "탈퇴"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Failed to update user status:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateUserRole(
  userId: string,
  role: "일반" | "업체" | "VIP" | "관리자"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
