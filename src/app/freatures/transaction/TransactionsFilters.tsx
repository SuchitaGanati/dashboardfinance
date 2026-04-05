import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function TransactionsFilters({
  searchQuery, setSearchQuery,
  typeFilter, setTypeFilter,
  categoryFilter, setCategoryFilter,
  categories,
}: any) {
  return (
    <div className="flex gap-3 flex-col sm:flex-row">

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
          placeholder="Search transactions…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Type */}
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-full sm:w-36 bg-background border-border text-foreground focus:ring-ring">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border text-popover-foreground">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      {/* Category */}
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-full sm:w-40 bg-background border-border text-foreground focus:ring-ring">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border text-popover-foreground">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((c: string) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}