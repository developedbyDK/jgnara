"use client";

import { Users, Package, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DASHBOARD_STATS } from "@/lib/constants/mock-admin";

const STATS = [
  {
    title: "전체 회원",
    value: DASHBOARD_STATS.totalUsers.toLocaleString(),
    sub: `오늘 +${DASHBOARD_STATS.newUsersToday}`,
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "전체 매물",
    value: DASHBOARD_STATS.totalListings.toLocaleString(),
    sub: `오늘 +${DASHBOARD_STATS.newListingsToday}`,
    icon: Package,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "전체 게시글",
    value: DASHBOARD_STATS.totalPosts.toLocaleString(),
    sub: `오늘 +${DASHBOARD_STATS.newPostsToday}`,
    icon: MessageSquare,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "승인 대기",
    value: DASHBOARD_STATS.pendingApprovals.toString(),
    sub: `전일 대비 ${DASHBOARD_STATS.pendingApprovalsChange}`,
    icon: Clock,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-md p-2 ${stat.bg}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
