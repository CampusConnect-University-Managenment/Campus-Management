import React from "react";

// Admin Views
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import MockCourse from "./pages/admin/course";
import AllStudents from "./pages/admin/students/components/AllStudents";

import AttendanceUpload from "./pages/faculty/AttendanceUpload"
import Notification_Message from "./pages/faculty/Notification_Message"

// Staff Views
import ClassList from "./pages/faculty/ClassList";
// Auth Views

//student
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

import { MdDashboard,MdGroups } from "react-icons/md";

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
   {
    name: "All Students",
    layout: "/admin",
    path: "students/all",
    icon: <MdGroups className="h-6 w-6" />,
    component: <AllStudents />,
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
    name: "Courses",
    layout: "/admin",
    path: "course",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MockCourse />,
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
    path: "demo",
    icon: <FaChartBar className="h-5 w-5" />,
    component: <ExamInterface />,
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
    name: "ClassList",
    layout: "/faculty",
    path: "ClassList",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ClassList />
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
