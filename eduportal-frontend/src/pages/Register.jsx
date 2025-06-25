import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api"; // Ensure this points to your backend base URL

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registrationNumber: "",
    department: "",
    dob: "",
    yearOfJoining: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.removeItem("student");
    localStorage.removeItem("adminToken");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "yearOfJoining" && (!/^\d{0,4}$/.test(value) || value.length > 4)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const year = Number(formData.yearOfJoining);
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(formData.yearOfJoining) || year < 1950 || year > currentYear) {
      setMessage("❌ Please enter a valid 4-digit year of joining.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/auth/register`, formData);

      setMessage("✅ Registered successfully! Redirecting to home...");
      setTimeout(() => navigate("/"), 2000); // Redirect to home
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "❌ Registration failed. Try again.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Student Registration
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Registration Number", name: "registrationNumber", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            {
              label: "Year of Joining",
              name: "yearOfJoining",
              type: "number",
              max: new Date().getFullYear(),
              placeholder: "e.g. 2023",
            },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={formData[name]}
                onChange={handleChange}
                required
                {...rest}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 whitespace-pre-wrap">{message}</p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-green-700 hover:underline">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
