import React, { useState } from 'react';

const UploadQuestionPaper = () => {
  const [formData, setFormData] = useState({
    subject: "",
    exam: "",
    date: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject, exam, date, file } = formData;
    if (!subject || !exam || !date || !file) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Uploading Question Paper...");
    console.log("Form Data:", formData);
    alert("Question Paper upload simulated");

    setFormData({
      subject: "",
      exam: "",
      date: "",
      description: "",
      file: null,
    });

    document.getElementById("questionFileInput").value = "";
  };

  const handleReset = () => {
    setFormData({
      subject: "",
      exam: "",
      date: "",
      description: "",
      file: null,
    });
    document.getElementById("questionFileInput").value = "";
  };

  return (
    <div className="mt-[100px] max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Question Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Subject */}
        <div>
          <label className="block font-medium text-sm mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Operating Systems"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Exam */}
        <div>
          <label className="block font-medium text-sm mb-1">Exam</label>
          <input
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            placeholder="e.g. Midterm, Semester 1"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium text-sm mb-1">Exam Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short note about the question paper"
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium text-sm mb-1">File Upload</label>
          <input
            type="file"
            id="questionFileInput"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full"
            required
          />
          {formData.file && (
            <p className="text-sm mt-1 text-gray-600">Selected File: {formData.file.name}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadQuestionPaper;
