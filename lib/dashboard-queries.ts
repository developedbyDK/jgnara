import { createClient } from "@/lib/supabase/server";

// ── Types ──

export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalListings: number;
  newListingsToday: number;
  totalPosts: number;
  newPostsToday: number;
  pendingApprovals: number;
  pendingApprovalsChange: number;
}

export interface WeeklyData {
  day: string;
  신규회원: number;
  매물등록: number;
  게시글: number;
}

export interface MonthlyData {
  month: string;
  매물등록: number;
  게시글: number;
}

export interface RecentActivity {
  id: string;
  type: "회원가입" | "매물등록" | "게시글" | "업체등록";
  message: string;
  time: string;
}

// ── Helpers ──

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

function getKSTDate(date: Date = new Date()): Date {
  return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
}

function formatRelativeTime(dateStr: string): string {
  const now = getKSTDate();
  const date = getKSTDate(new Date(dateStr));
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  return `${Math.floor(diffDay / 7)}주 전`;
}

function todayRange() {
  const now = getKSTDate();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start.getTime() + 86400000);
  return { start: start.toISOString(), end: end.toISOString() };
}

// ── Queries ──

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const { start: todayStart, end: todayEnd } = todayRange();

  const [
    { count: totalUsers },
    { count: newUsersToday },
    { count: totalListings },
    { count: newListingsToday },
    { count: totalPosts },
    { count: newPostsToday },
    { count: pendingListings },
    { count: pendingCompanies },
    { count: yesterdayPendingListings },
    { count: yesterdayPendingCompanies },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart)
      .lt("created_at", todayEnd),
    supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .neq("status", "deleted"),
    supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart)
      .lt("created_at", todayEnd),
    supabase
      .from("board_posts")
      .select("*", { count: "exact", head: true })
      .neq("status", "deleted"),
    supabase
      .from("board_posts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart)
      .lt("created_at", todayEnd),
    supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("companies")
      .select("*", { count: "exact", head: true })
      .eq("status", "심사중"),
    supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")
      .lt("created_at", todayStart),
    supabase
      .from("companies")
      .select("*", { count: "exact", head: true })
      .eq("status", "심사중")
      .lt("created_at", todayStart),
  ]);

  const todayPending = (pendingListings ?? 0) + (pendingCompanies ?? 0);
  const yesterdayPending =
    (yesterdayPendingListings ?? 0) + (yesterdayPendingCompanies ?? 0);

  return {
    totalUsers: totalUsers ?? 0,
    newUsersToday: newUsersToday ?? 0,
    totalListings: totalListings ?? 0,
    newListingsToday: newListingsToday ?? 0,
    totalPosts: totalPosts ?? 0,
    newPostsToday: newPostsToday ?? 0,
    pendingApprovals: todayPending,
    pendingApprovalsChange: todayPending - yesterdayPending,
  };
}

export async function getWeeklyData(): Promise<WeeklyData[]> {
  const supabase = await createClient();
  const now = getKSTDate();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  const weekAgoISO = weekAgo.toISOString();

  const [{ data: users }, { data: listings }, { data: posts }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("created_at")
        .gte("created_at", weekAgoISO),
      supabase
        .from("listings")
        .select("created_at")
        .gte("created_at", weekAgoISO),
      supabase
        .from("board_posts")
        .select("created_at")
        .gte("created_at", weekAgoISO),
    ]);

  const result: WeeklyData[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 86400000);
    const dayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const dayEnd = new Date(dayStart.getTime() + 86400000);

    const countInRange = (items: { created_at: string }[] | null) =>
      (items ?? []).filter((item) => {
        const d = new Date(item.created_at);
        return d >= dayStart && d < dayEnd;
      }).length;

    result.push({
      day: DAY_NAMES[dayStart.getDay()],
      신규회원: countInRange(users),
      매물등록: countInRange(listings),
      게시글: countInRange(posts),
    });
  }

  return result;
}

export async function getMonthlyData(): Promise<MonthlyData[]> {
  const supabase = await createClient();
  const now = getKSTDate();

  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const sixMonthsAgoISO = sixMonthsAgo.toISOString();

  const [{ data: listings }, { data: posts }] = await Promise.all([
    supabase
      .from("listings")
      .select("created_at")
      .gte("created_at", sixMonthsAgoISO),
    supabase
      .from("board_posts")
      .select("created_at")
      .gte("created_at", sixMonthsAgoISO),
  ]);

  const result: MonthlyData[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    const countInRange = (items: { created_at: string }[] | null) =>
      (items ?? []).filter((item) => {
        const d = new Date(item.created_at);
        return d >= monthDate && d < monthEnd;
      }).length;

    result.push({
      month: `${monthDate.getMonth() + 1}월`,
      매물등록: countInRange(listings),
      게시글: countInRange(posts),
    });
  }

  return result;
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  const supabase = await createClient();

  const [
    { data: recentUsers },
    { data: recentListings },
    { data: recentPosts },
    { data: recentCompanies },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("listings")
      .select("id, manufacturer, model, category, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("board_posts")
      .select("id, title, author_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("companies")
      .select("id, company_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  type ActivityWithDate = RecentActivity & { _date: string };
  const activities: ActivityWithDate[] = [];

  for (const u of recentUsers ?? []) {
    activities.push({
      id: `user-${u.id}`,
      type: "회원가입",
      message: `${u.full_name || "새 회원"}님이 회원가입했습니다`,
      time: formatRelativeTime(u.created_at),
      _date: u.created_at,
    });
  }

  for (const l of recentListings ?? []) {
    const name =
      [l.manufacturer, l.model].filter(Boolean).join(" ") || l.category;
    activities.push({
      id: `listing-${l.id}`,
      type: "매물등록",
      message: `${name} 매물이 등록되었습니다`,
      time: formatRelativeTime(l.created_at),
      _date: l.created_at,
    });
  }

  for (const p of recentPosts ?? []) {
    activities.push({
      id: `post-${p.id}`,
      type: "게시글",
      message: `${p.author_name}님이 "${p.title}" 글을 작성했습니다`,
      time: formatRelativeTime(p.created_at),
      _date: p.created_at,
    });
  }

  for (const c of recentCompanies ?? []) {
    activities.push({
      id: `company-${c.id}`,
      type: "업체등록",
      message: `${c.company_name}가 업체 등록을 신청했습니다`,
      time: formatRelativeTime(c.created_at),
      _date: c.created_at,
    });
  }

  return activities
    .sort((a, b) => new Date(b._date).getTime() - new Date(a._date).getTime())
    .slice(0, 10)
    .map(({ _date, ...rest }) => rest);
}
