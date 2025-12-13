"use client";

import { useState, useEffect } from "react";

export default function JournalForm({ onAdd, onUpdate, editingEntry }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setContent(editingEntry.content);
    }
  }, [editingEntry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      id: editingEntry ? editingEntry.id : undefined,
      title,
      content,
      preview: content.substring(0, 100),
      datetime: new Date().toLocaleString(),
    };

    if (editingEntry) {
      onUpdate(entry);
    } else {
      onAdd(entry);
    }

    setTitle("");
    setContent("");
  };

  return (
  <div className="bg-slate-100 p-6 rounded-xl shadow-md border border-slate-300">
    <h2 className="text-2xl font-bold text-slate-900 mb-4">
      {editingEntry ? "Edit Journal Entry" : "New Journal Entry"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-slate-400 rounded-lg text-slate-900"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border border-slate-400 rounded-lg text-slate-900"
      />

      <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800">
        {editingEntry ? "Update Entry" : "Save Entry"}
      </button>

    </form>
  </div>
);
}
