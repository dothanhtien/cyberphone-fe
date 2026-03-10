"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { category: "smartphone", totalItems: 5, fill: "var(--color-smartphone)" },
  { category: "tablet", totalItems: 3, fill: "var(--color-tablet)" },
  { category: "laptop", totalItems: 4, fill: "var(--color-laptop)" },
];

const chartConfig = {
  totalItems: {
    label: "Total items",
  },
  smartphone: {
    label: "Smartphone",
    color: "var(--muted-foreground)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--ring)",
  },
  laptop: {
    label: "Laptop",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

export function SaleByCategoryChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalItems, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sale by category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalItems"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total items
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="text-sm bg-white">
        <div className="m-auto">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-foreground"></div>
            <div>Smartphone</div>
            <div>5</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-foreground"></div>
            <div>Tablet</div>
            <div>3</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-foreground"></div>
            <div>Laptop</div>
            <div>4</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
