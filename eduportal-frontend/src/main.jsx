// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AdminThemeProvider } from "./context/AdminThemeContext"; // ✅ Import the provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminThemeProvider>
      <App />
    </AdminThemeProvider>
  </React.StrictMode>
);
