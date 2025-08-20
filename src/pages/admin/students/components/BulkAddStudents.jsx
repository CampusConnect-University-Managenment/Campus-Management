import React, { useState } from "react";
import axios from "axios";

const BulkAddStudents = ({ onClose }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // must match @RequestParam("file")

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/excel/upload", // ✅ matches backend
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201) {
        setSuccess("✅ Students uploaded successfully!");
      } else {
        setError("⚠️ Upload failed. Server returned status: " + res.status);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Upload failed. " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Bulk Add Students (Excel)</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-3 border border-gray-300 p-2 rounded w-full"
      />

      {error && <p className="text-red-600 mb-3 whitespace-pre-wrap">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}
      {loading && <p className="text-blue-600 mb-3">Uploading...</p>}

      <p className="text-sm text-gray-500 mb-4">
        Please upload an Excel file. The backend will parse it and save students.
      </p>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BulkAddStudents;
