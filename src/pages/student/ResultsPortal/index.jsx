import React, { useState, useEffect } from "react";
import client from "../../../api/client";  // ✅ fixed import

export default function ResultPortal() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load logged-in user info
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchResults = async () => {
    if (!user) {
      setMessage("Please login to view results.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data } = await client.get(`/api/results/${user.regNo}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // if JWT token
        },
      });

      if (data && data.length > 0) {
        setResults(data);
      } else {
        setMessage("No results found.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch results. Please try again.");
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

        {user ? (
          <p className="text-center text-gray-600 mb-4">
            Logged in as <span className="font-semibold">{user.username}</span> (
            {user.regNo})
          </p>
        ) : (
          <p className="text-center text-red-600 mb-4">
            Please login to view results.
          </p>
        )}

        {user && (
          <div className="text-center mb-6">
            <button
              onClick={fetchResults}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "View My Results"}
            </button>
          </div>
        )}

        {message && (
          <p className="text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

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
