import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";

const UploadQuestionPaper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, file } = formData;
    if (!title || !file) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Uploading Question Paper...');
    console.log('Form Data:', formData);
    alert('Question Paper upload simulated');

    setFormData({
      title: '',
      description: '',
      file: null,
    });

    document.getElementById('questionFileInput').value = '';
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      file: null,
    });
    document.getElementById('questionFileInput').value = '';
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6">
        <div className="flex items-center justify-center mb-6">
          <FaFileUpload className="text-green-600 text-4xl mr-4" />
          <h2 className="text-3xl font-semibold text-[#2e3a59] text-center">
            Upload Question Paper
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title for the question paper"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short note about the question paper"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">File Upload</label>
            <input
              type="file"
              id="questionFileInput"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md"
              required
            />
            {formData.file && (
              <p className="text-sm mt-1 text-gray-600">
                Selected File: <span className="font-medium">{formData.file.name}</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow transition"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 shadow transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadQuestionPaper;
