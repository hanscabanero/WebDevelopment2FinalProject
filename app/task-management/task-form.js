"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    dueDate: "",
    priority: "medium",
  });

  const categories = ["School", "Personal", "Important"];

  const submit = (e) => {
    e.preventDefault();
    if (form.title.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      ...form,
      completed: false,
    };

    onAdd(newTask);

    setForm({
      title: "",
      category: "",
      dueDate: "",
      priority: "medium",
    });
  };

  return (
    <div className="lg:col-span-1 bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          placeholder="Task name..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        >
          Add Task
        </button>

      </form>
    </div>
  );
}
