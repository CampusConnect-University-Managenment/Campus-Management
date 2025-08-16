// import React, { useState } from "react";
// import FacultyCalendar from "./FacultyCalendar";
// import {
//   Library,
//   LayoutGrid,
//   GraduationCap,
//   Building2,
// } from "lucide-react";

// // Reusable Card Component
// const Card = ({ title, value, icon }) => (
//   <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
//     <div className="mb-2">{icon}</div>
//     <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
//     <p className="text-lg font-bold text-gray-900">{value}</p>
//   </div>
// );

// const FacultyDashboard = () => {
//   return (
//     <div className="p-6 mt-20 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">
//         Welcome back, Professor! 👋
//       </h1>

//       {/* Stats Cards + Profile Card */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//         <Card
//           title="Courses Handling"
//           value="05"
//           icon={<Library size={24} className="text-blue-600" />}
//         />
//         <Card
//           title="Total Classes"
//           value="12"
//           icon={<LayoutGrid size={24} className="text-purple-600" />}
//         />
//         <Card
//           title="Total Students"
//           value="340"
//           icon={<GraduationCap size={24} className="text-green-600" />}
//         />
//         <Card
//           title="Dept Handling"
//           value="6"
//           icon={<Building2 size={24} className="text-teal-600" />}
//         />

//         {/* Compact Profile Card */}
//         <div className="bg-gradient-to-tr from-blue-100 via-white to-purple-100 rounded-xl shadow p-4 flex flex-col items-center text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="Faculty"
//             className="w-12 h-12 rounded-full border border-gray-300 mb-2"
//           />
//           <h3 className="text-sm font-semibold text-gray-800">Dr. Ashokkumar</h3>
//           <p className="text-xs text-gray-600">Asst. Professor, CSE</p>
//           <p className="text-xs text-gray-400">ID: FAC1234</p>
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white shadow rounded-xl p-6 lg:col-span-3">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Faculty Calendar</h2>
//           <FacultyCalendar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacultyDashboard;
import React, { useState, useEffect } from "react";
import FacultyCalendar from "./FacultyCalendar";
import { Library, LayoutGrid, GraduationCap, Building2 } from "lucide-react";
import axios from "axios";

// Reusable Card Component
const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const facultyCode = localStorage.getItem("facultyCode");
        if (!facultyCode) {
          console.error("No faculty code found in localStorage");
          setLoading(false);
          return;
        }

        // Fetch faculty data from Mongo via backend
        const res = await axios.get(
          `http://localhost:8080/api/admin/faculty/${facultyCode}`
        );
        setFaculty(res.data);
      } catch (err) {
        console.error("Error fetching faculty details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyDetails();
  }, []);

  if (loading) {
    return (
      <div className="p-6 mt-20 max-w-6xl mx-auto">
        <p>Loading faculty dashboard...</p>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="p-6 mt-20 max-w-6xl mx-auto">
        <p>No faculty data found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Welcome back, {faculty.firstName} 👋
      </h1>

      {/* Stats Cards + Profile Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <Card
          title="Courses Handling"
          value={faculty.coursesHandling?.length || "0"}
          icon={<Library size={24} className="text-blue-600" />}
        />
        <Card
          title="Total Classes"
          value={faculty.totalClasses || "0"}
          icon={<LayoutGrid size={24} className="text-purple-600" />}
        />
        <Card
          title="Total Students"
          value={faculty.totalStudents || "0"}
          icon={<GraduationCap size={24} className="text-green-600" />}
        />
        <Card
          title="Dept Handling"
          value={faculty.department || "N/A"}
          icon={<Building2 size={24} className="text-teal-600" />}
        />

        {/* Compact Profile Card */}
        <div className="bg-gradient-to-tr from-blue-100 via-white to-purple-100 rounded-xl shadow p-4 flex flex-col items-center text-center">
          <img
            src={
              faculty.photo
                ? `data:image/jpeg;base64,${faculty.photo}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Faculty"
            className="w-12 h-12 rounded-full border border-gray-300 mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-800">
            {faculty.firstName} {faculty.lastName}
          </h3>
          <p className="text-xs text-gray-600">
            {faculty.role}, {faculty.department}
          </p>
          <p className="text-xs text-gray-400">
            ID: {faculty.facultyCode}
          </p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Faculty Calendar
          </h2>
          <FacultyCalendar />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
