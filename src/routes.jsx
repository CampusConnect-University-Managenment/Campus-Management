import React from "react";
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import MockCourse from "./pages/admin/course";
import AllStudents from "./pages/admin/students/components/AllStudents";
import AttendanceUpload from "./pages/faculty/AttendanceUpload";
import Notification_Message from "./pages/faculty/Notification_Message";
import ClassList from "./pages/faculty/ClassList";
import Performance from './pages/student/Performance-analysis/component/Performance';
import Announcements from "./pages/faculty/Announcements/components/Announcements";
import StudentDashboard from "./pages/student/StudentDashBoard/components/StudentDashboard";
import Interface from "./pages/faculty/Exam_InterFace/Components/InterFace";
import FacultyMarksUpdate from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_Marks";
import UploadQuestionPaper from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_QuestionPaper";
import UploadStudyMaterial from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_StudyMaterials";
import FacultyManagement from "./pages/admin/faculty/index"
// Auth Views

//student
// Student Views
import MyProfile from "./pages/student/MyProfile";
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

import FacultyDashboard from "./pages/faculty/dashboard";
import ExamSchedule from "./pages/admin/exam/components/examschedule";
//import { FaUser } from "react-icons/fa";
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
    name: "FacultyManagement",
    layout: "/admin",
    path: "faculty",
    icon: <MdGroups className="h-6 w-6" />,
    component: <FacultyManagement />,
  },
  {
    name: "All Students",
    layout: "/admin",
    path: "students/all",
    icon: <MdGroups className="h-6 w-6" />,
    component: <AllStudents />,
  },
  {
    name: "Notification and Message",
    layout: "/admin",
    path: "Notification_Message",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Notification_Message />,
  },

  // Student Routes
  {
    name: "Dashboard",
    layout: "/student",
    path: "dashboard",
    icon: <MdDashboard className="h-5 w-5" />,
    component: <Dashboard />,
  },
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

  {
    name: "Courses",
    layout: "/admin",
    path: "course",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <MockCourse />,
  },

  {
    name: "Exams",
    layout: "/admin",
    path: "exam",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <ExamSchedule />,
  },

  {
    name: "Results Portal",
    layout: "/student",
    path: "demo",
    icon: <FaGraduationCap className="h-5 w-5" />,
    component: <MyProfile />,
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
    component: <MyProfile />,
  },
  {
    name: "Help & Support",
    layout: "/student",
    path: "demo",
    icon: <FaQuestionCircle className="h-5 w-5" />,
    component: <MyProfile />,
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
  {
    name: "Exam InterFace",
    layout: "/faculty",
    path: "ExamInterFace",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Interface />,
    children: [
      {
        name: "Upload Marks",
        layout: "/faculty",
        path: "ExamInterFace/upload-marks",
        component: <FacultyMarksUpdate />
      },
      {
        name: "Upload Question Paper",
        layout: "/faculty",
        path: "ExamInterFace/upload-question",
        component: <UploadQuestionPaper />
      },
      {
        name: "Upload Study Material",
        layout: "/faculty",
        path: "ExamInterFace/upload-material",
        component: <UploadStudyMaterial />
      }
    ]
  },
  {
    name: "Announcements",
    layout: "/faculty",
    path: "Announcements",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Announcements />,
  },
];

export default routes;
