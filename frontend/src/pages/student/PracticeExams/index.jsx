import React from "react";
import { Timer, PlayCircle, CalendarDays } from "lucide-react";
import AmicoImg from "../../../assets/images/Online test-amico.png";
import RafikiImg from "../../../assets/images/Online test-rafiki.png";
import Exams from "../../../assets/images/Exams-bro.png";

const exams = [
  {
    id: 1,
    title: "Data Structures Mock Test",
    subject: "Computer Science",
    date: "Jul 18, 2025",
    duration: "60 mins",
    status: "Available",
    image: AmicoImg,
  },
  {
    id: 2,
    title: "DBMS Practice Exam",
    subject: "Information Systems",
    date: "Jul 21, 2025",
    duration: "90 mins",
    status: "Upcoming",
    image: RafikiImg,
  },
  {
    id: 3,
    title: "Operating Systems Quiz",
    subject: "Computer Engineering",
    date: "Jul 25, 2025",
    duration: "45 mins",
    status: "Completed",
    image: Exams,
  },
];

export default function PracticeExam() {
  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#ffffff]">
      <h1 className="text-4xl font-bold text-blue-600 mb-12">
        📝 Practice Exams
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                       text-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 
                       border border-gray-700 overflow-hidden"
          >
            {/* 📦 Image Box */}
            <div className="w-full flex justify-center items-center p-4">
              <div className="w-full h-52 bg-white rounded-2xl shadow-md overflow-hidden flex items-center justify-center">
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="object-contain h-full w-full"
                />
              </div>
            </div>

            {/* 📄 Content Section */}
            <div className="px-6 pb-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {exam.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">{exam.subject}</p>

                <div className="flex items-center text-sm text-gray-300 gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-blue-400" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4 text-orange-400" />
                    <span>{exam.duration}</span>
                  </div>
                </div>
              </div>

              {/* 🔘 Footer Section */}
              <div className="flex justify-between items-center mt-6">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    exam.status === "Available"
                      ? "bg-green-200 text-green-900"
                      : exam.status === "Upcoming"
                      ? "bg-yellow-200 text-yellow-900"
                      : "bg-gray-400 text-gray-900"
                  }`}
                >
                  {exam.status}
                </span>

                {exam.status === "Available" && (
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium">
                    <PlayCircle className="w-4 h-4" />
                    Start
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
