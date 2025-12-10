export default function TaskSummary({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="lg:col-span-1 bg-white shadow rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Task Summary</h2>

      <ul className="space-y-2 text-lg">
        <li>Total Tasks: {total}</li>
        <li>Completed: {completed}</li>
        <li>Pending: {pending}</li>
      </ul>
    </div>
  );
}
