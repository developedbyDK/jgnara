"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { MONTHLY_DATA } from "@/lib/constants/mock-admin";

const chartConfig = {
  매출: { label: "매출 (만원)", color: "hsl(221, 83%, 53%)" },
  거래: { label: "거래건수", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

export function MonthlyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">월간 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={MONTHLY_DATA} accessibilityLayer>
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
              dataKey="매출"
              type="monotone"
              fill="var(--color-매출)"
              fillOpacity={0.15}
              stroke="var(--color-매출)"
              strokeWidth={2}
            />
            <Area
              dataKey="거래"
              type="monotone"
              fill="var(--color-거래)"
              fillOpacity={0.15}
              stroke="var(--color-거래)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
