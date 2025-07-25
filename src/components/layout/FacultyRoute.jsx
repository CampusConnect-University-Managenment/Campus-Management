import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "../../routes";
import FacultySidebar from "../sidebar/FacultySidebar";
import FacultyNavbar from "./Navbar/components/FacultyNavbar";

export default function Faculty(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    // Handle sidebar responsiveness
    const handleResize = () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      const fullPath = routes[i].layout + "/" + routes[i].path;
      if (window.location.href.includes(fullPath)) {
        setCurrentRoute(routes[i].name);
        return routes[i].name;
      }
      // check nested children
      if (routes[i].children) {
        for (let j = 0; j < routes[i].children.length; j++) {
          const childPath = routes[i].layout + "/" + routes[i].children[j].path;
          if (window.location.href.includes(childPath)) {
            setCurrentRoute(routes[i].children[j].name);
            return routes[i].children[j].name;
          }
        }
      }
    }
    return activeRoute;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/faculty") {
        if (prop.children) {
          return (
            <React.Fragment key={key}>
              <Route path={`/${prop.path}`} element={prop.component} />
              {prop.children.map((child, childKey) => (
                <Route
                  path={`/${child.path}`}
                  element={child.component}
                  key={`${key}-${childKey}`}
                />
              ))}
            </React.Fragment>
          );
        }
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }
      return null;
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      <FacultySidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <FacultyNavbar
              onOpenSidenav={() => setOpen(true)}
              logoText="Faculty Panel"
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/faculty/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">{/* Optionally add Footer here */}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
