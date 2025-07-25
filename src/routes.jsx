import React from "react";
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import AdminExamInterface from "./pages/admin/dashboard/component/ExamInterface";
import AdminExamSchedule from "./pages/admin/dashboard/component/ExamSchedule";
import AdminMarksUpload from "./pages/admin/dashboard/component/MarksUpload";

import NotificationMessage from "./pages/admin/Notification_Message";
import MockCourse from "./pages/admin/course";
import Assign from "./pages/admin/Assign_class"
import AllStudents from "./pages/admin/students/components/AllStudents";
import AttendanceUpload from "./pages/faculty/AttendanceUpload";
import Notification_Message from "./pages/faculty/Notification_Message";
import ClassList from "./pages/faculty/ClassList";
import Announcements from "./pages/faculty/Announcements/components/Announcements";
import StudentDashboard from "./pages/student/StudentDashBoard/components/StudentDashboard";
import FacultyProfile from "./pages/faculty/Profile";
import EditFacultyProfile from "./pages/faculty/EditProfile";
import Interface from "./pages/faculty/Exam_InterFace/Components/ExamInterface";
import ViewStudyMaterial from "./pages/faculty/Exam_InterFace/View_Components/ViewStudyMaterials";
import ViewQuestionPaper from "./pages/faculty/Exam_InterFace/View_Components/ViewQuestionPaper";
import ViewAssignmentQuestions from "./pages/faculty/Exam_InterFace/View_Components/ViewAssignment";
import UploadAssignment from "./pages/faculty/Exam_InterFace/Upload_Components/Upload_Assignment";
import FacultyMarksUpdate from "./pages/faculty/Exam_InterFace/Upload_Components/Upload_Marks";
import UploadQuestionPaper from "./pages/faculty/Exam_InterFace/Upload_Components/Upload_QuestionPaper";
import UploadStudyMaterial from "./pages/faculty/Exam_InterFace/Upload_Components/Upload_StudyMaterials";
import FacultyManagement from "./pages/admin/faculty/index";
import MyProfile from "./pages/student/MyProfile";
import Dashboard from "./pages/student/Dashboard";
import CoursesEnrolled from "./pages/student/CoursesEnrolled";
import PracticeExams from "./pages/student/PracticeExams";
import ResultsPortal from "./pages/student/ResultsPortal";
import PerformanceAnalytics from "./pages/student/PerformanceAnalytics";
import Notifications from "./pages/student/Notifications";
import HelpSupport from "./pages/student/HelpSupport";
// import Studymaterial from "./pages/student/CoursesEnrolled/Studymaterial";
import FacultyDashboard from "./pages/faculty/dashboard";
import ExamSchedule from "./pages/admin/exam/components/examschedule";
import FaCourse from "./pages/faculty/Course/Course";

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

import {
  MdDashboard,
  MdGroups,
  MdLibraryBooks,
  MdNotifications,
  MdUploadFile,
  MdCampaign,
} from "react-icons/md";

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
    component: <NotificationMessage />,
  },
  {
    name: "Exam Interface",
    layout: "/admin",
    path: "examinterface",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <AdminExamInterface />, // <- should include <Outlet />
    children: [
      {
        layout: "/admin",
        path: "examinterface/exam-schedule",
        component: <AdminExamSchedule />,
      },
      {
        layout: "/admin",
        path: "examinterface/marks-upload",
        component: <AdminMarksUpload />,
      },
    ],
  },
    {
    name: "Assign Class",
    layout: "/admin",
    path: "Assign_class",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Assign />,
  },
   {
  name: "Exam Interface",
  layout: "/admin",
  path: "examinterface",
  icon: <MdLibraryBooks className="h-6 w-6" />,
  component: <AdminExamInterface />, // <- should include <Outlet />
  children: [
    {
      layout: "/admin",
      path: "examinterface/exam-schedule",
      component: <AdminExamSchedule />,
    },
    {
      layout: "/admin",
      path: "examinterface/marks-upload",
      component: <AdminMarksUpload />,
    },
  ],
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
  // {
  //   name: "Practice Exams",
  //   layout: "/student",
  //   path: "practice",
  //   icon: <FaClipboardCheck className="h-5 w-5" />,
  //   component: <PracticeExams />,
  // },
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
    name: "My Profile",
    layout: "/student",
    path: "profile",
    icon: <FaUser className="h-6 w-6" />,
    component: <MyProfile />,
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
    name: "Exam Interface",
    layout: "/faculty",
    path: "examinterface",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <Interface />,
    children: [
      {
        layout: "/faculty",
        path: "ExamInterFace/upload-marks",
        component: <FacultyMarksUpdate />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/upload-question",
        component: <UploadQuestionPaper />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/upload-material",
        component: <UploadStudyMaterial />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/view-material",
        component: <ViewStudyMaterial />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/view-question",
        component: <ViewQuestionPaper />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/view-assignment",
        component: <ViewAssignmentQuestions />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/upload-assignment",
        component: <UploadAssignment />,
      },
    ],
  },
  {
    name: "Announcements",
    layout: "/faculty",
    path: "Announcements",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <Announcements />,
  },
  {
    name: "My Profile",
    layout: "/faculty",
    path: "profile",
    icon: <FaUser className="h-6 w-6" />,
    component: <FacultyProfile />,
    children: [
      {
        layout: "/faculty",
        path: "edit-profile",
        component: <EditFacultyProfile />,
      },
    ],
  },
  {
    name: "Courses",
    layout: "/faculty",
    path: "Course",
    icon: <MdCampaign className="h-6 w-6" />,
    component: <FaCourse />,
  },
];

export default routes;
