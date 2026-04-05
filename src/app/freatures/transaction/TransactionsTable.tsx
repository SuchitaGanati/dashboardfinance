import TransactionRow from "./TransactionRow";

export default function TransactionsTable({
  data,
  role,
  onEdit,
  onDelete,
}: any) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5h18M3 12h18M3 16.5h18"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          No transactions yet
        </p>
      </div>
    );
  }

  const cols = [
    "Date",
    "Type",
    "Category",
    "Description",
    "Amount",
    ...(role === "admin" ? ["Actions"] : []),
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm">
        {/* HEAD */}
        <thead>
          <tr className="border-b border-border bg-muted/60">
            {cols.map((col) => (
              <th
                key={col}
                className={[
                  "px-5 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground whitespace-nowrap",
                  col === "Amount" || col === "Actions"
                    ? "text-right"
                    : "text-left",
                  col === "Description" ? "hidden sm:table-cell" : "",
                ].join(" ")}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-border">
          {data.map((t: any, idx: number) => (
            <TransactionRow
              key={t.id}
              t={t}
              role={role}
              onEdit={onEdit}
              onDelete={onDelete}
              idx={idx}
            />
          ))}
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3 bg-muted/40">
        <span className="text-[11px] tracking-wide text-muted-foreground font-medium uppercase">
          {data.length} {data.length === 1 ? "transaction" : "transactions"}
        </span>
        <div className="flex gap-1">
          {[...Array(Math.min(5, Math.ceil(data.length / 10)))].map((_, i) => (
            <button
              key={i}
              className={[
                "w-6 h-6 rounded-md text-[11px] font-semibold transition-colors",
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              ].join(" ")}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
