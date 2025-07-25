import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  CalendarDays,
  NotebookPen,
  Rocket,
  Star,
  GraduationCap,
  Pencil,
  CheckCircle,
  Trash2,
  PlusCircle,
  RefreshCcw,
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
  const [showCgpaGraph, setShowCgpaGraph] = useState(false);
  const [enlargedCard, setEnlargedCard] = useState(null);

  const timeRef = useRef(null);
  const tasksPerPage = 3;

  const cgpaData = [
    { semester: "Sem 1", cgpa: 8.1 },
    { semester: "Sem 2", cgpa: 6.5 },
    { semester: "Sem 3", cgpa: 8.5 },
    { semester: "Sem 4", cgpa: 9.2 },
    { semester: "Sem 5", cgpa: 7.8 },
    { semester: "Sem 6", cgpa: 8.8 },
  ];

  const filteredTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const getCardClass = (cardKey) =>
    `rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
      enlargedCard === cardKey ? "scale-110 bg-blue-100" : "bg-white hover:bg-blue-50"
    }`;

  const handleAddTask = () => {
    if (!newTask || !deadlineDate || !deadlineTime) return;
    const deadline = new Date(`${deadlineDate}T${deadlineTime}`);
    const newEntry = {
      id: Date.now(),
      title: newTask,
      deadline,
      completed: false,
      status: "Pending",
    };
    setTasks([newEntry, ...tasks]);
    setNewTask("");
    setDeadlineDate("");
    setDeadlineTime("");
  };

  const handleReset = () => {
    setTasks([]);
  };

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editText } : task
      )
    );
    setEditId(null);
    setEditText("");
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

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const isWithin24Hours = (date) => {
    const now = new Date();
    return date - now < 24 * 60 * 60 * 1000 && date - now > 0;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#eef2ff] to-[#fdfbff] px-10 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Welcome back, Riya! 👋</h1>
        <p className="text-gray-600 text-md mt-2">Stay focused and keep learning 🚀</p>
      </div>

     {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <div
          className={getCardClass("active")}
          onClick={() => setEnlargedCard(enlargedCard === "active" ? null : "active")}
        >
          <p className="text-gray-500 font-medium">Active Courses</p>
          <h2 className="text-2xl font-bold text-gray-800">05</h2>
          <NotebookPen className="text-indigo-500 text-lg mt-2" />
        </div>

        <div
          className={getCardClass("cgpa")}
          onClick={() => {
            setShowCgpaGraph(!showCgpaGraph);
            setEnlargedCard(enlargedCard === "cgpa" ? null : "cgpa");
          }}
        >
          <p className="text-gray-500 font-medium">CGPA</p>
          <h2 className="text-2xl font-bold text-gray-800">8.8</h2>
          <Star className="text-yellow-400 text-lg mt-2" />
        </div>

        <div
          className={getCardClass("credits")}
          onClick={() => setEnlargedCard(enlargedCard === "credits" ? null : "credits")}
        >
          <p className="text-gray-500 font-medium">Credits Earned</p>
          <h2 className="text-2xl font-bold text-gray-800">120</h2>
          <CalendarDays className="text-purple-500 text-lg mt-2" />
        </div>

        <div
          className={getCardClass("attendance")}
          onClick={() => setEnlargedCard(enlargedCard === "attendance" ? null : "attendance")}
        >
          <p className="text-gray-500 font-medium">Attendance %</p>
          <h2 className="text-2xl font-bold text-gray-800">92%</h2>
          <Rocket className="text-rose-500 text-lg mt-2" />
        </div>

        <div
          className={getCardClass("backlogs")}
          onClick={() => setEnlargedCard(enlargedCard === "backlogs" ? null : "backlogs")}
        >
          <p className="text-gray-500 font-medium">No. of Backlogs</p>
          <h2 className="text-2xl font-bold text-gray-800">02</h2>
          <GraduationCap className="text-red-500 text-lg mt-2" />
        </div>
      </div>

      {showCgpaGraph && (
        <div className="mb-12 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 CGPA Trend</h3>
          <LineChart width={600} height={300} data={cgpaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="cgpa" stroke="#f50ba7ff" strokeWidth={2} />
          </LineChart>
        </div>
      )}
  
  
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
