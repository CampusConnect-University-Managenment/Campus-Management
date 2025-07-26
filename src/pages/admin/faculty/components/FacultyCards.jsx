import React from "react";
import { Users, CalendarDays, Building2 } from "lucide-react";

const FacultyCards = ({ data }) => {
  const totalFaculty = data.length;
  const totalDepartments = new Set(data.map(f => f.department)).size;
  const totalDays = 30;

  const cards = [
    {
      title: "Total Faculty",
      value: totalFaculty,
      icon: <Users className="w-8 h-8" />,
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Total Days",
      value: totalDays,
      icon: <CalendarDays className="w-8 h-8" />,
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <Building2 className="w-8 h-8" />,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-xl p-5 text-white ${card.gradient} shadow-lg hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-md font-semibold mb-1">{card.title}</h2>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-xs mt-1 text-white/80">Academic stats</p>
            </div>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyCards;