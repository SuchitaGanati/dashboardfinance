import { useMemo } from "react";

export function useTransactionFilters(
  transactions: any[],
  searchQuery: string,
  typeFilter: string,
  categoryFilter: string,
  sortField: string,
  sortOrder: string
) {
  return useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchesSearch =
        (t.description ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "all" || t.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [
    transactions,
    searchQuery,
    typeFilter,
    categoryFilter,
    sortField,
    sortOrder,
  ]);
}