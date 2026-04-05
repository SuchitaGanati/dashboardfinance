import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  { label: "Amazon Purchase",  amount: -1200, date: "Today"      },
  { label: "Salary Credit",    amount: 10000, date: "Yesterday"  },
  { label: "Food Delivery",    amount:  -450, date: "2 days ago" },
];

export default function SummaryTransaction() {
  return (
    <div className="bg-card text-card-foreground border border-border p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">
          Recent Transactions
        </h2>
        <button className="text-xs font-medium text-primary hover:opacity-80 transition-opacity">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => {
          const isPositive = tx.amount > 0;
          return (
            <div
              key={tx.label}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {isPositive
                    ? <ArrowUpRight size={15} />
                    : <ArrowDownLeft size={15} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {tx.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {tx.date}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <span
                className={`text-sm font-semibold tabular-nums ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPositive ? "+" : "−"}₹{Math.abs(tx.amount).toLocaleString("en-IN")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}