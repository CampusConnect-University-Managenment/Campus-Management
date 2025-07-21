import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaFileUpload, FaBookOpen } from "react-icons/fa";

const FacultyMarksUpdate = () => {
  const [department, setDepartment] = useState("");
  const [Section, setSection] = useState("");
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([{ name: "", marks: "" }]);
  const navigate = useNavigate();

  useEffect(()=>{window.scrollTo(0,0)},[])

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };
  const Backtohome =() =>{
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
    if (students.some((s) => !s.name || s.marks === "")) {
      alert("Please fill all student fields.");
      return;
    }

    console.log("Department:", department);
    console.log("Class:", className);
    console.log("Section:", Section);
    console.log("Student Marks:", students);
    alert("Marks submitted (simulation)");
  };

  return (
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
            ← Back to ExamInterFace
            </button><br/>
      <br/>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex">
        <div><FaClipboardList className="text-indigo-600 text-4xl ms-72" /> </div>
        <div>
        <h2 className="text-3xl font-semibold text-[#2e3a59]  mb-8">
          Marks Upload
        </h2></div>
       </div>
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Class</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {/* Table */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-50 text-indigo-700">
                <tr>
                  <th className="text-left px-6 py-3">Student Name</th>
                  <th className="text-center px-6 py-3">Marks</th>
                  <th className="text-center px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="Enter name"
                        required
                      />
                    </td>
                    <td className="text-center px-6 py-3">
                      <input
                        type="number"
                        value={student.marks}
                        onChange={(e) =>
                          handleInputChange(index, "marks", e.target.value)
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="0"
                        required
                      />
                    </td>
                    <td className="text-center px-6 py-3">
                      {students.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStudentRow(index)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addStudentRow}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition"
            >
              + Add Student
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
            >
              Submit Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyMarksUpdate;