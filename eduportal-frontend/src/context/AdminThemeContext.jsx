import React, { createContext, useContext, useState, useEffect } from "react";

const AdminThemeContext = createContext();

export const AdminThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("adminDarkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("adminDarkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AdminThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export const useAdminTheme = () => useContext(AdminThemeContext);
