"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import TaskSummary from "./task-management/task-summary";
import BudgetSummary from "./Budgeting/summary";
import QuoteBox from "./Journaling/quote-box";
import Protected from "./components/Protected";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  

  return (
    <Protected>
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
    </Protected>
  );
}
