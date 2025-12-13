"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import TaskSummary from "./task-management/task-summary";
import BudgetSummary from "./Budgeting/summary";
import QuoteBox from "./Journaling/quote-box";

export default function Page() {
  // Example placeholder data — replace with real sources later
  const [tasks] = useState([
    { id: 1, completed: true },
    { id: 2, completed: false },
    { id: 3, completed: false },
  ]);

  const [transactions] = useState([
    { id: 1, type: "income", amount: 200 },
    { id: 2, type: "expense", amount: 75 },
    { id: 3, type: "expense", amount: 20 },
  ]);

  return (
    <main className="min-h-screen flex bg-slate-50 text-slate-900">

      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <TaskSummary tasks={tasks} />
          <BudgetSummary transactions={transactions} />
          <QuoteBox />
        </div>
      </div>
    </main>
  );
}
