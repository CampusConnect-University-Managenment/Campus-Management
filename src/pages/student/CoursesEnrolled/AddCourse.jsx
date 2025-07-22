import React, { useEffect, useState } from "react";

const dummyCourses = [
  { name: "HTML & CSS Fundamentals", code: "FS101", credit: 3 },
  { name: "JavaScript & ES6", code: "FS102", credit: 3 },
  { name: "ReactJS", code: "FS103", credit: 4 },
  { name: "NodeJS & ExpressJS", code: "FS104", credit: 4 },
  { name: "MongoDB", code: "FS105", credit: 3 },
  { name: "REST API Development", code: "FS106", credit: 3 },
  { name: "Git & GitHub", code: "FS107", credit: 2 },
  { name: "Deployment with Heroku/Vercel", code: "FS108", credit: 2 },
];

// Static semester number (you can later integrate with backend)
const SEMESTER_NO = 5;

const AddCourse = ({ onBack }) => {
  const [selectedCourses, setSelectedCourses] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Check if the student has already enrolled for this semester
    const enrolled = localStorage.getItem(`enrolled_semester_${SEMESTER_NO}`);
    if (enrolled) {
      setIsEnrolled(true);
    }
  }, []);

  const handleCheckboxChange = (code) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleSubmit = () => {
    const enrolled = dummyCourses.filter((course) => selectedCourses[course.code]);
    if (enrolled.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    localStorage.setItem(`enrolled_semester_${SEMESTER_NO}`, "true");
    setIsEnrolled(true);

    alert("Enrolled Courses:\n" + enrolled.map((c) => c.name).join(", "));
  };

  const handleResetDemo = () => {
    localStorage.removeItem(`enrolled_semester_${SEMESTER_NO}`);
    setIsEnrolled(false);
    setSelectedCourses({});
  };

  return (
    <div className="min-h-screen bg-[#f1f5ff] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">
        {/* Header with Semester info */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#112b5f]">
            Course Enrollment Form
          </h2>
          <span className="text-md text-gray-700 font-medium">
            Semester: <span className="font-bold text-[#112b5f]">{SEMESTER_NO}</span>
          </span>
        </div>

        {isEnrolled ? (
          <div className="text-center text-red-600 font-semibold mb-6">
            ⚠️ You have already enrolled for Semester {SEMESTER_NO}.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#007bff] text-white">
                    <th className="px-4 py-3">S.No</th>
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3">Course Code</th>
                    <th className="px-4 py-3">Credits</th>
                    <th className="px-4 py-3 text-center">Enroll</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCourses.map((course, index) => (
                    <tr
                      key={course.code}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{course.name}</td>
                      <td className="px-4 py-3">{course.code}</td>
                      <td className="px-4 py-3">{course.credit}</td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedCourses[course.code] || false}
                          onChange={() => handleCheckboxChange(course.code)}
                          className="w-4 h-4"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={onBack}
                className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#007bff] text-white rounded hover:bg-[#0e224d] transition"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {/* Reset Demo Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleResetDemo}
            className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            🔁 Reset Demo (Clear Enrollment)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
