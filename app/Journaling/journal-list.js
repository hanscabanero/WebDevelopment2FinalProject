"use client";

export default function JournalList({ entries, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-300">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Saved Journals</h2>

      {entries.length === 0 ? (
        <p className="text-slate-700 text-center py-8">
          No journal entries yet
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {entries.map((entry, index) => (
            <div
              key={entry.id || index}
              className="bg-slate-50 p-4 rounded-lg border border-slate-300 hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">{entry.title}</p>

              <p className="text-xs text-slate-700">{entry.datetime}</p>

              <p className="text-sm text-slate-800 mt-2">{entry.content}</p>

              <button
                className="text-blue-700 text-sm underline mt-3"
                onClick={() => onEdit(entry)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
