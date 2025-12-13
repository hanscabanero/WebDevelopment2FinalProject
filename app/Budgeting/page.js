"use client";

import { useState } from "react";
import TransactionForm from "./transaction";
import BudgetSummary from "./summary";
import SpendingChart from "./spending-chart";
import TransactionList from "./edit-transaction";

export default function BudgetingSystem() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (t) => setTransactions([t, ...transactions]);
  const removeTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
      <div className="grid lg:grid-cols-[60%_40%] gap-4">
        <TransactionForm onAdd={addTransaction} />

        <BudgetSummary transactions={transactions} />

      </div>

      <div className="grid lg:grid-cols-[40%_60%] gap-4 mt-4">
        <TransactionList transactions={transactions} onRemove={removeTransaction} />
        <SpendingChart transactions={transactions} />
      </div>
    </div>
  );
}
