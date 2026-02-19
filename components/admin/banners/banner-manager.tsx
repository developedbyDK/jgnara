"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MOCK_BANNERS, type BannerPosition } from "@/lib/constants/mock-admin";
import { BannerCard } from "./banner-card";

const POSITIONS: { label: string; value: BannerPosition }[] = [
  { label: "메인 배너", value: "메인" },
  { label: "VIP 배너", value: "VIP" },
  { label: "사이드 배너", value: "사이드" },
];

export function BannerManager() {
  const [activeTab, setActiveTab] = useState<string>("메인");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            {POSITIONS.map((pos) => {
              const count = MOCK_BANNERS.filter((b) => b.position === pos.value).length;
              return (
                <TabsTrigger
                  key={pos.value}
                  value={pos.value}
                  className="cursor-pointer"
                >
                  {pos.label} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>
          <Button size="sm" className="cursor-pointer gap-1">
            <Plus className="size-4" />
            배너 추가
          </Button>
        </div>

        {POSITIONS.map((pos) => (
          <TabsContent key={pos.value} value={pos.value}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_BANNERS
                .filter((b) => b.position === pos.value)
                .sort((a, b) => a.order - b.order)
                .map((banner) => (
                  <BannerCard key={banner.id} banner={banner} />
                ))}
            </div>
            {MOCK_BANNERS.filter((b) => b.position === pos.value).length === 0 && (
              <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                등록된 배너가 없습니다.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
