export default function TaskList({ tasks, onRemove }) {
  return (
    <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks added.</p>
      )}

      <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p
                className={
                  "text-lg " +
                  (task.completed ? "line-through text-gray-400" : "")
                }
              >
                {task.title}
              </p>
              <p className="text-sm text-gray-500">
                Category: {task.category || "None"} • Priority:{" "}
                {task.priority} • Due: {task.dueDate || "N/A"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  task.completed = !task.completed;
                  onRemove(-1);
                }}
                className="text-green-600 hover:text-green-800"
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
