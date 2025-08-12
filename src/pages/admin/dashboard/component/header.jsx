import React, { useState, useEffect } from "react";
import TotalOverview from "./totaloverview.jsx";
import AcademicCalendar from "./academicCalendar.jsx";

const Header = () => {
  const [adminCode, setAdminCode] = useState(null);
  const [adminData, setAdminData] = useState(null);

  // Step 1: Get adminCode from localStorage
  useEffect(() => {
    const storedAdminCode = localStorage.getItem("adminCode");
    if (storedAdminCode) {
      setAdminCode(storedAdminCode);
    }
  }, []);

  // Step 2: Fetch admin details
  useEffect(() => {
    if (!adminCode) return;

    const fetchAdmin = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/admin/${adminCode}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Admin not found");

        const json = await res.json();
        setAdminData(json); // ✅ Use full object directly
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchAdmin();
  }, [adminCode]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-24">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Hello, {adminData?.firstName
            ? `${adminData.firstName} ${adminData.middleName ? adminData.middleName + " " : ""}${adminData.lastName}`
            : "Admin"}
        </h1>
        <p className="text-gray-600 text-lg mt-1 font-medium">
          Welcome back to your campus dashboard. Here's what's happening today.
        </p>
       
      </div>

      {/* People Overview */}
      <TotalOverview />

      {/* Attendance Chart */}
      <AcademicCalendar />
    </div>
  );
};

export default Header;
