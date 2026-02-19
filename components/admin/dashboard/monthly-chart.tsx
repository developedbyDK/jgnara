"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MonthlyData } from "@/lib/dashboard-queries";

const chartConfig = {
  매물등록: { label: "매물등록", color: "hsl(221, 83%, 53%)" },
  게시글: { label: "게시글", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

interface MonthlyChartProps {
  data: MonthlyData[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">월간 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="매물등록"
              type="monotone"
              fill="var(--color-매물등록)"
              fillOpacity={0.15}
              stroke="var(--color-매물등록)"
              strokeWidth={2}
            />
            <Area
              dataKey="게시글"
              type="monotone"
              fill="var(--color-게시글)"
              fillOpacity={0.15}
              stroke="var(--color-게시글)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
