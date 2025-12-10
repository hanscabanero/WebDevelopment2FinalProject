"use client";

import { useState } from "react";

export default function TaskCalendar({ tasks }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay(); // 0–6

  const daysArray = [...Array(daysInMonth).keys()].map((d) => d + 1);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const tasksForDate = (date) => {
    const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;

    return tasks.filter((t) => t.dueDate === ds);
  };

  return (
    <div className="col-span-1 lg:col-span-4 bg-white p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium text-slate-600 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots before first day */}
        {Array(startDay)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="p-4 rounded bg-transparent" />
          ))}

        {/* Calendar Days */}
        {daysArray.map((day) => {
          const dayTasks = tasksForDate(day);

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(day)}
              className="border rounded p-2 min-h-20 hover:bg-slate-100 cursor-pointer"
            >
              <div className="font-semibold">{day}</div>

              {/* Show task indicators */}
              {dayTasks.length > 0 && (
                <div className="mt-1 flex flex-col gap-1">
                  {dayTasks.map((t, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-700 text-white rounded px-1 truncate"
                    >
                      {t.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-slate-50 border rounded">
          <h3 className="font-bold text-lg mb-2">
            Tasks on {currentYear}-{String(currentMonth + 1).padStart(2, "0")}-
            {String(selectedDate).padStart(2, "0")}
          </h3>

          {tasksForDate(selectedDate).length > 0 ? (
            <ul className="list-disc ml-6">
              {tasksForDate(selectedDate).map((t, i) => (
                <li key={i}>{t.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No tasks for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
