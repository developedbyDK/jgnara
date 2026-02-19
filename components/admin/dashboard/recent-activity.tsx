"use client";

import {
  UserPlus,
  Package,
  MessageSquare,
  HelpCircle,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RECENT_ACTIVITIES, type RecentActivity } from "@/lib/constants/mock-admin";

const ICON_MAP: Record<RecentActivity["type"], { icon: typeof UserPlus; color: string }> = {
  "회원가입": { icon: UserPlus, color: "text-blue-500" },
  "매물등록": { icon: Package, color: "text-green-500" },
  "게시글": { icon: MessageSquare, color: "text-purple-500" },
  "문의": { icon: HelpCircle, color: "text-cyan-500" },
  "업체등록": { icon: Building2, color: "text-amber-500" },
  "신고": { icon: AlertTriangle, color: "text-red-500" },
};

export function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">최근 활동</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {RECENT_ACTIVITIES.map((activity) => {
          const { icon: Icon, color } = ICON_MAP[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
            >
              <div className={`mt-0.5 ${color}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-tight truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
