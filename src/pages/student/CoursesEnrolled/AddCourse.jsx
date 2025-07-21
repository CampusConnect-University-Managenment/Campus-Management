import React, { useState } from "react";

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

const AddCourses = ({ onBack }) => {
  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCheckboxChange = (code) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleSubmit = () => {
    const enrolled = dummyCourses.filter((course) => selectedCourses[course.code]);
    alert("Enrolled Courses:\n" + enrolled.map((c) => c.name).join(", "));
  };

  return (
    <div className="min-h-screen bg-[#f1f5ff] flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-[#112b5f] mb-6">
          Course Enrollment Form
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#007bff] text-white">
                <th className="px-6 py-3">Course Name</th>
                <th className="px-6 py-3">Course Code</th>
                <th className="px-6 py-3">Credits</th>
                <th className="px-6 py-3 text-center">Enroll</th>
              </tr>
            </thead>
            <tbody>
              {dummyCourses.map((course, index) => (
                <tr
                  key={course.code}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-6 py-3">{course.name}</td>
                  <td className="px-6 py-3">{course.code}</td>
                  <td className="px-6 py-3">{course.credit}</td>
                  <td className="px-6 py-3 text-center">
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
      </div>
    </div>
  );
};

export default AddCourses;
