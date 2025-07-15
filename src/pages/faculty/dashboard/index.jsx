import React from 'react';
import {
  BookOpen, Users, ClipboardCheck, Calendar, ArrowRightCircle,
  LayoutDashboard, FileText, Megaphone, GraduationCap, UserCircle
} from 'lucide-react';

function FacultyDashboard() {
  const stats = [
    { title: "Total Students", count: 120, icon: <Users size={28} />, color: "bg-blue-100 text-blue-600" },
    { title: "Classes Taken", count: 32, icon: <BookOpen size={28} />, color: "bg-green-100 text-green-600" },
    { title: "Attendance Uploaded", count: 28, icon: <ClipboardCheck size={28} />, color: "bg-yellow-100 text-yellow-600" },
    { title: "Upcoming Classes", count: 3, icon: <Calendar size={28} />, color: "bg-purple-100 text-purple-600" },
  ];

  const actions = [
  {
    label: "Upload Attendance",
    icon: <ClipboardCheck size={32} />,
    color: "bg-indigo-600",
    target: "attendance"
  },
  {
    label: "Upload Internal Marks",
    icon: <FileText size={32} />,
    color: "bg-pink-600",
    target: "marks"
  },
  {
    label: "View Student List",
    icon: <Users size={32} />,
    color: "bg-teal-600",
    target: "students"
  },
  {
    label: "Make Announcements",
    icon: <LayoutDashboard size={32} />,
    color: "bg-orange-600",
    target: "announcements"
  }
];


  const announcements = [
    { title: "Exam Timetable Released", date: "July 10, 2025" },
    { title: "Assignment Submission Deadline Extended", date: "July 8, 2025" },
    { title: "Project Viva Next Week", date: "July 6, 2025" }
  ];

  const handleNavigate = (target) => {
    alert(`Navigate to ${target}`);
    // Use navigate(`/faculty/${target}`) if using React Router
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Welcome, Professor 👋</h1>
          <p className="text-gray-500 mt-1">Here's a quick overview of your dashboard.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl shadow">
          <UserCircle size={40} className="text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Dr. A. Suresh</p>
            <p className="text-sm text-gray-500">Computer Science Department</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-md hover:shadow-xl cursor-pointer transition-all ${stat.color}`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow">{stat.icon}</div>
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
<h2 className="text-2xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
  {actions.map((action, index) => (
    <button
      key={index}
      onClick={() => handleNavigate(action.target)}
      className={`rounded-xl p-5 flex flex-col items-center gap-3 text-white shadow-md hover:shadow-lg transition-all ${action.color}`}
    >
      {/* Replaced white circle with large solid icon */}
      <div className="text-white">
        {action.icon}
      </div>
      <p className="text-lg font-medium">{action.label}</p>
      <ArrowRightCircle size={20} />
    </button>
  ))}
</div>


      {/* Charts and Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Class Performance Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Use Chart.js or Recharts */}
            <p>[Graph / Chart Coming Soon]</p>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-800">Recent Announcements</h3>
          </div>
          <ul className="space-y-4">
            {announcements.map((note, index) => (
              <li key={index} className="border-l-4 border-orange-400 pl-3">
                <p className="font-medium text-gray-700">{note.title}</p>
                <p className="text-sm text-gray-500">{note.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
<div className="bg-white mt-8 rounded-xl shadow p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
  <ul className="space-y-4 text-gray-700">
    <li>✅ Marked attendance for CSE301 - July 14, 2025</li>
    <li>📝 Uploaded marks for Internal Test 1 - July 13, 2025</li>
    <li>📢 Posted announcement: "Viva schedule updated" - July 12, 2025</li>
  </ul>
</div>

{/* Student Messages Preview */}
<div className="bg-white mt-8 rounded-xl shadow p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Queries</h3>
  <div className="space-y-3">
    <div className="p-3 border rounded-lg">
      <p className="text-gray-800 font-medium">John Doe</p>
      <p className="text-sm text-gray-600">"Sir, can you clarify Q3 of the assignment?"</p>
    </div>
    <div className="p-3 border rounded-lg">
      <p className="text-gray-800 font-medium">Anjali R</p>
      <p className="text-sm text-gray-600">"Requesting extension for the project submission."</p>
    </div>
  </div>
</div>

{/* Course Progress */}
<div className="bg-white mt-8 rounded-xl shadow p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Completion</h3>
  <div className="space-y-4">
    <div>
      <p className="font-medium text-gray-700">CSE301 - Data Structures</p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-green-500 h-3 rounded-full w-[75%]"></div>
      </div>
    </div>
    <div>
      <p className="font-medium text-gray-700">CSE401 - Compiler Design</p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-500 h-3 rounded-full w-[60%]"></div>
      </div>
    </div>
  </div>
</div>

{/* Feedback Summary */}
<div className="bg-white mt-8 rounded-xl shadow p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Feedback Summary</h3>
  <ul className="space-y-2 text-sm text-gray-700">
    <li>👍 92% students found lectures engaging</li>
    <li>🕒 85% said course pacing was good</li>
    <li>📚 78% happy with study materials provided</li>
  </ul>
</div>

{/* Notifications */}
<div className="bg-white mt-8 rounded-xl shadow p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Reminders</h3>
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    <li>Submit semester attendance by July 20</li>
    <li>Update assignment grades before July 18</li>
    <li>Plan syllabus completion report</li>
  </ul>
</div>

      {/* Upcoming Calendar (Optional) */}
      <div className="bg-white mt-8 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">Upcoming Events</h3>
        </div>
        <p className="text-gray-600">• Guest Lecture on AI - July 17, 2025<br />
          • Final Year Project Review - July 20, 2025<br />
          • Department Meeting - July 22, 2025</p>
      </div>
    </div>
  );
}

export default FacultyDashboard;
