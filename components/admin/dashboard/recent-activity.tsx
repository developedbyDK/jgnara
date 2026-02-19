import {
  UserPlus,
  Package,
  MessageSquare,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecentActivity } from "@/lib/dashboard-queries";

const ICON_MAP: Record<
  RecentActivity["type"],
  { icon: typeof UserPlus; color: string }
> = {
  회원가입: { icon: UserPlus, color: "text-blue-500" },
  매물등록: { icon: Package, color: "text-green-500" },
  게시글: { icon: MessageSquare, color: "text-purple-500" },
  업체등록: { icon: Building2, color: "text-amber-500" },
};

interface RecentActivityFeedProps {
  activities: RecentActivity[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">최근 활동</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            최근 활동이 없습니다.
          </p>
        )}
        {activities.map((activity) => {
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
