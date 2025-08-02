import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/admin/courses";
const DEGREE_OPTIONS = ["BE", "B.Tech"];
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const DEPARTMENT_OPTIONS = ["IT", "CSE", "AIDS", "EEE", "ECE"];

function Subject() {
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newCourse, setNewCourse] = useState({
    degree: "",
    department: "",
    year: "",
    semester: "",
    courseCode: "",
    courseName: "",
    credits: 0,
    color: "#0284c7",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const handleAddCourse = async () => {
    try {
      const {
        degree, year, department, courseCode, courseName, semester, credits
      } = newCourse;

      if (degree && year && department && courseCode && courseName && semester && credits) {
        if (isEditMode && editIndex !== null) {
          const id = courses[editIndex].id;
          await axios.put(`${BASE_URL}/${id}`, newCourse);
        } else {
          await axios.post(BASE_URL, newCourse);
        }

        await fetchCourses();
        resetForm();
      } else {
        alert("Please fill all fields.");
      }
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDeleteCourse = async (index) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const id = courses[index].id;
        await axios.delete(`${BASE_URL}/${id}`);
        const updated = [...courses];
        updated.splice(index, 1);
        setCourses(updated);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const openAddForm = async () => {
    await fetchCourses();
    resetForm();
    setShowForm(true);
  };

  const resetForm = () => {
    setNewCourse({
      degree: "",
      department: "",
      year: "",
      semester: "",
      courseCode: "",
      courseName: "",
      credits: 0,
      color: "#0284c7",
    });
    setIsEditMode(false);
    setEditIndex(null);
    setShowForm(false);
  };

  const filteredCourses = courses.filter(
    (c) => c.degree === degree && c.year === year && c.department === department
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-left text-gray-800 flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-3xl font-bold">Subjects</h1>
          </div>
          <button
            onClick={openAddForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>+</span>
            Add Subject
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Dropdown label="Degree" value={degree} options={DEGREE_OPTIONS} onChange={(v) => { setDegree(v); setYear(""); setDepartment(""); }} />
          <Dropdown label="Year" value={year} options={YEAR_OPTIONS} onChange={(v) => { setYear(v); setDepartment(""); }} disabled={!degree} />
          <Dropdown label="Department" value={department} options={DEPARTMENT_OPTIONS} onChange={(v) => setDepartment(v)} disabled={!degree || !year} />
        </div>

        {/* Course List */}
        {degree && year && department && (
          filteredCourses.length === 0 ? (
            <p className="text-gray-500 mb-6">
              No subjects available for {department} in {degree} - {year}.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <div key={index} className="bg-white rounded-lg shadow overflow-hidden flex flex-col justify-between">
                    <div className="h-40 flex items-center justify-center text-white text-center p-4" style={{ backgroundColor: course.color }}>
                      <div>
                        <h4 className="font-bold text-lg mb-2">{course.courseCode}</h4>
                        <p className="text-sm">{course.courseName}</p>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block border border-blue-500 text-blue-500 text-xs px-2 py-1 rounded mb-2">
                          {course.department}
                        </span>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Semester:</strong> {course.semester}</p>
                          <p><strong>Credits:</strong> {course.credits}</p>
                          <p><strong>Year:</strong> {course.year}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            setIsEditMode(true);
                            setEditIndex(index);
                            setNewCourse(course);
                            setShowForm(true);
                          }}
                          className="w-1/2 bg-yellow-500 text-white text-sm py-2 rounded hover:bg-yellow-600 transition"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(index)}
                          className="w-1/2 bg-red-600 text-white text-sm py-2 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Above subjects are designed for students of {department} in {degree} - {year}.
              </p>
            </>
          )
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? `Update Subject` : `Add New Subject`}
              </h2>
              <div className="grid gap-3">
                <Dropdown label="Degree" value={newCourse.degree} options={DEGREE_OPTIONS} onChange={(v) => setNewCourse({ ...newCourse, degree: v, year: "", department: "" })} />
                <Dropdown label="Year" value={newCourse.year} options={YEAR_OPTIONS} onChange={(v) => setNewCourse({ ...newCourse, year: v, department: "" })} disabled={!newCourse.degree} />
                <Dropdown label="Department" value={newCourse.department} options={DEPARTMENT_OPTIONS} onChange={(v) => setNewCourse({ ...newCourse, department: v })} disabled={!newCourse.degree || !newCourse.year} />
                <TextInput label="Course Code" value={newCourse.courseCode} onChange={(v) => setNewCourse({ ...newCourse, courseCode: v })} />
                <TextInput label="Course Name" value={newCourse.courseName} onChange={(v) => setNewCourse({ ...newCourse, courseName: v })} />
                <Dropdown label="Semester" value={newCourse.semester} options={Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`)} onChange={(v) => setNewCourse({ ...newCourse, semester: v })} />
                <TextInput label="Credits" type="number" value={newCourse.credits} onChange={(v) => setNewCourse({ ...newCourse, credits: +v })} />
                <TextInput label="Color" type="color" value={newCourse.color} onChange={(v) => setNewCourse({ ...newCourse, color: v })} />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={handleAddCourse}>{isEditMode ? "Update" : "Create"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable components
const Dropdown = ({ label, value, options, onChange, disabled = false }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select className="w-full border p-2 rounded disabled:opacity-50" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TextInput = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input type={type} className="w-full border p-2 rounded" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default Subject;

