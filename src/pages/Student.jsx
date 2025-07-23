import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import StudentSidebar from "../../components/sidebar/StudentSidebar";
import routes from "../../routes";
import Navbar from "../Navbar";
import Studymaterial from "./student/CoursesEnrolled/Studymaterial"; // ✅ Import here

export default function Student(props) {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    const currentPath = location.pathname.split("/").slice(-1)[0];
    const current = routes.find((r) => r.path === currentPath);
    setCurrentRoute(current?.name || "Study Material");
  }, [location.pathname]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          element={prop.component}
          key={key}
        />
      );
    });
  };

  return (
    <div className="flex h-screen">
      <StudentSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar
          brandText={currentRoute}
          onMenuClick={() => setOpen(!open)}
        />
        <div className="p-4 overflow-y-auto flex-1">
          <Routes>
            {getRoutes(routes)}

            {/* ✅ Extra Route NOT shown in sidebar */}
            <Route
              path="CoursesEnrolled/Studymaterial"
              element={<Studymaterial />}
            />

            <Route
              path="/"
              element={<Navigate to="/student/CoursesEnrolled" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
