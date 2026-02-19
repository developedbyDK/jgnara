import { createClient } from "@/lib/supabase/server";

// ── Status type ──

export type RecruitStatus = "모집중" | "마감" | "삭제";

// ── Types ──

export type AdminRecruitView = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: RecruitStatus;
  type: string;
  applicants: number;
  deadline: string;
  createdAt: string;
};

// ── Queries ──

export async function getRecruits(): Promise<AdminRecruitView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recruits")
    .select("id, title, company, location, salary, status, type, applicants, deadline, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getRecruits error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    salary: row.salary,
    status: row.status as RecruitStatus,
    type: row.type,
    applicants: row.applicants,
    deadline: row.deadline,
    createdAt: row.created_at.slice(0, 10),
  }));
}
