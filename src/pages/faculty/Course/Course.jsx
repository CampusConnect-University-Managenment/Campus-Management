import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated data – replace with actual fetch if needed
    const fetchCourses = async () => {
      const response = [
        {
          code: "DBMS301",
          name: "Database Management Systems",
          faculty: "Dr. Priya Singh",
          color: "bg-green-200",
        },
        {
          code: "CN501",
          name: "Computer Networks",
          faculty: "Dr. Priya Singh",
          color: "bg-yellow-200",
        },
      ];
      setMyCourses(response);
    };

    fetchCourses();
  }, []);

  const handleUpload = (course) => {
    navigate("/faculty/examinterface", {
      state: { showPopup: true, courseName: course.name },
    });
  };

  const handleEdit = async (course) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/faculty/course/${course.code}`
      );

      if (!res.ok) {
        throw new Error("Course not found or server error");
      }

      const data = await res.json();
      alert(`📝 Edit Course: ${data.name}`);
      // You can replace this with modal later
    } catch (error) {
      alert("❌ Server not yet connected or course not found");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">👩‍🏫 My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.code}
            className={`rounded-xl shadow-md p-5 ${course.color} flex flex-col justify-between`}
          >
            <div>
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-sm mt-1">👨‍🏫 {course.faculty}</p>
              <p className="text-xs text-gray-600 mt-1">
                Course Code: {course.code}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleUpload(course)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Upload
              </button>
              <button
                onClick={() => handleEdit(course)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyCourses;
