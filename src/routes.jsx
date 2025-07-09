import React from "react";

// Admin Views
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
// Staff Views

// Auth Views

//studnet
import ExamInterface from "./pages/student/ExamInterface";
// Icons

import {
  MdHome,
  MdLock,
  MdPerson,
  MdDashboard,
  MdTableView,
  MdAdminPanelSettings,
  MdChatBubble,
  MdLiveHelp,
} from "react-icons/md";
import FacultyDashboard from "./pages/faculty/dashboard"
const routes = [

  
  // Admin Routes
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
    component: <AdminExam/>,
  },

  // Student Routes
  {
    name: "Exam ",
    layout: "/student",
    path: "exam",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ExamInterface/>,
  },
  {
    name: "Demo ",
    layout: "/student",
    path: "demo",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ExamInterface/>,
  },
  // Faculty Routes
  {
    name:"Faculty Dashboard",
    layout:"/faculty",
    path:"default",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<FacultyDashboard/>
  }
  
];

export default routes;