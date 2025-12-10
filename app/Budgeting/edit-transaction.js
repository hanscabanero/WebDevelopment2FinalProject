"use client";

export default function TransactionList({ transactions, onRemove }) {
  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100 p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {transactions.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 hover:shadow-md transition"
            >
              <div className="flex-1">
                <p className="font-semibold text-slate-700">{t.category}</p>
                <p className="text-xs text-slate-500">
                  {t.date.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-bold ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onRemove(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
