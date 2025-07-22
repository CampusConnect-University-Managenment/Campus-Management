import React from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineUploadFile } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminExamInterface() {
  const location = useLocation();

  const cards = [
    {
      title: "Exam Schedule",
      description: "This section will handle uploading/viewing exam schedules.",
      icon: <BsCalendarEvent className="text-blue-600 text-4xl mb-2" />,
      path: "exam-schedule",
    },
    {
      title: "Marks Upload",
      description: "This section allows faculty to upload student marks.",
      icon: <MdOutlineUploadFile className="text-green-600 text-4xl mb-2" />,
      path: "marks-upload",
    },
  ];

  return (
    <div className="mt-[10px] pt-24 pb-36 px-6 bg-gray-100 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-12">
        📝 Exam Interface
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={index}
            className="cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 text-center"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        {location.pathname === "/admin/examinterface" ? (
          <p className="text-gray-500 text-center">Please select a section to continue.</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
