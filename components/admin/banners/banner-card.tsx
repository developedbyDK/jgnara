"use client";

import { MoreHorizontal, ExternalLink, MousePointerClick, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AdminBanner, getStatusColor } from "@/lib/constants/mock-admin";

interface BannerCardProps {
  banner: AdminBanner;
}

export function BannerCard({ banner }: BannerCardProps) {
  const ctr = banner.impressions > 0
    ? ((banner.clicks / banner.impressions) * 100).toFixed(2)
    : "0.00";

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted h-32 flex items-center justify-center text-muted-foreground text-sm">
        {banner.title}
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{banner.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {banner.startDate} ~ {banner.endDate}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className={`text-[11px] ${getStatusColor(banner.status)}`}>
              {banner.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7 cursor-pointer">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <ExternalLink className="mr-2 size-4" />
                  링크 확인
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {banner.status === "활성" ? "비활성화" : "활성화"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded bg-muted/50 p-2">
            <Eye className="size-3 mx-auto text-muted-foreground mb-0.5" />
            <p className="text-xs font-medium">{banner.impressions.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">노출</p>
          </div>
          <div className="rounded bg-muted/50 p-2">
            <MousePointerClick className="size-3 mx-auto text-muted-foreground mb-0.5" />
            <p className="text-xs font-medium">{banner.clicks.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">클릭</p>
          </div>
          <div className="rounded bg-muted/50 p-2">
            <p className="text-xs font-medium mt-1">{ctr}%</p>
            <p className="text-[10px] text-muted-foreground">CTR</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
