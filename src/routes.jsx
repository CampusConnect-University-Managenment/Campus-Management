import React from "react";
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import FacultyDashboard from "./pages/faculty/dashboard";
import ExamInterface from "./pages/student/ExamInterface";

// Student Components
import AllStudents from "./pages/admin/students/components/AllStudents";

import {
  MdDashboard,
  MdGroups,
} from "react-icons/md";

const routes = [
  // Admin Dashboard
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <AdminDashboard />,
  },
  {
    name: "Admin Services",
    layout: "/admin",
    path: "exam",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <AdminExam />,
  },

  // ✅ All Students as standalone sidebar item
  {
    name: "All Students",
    layout: "/admin",
    path: "students/all",
    icon: <MdGroups className="h-6 w-6" />,
    component: <AllStudents />,
  },

  // Student Dashboard
  {
    name: "Exam",
    layout: "/student",
    path: "exam",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ExamInterface />,
  },
  {
    name: "Demo",
    layout: "/student",
    path: "demo",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ExamInterface />,
  },

  // Faculty Dashboard
  {
    name: "Faculty Dashboard",
    layout: "/faculty",
    path: "default",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <FacultyDashboard />,
  },
];

export default routes;
