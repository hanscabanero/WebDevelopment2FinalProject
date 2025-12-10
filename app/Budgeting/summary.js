"use client";

export default function BudgetSummary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="bg-linear-to-br from-green-50 to-slate-100 p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Summary</h2>

      <div className="space-y-2 text-slate-700 text-lg">
        <p>
          <span className="font-semibold">Total Income:</span>{" "}
          <span className="text-green-700 font-bold">${income.toFixed(2)}</span>
        </p>
        <p>
          <span className="font-semibold">Total Expenses:</span>{" "}
          <span className="text-red-600 font-bold">${expenses.toFixed(2)}</span>
        </p>
        <p>
          <span className="font-semibold">Balance:</span>{" "}
          <span
            className={`font-bold ${
              balance >= 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            ${balance.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}
