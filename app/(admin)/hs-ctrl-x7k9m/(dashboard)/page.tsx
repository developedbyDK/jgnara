import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { WeeklyChart } from "@/components/admin/dashboard/weekly-chart";
import { MonthlyChart } from "@/components/admin/dashboard/monthly-chart";
import { RecentActivityFeed } from "@/components/admin/dashboard/recent-activity";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import {
  getDashboardStats,
  getWeeklyData,
  getMonthlyData,
  getRecentActivities,
} from "@/lib/dashboard-queries";

export default async function AdminDashboardPage() {
  const [stats, weeklyData, monthlyData, recentActivities] = await Promise.all([
    getDashboardStats(),
    getWeeklyData(),
    getMonthlyData(),
    getRecentActivities(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-sm text-muted-foreground mt-1">
          중기나라 관리자 현황을 한눈에 확인하세요.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyChart data={weeklyData} />
        <MonthlyChart data={monthlyData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityFeed activities={recentActivities} />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
