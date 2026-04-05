"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function TransactionDialog({
  open, setOpen, formData, setFormData, onSubmit, title,
}: any) {
  const isIncome = formData.type === "income";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card text-card-foreground border border-border rounded-2xl shadow-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-1">

          {/* Type toggle — pill style */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">
              Type
            </Label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
              {(["income", "expense"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={[
                    "py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150",
                    formData.type === t
                      ? t === "income"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-rose-500 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₹</span>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
                required
                className="pl-7 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">
              Date
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="bg-background border-border text-foreground focus-visible:ring-ring"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">
              Category
            </Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Food, Salary…"
              required
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">
              Description
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional note…"
              rows={2}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring resize-none"
            />
          </div>

          <Button
            type="submit"
            className={[
              "w-full h-10 rounded-xl font-semibold text-sm transition-colors",
              isIncome
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-rose-500 hover:bg-rose-600 text-white",
            ].join(" ")}
          >
            {title}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}