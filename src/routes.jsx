import React from "react";
import AdminProfile from "./pages/admin/Profile";

import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import AdminExamInterface from "./pages/admin/dashboard/component/ExamInterface";
import AdminExamSchedule from "./pages/admin/dashboard/component/ExamSchedule";
import AdminMarksUpload from "./pages/admin/dashboard/component/MarksUpload";

import NotificationMessage from "./pages/admin/Notification_Message";
import MockCourse from "./pages/admin/course";
import Assign from "./pages/admin/Assign_class";
import AllStudents from "./pages/admin/students/components/AllStudents";
import AttendanceUpload from "./pages/faculty/AttendanceUpload";
import Notification_Message from "./pages/faculty/Notification_Message";
import StudentDashboard from "./pages/student/StudentDashBoard/components/StudentDashboard";
import FacultyProfile from "./pages/faculty/Profile";
import EditFacultyProfile from "./pages/faculty/EditProfile";
import ViewStudyMaterial from "./pages/faculty/Exam_InterFace/View_Components/ViewStudyMaterials";
import ViewQuestionPaper from "./pages/faculty/Exam_InterFace/View_Components/ViewQuestionPaper";
import ViewAssignmentQuestions from "./pages/faculty/Exam_InterFace/View_Components/ViewAssignmentQuestions";
import UploadAssignment from "./pages/faculty/Exam_InterFace/Upload_Components/Upload_Assignment";
import FacultyAssignmentGrading from "./pages/faculty/Exam_InterFace/View_Components/ViewAssignmentAndGrade"
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

// IMPORT BOTH COMPONENTS FROM THE SINGLE INDEX.JSX FILE
import { ClassList, ClassList_Students } from "./pages/faculty/ClassList";

// Icons
import {
  FaBookOpen,
  FaUser,
  FaBell,
  FaChartBar,
  FaClipboardCheck,
  FaGraduationCap,
  FaQuestionCircle,
  FaComments,
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
    name: "Student Management",
    layout: "/admin",
    path: "students/all",
    icon: <MdGroups className="h-6 w-6" />,
    component: <AllStudents />,
  },
  {
    name: "Notifications",
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
    name: "Courses",
    layout: "/admin",
    path: "course",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <MockCourse />,
  },
    {
  name: "My Profile",
  layout: "/admin",
  path: "profile",
  icon: <FaUser className="h-6 w-6" />,
  component: <AdminProfile />,
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
    name: "Discussion Forum",
    layout: "/student",
    path: "notifications",
    icon: <FaComments className="h-5 w-5" />,
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
    component: <ClassList />,children:[
    {
    layout: "/faculty",
    path: "students",
    component: <ClassList_Students />,
    hidden: true
  }]
  },
  
  {
    name: "Attendace Upload",
    layout: "/faculty",
    path: "Attendance",
    icon: <MdUploadFile className="h-6 w-6" />,
    component: <AttendanceUpload />,
  },
  {
    name: "Discussion Forum",
    layout: "/faculty",
    path: "Notification&Message",
    icon: <FaComments className="h-6 w-6"  />,
    component: <Notification_Message />,
  },

   {
    name: "Courses",
    layout: "/faculty",
    path: "Course",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <FaCourse />,
    children:[
        {
        layout: "/faculty",
        path: "ExamInterFace/upload-marks",
        component: <FacultyMarksUpdate />,
      },
      {
        layout: "/faculty",
        path: "ExamInterFace/view-assignment-and-grade",
        component: <FacultyAssignmentGrading />,
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
 
];

export default routes;