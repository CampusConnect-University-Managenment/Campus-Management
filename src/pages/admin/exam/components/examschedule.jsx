import React, { useState } from "react";
import { Plus, Pencil } from "lucide-react";

const initialSchedules = [
  {
    id: 1,
    exam: "Mathematics - II",
    date: "2025-08-10",
    time: "10:00 AM - 1:00 PM",
    venue: "Block A - Room 203",
    students: 60,
    degree: "BSc",
    year: "1st Year",
    department: "Mathematics",
  },
  {
    id: 2,
    exam: "Computer Networks",
    date: "2025-08-12",
    time: "2:00 PM - 5:00 PM",
    venue: "Block B - Room 101",
    students: 45,
    degree: "BSc",
    year: "2nd Year",
    department: "Computer Science",
  },
];

const degrees = ["BSc", "BCA", "BCom"];
const years = ["1st Year", "2nd Year", "3rd Year"];
const departments = ["Mathematics", "Computer Science", "Commerce"];

const ExamSchedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    exam: "",
    date: "",
    time: "",
    venue: "",
    students: "",
    degree: "",
    year: "",
    department: "",
  });

  const openModal = () => document.getElementById("examModal").showModal();
  const closeModal = () => document.getElementById("examModal").close();

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      exam: "",
      date: "",
      time: "",
      venue: "",
      students: "",
      degree: "",
      year: "",
      department: "",
    });
    openModal();
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule.id);
    setFormData(schedule);
    openModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this exam?")) {
      setSchedules((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSchedules((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      );
    } else {
      setSchedules((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const groupedSchedules = schedules.reduce((groups, schedule) => {
    const key = `${schedule.degree} - ${schedule.year} - ${schedule.department}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(schedule);
    return groups;
  }, {});

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Exam Schedules
        </h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center gap-2"
          onClick={handleAdd}
        >
          <Plus size={16} />
          Add Exam
        </button>
      </div>

      {Object.entries(groupedSchedules).map(([section, exams]) => (
        <div key={section} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {section}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4">Exam</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Venue</th>
                  <th className="py-2 px-4">Students</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{exam.exam}</td>
                    <td className="py-2 px-4">{exam.date}</td>
                    <td className="py-2 px-4">{exam.time}</td>
                    <td className="py-2 px-4">{exam.venue}</td>
                    <td className="py-2 px-4">{exam.students}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(exam)}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exam.id)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal for Add/Edit */}
      <dialog id="examModal" className="modal rounded-xl">
        <div className="modal-box max-w-md w-full">
          <h3 className="font-bold text-xl mb-4">
            {editingId ? "Edit Exam" : "Add Exam"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Exam Name"
              className="w-full border px-3 py-2 rounded"
              value={formData.exam}
              required
              onChange={(e) =>
                setFormData({ ...formData, exam: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={formData.date}
              required
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Time (e.g. 10:00 AM - 1:00 PM)"
              className="w-full border px-3 py-2 rounded"
              value={formData.time}
              required
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Venue"
              className="w-full border px-3 py-2 rounded"
              value={formData.venue}
              required
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Total Students"
              className="w-full border px-3 py-2 rounded"
              value={formData.students}
              required
              onChange={(e) =>
                setFormData({ ...formData, students: Number(e.target.value) })
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                required
                className="border px-3 py-2 rounded"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
              >
                <option value="">Degree</option>
                {degrees.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                required
                className="border px-3 py-2 rounded"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <select
                required
                className="border px-3 py-2 rounded"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="">Department</option>
                {departments.map((dep) => (
                  <option key={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ExamSchedule;
