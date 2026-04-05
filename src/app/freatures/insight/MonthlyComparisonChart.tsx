"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonthlyComparisonChart({ data }: any) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const axisColor = dark ? "#a1a1aa" : "#78716c";
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tooltipBg = dark ? "#18181b" : "#ffffff";
  const tooltipText = dark ? "#f4f4f5" : "#18181b";

  if (!data || data.length === 0) {
    return (
      <Card className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <CardContent className="p-6 text-sm text-stone-400">
          No chart data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-stone-100/30 dark:to-stone-800/30" />

      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-[11px] uppercase tracking-wider font-medium text-stone-400 dark:text-stone-500">
          Monthly comparison
        </CardTitle>
      </CardHeader>

      <CardContent className="h-80 pt-2 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} barCategoryGap={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.15}
              vertical={false}
              stroke={gridColor}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: axisColor }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{ fontSize: 11, fill: axisColor }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: tooltipBg,
                color: tooltipText,
                fontSize: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
              formatter={(value: any, name: any) => {
                const labelMap: Record<string, string> = {
                  income: "Income",
                  expense: "Expense",
                  balance: "Balance",
                };

                return [
                  `₹${Number(value ?? 0).toLocaleString("en-IN")}`,
                  labelMap[name] || name,
                ];
              }}
            />

            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />

            <Bar
              dataKey="income"
              name="Income"
              fill="url(#incomeGradient)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="url(#expenseGradient)"
              radius={[8, 8, 0, 0]}
            />

            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
