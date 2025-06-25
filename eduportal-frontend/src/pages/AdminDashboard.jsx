import React, { useEffect, useState } from "react";
import { useAdminTheme } from "../context/AdminThemeContext";

function AdminDashboard() {
  const { darkMode, toggleDarkMode } = useAdminTheme();
  const [showMessage, setShowMessage] = useState(darkMode);

  useEffect(() => {
    if (darkMode) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false); // instantly hide when switching to light mode
    }
  }, [darkMode]);

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-4 ${
          darkMode ? "text-white" : "text-blue-700"
        }`}
      >
        Admin Dashboard
      </h1>

      <div className="text-center mb-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded font-semibold ${
            darkMode ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
          }`}
        >
          {darkMode ? "☀ Light Mode" : "Demon Mode 🌙"}
        </button>
      </div>

      {showMessage && (
        <p className="text-center text-red-500 font-bold text-2xl mb-6 animate-pulse">
          Muhahah Welcome to Evil Layer 😈
        </p>
      )}

      <p className="text-center mt-8 text-lg">
        This is your admin dashboard. Use the navbar to manage the portal.
      </p>
    </div>
  );
}

export default AdminDashboard;
