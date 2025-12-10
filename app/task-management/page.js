"use client";

import { useState } from "react";
import TaskForm from "./task-form.js";
import TaskSummary from "./task-summary";
import TaskList from "./task-list.js";
import Sidebar from "../components/sidebar.js";
import TaskCalendar from "./task-calendar.js";

export default function TaskManagementSystem() {
  const [tasks, setTasks] = useState([]);

  const addTask = (t) => setTasks([t, ...tasks]);
  const removeTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TaskSummary tasks={tasks} />
          <TaskForm onAdd={addTask} />
          <TaskList tasks={tasks} onRemove={removeTask} />

          {/* Calendar */}
          <TaskCalendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
