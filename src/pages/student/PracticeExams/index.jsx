import React from "react";
import { Timer, PlayCircle, CalendarDays } from "lucide-react";

// Sample images (royalty-free from Freepik or StorySet)
const examImages = [
  "https://storyset.com/images/illustrations/education-pana.svg", // Data Structures
  "https://storyset.com/images/illustrations/online-test-rafiki.svg", // DBMS
  "https://storyset.com/images/illustrations/grades-pana.svg", // OS Quiz
];
const exams = [
  {
    id: 1,
    title: "Data Structures Mock Test",
    subject: "Computer Science",
    date: "Jul 18, 2025",
    duration: "60 mins",
    status: "Available",
    image: examImages[0],
  },
  {
    id: 2,
    title: "DBMS Practice Exam",
    subject: "Information Systems",
    date: "Jul 21, 2025",
    duration: "90 mins",
    status: "Upcoming",
    image: examImages[1],
  },
  {
    id: 3,
    title: "Operating Systems Quiz",
    subject: "Computer Engineering",
    date: "Jul 25, 2025",
    duration: "45 mins",
    status: "Completed",
    image: examImages[2],
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
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Image Section */}
            <div className="w-full h-48 bg-gray-100">
              <img
                src={exam.image}
                alt={exam.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {exam.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{exam.subject}</p>

                <div className="flex items-center text-sm text-gray-600 gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-blue-500" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4 text-orange-500" />
                    <span>{exam.duration}</span>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center mt-6">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    exam.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : exam.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-500"
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
