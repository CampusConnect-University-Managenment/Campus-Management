import React, { useState, useEffect } from "react";

const mockCourses = {
  BSc: {
    "1st Year": {
      CSE: [
        {
          title: "Data Structures",
          subtitle: "Master Data Structures",
          category: "CSE",
          description: "Learn core data structure skills",
          instructor: "Paul C. Deleon",
          students: 80,
          lessons: 12,
          color: "#0284c7",
          image: "https://randomuser.me/api/portraits/men/50.jpg",
        },
      ],
      IT: [
        {
          title: "Web Development",
          subtitle: "Modern Web Apps",
          category: "IT",
          description: "Build and deploy full-stack apps",
          instructor: "John Doe",
          students: 90,
          lessons: 14,
          color: "#f97316",
          image: "https://randomuser.me/api/portraits/men/30.jpg",
        },
      ],
    },
    "2nd Year": {
      CSE: [
        {
          title: "DBMS",
          subtitle: "Database Systems",
          category: "CSE",
          description: "Relational databases & SQL",
          instructor: "Sarah Lee",
          students: 95,
          lessons: 10,
          color: "#7c3aed",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
      ],
      IT: [
        {
          title: "Cloud Computing",
          subtitle: "AWS & Azure Fundamentals",
          category: "IT",
          description: "Cloud basics and services overview",
          instructor: "Emily Stone",
          students: 75,
          lessons: 8,
          color: "#16a34a",
          image: "https://randomuser.me/api/portraits/women/53.jpg",
        },
      ],
    },
    "3rd Year": {
      CSE: [
        {
          title: "Spring Boot",
          subtitle: "Java + Spring",
          category: "CSE",
          description: "Build scalable backend APIs",
          instructor: "David Kim",
          students: 85,
          lessons: 15,
          color: "#f59e0b",
          image: "https://randomuser.me/api/portraits/men/71.jpg",
        },
      ],
      IT: [
        {
          title: "MERN Stack",
          subtitle: "Mongo, Express, React, Node",
          category: "IT",
          description: "Build real-world MERN apps",
          instructor: "Kevin Tran",
          students: 110,
          lessons: 18,
          color: "#8b5cf6",
          image: "https://randomuser.me/api/portraits/men/35.jpg",
        },
      ],
    },
    "4th Year": {
      CSE: [
        {
          title: "Full Stack Development",
          subtitle: "Frontend to Backend",
          category: "CSE",
          description: "Master React, Node, and more",
          instructor: "Lisa M.",
          students: 100,
          lessons: 20,
          color: "#22c55e",
          image: "https://randomuser.me/api/portraits/women/45.jpg",
        },
      ],
      IT: [
        {
          title: "DSA with Java",
          subtitle: "Crack Coding Interviews",
          category: "IT",
          description: "Master algorithms and problem solving",
          instructor: "Aditi Sharma",
          students: 130,
          lessons: 22,
          color: "#ec4899",
          image: "https://randomuser.me/api/portraits/women/40.jpg",
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
          title: "Thermodynamics",
          subtitle: "Heat & Energy Concepts",
          category: "MECH",
          description: "Dive into mechanical energy systems",
          instructor: "Alex M.",
          students: 60,
          lessons: 11,
          color: "#e11d48",
          image: "https://randomuser.me/api/portraits/men/65.jpg",
        },
      ],
      ECE: [
        {
          title: "Signal Processing",
          subtitle: "DSP Fundamentals",
          category: "ECE",
          description: "Digital signal processing for beginners",
          instructor: "Maya R.",
          students: 70,
          lessons: 9,
          color: "#6366f1",
          image: "https://randomuser.me/api/portraits/women/51.jpg",
        },
      ],
    },
    "3rd Year": {
      MECH: [
        {
          title: "Manufacturing Process",
          subtitle: "Tool & Tech",
          category: "MECH",
          description: "Learn about machining & production",
          instructor: "Priya R.",
          students: 45,
          lessons: 9,
          color: "#facc15",
          image: "https://randomuser.me/api/portraits/women/25.jpg",
        },
      ],
      ECE: [
        {
          title: "Analog Circuits",
          subtitle: "Circuits & Components",
          category: "ECE",
          description: "Basics of amplifiers and diodes",
          instructor: "Nikhil A.",
          students: 55,
          lessons: 7,
          color: "#06b6d4",
          image: "https://randomuser.me/api/portraits/men/66.jpg",
        },
      ],
    },
    "4th Year": {
      MECH: [
        {
          title: "CAD/CAM",
          subtitle: "Design & Manufacturing",
          category: "MECH",
          description: "Hands-on with AutoCAD and SolidWorks",
          instructor: "Arjun Singh",
          students: 50,
          lessons: 10,
          color: "#0ea5e9",
          image: "https://randomuser.me/api/portraits/men/58.jpg",
        },
      ],
      ECE: [
        {
          title: "Embedded Systems",
          subtitle: "Microcontrollers & IoT",
          category: "ECE",
          description: "Code real-world embedded applications",
          instructor: "Ritika Das",
          students: 65,
          lessons: 12,
          color: "#10b981",
          image: "https://randomuser.me/api/portraits/women/48.jpg",
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
          title: "Python Programming",
          subtitle: "Beginner to Advanced",
          category: "CS",
          description: "Master Python with projects",
          instructor: "Sameer K.",
          students: 100,
          lessons: 16,
          color: "#0d9488",
          image: "https://randomuser.me/api/portraits/men/37.jpg",
        },
      ],
      DS: [
        {
          title: "Data Science Basics",
          subtitle: "Stats + ML Intro",
          category: "DS",
          description: "Learn NumPy, Pandas, and scikit-learn",
          instructor: "Anjali Roy",
          students: 90,
          lessons: 14,
          color: "#7e22ce",
          image: "https://randomuser.me/api/portraits/women/38.jpg",
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
          title: "Electrical Machines",
          subtitle: "DC & AC Machines",
          category: "EEE",
          description: "Learn transformers and motors",
          instructor: "Sundar V.",
          students: 60,
          lessons: 9,
          color: "#f43f5e",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
        },
      ],
      CIVIL: [
        {
          title: "Structural Analysis",
          subtitle: "Beams & Trusses",
          category: "CIVIL",
          description: "Analyze construction forces",
          instructor: "Divya P.",
          students: 75,
          lessons: 10,
          color: "#3b82f6",
          image: "https://randomuser.me/api/portraits/women/47.jpg",
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

function Courses() {
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    instructor: "",
    students: 0,
    lessons: 0,
    color: "#0284c7",
    image: "",
  });

  useEffect(() => {
    if (degree && year && department) {
      setCourses(mockCourses[degree]?.[year]?.[department] || []);
    } else {
      setCourses([]);
    }
  }, [degree, year, department]);

  const handleAddCourse = () => {
    if (degree && year && department) {
      const courseData = { ...newCourse, category: department };
      const updatedCourses = [
        ...(mockCourses[degree][year][department] || []),
        courseData,
      ];
      mockCourses[degree][year][department] = updatedCourses;
      setCourses(updatedCourses);
      setShowForm(false);
      setNewCourse({
        title: "",
        subtitle: "",
        category: "",
        description: "",
        instructor: "",
        students: 0,
        lessons: 0,
        color: "#0284c7",
        image: "",
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

  return (
    <div className="max-w-7xl mx-auto mt-24">
      <div className="text-left text-gray-800 mt-4 mb-6 flex items-center gap-2">
        <span className="text-3xl">📚</span>
        <h1 className="text-3xl font-bold">Courses</h1>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-600">
          Browse and manage available courses for your selected degree, year and
          department.
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{department}</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setShowForm(true)}
            >
              + Add Course
            </button>
          </div>

          {courses.length === 0 ? (
            <p className="text-gray-500 mb-6">
              No courses available for {department} in {degree} - {year}.
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
                      className="h-40 flex items-center justify-center text-white text-center"
                      style={{ backgroundColor: course.color }}
                    >
                      <div>
                        <h4 className="font-bold text-lg">{course.title}</h4>
                        <p>{course.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block border border-blue-500 text-blue-500 text-xs px-2 py-1 rounded mb-2">
                          {course.category}
                        </span>
                        <h5 className="font-semibold mb-2">
                          {course.description}
                        </h5>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={course.image}
                            alt={course.instructor}
                            className="w-8 h-8 rounded-full"
                          />
                          <p className="text-sm">{course.instructor}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 border-t pt-2 mt-2">
                          <div className="flex items-center gap-1">
                            📘 <span>{course.lessons} Lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            👥 <span>{course.students} Students</span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => handleDeleteCourse(index)}
                          className="w-full bg-red-600 text-white text-sm py-2 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Above courses are designed to help students of {department} in{" "}
                {degree} - {year} gain practical skills.
              </p>
            </>
          )}
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              Add New Course for {department}
            </h2>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Course Title"
                className="border p-2 rounded"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Subtitle"
                className="border p-2 rounded"
                value={newCourse.subtitle}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, subtitle: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Instructor"
                className="border p-2 rounded"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, instructor: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Students"
                className="border p-2 rounded"
                value={newCourse.students}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, students: +e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Lessons"
                className="border p-2 rounded"
                value={newCourse.lessons}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, lessons: +e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="border p-2 rounded"
                value={newCourse.image}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, image: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddCourse}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
