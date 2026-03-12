"use client";

import { useMemo } from "react";
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
} from "@/components/ui/chart";
import { SalesByCategory } from "../types";

const CATEGORY_COLORS = [
  "var(--muted-foreground)",
  "var(--ring)",
  "var(--secondary)",
];

interface SalesByCategoryChartProps {
  data: SalesByCategory[];
}

export function SalesByCategoryChart({ data }: SalesByCategoryChartProps) {
  const { chartData, totalItems, chartConfig } = useMemo(() => {
    const chartData = data.map((item) => ({
      category: item.category.toLowerCase(),
      totalItems: item.total,
      fill: `var(--color-${item.category.toLowerCase()})`,
    }));

    const totalItems = data.reduce((acc, cur) => acc + cur.total, 0);

    const chartConfig = {
      totalItems: {
        label: "Total items",
      },
      ...chartData.reduce((acc, cur, index) => {
        const item = {
          [cur.category]: {
            label: cur.category,
            color: CATEGORY_COLORS[index],
          },
        };

        return { ...acc, ...item };
      }, {}),
    };

    return {
      chartData,
      totalItems,
      chartConfig,
    };
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales by category</CardTitle>
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
                          {totalItems.toLocaleString()}
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

      <CardFooter className="text-sm bg-white border-0 min-h-23">
        <div className="m-auto">
          {data.map((item, index) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[index] }}
              ></div>
              <div>{item.category}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
