import React from "react";
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import MockCourse from "./pages/admin/course";
import AllStudents from "./pages/admin/students/components/AllStudents";
import AttendanceUpload from "./pages/faculty/AttendanceUpload";
import Notification_Message from "./pages/faculty/Notification_Message";
import ClassList from "./pages/faculty/ClassList";
import Announcements from "./pages/faculty/Announcements/components/Announcements";
import FacultyDashboard from "./pages/faculty/dashboard";
import Interface from "./pages/faculty/Exam_InterFace/Components/InterFace";
import FacultyMarksUpdate from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_Marks";
import UploadQuestionPaper from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_QuestionPaper";
import UploadStudyMaterial from "./pages/faculty/Exam_InterFace/Components/Upload_Components/Upload_StudyMaterials";
import FacultyManagement from "./pages/admin/faculty/index";
import FacultyProfile from "./pages/faculty/Profile";
import EditProfile from "./pages/faculty/EditProfile";
import Dashboard from "./pages/student/Dashboard";
import CoursesEnrolled from "./pages/student/CoursesEnrolled";
import PracticeExams from "./pages/student/PracticeExams";
import ResultsPortal from "./pages/student/ResultsPortal";
import PerformanceAnalytics from "./pages/student/PerformanceAnalytics";
import Notifications from "./pages/student/Notifications";
import HelpSupport from "./pages/student/HelpSupport";

import { FaBookOpen, FaUser, FaBell, FaChartBar, FaClipboardCheck, FaGraduationCap, FaQuestionCircle } from "react-icons/fa";
import { MdDashboard, MdGroups, MdLibraryBooks, MdNotifications, MdUploadFile, MdCampaign } from "react-icons/md";
import ExamSchedule from "./pages/admin/exam/components/examschedule";

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

  // Student Routes
  {
    name: "Dashboard",
    layout: "/student",
    path: "default",
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
    icon: <MdGroups className="h-6 w-6" />,
    component: <ClassList />,
  },
  {
    name: "Attendace Upload",
    layout: "/faculty",
    path: "Attendance",
    icon: <MdUploadFile className="h-6 w-6" />,
    component: <AttendanceUpload />,
  },
  {
    name: "Notification and Message",
    layout: "/faculty",
    path: "Notification&Message",
    icon: <MdNotifications className="h-6 w-6" />,
    component: <Notification_Message />,
  },
  {
    name: "My Profile",
    layout: "/faculty",
    path: "profile",
    icon: <FaUser className="h-6 w-6" />,
    component: <FacultyProfile />,
  },
  {
    name: "Exam InterFace",
    layout: "/faculty",
    path: "ExamInterFace",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <Interface />,
  },
  {
    name: "Announcements",
    layout: "/faculty",
    path: "Announcements",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <Announcements />,
  },
  {
    layout: "/faculty",
    path: "edit-profile",
    component: <EditProfile />, 
  },
];

export default routes;
