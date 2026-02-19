"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { WeeklyData } from "@/lib/dashboard-queries";

const chartConfig = {
  신규회원: { label: "신규회원", color: "hsl(221, 83%, 53%)" },
  매물등록: { label: "매물등록", color: "hsl(142, 71%, 45%)" },
  게시글: { label: "게시글", color: "hsl(262, 83%, 58%)" },
} satisfies ChartConfig;

interface WeeklyChartProps {
  data: WeeklyData[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">주간 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="신규회원"
              fill="var(--color-신규회원)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="매물등록"
              fill="var(--color-매물등록)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="게시글"
              fill="var(--color-게시글)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
