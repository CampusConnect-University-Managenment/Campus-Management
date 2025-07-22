import React, { useState } from "react";

export default function ExamSchedule() {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    exam: "",
    date: "",
    time: "",
    venue: "",
    students: "",
  });

  const handleChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (
      newExam.exam &&
      newExam.date &&
      newExam.time &&
      newExam.venue &&
      newExam.students
    ) {
      setExams([...exams, newExam]);
      setNewExam({ exam: "", date: "", time: "", venue: "", students: "" });
    }
  };

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 px-6 py-20 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-2">
        🗓️ Exam Schedule
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Add and view the upcoming exam schedule.
      </p>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            name="exam"
            value={newExam.exam}
            onChange={handleChange}
            placeholder="Exam"
            className="border px-3 py-2 rounded shadow-sm focus:ring-indigo-500"
          />
          <input
            name="date"
            value={newExam.date}
            onChange={handleChange}
            type="date"
            className="border px-3 py-2 rounded shadow-sm"
          />
          <input
            name="time"
            value={newExam.time}
            onChange={handleChange}
            type="time"
            className="border px-3 py-2 rounded shadow-sm"
          />
          <input
            name="venue"
            value={newExam.venue}
            onChange={handleChange}
            placeholder="Venue"
            className="border px-3 py-2 rounded shadow-sm"
          />
          <input
            name="students"
            value={newExam.students}
            onChange={handleChange}
            placeholder="Students"
            className="border px-3 py-2 rounded shadow-sm"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Add Exam
        </button>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border font-medium">Exam</th>
                <th className="p-3 border font-medium">Date</th>
                <th className="p-3 border font-medium">Time</th>
                <th className="p-3 border font-medium">Venue</th>
                <th className="p-3 border font-medium">Students</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.exam}</td>
                  <td className="p-3 border">{item.date}</td>
                  <td className="p-3 border">{item.time}</td>
                  <td className="p-3 border">{item.venue}</td>
                  <td className="p-3 border">{item.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
