"use client";

import { TrendingUp, DollarSign, Percent, Star } from "lucide-react";

export default function FinancialObservations({ insights }: any) {
  const savings = insights.avgMonthlyIncome - insights.avgMonthlyExpense;
  const savingsRate = insights.avgMonthlyIncome > 0
    ? ((savings / insights.avgMonthlyIncome) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {insights.highestSpendingCategory && (
        <div className="flex items-start gap-3 rounded-xl p-4 bg-red-50 dark:bg-red-950">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-red-800 dark:text-red-200" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-medium text-red-700 dark:text-red-300 mb-0.5">
              Top category
            </p>
            <p className="text-sm font-medium text-red-900 dark:text-red-100">
              {insights.highestSpendingCategory[0]}
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-0.5 opacity-80">
              ${insights.highestSpendingCategory[1].toFixed(2)} avg/month
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-xl p-4 bg-emerald-50 dark:bg-emerald-950">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
          <DollarSign className="w-4 h-4 text-emerald-800 dark:text-emerald-200" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-medium text-emerald-700 dark:text-emerald-300 mb-0.5">
            Monthly savings
          </p>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            ${savings.toFixed(2)}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5 opacity-80">
            Income minus all expenses
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl p-4 bg-blue-50 dark:bg-blue-950">
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
          <Percent className="w-4 h-4 text-blue-800 dark:text-blue-200" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-medium text-blue-700 dark:text-blue-300 mb-0.5">
            Saving rate
          </p>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {savingsRate}%
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5 opacity-80">
            {Number(savingsRate) >= 20 ? "Above the 20% benchmark" : "Below the 20% benchmark"}
          </p>
        </div>
      </div>

      {insights.bestMonth && (
        <div className="flex items-start gap-3 rounded-xl p-4 bg-amber-50 dark:bg-amber-950">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-amber-800 dark:text-amber-200" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-medium text-amber-700 dark:text-amber-300 mb-0.5">
              Best month
            </p>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
              {insights.bestMonth}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5 opacity-80">
              Highest income recorded
            </p>
          </div>
        </div>
      )}
    </div>
  );
}