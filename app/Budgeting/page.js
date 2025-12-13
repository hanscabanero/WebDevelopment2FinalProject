"use client";

import { useState } from "react";
import TransactionForm from "./transaction";
import BudgetSummary from "./summary";
import SpendingChart from "./spending-chart";
import TransactionList from "./edit-transaction";
import Sidebar from "../components/sidebar";
import Protected from "../components/Protected";

export default function BudgetingSystem() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (t) => setTransactions([t, ...transactions]);
  const removeTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <Protected>
    <div className="min-h-screen flex">
    <Sidebar />
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <TransactionForm onAdd={addTransaction} />

        <BudgetSummary transactions={transactions} />

        <SpendingChart transactions={transactions} />

        <TransactionList transactions={transactions} onRemove={removeTransaction} />
      </div>
    </div>
    </div> 
    </Protected>
  );
}
