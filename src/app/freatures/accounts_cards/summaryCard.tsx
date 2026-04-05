function SummaryCard({
  label,
  amount,
  type,
}: {
  label: string;
  amount: string;
  type: "income" | "expense";
}) {
  return (
    <div className="bg-white dark:bg-slate-800 border rounded-xl p-4 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p
          className={`text-xl font-serif ${
            type === "income" ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount}
        </p>
      </div>

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === "income"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        ↑
      </div>
    </div>
  );
}
export default SummaryCard;