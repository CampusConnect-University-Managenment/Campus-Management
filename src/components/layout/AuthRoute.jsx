// src/components/layout/AuthRoute.jsx
import { Routes, Route } from "react-router-dom";
import LoginPageInline from "../../pages/Auth/component/LoginPageInline";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPageInline />} />
      {/* Add other auth routes like /register etc. */}
    </Routes>
  );
};

export default AuthRoute;
