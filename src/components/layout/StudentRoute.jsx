import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import StudentSidebar from "../../components/sidebar/StudentSidebar";
import routes from "../../routes";
import StudentNavbar from "../layout/Navbar/components/StudentNavbar";

export default function Student(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    const handleResize = () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
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
    return routes.map((route, key) => {
      if (route.layout === "/student") {
        if (route.children) {
          return (
            <React.Fragment key={key}>
              <Route path={`/${route.path}`} element={route.component} />
              {route.children.map((child, childKey) => (
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
          <Route path={`/${route.path}`} element={route.component} key={key} />
        );
      }
      return null;
    });
  };

  document.documentElement.dir = "ltr";

return (
  <div className="flex h-full w-full">
    {/* Sidebar */}
    <div className="print:hidden">
      <StudentSidebar open={open} onClose={() => setOpen(false)} />
    </div>

    {/* Main Content */}
    <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
      <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px] print:ml-0">
       
        <div className="h-full">
           <div className="print:hidden">
          <StudentNavbar
            onOpenSidenav={() => setOpen(true)}
            logoText="Student Panel"
            brandText={currentRoute}
            {...rest}
          /> </div>
          <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
            <Routes>
              {getRoutes(routes)}
              <Route
                path="/"
                element={<Navigate to="/student/default" replace />}
              />
            </Routes>
          </div>
          <div className="p-3">{/* Optional Footer */}</div>
        </div>
      </main>
    </div>
  </div>
);
}