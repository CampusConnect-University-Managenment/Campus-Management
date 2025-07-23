import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaClipboardList,
  FaFileUpload,
  FaBookOpen,
  FaEye,
  FaTasks,
} from "react-icons/fa";

const Interface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popupMessage, setPopupMessage] = useState("");

  // Show popup when navigated with courseName from FacultyCourses
  useEffect(() => {
    if (location.state?.showPopup && location.state.courseName) {
      setPopupMessage(`📤 Upload materials for "${location.state.courseName}"`);
      // Optional: Clear browser history state so popup doesn’t reappear on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const cards = [
    {
      title: "Upload Question Paper",
      path: "/faculty/ExamInterFace/upload-question",
      icon: <FaFileUpload className="text-green-600 text-4xl mb-2" />,
      description: "Upload exam question papers as PDF or Word files.",
    },
    {
      title: "Upload Study Material",
      path: "/faculty/ExamInterFace/upload-material",
      icon: <FaBookOpen className="text-blue-600 text-4xl mb-2" />,
      description: "Provide notes, slides, or reference material.",
    },
    {
      title: "Upload Assignment",
      path: "/faculty/ExamInterFace/upload-assignment",
      icon: <FaTasks className="text-orange-500 text-4xl mb-2" />,
      description: "Upload assignments for students to complete.",
    },
    {
      title: "View Question Paper",
      path: "/faculty/ExamInterFace/view-question",
      icon: <FaEye className="text-green-500 text-4xl mb-2" />,
      description: "Browse or download uploaded question papers.",
    },
    {
      title: "View Study Material",
      path: "/faculty/ExamInterFace/view-material",
      icon: <FaEye className="text-blue-500 text-4xl mb-2" />,
      description: "Access and read available study materials.",
    },
    {
      title: "View Assignment",
      path: "/faculty/ExamInterFace/view-assignment",
      icon: <FaTasks className="text-purple-500 text-4xl mb-2" />,
      description: "View or download student assignments.",
    },
    {
      title: "Upload internal Marks",
      path: "/faculty/ExamInterFace/upload-marks",
      icon: <FaClipboardList className="text-indigo-600 text-4xl mb-2" />,
      description: "Manually enter marks for your students.",
    },
  ];

  return (
    <div className="mt-[10px] pt-24 pb-36 px-6 bg-gray-100 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-6">
        📚 Exam Upload Interface
      </h2>

      {popupMessage && (
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded shadow text-center">
            {popupMessage}
          </div>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 text-center"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interface;
