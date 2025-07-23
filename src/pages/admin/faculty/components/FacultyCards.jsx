import React from "react";
import { BarChart3, Users, CalendarDays, Building2 } from "lucide-react";


const FacultyCards = ({ data, attendanceData })  => {
  const totalFaculty = data.length;
  const totalDepartments = new Set(data.map(f => f.department)).size;
  const totalDays = 30;
const calculateAttendancePercentage = (facultyId) => {
    const records = attendanceData[facultyId];
    if (!records) return 0;
    const totalDays = Object.keys(records).length || 1;
    const presentDays = Object.values(records).filter(
      (status) => status.toLowerCase() === 'present'
    ).length;
    return (presentDays / totalDays) * 100;
  };
  // Compute average attendance dynamically
  const avgAttendance = Math.round(
    data.reduce((sum, f) => sum + (f.attendance || 0), 0) / totalFaculty || 0
  );

  const cards = [
    {
      title: "Total Faculty",
      value: totalFaculty,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Average Attendance",
      value: `${avgAttendance}%`,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Total Days",
      value: totalDays,
      icon: <CalendarDays className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`flex items-center justify-between gap-4 p-4 rounded-2xl shadow-md transition-transform transform hover:scale-[1.03] ${card.color} text-white`}
        >
          <div>
            <h3 className="text-sm font-medium">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
          {card.icon}
        </div>
      ))}
    </div>
  );
};

export default FacultyCards;
