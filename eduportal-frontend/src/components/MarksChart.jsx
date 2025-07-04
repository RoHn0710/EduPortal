import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

function MarksChart({ darkMode }) {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marks/chart/summary");
        const { uploaded, pending, totalStudents } = res.data;


        // Safely parse values as numbers
        const data = [
          { name: "Uploaded", value: uploaded },
          { name: "Pending", value: pending },
          { name: "Total", value: totalStudents }
        ];


        setChartData(data);
        setError("");
      } catch (err) {
        console.error("Chart error:", err.message);
        setError("⚠ Failed to load chart.");
      }
    };

    fetchData();
  }, []);

  const textColor = darkMode ? "#ffffff" : "#000000";
  const gridColor = darkMode ? "#444" : "#ccc";
  const barColor = darkMode ? "#60a5fa" : "#3b82f6";
  const bgColor = darkMode ? "#1f2937" : "#ffffff";

  return (
    <div className="w-full h-[400px]">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={50}
          >
            <CartesianGrid stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} />
            <YAxis allowDecimals={false} stroke={textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: bgColor,
                color: textColor,
                border: "none"
              }}
              labelStyle={{ color: textColor }}
              itemStyle={{ color: textColor }}
            />
            <Bar dataKey="value" fill={barColor}>
              <LabelList dataKey="value" position="top" fill={textColor} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MarksChart;
