import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminTheme } from "../context/AdminThemeContext";


function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin-login", {
        username,
        password,
      });

      // ✅ Store a login flag for admin (used by Navbar)
      localStorage.setItem("adminToken", "true");

      // Optional: also store admin username if needed
      localStorage.setItem("adminUsername", res.data.admin?.username || username);

      alert("✅ Admin logged in successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;