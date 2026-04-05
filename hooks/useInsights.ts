import { useMemo } from "react";

export function useInsights(transactions: any[]) {
  return useMemo(() => {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    const incomeTransactions = transactions.filter(
      (t) => t.type === "income"
    );

    const categoryTotals: Record<string, number> = {};
    expenseTransactions.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Number(t.amount);
    });

    const highestSpendingCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const monthlyData: Record<
      string,
      { income: number; expenses: number; month: string }
    > = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const monthLabel = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expenses: 0, month: monthLabel };
      }

      if (transaction.type === "income") {
        monthlyData[monthKey].income += Number(transaction.amount);
      } else {
        monthlyData[monthKey].expenses += Number(transaction.amount);
      }
    });

    const monthlyComparison = Object.values(monthlyData);

    const avgMonthlyIncome =
      incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0) /
      Math.max(monthlyComparison.length, 1);

    const avgMonthlyExpense =
      expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0) /
      Math.max(monthlyComparison.length, 1);

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));

    return {
      highestSpendingCategory,
      monthlyComparison,
      avgMonthlyIncome,
      avgMonthlyExpense,
      topCategories,
    };
  }, [transactions]);
}