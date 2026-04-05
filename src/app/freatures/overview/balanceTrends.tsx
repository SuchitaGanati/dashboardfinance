import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/src/context/TransactionContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

// Dark-mode-aware custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover text-popover-foreground border border-border rounded-xl px-3 py-2 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-foreground mb-1">
        {new Date(label).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        })}
      </p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.stroke }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">
            ₹{Number(entry.value).toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrends() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const axisColor = isDark ? "#a1a1aa" : "#52525b"; // visible in both
  const gridColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    if (!transactions?.length) return [];

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 29);

    const dateKeys = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return {
        date: d.toISOString().slice(0, 10),
        balance: 0,
        income: 0,
        expense: 0,
      };
    });

    const sorted = [...transactions].sort(
      (a, b) =>
        new Date((a as any).date).getTime() -
        new Date((b as any).date).getTime(),
    );

    let cumBal = 0,
      cumInc = 0,
      cumExp = 0;

    for (const tx of sorted) {
      const txDate = new Date((tx as any).date);
      if (txDate < startDate || txDate > endDate) continue;
      const key = txDate.toISOString().slice(0, 10);
      const entry = dateKeys.find((d) => d.date === key);
      if (!entry) continue;
      const amount = Number((tx as any).amount) || 0;
      const type = (tx as any).type;
      if (type === "income") {
        cumInc += amount;
        cumBal += amount;
      } else if (type === "expense") {
        cumExp += amount;
        cumBal -= amount;
      } else {
        cumBal += amount;
      }
      entry.balance = cumBal;
      entry.income = cumInc;
      entry.expense = cumExp;
    }

    let lb = 0,
      li = 0,
      le = 0;
    return dateKeys.map((e) => {
      lb = e.balance || lb;
      li = e.income || li;
      le = e.expense || le;
      return { date: e.date, balance: lb, income: li, expense: le };
    });
  }, [transactions]);

  return (
    <Card className="rounded-2xl shadow-sm bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground">
          Balance Trends (Last 30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: axisColor }}
              tickFormatter={(v) => {
                const d = new Date(v);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />

            <YAxis
              tick={{ fontSize: 11, fill: axisColor }}
              tickLine={false}
              axisLine={{ stroke: axisColor }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              domain={["auto", "auto"]}
            />

            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: 11,
                color: "hsl(var(--muted-foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Balance"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Cumulative Income"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={false}
              name="Cumulative Expense"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
