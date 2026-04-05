// types/search.ts
export type SearchItem = {
  id: string;
  title: string;
  type: "transaction" | "goal" | "account";
  route: string;
  metadata?: any;
};