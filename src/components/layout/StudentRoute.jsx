import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import StudentSidebar from "../../components/sidebar/StudentSidebar";
import routes from "../../routes";

export default function Student(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    const handleResize = () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.includes(
          routes[i].layout + "/" + routes[i].path
        )
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
  };

  const getActiveNavbar = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.includes(routes[i].layout + routes[i].path)
      ) {
        return routes[i].secondary;
      }
    }
    return false;
  };

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === "/student") {
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
      <StudentSidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            {/* <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Your App Name"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            /> */}
            <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/student/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
