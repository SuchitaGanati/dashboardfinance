"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

export default function TopCategoriesChart({ data }: any) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const axisColor = dark ? "#5f5e5a" : "#888780";
  const tooltipBg = dark ? "#1e1d1a" : "#ffffff";
  const tooltipBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = dark ? "#f1efe8" : "#1c1b18";
  const barColor = dark ? "#85b7eb" : "#185fa5";

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
      <p className="text-[11px] uppercase tracking-wider font-medium text-stone-400 dark:text-stone-500 mb-4">
        Top spending categories
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" barCategoryGap="28%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip
            cursor={{
              fill: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            }}
            contentStyle={{
              background: tooltipBg,
              border: `0.5px solid ${tooltipBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: tooltipText,
              boxShadow: "none",
            }}
            formatter={(value: any) => [`₹${value ?? 0}`, "Amount"]}
          />
          <Bar
            dataKey="value"
            fill={barColor}
            radius={[0, 4, 4, 0]}
            name="Spent"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
