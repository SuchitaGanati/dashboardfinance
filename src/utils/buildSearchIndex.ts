// utils/buildSearchIndex.ts
import { SearchItem } from "../app/types/search";

export function buildSearchIndex({ transactions, goals }: any): SearchItem[] {
  return [
    ...transactions.map((t: any) => ({
      id: t.id,
      title: `${t.category} ₹${t.amount}`,
      type: "transaction",
      route: `/transaction?id=${t.id}`,
      metadata: t,
    })),

    ...goals.map((g: any) => ({
      id: g.id,
      title: g.name,
      type: "goal",
      route: `/goals?id=${g.id}`,
      metadata: g,
    })),
  ];
}
