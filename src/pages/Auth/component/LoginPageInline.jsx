// Pages/LoginPageInline.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPageInline = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      const useSaved = window.confirm("Saved credentials found. Do you want to use them?");
      if (useSaved) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRemember(true);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setRemember(false);
      }
    }
  }, []);

  const handleLogin = async () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Please fill out your email.";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Please fill out your password.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email: username,
        password
      });

      const { token, name } = response.data;
      alert("Login successful");

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      // 🔁 Redirect based on email prefix
      if (username.startsWith("7178")) {
  window.location.href = "http://localhost:3002/student/dashboard";
} else if (username.startsWith("admin")) {
  window.location.href = "http://localhost:3002/admin/default";
} else {
  window.location.href = "http://localhost:3002/faculty/default";
}


    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Server error during login";
      alert(errorMsg);
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-person"></i></span>
          <input
            type="text"
            className={`form-control ${errors.username && "is-invalid"}`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {errors.username && (
          <div className="invalid-feedback d-block">{errors.username}</div>
        )}
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock"></i></span>
          <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="input-group-text"><i className="bi bi-eye"></i></span>
        </div>
        {errors.password && (
          <div className="invalid-feedback d-block">{errors.password}</div>
        )}
      </div>

      <button
        className="btn w-100"
        style={{ backgroundColor: "#6f42c1", color: "white" }}
        onClick={handleLogin}
      >
        Sign in
      </button>
    </>
  );
};

export default LoginPageInline;