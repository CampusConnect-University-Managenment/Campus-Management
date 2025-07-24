import React, { useState } from "react";
import {
  CalendarClock,
  BookOpen,
  FileText,
  Users,
  CheckCircle,
  Pencil,
  Megaphone,
  Activity
} from "lucide-react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
    <div className="mb-2">{icon}</div>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const FacultyDashboard = () => {
  const [tasks, setTasks] = useState([
    { date: "24", month: "Jul", title: "Upload Assignment Marks - DBMS", time: "4:00 PM", done: false },
    { date: "26", month: "Jul", title: "Internal Test - CN", time: "10:00 AM", done: false },
    { date: "28", month: "Jul", title: "Department Meeting", time: "2:00 PM", done: false },
  ]);

  const [newTask, setNewTask] = useState({ date: "", month: "", title: "", time: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [announcements] = useState([
    { title: "Exam Schedule Released", date: "22 Jul 2025" },
    { title: "New Course Material Uploaded", date: "21 Jul 2025" },
    { title: "Semester Registration Deadline", date: "20 Jul 2025" },
    { title: "Lab Manuals Updated", date: "19 Jul 2025" },
    { title: "Guest Lecture on AI", date: "18 Jul 2025" },
  ]);
  const [activities] = useState([
    "Marked attendance for CSE301",
    "Uploaded internal marks for DBMS",
    "Posted assignment for CN",
    "Created announcement: Project Submission Deadline",
    "Reviewed lab reports",
    "Published quiz results",
  ]);

  const [announcementPage, setAnnouncementPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const itemsPerPage = 3;

  const handleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleAddOrUpdate = () => {
    if (isEditing) {
      const updated = [...tasks];
      updated[editIndex] = { ...newTask, done: false };
      setTasks(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { ...newTask, done: false }]);
    }
    setNewTask({ date: "", month: "", title: "", time: "" });
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const paginatedAnnouncements = announcements.slice(
    (announcementPage - 1) * itemsPerPage,
    announcementPage * itemsPerPage
  );

  const paginatedActivities = activities.slice(
    (activityPage - 1) * itemsPerPage,
    activityPage * itemsPerPage
  );

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Welcome back, Professor! 👋</h1>
        {/* Profile Card + Today Timetable Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Faculty Profile Card */}
  <div className="bg-white shadow rounded-xl p-6 col-span-1">
    <div className="flex items-center space-x-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Faculty"
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-800">Dr. Aravinth K</h3>
        <p className="text-gray-500 text-sm">Assistant Professor, CSE</p>
        <p className="text-gray-400 text-xs mt-1">Faculty ID: FAC1234</p>
      </div>
    </div>
  </div>

  {/* Today Timetable */}
  <div className="bg-white shadow rounded-xl p-6 col-span-2">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Timetable</h2>
    <ul className="divide-y divide-gray-200">
      <li className="py-2 flex justify-between">
        <span className="text-gray-700 font-medium">9:00 AM - 10:00 AM</span>
        <span className="text-gray-600">CSE301 - Operating Systems</span>
      </li>
      <li className="py-2 flex justify-between">
        <span className="text-gray-700 font-medium">11:00 AM - 12:00 PM</span>
        <span className="text-gray-600">CSE205 - Data Structures</span>
      </li>
      <li className="py-2 flex justify-between">
        <span className="text-gray-700 font-medium">2:00 PM - 3:00 PM</span>
        <span className="text-gray-600">CSE309 - Software Engineering</span>
      </li>
    </ul>
  </div>
</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Courses Handled" value="04" icon={<BookOpen size={24} className="text-blue-600" />} />
        <Card title="Upcoming Tasks" value={tasks.length} icon={<CalendarClock size={24} className="text-purple-600" />} />
        <Card title="Papers Evaluated" value="120" icon={<FileText size={24} className="text-yellow-600" />} />
        <Card title="Students" value="110" icon={<Users size={24} className="text-red-600" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CalendarClock className="text-indigo-600" /> To-do List
          </h2>

          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className={`p-4 border rounded-lg flex justify-between items-start ${task.done ? "bg-green-50" : "bg-white"}`}>
                <div>
                  <p className="text-gray-800 font-semibold">{task.title}</p>
                  <p className="text-sm text-gray-500">{`${task.date} ${task.month}, ${task.time}`}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDone(index)} title="Mark as Done">
                    <CheckCircle className={`w-5 h-5 ${task.done ? "text-green-600" : "text-gray-400"}`} />
                  </button>
                  <button onClick={() => handleEdit(index)} title="Edit">
                    <Pencil className="w-5 h-5 text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(index)} title="Delete">
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">{isEditing ? "Edit Task" : "Add New Task"}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              <input className="border p-2 rounded" placeholder="Date" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Month" value={newTask.month} onChange={(e) => setNewTask({ ...newTask, month: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Time" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} />
            </div>
            <button onClick={handleAddOrUpdate} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Megaphone className="text-orange-500" /> Announcements
          </h2>
          <ul className="space-y-3">
            {paginatedAnnouncements.map((ann, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="font-medium text-gray-700">{ann.title}</p>
                <p className="text-sm text-gray-500">{ann.date}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button onClick={() => setAnnouncementPage((prev) => Math.max(prev - 1, 1))} disabled={announcementPage === 1} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
            <button onClick={() => setAnnouncementPage((prev) => prev + 1)} disabled={announcementPage * itemsPerPage >= announcements.length} className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-green-500" /> Recent Activities
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {paginatedActivities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button onClick={() => setActivityPage((prev) => Math.max(prev - 1, 1))} disabled={activityPage === 1} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
            <button onClick={() => setActivityPage((prev) => prev + 1)} disabled={activityPage * itemsPerPage >= activities.length} className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
