"use client";

export default function JournalList({ entries, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-300">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Saved Journals</h2>

      {entries.length === 0 ? (
        <p className="text-slate-700 text-center py-8">
          No journal entries yet
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-50 p-4 rounded-lg border border-slate-300 hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">{entry.title}</p>

              <p className="text-xs text-slate-700">{entry.datetime}</p>

              <p className="text-sm text-slate-800 mt-2">{entry.content}</p>

              {/* Buttons */}
              <div className="flex gap-4 mt-3">
                <button
                  className="text-blue-700 text-sm underline cursor-pointer"
                  onClick={() => onEdit(entry)}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 text-sm underline cursor-pointer"
                  onClick={() => onDelete(entry.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
