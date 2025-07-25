import React, { useState, useRef } from "react";
import {
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
  GraduationCap,
  PlusCircle,
  CheckCircle,
  RefreshCcw,
  Pencil,
  Trash2,
} from "lucide-react";

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const timeRef = useRef(null);

  const tasksPerPage = 3;

  const handleAddTask = () => {
    if (!newTask.trim() || !deadlineDate || !deadlineTime) return;

    const deadline = new Date(`${deadlineDate}T${deadlineTime}`);
    const now = new Date();
    if (deadline <= now) return;

    const capitalizedTask = newTask.trim().replace(/\b\w/g, (l) => l.toUpperCase());

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: capitalizedTask,
        deadline,
        completed: false,
        status: "Pending",
      },
    ]);

    setNewTask("");
    setDeadlineDate("");
    setDeadlineTime("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  const handleReset = () => {
    setTasks([]);
    setCurrentPage(1);
  };

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editText.trim().replace(/\b\w/g, (l) => l.toUpperCase()) } : task
      )
    );
    setEditId(null);
    setEditText("");
  };

  const isWithin24Hours = (deadline) => {
    const now = new Date();
    const diff = deadline - now;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aUrgent = isWithin24Hours(a.deadline);
    const bUrgent = isWithin24Hours(b.deadline);
    if (aUrgent && !bUrgent) return -1;
    if (!aUrgent && bUrgent) return 1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Welcome back, Riya! 👋</h1>
        <p className="text-gray-600 text-md mt-2">Stay focused and keep learning 🚀</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard title="Active Courses" value="05" icon={<NotebookPen />} color="indigo" />
        <StatCard title="CGPA" value="8.92" icon={<Star />} color="amber" />
        <StatCard title="Credits Earned" value="120" icon={<CalendarDays />} color="purple" />
        <StatCard title="Attendance %" value="92%" icon={<Rocket />} color="rose" />
        <StatCard title="No. of Backlogs" value="02" icon={<GraduationCap />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 lg:col-span-1">
          <div className="relative h-28 bg-gradient-to-r from-blue-100 to-blue-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="Student Avatar"
              className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 translate-y-8 shadow-md"
            />
          </div>
          <div className="pt-8 pb-2 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Riya Sharma</h2>
          </div>
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
              <DetailRow label="Register No:" value="21CSE019" />
              <DetailRow label="Department:" value="CSE" />
              <DetailRow label="Batch:" value="2022" />
              <DetailRow label="Year:" value="3" />
              <DetailRow label="Semester:" value="6" />
            </div>
          </div>
        </div>

        {/* To-Do List */}
        <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">✅ To-Do List</h3>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add Task..."
              className="px-4 py-2 border rounded-lg col-span-2"
            />
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => {
                setDeadlineTime(e.target.value);
                setTimeout(() => timeRef.current?.blur(), 100);
              }}
              ref={timeRef}
              className="px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
            <div className="flex gap-4">
              <button
                onClick={handleAddTask}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600"
              >
                <PlusCircle size={18} />
                Add Task
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
              >
                <RefreshCcw size={18} />
                Reset All
              </button>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Task List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {currentTasks.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                🎉 No tasks left. Time to relax and recharge!
              </p>
            ) : (
              currentTasks.map((task) => {
                const deadline = new Date(task.deadline);
                const urgent = isWithin24Hours(deadline);
                return (
                  <div
                    key={task.id}
                    className={`flex justify-between items-center p-4 rounded-lg border bg-gray-50 ${
                      urgent ? "border-red-400" : "border-gray-300"
                    }`}
                  >
                    <div className="w-full">
                      {editId === task.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={() => handleSaveEdit(task.id)}
                          className="w-full px-2 py-1 border rounded"
                          autoFocus
                        />
                      ) : (
                        <>
                          <p
                            className={`${
                              task.completed
                                ? "line-through text-gray-500"
                                : urgent
                                ? "text-red-600 font-bold"
                                : "text-gray-800 font-medium"
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {deadline.toLocaleDateString()} |{" "}
                            {deadline.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <p className="text-sm mt-1 font-semibold">
                            Status:{" "}
                            <span className={task.completed ? "text-green-600" : "text-yellow-600"}>
                              {task.status}
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() =>
                          editId === task.id ? handleSaveEdit(task.id) : handleEdit(task.id, task.title)
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(task.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    currentPage === i + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const bgColor = {
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    red: "bg-red-100 text-red-600",
  }[color];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
