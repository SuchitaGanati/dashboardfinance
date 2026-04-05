// TransactionRow.tsx — dark mode with semantic tokens

const TYPE_STYLES: Record<string, string> = {
  income:   "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
  expense:  "bg-rose-500/10    text-rose-500    ring-1 ring-rose-500/20",
  transfer: "bg-sky-500/10     text-sky-500     ring-1 ring-sky-500/20",
};

const TYPE_DOT: Record<string, string> = {
  income:   "bg-emerald-500",
  expense:  "bg-rose-500",
  transfer: "bg-sky-500",
};

export default function TransactionRow({ t, role, onEdit, onDelete, idx = 0 }: any) {
  const typeKey    = (t.type ?? "").toLowerCase();
  const badgeClass = TYPE_STYLES[typeKey] ?? "bg-muted text-muted-foreground ring-1 ring-border";
  const dotClass   = TYPE_DOT[typeKey]    ?? "bg-muted-foreground";
  const isIncome   = typeKey === "income";

  const dateStr = t.date
    ? new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

  const amountStr = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(Math.abs(t.amount ?? 0));

  return (
    <tr
      className="group transition-colors duration-150 hover:bg-accent/50"
      style={{ animationDelay: `${idx * 40}ms` }}
    >
      {/* Date */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span className="text-[13px] font-medium text-foreground">{dateStr}</span>
      </td>

      {/* Type badge */}
      <td className="px-5 py-3.5">
        <span className={[
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          "text-[11px] font-semibold uppercase tracking-wide",
          badgeClass,
        ].join(" ")}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
          {t.type ?? "—"}
        </span>
      </td>

      {/* Category */}
      <td className="px-5 py-3.5">
        <span className="inline-block rounded-lg bg-muted px-2.5 py-1 text-[12px] font-medium text-muted-foreground">
          {t.category ?? "—"}
        </span>
      </td>

      {/* Description */}
      <td className="hidden sm:table-cell px-5 py-3.5 max-w-55">
        <p className="text-[13px] text-muted-foreground truncate" title={t.description}>
          {t.description || <span className="opacity-30">—</span>}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-3.5 text-right whitespace-nowrap">
        <span className={[
          "text-[14px] font-semibold tabular-nums",
          isIncome ? "text-emerald-500" : "text-rose-500",
        ].join(" ")}>
          {isIncome ? "+" : "−"} {amountStr}
        </span>
      </td>

      {/* Actions */}
      {role === "admin" && (
        <td className="px-5 py-3.5 text-right">
          <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={() => onEdit?.(t)}
              className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(t.id)}
              className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
            >
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}