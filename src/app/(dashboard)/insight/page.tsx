"use client";

import { useTransactions } from "@/src/context/TransactionContext";
import { useInsights } from "@/hooks/useInsights";

import InsightsSummaryCards from "../../freatures/insight/InsightsSummaryCards";
import MonthlyComparisonChart from "../../freatures/insight/MonthlyComparisonChart";
import TopCategoriesChart from "../../freatures/insight/TopCategoriesChart";
import FinancialObservations from "../../freatures/insight/FinancialObservations";

export default function InsightsPage() {
  const { transactions, loading } = useTransactions();
  const insights = useInsights(transactions);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 rounded-full border-2 border-stone-900 dark:border-stone-100 border-t-transparent animate-spin" />
          <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
            Loading insights…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-8 max-w-7xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Insights
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 dark:text-stone-500 mt-1">
          Your financial patterns at a glance
        </p>
      </div>

      {/* Summary metric cards */}
      <InsightsSummaryCards insights={insights} />

      {/* Charts — stacked on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <MonthlyComparisonChart data={insights.monthlyComparison} />
        <TopCategoriesChart data={insights.topCategories} />
      </div>

      {/* Observation tiles */}
      <div>
        <p className="text-[11px] uppercase tracking-wider font-medium text-stone-400 dark:text-stone-500 mb-3">
          Observations
        </p>
        <FinancialObservations insights={insights} />
      </div>
    </div>
  );
}