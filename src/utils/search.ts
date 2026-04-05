// utils/search.ts
import { SearchItem } from "../app/types/search";

export function globalSearch(data: SearchItem[], query: string) {
  if (!query) return [];

  const q = query.toLowerCase();

  return data.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });
}
