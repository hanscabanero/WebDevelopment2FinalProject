"use client";
import { useState, useEffect } from "react";
import JournalForm from "./journal-form";
import QuoteBox from "./quote-box";
import JournalList from "./journal-list";
import Sidebar from "../components/sidebar";

export default function JournalingSystem() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  // Load from localStorage 
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save entries to localStorage on change 
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  // Add new entry 
  const addEntry = async (entry) => {
    const newEntry = { id: Date.now(), ...entry };

    // Keep existing UI behavior
    setEntries((prev) => [newEntry, ...prev]);

    // ALSO save to local JSON file via API
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
      console.error("Failed to save journal to JSON file", err);
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

      <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
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
