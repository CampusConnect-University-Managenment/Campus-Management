import React, { useState } from "react";
import client from "../../../api/client";  // ✅ API client

export default function ResultPortal() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rollNo, setRollNo] = useState("");

  const fetchResults = async () => {
    if (!rollNo.trim()) {
      setMessage("Please enter your roll number.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data } = await client.get(`/api/results/${rollNo}`);

      if (data && data.length > 0) {
        setResults(data);
      } else {
        setMessage("No results found.");
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] mt-[100px] pt-10 pb-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Student Result Portal
        </h1>

        {/* Roll No Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your Roll Number"
            className="px-4 py-2 border rounded-l-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={fetchResults}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-r-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "View Results"}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-3 border">Course Code</th>
                  <th className="p-3 border">Course Title</th>
                  <th className="p-3 border">Credits</th>
                  <th className="p-3 border">Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-3 border">{res.courseCode}</td>
                    <td className="p-3 border">{res.courseTitle}</td>
                    <td className="p-3 border">{res.credits}</td>
                    <td className="p-3 border">{res.letterGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
