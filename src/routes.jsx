import React from "react";

// Admin Views
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import AttendanceUpload from "./pages/faculty/AttendanceUpload"
import Notification_Message from "./pages/faculty/Notification_Message"
import Performance from './pages/student/Performance-analysis/component/Performance';
// Staff Views

// Auth Views

//studnet
import ExamInterface from "./pages/student/ExamInterface";
// Icons

import {
  FaBookOpen,
  FaUser,
  FaBell,
  FaChartBar,
  FaClipboardCheck,
  FaGraduationCap,
  FaQuestionCircle,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

import FacultyDashboard from "./pages/faculty/dashboard";
// import { FaUser } from "react-icons/fa";
const routes = [
  // Admin Routes
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdDashboard className="h-5 w-5" />,
    component: <AdminDashboard />,
  },

  
  // Student Routes
  {
    name: "Dashboard ",
    layout: "/student",
    path: "exam",
    icon: <MdDashboard className="h-5 w-5" />,
    component: <ExamInterface />,
  },
  {
    name: "Profile",
    layout: "/student",
    path: "demo",
    icon: <FaUser className="h-5 w-5" />,
    component: <ExamInterface />,
  },
  {
    name: "Courses Enrolled",
    layout: "/student",
    path: "demo",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <ExamInterface />,
  },
  {
    name: "Practice Exams",
    layout: "/student",
    path: "demo",
    icon: <FaClipboardCheck className="h-5 w-5" />,
    component: <ExamInterface />,
  },

  {
    name: "Results Portal",
    layout: "/student",
    path: "demo",
    icon: <FaGraduationCap className="h-5 w-5" />,
    component: <ExamInterface />,
  },

  {
    name: "Performance Analytics",
    layout: "/student",
    path: "Performance",
    icon: <FaChartBar className="h-5 w-5" />,
      component: <Performance />, 
  },
  {
    name: "Notifications",
    layout: "/student",
    path: "demo",
    icon: <FaBell className="h-5 w-5" />,
    component: <ExamInterface />,
  },
  {
    name: "Help & Support",
    layout: "/student",
    path: "demo",
    icon: <FaQuestionCircle className="h-5 w-5" />,
    component: <ExamInterface />,
  },

  // Faculty Routes
  {
    name:"Faculty Dashboard",
    layout:"/faculty",
    path:"default",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<FacultyDashboard/>
  },
  {
    name:"Attendace Upload",
    layout:"/faculty",
    path:"Attendance",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<AttendanceUpload/>
  },
  {
    name:"Notification and Message",
    layout:"/faculty",
    path:"Notification&Message",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<Notification_Message/>
  }
  
];

export default routes;
