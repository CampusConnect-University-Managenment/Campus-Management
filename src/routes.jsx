import React from "react";
import AdminDashboard from "./pages/admin/dashboard";
import AdminExam from "./pages/admin/exam";
import MockCourse from "./pages/admin/course";
import AllStudents from "./pages/admin/students/components/AllStudents";
import AttendanceUpload from "./pages/faculty/AttendanceUpload"
import Notification_Message from "./pages/faculty/Notification_Message"
import ClassList from "./pages/faculty/ClassList";

import FacultyMarksUpdate from "./pages/faculty/Exam_InterFace/Components/Upload_Marks";
import UploadQuestionPaper from "./pages/faculty/Exam_InterFace/Components/Upload_QuestionPaper";
import UploadStudyMaterial from "./pages/faculty/Exam_InterFace/Components/Upload_StudyMaterials";
// Auth Views

//student
import MyProfile from "./pages/student/MyProfile";
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
    name: "All Students",
    layout: "/admin",
    path: "students/all",
    icon: <MdGroups className="h-6 w-6" />,
    component: <AllStudents />,
  },
  
  // Student Routes
  {
    name: "Student Dashboard ",
    layout: "/student",
    path: "default",
    icon: <MdDashboard className="h-5 w-5" />,
    component: <MyProfile />,
  },
  {
    name: "Profile",
    layout: "/student",
    path: "profile",
    icon: <FaUser className="h-5 w-5" />,
    component: <MyProfile/>,
  },
  {
    name: "Courses Enrolled",
    layout: "/student",
    path: "demo",
    icon: <FaBookOpen className="h-5 w-5" />,
    component: <MyProfile/>,
  },
  {
    name: "Practice Exams",
    layout: "/student",
    path: "demo",
    icon: <FaClipboardCheck className="h-5 w-5" />,
    component: <MyProfile />,
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
    component: <MyProfile />,
  },

  {
    name: "Performance Analytics",
    layout: "/student",
    path: "demo",
    icon: <FaChartBar className="h-5 w-5" />,
    component: <MyProfile  />,
  },
  {
    name: "Notifications",
    layout: "/student",
    path: "demo",
    icon: <FaBell className="h-5 w-5" />,
    component: <MyProfile  />,
  },
  {
    name: "Help & Support",
    layout: "/student",
    path: "demo",
    icon: <FaQuestionCircle className="h-5 w-5" />,
    component: <MyProfile  />,
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
  },
   {
    name:"Upload Marks",
    layout:"/faculty",
    path:"UploadMarks",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<FacultyMarksUpdate/>
  },
  {
    name:"Upload Question Paper",
    layout:"/faculty",
    path:"UploadQuestionPaper",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<UploadQuestionPaper/>
  },
  {
    name:"Upload Study Materials",
    layout:"/faculty",
    path:"UploadStudyMaterials",
    icon:<MdDashboard className="h-6 w-6" />,
    component:<UploadStudyMaterial/>
  },
  
];

export default routes;
