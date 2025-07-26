import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

function FacultyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = [
        {
          code: "MLT401",
          name: "Machine Learning Techniques",
          color: "bg-purple-100 text-purple-900",
        },
        {
          code: "AI501",
          name: "Artificial Intelligence with Prompt Engineering",
          color: "bg-blue-100 text-blue-900",
        },
        {
          code: "DBMS301",
          name: "Database Management Systems",
          color: "bg-green-100 text-green-900",
        },
      ];
      setMyCourses(response);
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-8 mt-20">
      <h1 className="text-4xl font-bold text-blue-700 flex items-center gap-2 mb-8">
        📘 My Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.code}
            className={`rounded-2xl shadow-md p-6 ${course.color} transition-all duration-200`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold">{course.name}</h2>
              <div className="bg-white p-2 rounded-full shadow">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/faculty/ExamInterFace/view-material", {
                  state: {
                    showPopup: true,
                    courseName: course.name,
                  },
                })
              }
              className="mt-4 text-blue-700 text-sm font-medium hover:underline"
            >
              Upload or Edit →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyCourses;
