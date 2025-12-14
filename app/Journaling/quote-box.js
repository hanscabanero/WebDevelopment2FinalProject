"use client";

import { useEffect, useState } from "react";

export default function QuoteBox() {
  const [quote, setQuote] = useState("Loading...");

  useEffect(() => {
    const cached = localStorage.getItem("dailyQuote");
    const cachedDate = localStorage.getItem("quoteDate");
    const today = new Date().toDateString();

    //caching fucntionality
    // If we already have today's quote use it
    if (cached && cachedDate === today) {
      setQuote(cached);
      return;
    }

    // Else Fetch a new quote using API route
    async function fetchQuote() {
      try {
        const res = await fetch("/api/quotes/route.js");
        const data = await res.json();
        const newQuote = `${data[0].q} — ${data[0].a}`;

        // Save quote and add date to localStorage
        localStorage.setItem("dailyQuote", newQuote);
        localStorage.setItem("quoteDate", today);

        setQuote(newQuote);
      } catch (err) {
        setQuote("Cannot fetch quote at this time.");
      }
    }

    fetchQuote();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl shadow-md border border-slate-300">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Quote of the Day</h2>
      <p className="text-slate-800 italic">{quote}</p>
    </div>
  );
}
