"use client";

import { useState, useEffect } from "react";
import JournalForm from "./journal-form";
import JournalList from "./journal-list";
import QuoteBox from "./quote-box";
import Sidebar from "../components/sidebar";

export default function JournalingSystem() {
  // Load journals from localStorage
  const [entries, setEntries] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("journalEntries");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingEntry, setEditingEntry] = useState(null);

  // Persist journals to localStorage
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  // add new journal entry
  const addEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      title: entry.title,
      content: entry.content,
      datetime: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
  };

  // update existing journal entry
  const updateEntry = (updated) => {
    setEntries(entries.map(e => (e.id === updated.id ? updated : e)));
    setEditingEntry(null);
  };

  // delete journal entry
  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <JournalForm
            onAdd={addEntry}
            onUpdate={updateEntry}
            editingEntry={editingEntry}
          />

          <JournalList
            entries={entries}
            onEdit={setEditingEntry}
            onDelete={deleteEntry}
          />

          <QuoteBox />

        </div>
      </div>
    </div>
  );
}
