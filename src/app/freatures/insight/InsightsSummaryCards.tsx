import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

export default function InsightsSummaryCards({ insights }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Highest Spending */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">
            Highest Spending
          </CardTitle>
          <TrendingUp className="w-4 h-4 text-red-600" />
        </CardHeader>
        <CardContent>
          {insights.highestSpendingCategory ? (
            <>
              <div className="text-2xl font-bold">
                {insights.highestSpendingCategory[0]}
              </div>
              <p className="text-xs text-gray-600">
                ${insights.highestSpendingCategory[1].toFixed(2)}
              </p>
            </>
          ) : (
            "No data"
          )}
        </CardContent>
      </Card>

      {/* Income */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">
            Avg Income
          </CardTitle>
          <DollarSign className="w-4 h-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            ${insights.avgMonthlyIncome.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">
            Avg Expenses
          </CardTitle>
          <Target className="w-4 h-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            ${insights.avgMonthlyExpense.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}