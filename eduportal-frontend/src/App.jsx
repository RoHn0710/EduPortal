import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import UploadMarks from "./pages/UploadMarks";
import StudentResult from "./pages/StudentResult";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminThemeProvider } from "./context/AdminThemeContext";

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    const student = localStorage.getItem("student");
    try {
      const parsed = JSON.parse(student);
      if (!parsed || !parsed._id || !parsed.registrationNumber) {
        localStorage.removeItem("student");
      }
    } catch {
      localStorage.removeItem("student");
    }
  }, []);

  const isAdminPage =
    location.pathname.startsWith("/admin") && location.pathname !== "/admin-login";

  const Wrapper = isAdminPage ? AdminThemeProvider : React.Fragment;

  return (
    <Wrapper>
      <div className="min-h-screen font-sans transition-colors duration-300">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/upload-result" element={<UploadMarks />} />

            <Route
              path="/student-dashboard"
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <StudentResult />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Wrapper>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
