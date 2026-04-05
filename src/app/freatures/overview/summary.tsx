"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const summaryData = [
  {
    title: "Balance",
    value: "₹45,250",
    color: "bg-blue-500",
    stroke: "#3b82f6",
    data: [20000, 24000, 22000, 28000, 30000, 35000, 45000],
  },
  {
    title: "Income",
    value: "₹12,500",
    color: "bg-emerald-500",
    stroke: "#10b981",
    data: [5000, 7000, 6500, 9000, 10000, 11000, 12500],
  },
  {
    title: "Expense",
    value: "₹28,200",
    color: "bg-rose-500",
    stroke: "#f43f5e",
    data: [8000, 12000, 10000, 15000, 18000, 22000, 28200],
  },
];

const getTrend = (data: number[], title: string) => {
  const first = data[0];
  const last = data[data.length - 1];
  const change = ((last - first) / first) * 100;
  const isPositive = title === "Expense" ? change < 0 : change >= 0;
  return { value: Math.abs(change).toFixed(1), isPositive };
};

export default function Summary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summaryData.map((item) => {
        const trend = getTrend(item.data, item.title);
        return (
          <div
            key={item.title}
            className="bg-card text-card-foreground border border-border p-4 rounded-xl shadow-sm flex items-center justify-between"
          >
            {/* LEFT */}
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">{item.title}</span>

              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">
                  {item.value}
                </span>
                <span
                  className={`text-xs font-medium flex items-center gap-0.5 ${
                    trend.isPositive ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}%
                </span>
              </div>

              <div className={`h-1 w-12 rounded ${item.color}`} />
            </div>

            {/* RIGHT — sparkline */}
            <div className="w-24 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={item.data.map((value, index) => ({
                    name: index,
                    value: item.title === "Expense" ? -value : value,
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={item.stroke}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}