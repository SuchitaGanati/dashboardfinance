function Transaction({
  name,
  date,
  amount,
}: {
  name: string;
  date: string;
  amount: string;
}) {
  const isCredit = amount.startsWith("+");

  return (
    <div className="bg-white dark:bg-slate-800 border rounded-xl p-3 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-white">
          {name}
        </p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>

      <span
        className={`text-sm font-medium ${
          isCredit ? "text-green-600" : "text-red-500"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

export default Transaction;