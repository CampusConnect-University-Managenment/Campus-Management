import React, { useState, useEffect } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";

const UploadMarks = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]); // ✅ store backend data
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all results from backend
  const fetchResults = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/results");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchResults(); // load on page mount
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/results/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(`"${file.name}" uploaded successfully!`);
        fetchResults(); // ✅ refresh data after upload
      } else {
        const errorText = await response.text();
        alert("Upload failed: " + errorText);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <FileSpreadsheet className="w-7 h-7 text-green-600" />
          Upload Marks
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Upload student marks in{" "}
          <span className="font-medium">Excel (.xlsx / .xls)</span>
        </p>

        {/* Upload Box */}
        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <Upload className="w-12 h-12 text-blue-600 mb-3" />
          {file ? (
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
              {file.name}
            </span>
          ) : (
            <>
              <p className="text-gray-700 font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Excel files only (.xlsx / .xls)
              </p>
            </>
          )}
          <input
            type="file"
            accept=".xlsx,.xls"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>

      {/* ✅ Results Table */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Uploaded Results</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results available.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Reg No</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Semester</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Marks</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => (
                <tr key={idx} className="text-center">
                  <td className="p-2 border">{res.regNo}</td>
                  <td className="p-2 border">{res.studentName}</td>
                  <td className="p-2 border">{res.sem}</td>
                  <td className="p-2 border">{res.subject}</td>
                  <td className="p-2 border">{res.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UploadMarks;
