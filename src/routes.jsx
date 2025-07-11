import React from "react";

// Admin Views
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import MockCourse from "./pages/admin/course";
import AllStudents from "./pages/admin/students/components/AllStudents";

// Faculty Views
import AttendanceUpload from "./pages/faculty/AttendanceUpload";
import Notification_Message from "./pages/faculty/Notification_Message";
import ClassList from "./pages/faculty/ClassList";
import FacultyDashboard from "./pages/faculty/dashboard";

// Student Views
import Dashboard from "./pages/student/Dashboard";
// import Profile from "./pages/student/Profile";
import CoursesEnrolled from "./pages/student/CoursesEnrolled";
import PracticeExams from "./pages/student/PracticeExams";
import ResultsPortal from "./pages/student/ResultsPortal";
import PerformanceAnalytics from "./pages/student/PerformanceAnalytics";
import Notifications from "./pages/student/Notifications";
import HelpSupport from "./pages/student/HelpSupport";

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
import { MdDashboard, MdGroups } from "react-icons/md";

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

  {
    name: "Courses",
    layout: "/admin",
    path: "course",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MockCourse />,
  },

  // Student Routes
  {
    name: "Dashboard",
    layout: "/student",
    path: "dashboard",
    icon: <MdDashboard className="h-5 w-5" />,
    component: <Dashboard />,
  },
  // {
  //   name: "Profile",
  //   layout: "/student",
  //   path: "profile",
  //   icon: <FaUser className="h-5 w-5" />,
  //   component: <Profile />,
  // },
  {
    name: "Courses Enrolled",
    layout: "/student",
    path: "courses",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <CoursesEnrolled />,
  },
  {
    name: "Practice Exams",
    layout: "/student",
    path: "practice",
    icon: <FaClipboardCheck className="h-5 w-5" />,
    component: <PracticeExams />,
  },
  {
    name: "Results Portal",
    layout: "/student",
    path: "results",
    icon: <FaGraduationCap className="h-5 w-5" />,
    component: <ResultsPortal />,
  },
  {
    name: "Performance Analytics",
    layout: "/student",
    path: "analytics",
    icon: <FaChartBar className="h-5 w-5" />,
    component: <PerformanceAnalytics />,
  },
  {
    name: "Notifications",
    layout: "/student",
    path: "notifications",
    icon: <FaBell className="h-5 w-5" />,
    component: <Notifications />,
  },
  {
    name: "Help & Support",
    layout: "/student",
    path: "help",
    icon: <FaQuestionCircle className="h-5 w-5" />,
    component: <HelpSupport />,
  },

  // Faculty Routes
  {
    name: "Faculty Dashboard",
    layout: "/faculty",
    path: "default",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <FacultyDashboard />,
  },
  {
    name: "ClassList",
    layout: "/faculty",
    path: "ClassList",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <ClassList />,
  },
  {
    name: "Attendace Upload",
    layout: "/faculty",
    path: "Attendance",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <AttendanceUpload />,
  },
  {
    name: "Notification and Message",
    layout: "/faculty",
    path: "Notification&Message",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Notification_Message />,
  },
];

export default routes;
