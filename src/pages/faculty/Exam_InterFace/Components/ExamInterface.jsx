import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaBookOpen, FaClipboardList, FaClipboard } from "react-icons/fa";

const CourseInterface = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Question Paper",
      description: "Browse or download uploaded question papers.",
      icon: <FaFilePdf className="text-green-500 text-4xl mb-4" />,
      path: "/faculty/ExamInterFace/view-question",
    },
    {
      title: "Study Material",
      description: "Access and read available study materials.",
      icon: <FaBookOpen className="text-blue-500 text-4xl mb-4" />,
      path: "/faculty/ExamInterFace/view-material",
    },
    {
      title: "Assignment",
      description: "View or download student assignments.",
      icon: <FaClipboardList className="text-purple-500 text-4xl mb-4" />,
      path: "/faculty/ExamInterFace/view-assignment",
    },
    {
      title: "Upload Marks",
      description: "Manually enter marks for your students.",
      icon: <FaClipboard className="text-indigo-600 text-4xl mb-4" />,
      path: "/faculty/ExamInterFace/upload-marks",
    },
  ];

  return (
    <div className="mt-[100px] min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-10">
          <FaBookOpen className="text-indigo-600 text-3xl" />
          Course Interface
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-6 cursor-pointer border border-gray-100"
            >
              <div className="flex flex-col items-center">
                {card.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseInterface;
