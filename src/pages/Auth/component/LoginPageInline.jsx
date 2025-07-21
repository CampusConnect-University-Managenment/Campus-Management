// // Pages/LoginPageInline.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPageInline = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [errors, setErrors] = useState({ username: "", password: "" });

//   useEffect(() => {
//     const savedUsername = localStorage.getItem("username");
//     const savedPassword = localStorage.getItem("password");

//     if (savedUsername && savedPassword) {
//       const useSaved = window.confirm("Saved credentials found. Do you want to use them?");
//       if (useSaved) {
//         setUsername(savedUsername);
//         setPassword(savedPassword);
//         setRemember(true);
//       } else {
//         localStorage.removeItem("username");
//         localStorage.removeItem("password");
//         setRemember(false);
//       }
//     }
//   }, []);

//   const handleLogin = async () => {
//     let valid = true;
//     const newErrors = { username: "", password: "" };

//     if (!username.trim()) {
//       newErrors.username = "Please fill out your email.";
//       valid = false;
//     }
//     if (!password.trim()) {
//       newErrors.password = "Please fill out your password.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     if (!valid) return;

//     try {
//       const response = await axios.post("http://localhost:3001/api/auth/login", {
//         email: username,
//         password
//       });

//       const { token, name } = response.data;
//       alert("Login successful");

//       localStorage.setItem("token", token);
//       localStorage.setItem("name", name);

//       // 🔁 Redirect based on email prefix
//       if (username.startsWith("7178")) {
//   window.location.href = "http://localhost:3002/student/dashboard";
// } else if (username.startsWith("admin")) {
//   window.location.href = "http://localhost:3002/admin/default";
// } else {
//   window.location.href = "http://localhost:3002/faculty/default";
// }


//     } catch (error) {
//       const errorMsg = error?.response?.data?.error || "Server error during login";
//       alert(errorMsg);
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="mb-3">
//         <div className="input-group">
//           <span className="input-group-text"><i className="bi bi-person"></i></span>
//           <input
//             type="text"
//             className={`form-control ${errors.username && "is-invalid"}`}
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         {errors.username && (
//           <div className="invalid-feedback d-block">{errors.username}</div>
//         )}
//       </div>

//       <div className="mb-3">
//         <div className="input-group">
//           <span className="input-group-text"><i className="bi bi-lock"></i></span>
//           <input
//             type="password"
//             className={`form-control ${errors.password && "is-invalid"}`}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span className="input-group-text"><i className="bi bi-eye"></i></span>
//         </div>
//         {errors.password && (
//           <div className="invalid-feedback d-block">{errors.password}</div>
//         )}
//       </div>

//       <button
//         className="btn w-100"
//         style={{ backgroundColor: "#6f42c1", color: "white" }}
//         onClick={handleLogin}
//       >
//         Sign in
//       </button>
//     </>
//   );
// };

// export default LoginPageInline;
// LoginPageInline.jsx
import React, { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: username,
        password
      });

      const { token, name } = response.data;
      alert("Login successful");

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      if (username.startsWith("7178")) {
        window.location.href = "/student/dashboard";
      } else if (username.startsWith("admin")) {
        window.location.href = "/admin/default";
      } else {
        window.location.href = "/faculty/default";
      }

    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Server error during login";
      alert(errorMsg);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 p-4 flex items-center space-x-4">
        <FaUserFriends className="text-blue-600 text-3xl" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">CampusConnect</h1>
          {/* <p className="text-sm text-gray-500">University Management Portal</p> */}
        </div>
      </header>

      {/* Centered Login Card */}
      <div className="flex justify-center items-center pt-20">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">Campus Connect</h2>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="sr-only">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="bi bi-person text-gray-400"></i>
                </span>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="sr-only">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="bi bi-lock text-gray-400"></i>
                </span>
                <input
                  type="password"
                  className={`w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="bi bi-eye text-gray-400"></i>
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Sign in Button */}
<button
  className="w-full text-white py-2 rounded hover:opacity-90 transition duration-200"
  style={{ backgroundColor: "#007bff" }}
  onClick={handleLogin}
>
  Sign in
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageInline;
