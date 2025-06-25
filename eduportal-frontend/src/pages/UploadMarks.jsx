import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminTheme } from "../context/AdminThemeContext";

function UploadMarks() {
  const { darkMode } = useAdminTheme();

  const [students, setStudents] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [subjects, setSubjects] = useState([
    { subject: "Subject 1", score: "", grade: "" },
    { subject: "Subject 2", score: "", grade: "" },
    { subject: "Subject 3", score: "", grade: "" },
  ]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/all");
        setStudents(res.data);
      } catch (err) {
        if (!window.navigator.onLine) {
          alert("📡 Network error: Please check your internet connection.");
        } else {
          alert("⚠ Server error: Unable to fetch student data.");
        }
        console.error("Error fetching student profiles", err);
      }
    };
    fetchStudents();
  }, []);

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { subject: `Subject ${subjects.length + 1}`, score: "", grade: "" },
    ]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("Please select a student.");
      return;
    }

    const validGrades = ["S", "A", "B", "C", "D"];
    for (let i = 0; i < subjects.length; i++) {
      const { subject, score, grade } = subjects[i];
      const scoreValue = Number(score);

      if (!subject || score === "" || !grade) {
        alert(`Fill all fields for Subject ${i + 1}.`);
        return;
      }

      if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
        alert(`Marks for "${subject}" must be between 0 and 100.`);
        return;
      }

      if (!validGrades.includes(grade.trim().toUpperCase())) {
        alert(`Grade for "${subject}" must be one of: S, A, B, C, D.`);
        return;
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/marks/upload", {
        userId: selectedUserId,
        marks: subjects.map((s) => ({
          subject: s.subject.trim(),
          score: Number(s.score),
          grade: s.grade.trim().toUpperCase(),
        })),
      });

      if (res.status === 200) {
        alert("✅ Marks uploaded successfully!");
        setSubjects([
          { subject: "Subject 1", score: "", grade: "" },
          { subject: "Subject 2", score: "", grade: "" },
          { subject: "Subject 3", score: "", grade: "" },
        ]);
      } else {
        alert("⚠ Unexpected server response.");
      }
    } catch (err) {
      if (!window.navigator.onLine) {
        alert("📡 Network error: You are offline. Please reconnect.");
      } else if (err.code === "ERR_NETWORK") {
        alert("🛠 Backend server not reachable. Please try again later.");
      } else {
        alert("❌ Failed to upload marks.");
      }
      console.error("Error:", err);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto mt-10 p-6 rounded-lg font-sans min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white border border-gray-700"
          : "bg-white text-gray-900 border border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Upload Student Marks
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={`mb-6 p-4 border rounded-md ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
          <h3 className="text-lg font-semibold mb-3">Student Information</h3>
          <label className="block mb-2 font-medium">Select Student:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
            className={`w-full p-2 rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border border-gray-400"
            }`}
          >
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student.userId} value={student.userId}>
                {student.fullName} ({student.registrationNumber})
              </option>
            ))}
          </select>
        </div>

        <div className={`p-4 border rounded-md ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
          <h3 className="text-lg font-semibold mb-3 text-center">
            Subjects & Scores
          </h3>
          <table className="w-full table-auto border-collapse text-center">
            <thead>
              <tr className={darkMode ? "bg-gray-700" : "bg-gray-200"}>
                <th className="p-2">Subject</th>
                <th className="p-2">Marks</th>
                <th className="p-2">Grade</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <input
                      type="text"
                      value={subj.subject}
                      onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                      required
                      className={`w-full px-3 py-2 rounded-md text-center ${
                        darkMode ? "bg-gray-700 text-white border border-gray-600" : "border border-gray-300"
                      }`}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={subj.score}
                      onChange={(e) => handleSubjectChange(index, "score", e.target.value)}
                      required
                      className={`w-full px-3 py-2 rounded-md text-center ${
                        darkMode ? "bg-gray-700 text-white border border-gray-600" : "border border-gray-300"
                      }`}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={subj.grade}
                      onChange={(e) => handleSubjectChange(index, "grade", e.target.value)}
                      required
                      className={`w-full px-3 py-2 rounded-md text-center ${
                        darkMode ? "bg-gray-700 text-white border border-gray-600" : "border border-gray-300"
                      }`}
                    />
                  </td>
                  <td className="p-2">
                    {subjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                      >
                        ✖
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4">
            <button
              type="button"
              onClick={addSubject}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
            >
              ➕ Add Subject
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg rounded-full font-semibold"
          >
            Submit Marks
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadMarks;
