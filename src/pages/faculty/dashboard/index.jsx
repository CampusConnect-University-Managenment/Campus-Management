import React from 'react';
import { BookOpen, Users, ClipboardCheck, Calendar } from 'lucide-react';

function FacultyDashboard() {
  const stats = [
    { title: "Total Students", count: 120, icon: <Users size={28} />, color: "bg-blue-100 text-blue-600" },
    { title: "Classes Taken", count: 32, icon: <BookOpen size={28} />, color: "bg-green-100 text-green-600" },
    { title: "Attendance Uploaded", count: 28, icon: <ClipboardCheck size={28} />, color: "bg-yellow-100 text-yellow-600" },
    { title: "Upcoming Classes", count: 3, icon: <Calendar size={28} />, color: "bg-purple-100 text-purple-600" },
  ];

  const handleNavigate = (target) => {
    alert(`Navigate to ${target}`);
    // You can integrate React Router here
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, Professor!</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 flex items-center gap-4 shadow hover:shadow-lg transition ${stat.color}`}
          >
            <div className="p-2 rounded-full bg-white">{stat.icon}</div>
            <div>
              <p className="text-sm">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
   
    </div>
  );
}

export default FacultyDashboard;
