import React, { useState } from "react";

const FacultyMarksUpdate = () => {
  const [department, setDepartment] = useState("");
  const [Section, setSection] = useState("");
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([
    { name: "", marks: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const addStudentRow = () => {
    setStudents([...students, { name: "", marks: "" }]);
  };

  const removeStudentRow = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!department || !className) {
      alert("Please select both department and class.");
      return;
    }

    if (students.some(s => !s.name || s.marks === "")) {
      alert("Please fill all student fields.");
      return;
    }

    console.log("Department:", department);
    console.log("Class:", className);
    console.log("Section:",Section);
    console.log("Student Marks:", students);
    alert("Marks submitted (simulation)");
  };

  return (
    <div className=" mt-[100px] max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Manual Marks Upload</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6 justify-center">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
        </select>
        <select
          value={Section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">Select Class</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>

      {/* Student Form */}
      <form onSubmit={handleSubmit}>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Student Name</th>
              <th className="border p-2 text-center">Marks</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="Enter name"
                    required
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="number"
                    value={student.marks}
                    onChange={(e) => handleInputChange(index, "marks", e.target.value)}
                    className="w-24 border rounded px-2 py-1 text-center"
                    placeholder="0"
                    required
                  />
                </td>
                <td className="border p-2 text-center">
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStudentRow(index)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addStudentRow}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            + Add Student
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Marks
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacultyMarksUpdate;