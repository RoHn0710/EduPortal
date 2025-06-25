import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentResult = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));
  const userId = student?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/marks/${userId}`);
        setStudentInfo(res.data);
        setMarks(res.data.results || []);
      } catch (err) {
        console.error("Error loading result data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <label className="font-semibold mr-2">Semester:</label>
        <select disabled className="border px-2 py-1 rounded" value="1">
          <option value="1">1</option>
        </select>
        <span className="ml-2 text-sm text-gray-600">
          (Semester selection is disabled temporarily)
        </span>
      </div>

      <hr className="my-4" />

      {studentInfo && (
        <div className="grid grid-cols-2 gap-y-4 text-md mb-8">
          <div><strong>Name:</strong> {studentInfo.fullName}</div>
          <div><strong>Registration No:</strong> {studentInfo.registrationNumber}</div>
          <div><strong>Degree:</strong> {studentInfo.degree || ""}</div>
          <div><strong>Branch:</strong> {studentInfo.branch || ""}</div>
        </div>
      )}

      <hr className="my-4" />

      {marks.length > 0 ? (
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.subject}</td>
                <td className="border p-2">{item.score}</td>
                <td className="border p-2">{item.grade}</td>
                <td className="border p-2">{item.score >= 40 ? "Pass" : "Fail"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No result data available</p>
      )}
    </div>
  );
};

export default StudentResult;
