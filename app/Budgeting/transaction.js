"use client";

import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const categories = ["Transportation", "Food", "Bills", "Shopping", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    if (type === "expense" && !category) {
      setError("Please select a category.");
      return;
    }

    onAdd({
      type,
      amount: numericAmount,
      category: type === "income" ? "Income" : category,
      date: new Date(),
    });

    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-slate-100 p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border border-slate-300 bg-white rounded-lg p-2 shadow-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          className="w-full border border-slate-300 bg-white rounded-lg p-2 shadow-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {type === "expense" && (
          <select
            className="w-full border border-slate-300 bg-white rounded-lg p-2 shadow-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        {error && (
          <p className="text-red-600 font-medium text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
