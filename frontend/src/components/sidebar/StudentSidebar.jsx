import React from "react";
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import routes from "../../routes"; // or "../routes" depending on your file structure

export default function StudentSidebar() {
  const navigate = useNavigate();
  const studentRoutes = routes.filter((route) => route.layout === "/student");

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
        {studentRoutes.map((route, index) => (
          <li
            key={index}
            onClick={() => navigate(`/student/${route.path}`)}
            className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer hover:bg-white hover:text-blue-600 hover:shadow-md"
          >
            {route.icon}
            <span className="font-medium">{route.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
