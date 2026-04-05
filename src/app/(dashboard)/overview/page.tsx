"use client";

import Summary from "../../freatures/overview/summary";
import BalanceTrends from "../../freatures/overview/balanceTrends";
import SpendingBreakdown from "../../freatures/overview/spendingBreakdown";
import SummaryTransaction from "../../freatures/overview/summaryTransaction";

export default function OverView() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-muted min-h-screen pb-24 lg:pb-6">

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          Overview
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "short", day: "numeric", month: "short",
          })}
        </p>
      </div>

      <Summary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 min-w-0"><BalanceTrends /></div>
        <div className="lg:col-span-1"><SpendingBreakdown /></div>
      </div>

      <SummaryTransaction />
    </div>
  );
}