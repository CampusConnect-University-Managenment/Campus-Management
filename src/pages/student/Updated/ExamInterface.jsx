import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaClipboardCheck, FaGraduationCap } from "react-icons/fa";

export default function ExamInterface() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Performance Analytics",
      icon: <FaChartBar className="text-blue-600 text-4xl mb-2" />,
      path: "performance",
      description: "Visual analysis of your academic performance.",
    },
    {
      title: "Practice Exams",
      icon: <FaClipboardCheck className="text-green-600 text-4xl mb-2" />,
      path: "practice",
      description: "Take mock exams to practice and improve.",
    },
    {
      title: "Result Portal",
      icon: <FaGraduationCap className="text-purple-600 text-4xl mb-2" />,
      path: "result",
      description: "View and download your exam results.",
    },
  ];

  return (
    <div className="mt-[100px] pt-24 pb-36 px-6 bg-gray-100 font-inter">
      <h2 className="text-3xl font-bold text-center text-[#2e3a59] mb-12">
        🎓 Exam Dashboard
      </h2>

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
}
