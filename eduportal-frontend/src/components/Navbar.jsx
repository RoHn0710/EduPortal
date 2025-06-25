import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/logo-icon.png";
import { useAdminTheme } from "../context/AdminThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { darkMode } = useAdminTheme();

  useEffect(() => {
    setIsStudentLoggedIn(!!localStorage.getItem("student"));
    setIsAdminLoggedIn(!!localStorage.getItem("adminToken"));
  }, [location.pathname]);

  const isAdminPage = location.pathname.startsWith("/admin") && isAdminLoggedIn;
  const isDarkAdminNavbar = isAdminPage && darkMode;

  const handlePortalClick = () => {
    if (isAdminPage) {
      navigate("/admin-dashboard");
    } else if (isStudentLoggedIn) {
      navigate("/student-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    alert("You are getting logged out... Please click 'ok' to confirm");
    localStorage.removeItem("student");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <header
      className={`py-4 px-8 flex justify-between items-center shadow-sm transition-colors duration-300 ${
        isDarkAdminNavbar ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div
        onClick={handlePortalClick}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={Logo} alt="Logo" className="w-6 h-6" />
        <span
          className={`font-bold text-xl ${
            isDarkAdminNavbar ? "text-white" : "text-black"
          }`}
        >
          EDUPORTAL
        </span>
      </div>

      <nav className="space-x-6 text-sm font-medium flex items-center">
        {isAdminPage ? (
          <>
            <Link to="/admin/results" className="hover:text-blue-400">Results</Link>
            <Link to="/admin/upload-result" className="hover:text-blue-400">Upload Result</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/student-dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/results" className="hover:text-blue-600">Results</Link>
            <Link to="/" className="hover:text-blue-600">Notifications</Link>
            <Link to="/" className="hover:text-blue-600">FAQs</Link>
            {location.pathname === "/" && (
              <Link to="/contact" className="hover:text-blue-600">Contact</Link>
            )}
            {isStudentLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
