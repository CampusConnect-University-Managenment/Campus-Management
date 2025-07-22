import React, { useState } from "react";
import * as XLSX from "xlsx";

const BulkAddStudents = ({ onClose, onBulkAdd }) => {
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      // Required columns for your app
      const required = [
        "name", "email", "phone", "department", "degree",
        "year", "semester", "status", "cgpa", "attendance", "bio"
      ];

      const isValid = json.every(row =>
        required.every(key => row.hasOwnProperty(key))
      );

      if (!isValid) {
        setError("Invalid format. Ensure all columns are present: " + required.join(", "));
        return;
      }

      setError("");
      onBulkAdd(json);
    };

    reader.readAsArrayBuffer(file);
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

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <p className="text-sm text-gray-500 mb-4">
        Please upload an Excel file with these columns:<br />
        <code>name, email, phone, department, degree, year, semester, status, cgpa, attendance, bio</code>
      </p>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled
        >
          Add Students
        </button>
      </div>
    </div>
  );
};

export default BulkAddStudents;
