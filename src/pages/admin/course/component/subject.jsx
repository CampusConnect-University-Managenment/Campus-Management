import React, { useState } from "react";

const mockCourses = {
  BSc: {
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
  BE: {
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
  BCA: {
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
  Diploma: {
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
};

function Courses() {
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    subtitle: "",
    category: department,
    description: "",
    instructor: "",
    students: 0,
    lessons: 0,
    color: "#0284c7",
    image: "",
  });

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    setDepartment("");
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleAddCourse = () => {
    if (degree && department) {
      const courseData = { ...newCourse, category: department };
      mockCourses[degree][department].push(courseData);
      setShowForm(false);
      setNewCourse({
        title: "",
        subtitle: "",
        category: department,
        description: "",
        instructor: "",
        students: 0,
        lessons: 0,
        color: "#0284c7",
        image: "",
      });
    }
  };

  const courseList =
    degree && department ? mockCourses[degree]?.[department] || [] : [];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Courses
      </h1>

      <p className="text-gray-600 text-center text-sm mt-2">
        <label className="block font-medium mb-1">
          Browse and manage available courses for your selected degree and
          department.
        </label>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Degree</label>
          <select
            value={degree}
            onChange={handleDegreeChange}
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
          <label className="block font-medium mb-1">Department</label>
          <select
            value={department}
            onChange={handleDepartmentChange}
            disabled={!degree}
            className="w-full p-2 border rounded-md disabled:opacity-50"
          >
            <option value="">Select Department</option>
            {degree &&
              Object.keys(mockCourses[degree]).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
          </select>
        </div>
      </div>

      {courseList.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => setShowForm(true)}
          >
            Add
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courseList.map((course, index) => (
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
                <h5 className="font-semibold mb-2">{course.description}</h5>
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
                <button className="w-full bg-red-600 text-white text-sm py-2 rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {degree && department && courseList.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No courses available for {degree} - {department}
        </p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
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
