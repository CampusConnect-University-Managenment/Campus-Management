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
    <div className="mt-[100px] min-h-screen bg-[#f0f4f8] px-4 py-10 font-inter">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-[#2e3a59] mb-8">
          📝 Practice Exams
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-[#f9fafb] border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all"
            >
              <div className="h-40 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-[#2e3a59]">{exam.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{exam.subject}</p>

              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  <span>{exam.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4 text-orange-500" />
                  <span>{exam.duration}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    exam.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : exam.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {exam.status}
                </span>
                {exam.status === "Available" && (
                  <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full hover:bg-indigo-700">
                    <PlayCircle className="w-4 h-4" />
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
