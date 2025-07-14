import React from "react";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  PlayCircle,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

const stats = [
  {
    id: 1,
    count: "12",
    title: "Total Courses",
    icon: <GraduationCap className="w-5 h-5 text-purple-800" />,
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    badge: "bg-white text-purple-700",
    text: "text-purple-900",
  },
  {
    id: 2,
    count: "22",
    title: "Completed Courses",
    icon: <CheckCircle className="w-5 h-5 text-green-800" />,
    bg: "bg-gradient-to-br from-green-100 to-green-200",
    badge: "bg-white text-green-700",
    text: "text-green-900",
  },
  {
    id: 3,
    count: "03",
    title: "In Progress Courses",
    icon: <Clock className="w-5 h-5 text-orange-800" />,
    bg: "bg-gradient-to-br from-orange-100 to-orange-200",
    badge: "bg-white text-orange-700",
    text: "text-orange-900",
  },
  {
    id: 4,
    count: "02",
    title: "Upcoming Live Courses",
    icon: <PlayCircle className="w-5 h-5 text-pink-800" />,
    bg: "bg-gradient-to-br from-pink-100 to-pink-200",
    badge: "bg-white text-pink-700",
    text: "text-pink-900",
  },
  {
    id: 5,
    count: "08",
    title: "Favorite Courses",
    icon: <Star className="w-5 h-5 text-yellow-700" />,
    bg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    badge: "bg-white text-yellow-700",
    text: "text-yellow-900",
  },
  {
    id: 6,
    count: "04",
    title: "Ongoing Projects",
    icon: <BookOpen className="w-5 h-5 text-blue-800" />,
    bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    badge: "bg-white text-blue-700",
    text: "text-blue-900",
  },
];

export default function CoursesOverview() {
  return (
    <div className="pt-24 px-10 pb-16 min-h-screen bg-gradient-to-tr from-[#f4f6ff] to-[#fbfbff]">
      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        📚 Course Summary
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.bg} ${stat.text} 
              rounded-2xl p-6 border shadow-md hover:shadow-xl 
              hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-4xl font-extrabold">{stat.count}</div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.badge}`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="text-lg font-semibold">{stat.title}</div>
            <div className="mt-2 text-sm text-blue-700 flex items-center gap-1 font-medium hover:underline">
              View Details <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
