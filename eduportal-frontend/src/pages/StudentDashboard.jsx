import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    name: "",
    parentsName: "",
    dob: "",
    yearOfJoining: "",
    batch: "",
  });

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (!storedStudent || !storedStudent._id) {
      navigate("/");
      return;
    }

    setStudent(storedStudent);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${storedStudent._id}`
        );
        const data = res.data;

        if (!data) throw new Error("No profile data received");

        setDetails({
          name: data.fullName || "",
          parentsName: data.parentsName || "",
          dob: data.dob?.slice(0, 10) || "",
          yearOfJoining: data.yearOfJoining || "",
          batch: data.batch || "",
        });
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("❌ Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const handlePageHide = (event) => {
      if (!event.persisted) {
        localStorage.removeItem("student");
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [navigate]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/profile", {
        userId: student?._id,
        fullName: details.name,
        parentsName: details.parentsName,
        dob: details.dob,
        yearOfJoining: Number(details.yearOfJoining),
        batch: details.batch,
      });

      alert("✅ Profile updated successfully");
      setIsEditing(false);
      setError("");
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("❌ Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-center text-blue-600 mt-10">⏳ Loading profile...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">
            Welcome, {student?.name || "Student"} 🎓
          </h1>
        </div>

        <div className="space-y-4 text-gray-800">
          {[
            { label: "Full Name", key: "name" },
            { label: "Parent's Name", key: "parentsName" },
            { label: "Date of Birth", key: "dob", type: "date" },
            { label: "Year of Joining", key: "yearOfJoining", type: "number" },
            { label: "Batch", key: "batch" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <strong>{label}:</strong>{" "}
              {isEditing ? (
                <input
                  name={key}
                  type={type || "text"}
                  value={details[key]}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <span>{details[key] || "N/A"}</span>
              )}
            </div>
          ))}

          <div>
            <strong>Registration Number:</strong>{" "}
            <span>{student?.registrationNumber || "N/A"}</span>
          </div>

          <div>
            <strong>Courses Enrolled:</strong>{" "}
            <ul className="list-disc ml-5">
              {(student?.courses || []).map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>CGPA:</strong> <span>{student?.cgpa || "N/A"}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
