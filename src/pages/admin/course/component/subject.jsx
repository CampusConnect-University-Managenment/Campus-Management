import React, { useState, useEffect } from "react";

const mockCourses = {
  BSc: {
    "1st Year": {
      CSE: [
        {
          degree: "BSc",
          department: "CSE",
          year: "1st Year",
          semester: "Semester 1",
          courseCode: "CS101",
          courseName: "Data Structures",
          credits: 4,
          color: "#0284c7",
        },
        {
          degree: "BSc",
          department: "CSE",
          year: "1st Year",
          semester: "Semester 2",
          courseCode: "CS102",
          courseName: "Algorithms",
          credits: 3,
          color: "#0284c7",
        },
      ],
      IT: [
        {
          degree: "BSc",
          department: "IT",
          year: "1st Year",
          semester: "Semester 1",
          courseCode: "IT101",
          courseName: "Web Development",
          credits: 4,
          color: "#f97316",
        },
      ],
    },
    "2nd Year": {
      CSE: [
        {
          degree: "BSc",
          department: "CSE",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "CS201",
          courseName: "Database Management Systems",
          credits: 4,
          color: "#7c3aed",
        },
      ],
      IT: [
        {
          degree: "BSc",
          department: "IT",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "IT201",
          courseName: "Cloud Computing",
          credits: 3,
          color: "#16a34a",
        },
      ],
    },
    "3rd Year": {
      CSE: [
        {
          degree: "BSc",
          department: "CSE",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "CS301",
          courseName: "Spring Boot Development",
          credits: 4,
          color: "#f59e0b",
        },
      ],
      IT: [
        {
          degree: "BSc",
          department: "IT",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "IT301",
          courseName: "MERN Stack Development",
          credits: 5,
          color: "#8b5cf6",
        },
      ],
    },
    "4th Year": {
      CSE: [
        {
          degree: "BSc",
          department: "CSE",
          year: "4th Year",
          semester: "Semester 7",
          courseCode: "CS401",
          courseName: "Full Stack Development",
          credits: 5,
          color: "#22c55e",
        },
      ],
      IT: [
        {
          degree: "BSc",
          department: "IT",
          year: "4th Year",
          semester: "Semester 7",
          courseCode: "IT401",
          courseName: "Data Structures and Algorithms with Java",
          credits: 4,
          color: "#ec4899",
        },
      ],
    },
  },

  BE: {
    "1st Year": {
      MECH: [],
      ECE: [],
    },
    "2nd Year": {
      MECH: [
        {
          degree: "BE",
          department: "MECH",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "ME201",
          courseName: "Thermodynamics",
          credits: 4,
          color: "#e11d48",
        },
      ],
      ECE: [
        {
          degree: "BE",
          department: "ECE",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "EC201",
          courseName: "Signal Processing",
          credits: 3,
          color: "#6366f1",
        },
      ],
    },
    "3rd Year": {
      MECH: [
        {
          degree: "BE",
          department: "MECH",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "ME301",
          courseName: "Manufacturing Process",
          credits: 4,
          color: "#facc15",
        },
      ],
      ECE: [
        {
          degree: "BE",
          department: "ECE",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "EC301",
          courseName: "Analog Circuits",
          credits: 3,
          color: "#06b6d4",
        },
      ],
    },
    "4th Year": {
      MECH: [
        {
          degree: "BE",
          department: "MECH",
          year: "4th Year",
          semester: "Semester 7",
          courseCode: "ME401",
          courseName: "CAD/CAM",
          credits: 4,
          color: "#0ea5e9",
        },
      ],
      ECE: [
        {
          degree: "BE",
          department: "ECE",
          year: "4th Year",
          semester: "Semester 7",
          courseCode: "EC401",
          courseName: "Embedded Systems",
          credits: 4,
          color: "#10b981",
        },
      ],
    },
  },

  BCA: {
    "1st Year": {
      CS: [],
      DS: [],
    },
    "2nd Year": {
      CS: [],
      DS: [],
    },
    "3rd Year": {
      CS: [
        {
          degree: "BCA",
          department: "CS",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "BCA301",
          courseName: "Python Programming",
          credits: 4,
          color: "#0d9488",
        },
      ],
      DS: [
        {
          degree: "BCA",
          department: "DS",
          year: "3rd Year",
          semester: "Semester 5",
          courseCode: "DS301",
          courseName: "Data Science Basics",
          credits: 4,
          color: "#7e22ce",
        },
      ],
    },
    "4th Year": {
      CS: [],
      DS: [],
    },
  },

  Diploma: {
    "1st Year": {
      EEE: [],
      CIVIL: [],
    },
    "2nd Year": {
      EEE: [
        {
          degree: "Diploma",
          department: "EEE",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "EE201",
          courseName: "Electrical Machines",
          credits: 3,
          color: "#f43f5e",
        },
      ],
      CIVIL: [
        {
          degree: "Diploma",
          department: "CIVIL",
          year: "2nd Year",
          semester: "Semester 3",
          courseCode: "CE201",
          courseName: "Structural Analysis",
          credits: 4,
          color: "#3b82f6",
        },
      ],
    },
    "3rd Year": {
      EEE: [],
      CIVIL: [],
    },
    "4th Year": {
      EEE: [],
      CIVIL: [],
    },
  },
};

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
    if (degree && year && department) {
      setCourses(mockCourses[degree]?.[year]?.[department] || []);
    } else {
      setCourses([]);
    }
  }, [degree, year, department]);

  const handleAddCourse = () => {
    const { degree: courseDegree, department: courseDepartment, year: courseYear } = newCourse;
    
    if (courseDegree && courseYear && courseDepartment && newCourse.courseCode && newCourse.courseName) {
      // Initialize nested structure if it doesn't exist
      if (!mockCourses[courseDegree]) {
        mockCourses[courseDegree] = {};
      }
      if (!mockCourses[courseDegree][courseYear]) {
        mockCourses[courseDegree][courseYear] = {};
      }
      if (!mockCourses[courseDegree][courseYear][courseDepartment]) {
        mockCourses[courseDegree][courseYear][courseDepartment] = [];
      }

      const courseData = { ...newCourse };

      if (isEditMode && editIndex !== null) {
        // For edit mode, update in the original location
        const originalCourses = mockCourses[degree]?.[year]?.[department] || [];
        const updated = [...originalCourses];
        updated[editIndex] = courseData;
        mockCourses[degree][year][department] = updated;
        
        // Update display if we're viewing the same category
        if (degree === courseDegree && year === courseYear && department === courseDepartment) {
          setCourses(updated);
        }
      } else {
        // For add mode, add to the selected degree/year/department
        const updatedCourses = [
          ...(mockCourses[courseDegree][courseYear][courseDepartment] || []),
          courseData,
        ];
        mockCourses[courseDegree][courseYear][courseDepartment] = updatedCourses;
        
        // Update display if we're viewing the same category
        if (degree === courseDegree && year === courseYear && department === courseDepartment) {
          setCourses(updatedCourses);
        }
      }

      setShowForm(false);
      setIsEditMode(false);
      setEditIndex(null);
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
    }
  };

  const handleDeleteCourse = (index) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updated = [...courses];
      updated.splice(index, 1);
      mockCourses[degree][year][department] = updated;
      setCourses(updated);
    }
  };

  const openAddForm = () => {
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
    setShowForm(true);
  };

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

        <div className="mb-4">
          <label className="block font-medium text-gray-600">
            Browse and manage available subjects for your selected degree, year
            and department.
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Degree</label>
            <select
              value={degree}
              onChange={(e) => {
                setDegree(e.target.value);
                setYear("");
                setDepartment("");
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Degree</option>
              {Object.keys(mockCourses).map((deg) => (
                <option key={deg} value={deg}>
                  {deg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setDepartment("");
              }}
              disabled={!degree}
              className="w-full p-2 border rounded-md disabled:opacity-50"
            >
              <option value="">Select Year</option>
              {degree &&
                Object.keys(mockCourses[degree]).map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!degree || !year}
              className="w-full p-2 border rounded-md disabled:opacity-50"
            >
              <option value="">Select Department</option>
              {degree &&
                year &&
                Object.keys(mockCourses[degree][year]).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {degree && year && department && (
          <>
            {courses.length === 0 ? (
              <p className="text-gray-500 mb-6">
                No subjects available for {department} in {degree} - {year}.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow overflow-hidden flex flex-col justify-between"
                    >
                      <div
                        className="h-40 flex items-center justify-center text-white text-center p-4"
                        style={{ backgroundColor: course.color }}
                      >
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
                  Above subjects are designed for students of {department} in{" "}
                  {degree} - {year}.
                </p>
              </>
            )}
          </>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode
                  ? `Update Subject`
                  : `Add New Subject`}
              </h2>
              <div className="grid gap-3">
                <div>
                  <label className="block font-medium mb-1">Degree</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newCourse.degree}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, degree: e.target.value, department: "", year: "" })
                    }
                  >
                    <option value="">Select Degree</option>
                    {Object.keys(mockCourses).map((deg) => (
                      <option key={deg} value={deg}>
                        {deg}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Year</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newCourse.year}
                    disabled={!newCourse.degree}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, year: e.target.value, department: "" })
                    }
                  >
                    <option value="">Select Year</option>
                    {newCourse.degree &&
                      Object.keys(mockCourses[newCourse.degree]).map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Department</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newCourse.department}
                    disabled={!newCourse.degree || !newCourse.year}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, department: e.target.value })
                    }
                  >
                    <option value="">Select Department</option>
                    {newCourse.degree &&
                      newCourse.year &&
                      Object.keys(mockCourses[newCourse.degree][newCourse.year]).map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g., CS101"
                    className="w-full border p-2 rounded"
                    value={newCourse.courseCode}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, courseCode: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Course Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Data Structures"
                    className="w-full border p-2 rounded"
                    value={newCourse.courseName}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, courseName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Semester</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newCourse.semester}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, semester: e.target.value })
                    }
                  >
                    <option value="">Select Semester</option>
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Credits</label>
                  <input
                    type="number"
                    placeholder="e.g., 4"
                    min="1"
                    max="6"
                    className="w-full border p-2 rounded"
                    value={newCourse.credits}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, credits: +e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Color</label>
                  <input
                    type="color"
                    className="w-full border p-1 rounded h-10"
                    value={newCourse.color}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, color: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditMode(false);
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={handleAddCourse}
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subject;