import React from "react";
import {
  FaUniversity,
  FaUser,
  FaBookOpen,
  FaClipboardCheck,
  FaGraduationCap,
  FaChartBar,
  FaBell,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function StudentSidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-72 bg-gray-100 text-gray-800 shadow-lg rounded-tr-3xl rounded-br-3xl p-8 flex flex-col z-50">
      {/* Logo + Title */}
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-white rounded-full p-3 shadow-md">
          <FaUniversity className="text-3xl text-blue-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-blue-600 whitespace-nowrap">
          Academix
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 text-base flex-1">
        {[
          { icon: MdDashboard, label: "Dashboard" },
          { icon: FaUser, label: "Profile" },
          { icon: FaBookOpen, label: "Courses Enrolled" },
          { icon: FaClipboardCheck, label: "Practice Exams" },
          { icon: FaGraduationCap, label: "Results Portal" },
          { icon: FaChartBar, label: "Performance Analytics" },
          { icon: FaBell, label: "Notifications" },
          { icon: FaQuestionCircle, label: "Help & Support" },
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer
              hover:bg-white hover:text-blue-600 hover:shadow-md"
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
