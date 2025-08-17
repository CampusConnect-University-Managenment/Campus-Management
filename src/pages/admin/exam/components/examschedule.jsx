import React, { useState } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";

const UploadMarks = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an Excel file first!");
      return;
    }
    // 🔗 Replace with backend upload API
    console.log("Uploading:", file);
    alert(`"${file.name}" uploaded successfully!`);
  };

  return (
    <div className="p-6 w-full flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <FileSpreadsheet className="w-7 h-7 text-green-600" />
          Upload Marks
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Upload student marks in <span className="font-medium">Excel (.xlsx / .xls)</span>
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
              <p className="text-gray-700 font-medium">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-400 mt-1">Excel files only (.xlsx / .xls)</p>
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
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMarks;
