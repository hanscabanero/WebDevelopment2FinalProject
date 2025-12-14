"use client";
import { useState, useEffect } from "react";
import JournalForm from "./journal-form";
import QuoteBox from "./quote-box";
import JournalList from "./journal-list";
import Sidebar from "../components/sidebar";

export default function JournalingSystem() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  // LOAD journals from JSON file via API
  useEffect(() => {
    async function loadJournals() {
      try {
        const res = await fetch("/api/journaling");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("Failed to load journals", err);
      }
    }

    loadJournals();
  }, []);

  // Add new entry 
  const addEntry = async (entry) => {
    const newEntry = { id: Date.now(), ...entry };

    // Update UI immediately
    setEntries((prev) => [newEntry, ...prev]);

    // Save to JSON file
    try {
      await fetch("/api/journaling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEntry.title,
          content: newEntry.content,
        }),
      });
    } catch (err) {
      console.error("Failed to save journal", err);
    }
  };

  // Update existing entry 
  const updateEntry = (updated) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <JournalForm
            onAdd={addEntry}
            onUpdate={updateEntry}
            editingEntry={editingEntry}
          />

          <JournalList
            entries={entries}
            onEdit={setEditingEntry}
          />

          <QuoteBox />

        </div>
      </div>
    </div>
  );
}
