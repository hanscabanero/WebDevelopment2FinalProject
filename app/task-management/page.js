"use client";

import { useState, useEffect } from "react";
import TaskForm from "./task-form.js";
import TaskSummary from "./task-summary";
import TaskList from "./task-list.js";
import Sidebar from "../components/sidebar.js";
import TaskCalendar from "./task-calendar.js";
import Protected from "../components/Protected";

export default function TaskManagementSystem() {
  const [tasks, setTasks] = useState([]);

  const addTask = (t) => setTasks((prev) => [t, ...prev]);
  const removeTask = (index) =>
    setTasks((prev) => prev.filter((_, i) => i !== index));

  useEffect(() => {
    const loadHolidays = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const nextYear = year + 1;
        const country = "CA";
        const urls = [
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`,
          `https://date.nager.at/api/v3/PublicHolidays/${nextYear}/${country}`
        ];

        const responses = await Promise.all(urls.map((u) => fetch(u)));
        const valid = responses.filter((r) => r.ok);

        const allHolidayData = (
          await Promise.all(valid.map((r) => r.json()))
        ).flat();

        const upcoming = allHolidayData.filter((h) => {
          const holidayDate = new Date(h.date + "T00:00");
          return holidayDate >= today;
        });

        const holidayTasks = upcoming.map((h) => ({
          id: crypto.randomUUID(),
          title: h.localName,
          category: "Holiday",
          dueDate: h.date,
          priority: "low",
          completed: false,
          isHoliday: true,
        }));

        setTasks((prev) => [...holidayTasks, ...prev]);
      } catch (err) {
        console.error("Failed to load holidays:", err);
      }
    };

    loadHolidays();
  }, []);

  return (
    <Protected>
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TaskSummary tasks={tasks} />
          <TaskForm onAdd={addTask} />
          <TaskList tasks={tasks} onRemove={removeTask} />
          <TaskCalendar tasks={tasks} />
        </div>
      </div>
    </div>
    </Protected>
  );
}
the 