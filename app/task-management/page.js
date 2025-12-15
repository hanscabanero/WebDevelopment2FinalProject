"use client";

import { useState, useEffect, useRef } from "react";
import TaskForm from "./task-form";
import TaskSummary from "./task-summary";
import TaskList from "./task-list";
import Sidebar from "../components/sidebar";
import TaskCalendar from "./task-calendar";
import Protected from "../components/Protected";

const STORAGE_KEY = "tasks";
const SEED_URL = "/data/tasks.json";

export default function TaskManagementSystem() {
  const [tasks, setTasks] = useState([]);
  const holidaysLoaded = useRef(false);

  /* ---------- Load from localStorage OR seed JSON ---------- */
  useEffect(() => {
    if (holidaysLoaded.current) return;
    holidaysLoaded.current = true;

    const loadHolidays = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentYear = today.getFullYear();
        const years = [currentYear];

        // If December, include next year
        if (today.getMonth() === 11) {
          years.push(currentYear + 1);
        }

        const responses = await Promise.all(
          years.map((y) =>
            fetch(`https://date.nager.at/api/v3/PublicHolidays/${y}/CA`)
          )
        );

        const valid = responses.filter((r) => r.ok);
        const allHolidays = (
          await Promise.all(valid.map((r) => r.json()))
        ).flat();

        const upcoming = allHolidays.filter((h) => {
          const d = new Date(h.date + "T00:00:00");
          return d >= today;
        });

        /* ---- keep only one holiday per date ---- */
        const byDate = new Map();

        for (const h of upcoming) {
          if (!byDate.has(h.date)) {
            byDate.set(h.date, h);
          }
        }

        const holidayTasks = Array.from(byDate.values()).map((h) => ({
          id: crypto.randomUUID(),
          title: h.localName,
          category: "Holiday",
          dueDate: h.date,
          priority: "low",
          completed: false,
          isHoliday: true,
        }));


        setTasks((prev) => {
          const existing = new Set(
            prev.filter((t) => t.isHoliday).map((t) => t.title)
          );

          return [
            ...holidayTasks.filter((h) => !existing.has(h.title)),
            ...prev,
          ];
        });
      } catch (e) {
        console.error("Failed to load holidays", e);
      }
    };

    loadHolidays();
  }, []);

  /* ---------- Persist changes ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /* ---------- Task operations ---------- */
  const addTask = (task) =>
    setTasks((prev) => [task, ...prev]);

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleComplete = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  /* ---------- Load holidays once ---------- */
  useEffect(() => {
    if (holidaysLoaded.current) return;
    holidaysLoaded.current = true;

    const loadHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/CA`
        );
        if (!res.ok) return;

        const data = await res.json();

        const holidayTasks = data.map((h) => ({
          id: crypto.randomUUID(),
          title: h.localName,
          category: "Holiday",
          dueDate: h.date,
          priority: "low",
          completed: false,
          isHoliday: true,
        }));

        setTasks((prev) => {
          const existing = new Set(
            prev.filter((t) => t.isHoliday).map((t) => t.title)
          );

          return [
            ...holidayTasks.filter((h) => !existing.has(h.title)),
            ...prev,
          ];
        });
      } catch (e) {
        console.error("Failed to load holidays", e);
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
            <TaskList
              tasks={tasks}
              onRemove={removeTask}
              onToggle={toggleComplete}
            />
            <TaskCalendar tasks={tasks} />
          </div>
        </div>
      </div>
    </Protected>
  );
}
