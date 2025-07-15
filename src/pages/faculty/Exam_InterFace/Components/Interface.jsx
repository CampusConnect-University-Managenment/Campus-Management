import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaFileUpload, FaBookOpen } from "react-icons/fa";

const Interface = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Upload Marks",
      path: "/faculty/ExamInterFace/upload-marks",
      icon: <FaClipboardList className="text-indigo-600 text-4xl mb-2" />,
      description: "Manually enter marks for your students.",
    },
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
  ];

  return (
    <div className="mt-[100px]  pt-24 pb-36 px-6 bg-gray-100 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-12">
        📚 Exam Upload Interface
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 text-center"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interface;
