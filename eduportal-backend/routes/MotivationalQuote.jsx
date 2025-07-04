import React, { useEffect, useState } from "react";
import axios from "axios";

function MotivationalQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/quotes/motivational");
      const data = res.data?.[0]; // Expected format: [{ q: "...", a: "..." }]
      if (data?.q && data?.a) {
        setQuote(data.q);
        setAuthor(data.a);
      } else {
        setError("⚠ Received malformed quote data.");
      }
    } catch (err) {
      console.error("❌ Failed to fetch quote:", err);
      setError("⚠ Could not fetch a motivational quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="mt-6 text-center">
      {loading ? (
        <p className="italic text-gray-500">Loading motivational quote...</p>
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : (
        <>
          <p className="italic text-lg text-gray-800 dark:text-gray-100">"{quote}"</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">– {author}</p>
        </>
      )}

      <button
        onClick={fetchQuote}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
      >
        🔄 Refresh Quote
      </button>
    </div>
  );
}

export default MotivationalQuote;
