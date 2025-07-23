import React, { useState } from "react";

export default function MarksUpload() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", subject: "", marks: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.name && form.subject && form.marks) {
      setStudents([...students, form]);
      setForm({ name: "", subject: "", marks: "" });
    }
  };

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        📊 Marks Upload
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Enter and upload student marks below.
      </p>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Student Name"
            className="border px-3 py-2 rounded shadow-sm focus:ring-indigo-500"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border px-3 py-2 rounded shadow-sm"
          />
          <input
            name="marks"
            value={form.marks}
            onChange={handleChange}
            placeholder="Marks"
            className="border px-3 py-2 rounded shadow-sm"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Upload
        </button>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border font-medium">Student</th>
                <th className="p-3 border font-medium">Subject</th>
                <th className="p-3 border font-medium">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.subject}</td>
                  <td className="p-3 border">{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
