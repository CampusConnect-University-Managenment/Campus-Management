

// import React, { useState } from "react";
// import { User, Lock, Eye, EyeOff } from "lucide-react";
// import { FaUniversity } from "react-icons/fa";
// import illustration from "../../../assets/images/collegecampus-bro.svg";
// import axios from "axios";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // <-- For toggle

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8088/api/auth/login", {
//         username,
//         password
//       });

//       const { token, role, email, uniqueId } = response.data;

//       console.log("Unique ID:", uniqueId);
//       console.log("FULL RESPONSE:", response.data);

//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//   localStorage.setItem("role", role);  
//       if (role === "student") {
//         localStorage.setItem("studentRollNo", uniqueId);
//       } else if (role === "admin") {
//         localStorage.setItem("adminCode", uniqueId);
//       }else if(role==="faculty")localStorage.setItem("facultyCode",uniqueId);

//       switch (role) {
//         case "admin":
//           window.location.href = "/admin/default";
//           break;
//         case "faculty":
//           window.location.href = "/faculty/default";
//           break;
//         case "student":
//           window.location.href = "/student/default";
//           break;
//         default:
//           setError("Invalid role");
//       }
//     } catch (err) {
//       setError("Invalid credentials or unauthorized access.");
//     }
//   };

//   return (
//     <div className="flex h-screen w-full relative">
//       {/* Top-Left Project Name */}
//       <div className="absolute top-6 left-10 flex items-center gap-2 z-10">
//         <div className="bg-white rounded-full p-4 shadow-md">
//           <FaUniversity className="text-blue-600" size={28} />
//         </div>
//         <h2 className="text-3xl font-extrabold text-blue-600">Academix</h2>
//       </div>

//       {/* Left Side - Image */}
//       <div className="ml-20 mr-10 w-1/2 flex items-center justify-center bg-blue-0 rounded-l-[3rem]">
//         <img
//           src={illustration}
//           alt="Login Illustration"
//           className="w-[98%] h-[98%] object-contain"
//         />
//       </div>

//       {/* Right Side - Centered Content */}
//       <div className="w-1/2 flex flex-col items-center justify-center bg-white">
//         <h4 className="text-4xl font-extrabold mb-8 text-center text-blue-600 flex items-center gap-3">
//           Welcome to <span className="text-black">Academix</span> 👋
//         </h4>

//         <div className="w-full max-w-md bg-[#3B82F6] p-10 rounded-2xl shadow-2xl text-white">
//           <h3 className="text-xl font-bold mb-8 text-center">
//             Login to your account..!
//           </h3>

//           {/* Username Field */}
//           <div className="mb-6 relative">
//             <span className="absolute left-3 top-3.5 text-black">
//               <User size={20} />
//             </span>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition"
//             />
//           </div>

//           {/* Password Field with toggle */}
//           <div className="mb-6 relative">
//             <span className="absolute left-3 top-3.5 text-black">
//               <Lock size={20} />
//             </span>
//             <input
//               type={showPassword ? "text" : "password"} // <-- toggle here
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="pl-10 pr-10 py-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition"
//             />
//             <span
//               className="absolute right-3 top-3.5 cursor-pointer text-black"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </span>
//           </div>

//           <div className="flex justify-between items-center text-sm mb-6">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-black" />
//               <span>Remember me</span>
//             </label>
//           </div>

//           <button
//             onClick={handleLogin}
//             className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
//           >
//             Login
//           </button>

//           {error && <p className="mt-4 text-red-200 text-center">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { FaUniversity } from "react-icons/fa";
import illustration from "../../../assets/images/collegecampus-bro.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggle

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8088/api/auth/login", {
        username,
        password
      });

      const { token, role, email, uniqueId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      if (role === "student") {
        localStorage.setItem("studentRollNo", uniqueId);
      } else if (role === "admin") {
        localStorage.setItem("adminCode", uniqueId);
      } else if (role === "faculty") {
        localStorage.setItem("facultyCode", uniqueId);
      }

      toast.success("Login successful!", {
        position: "top-center",
        style: { background: "#22c55e", color: "#fff" } // green
      });

      // Delay redirect so user can see toast
      setTimeout(() => {
        switch (role) {
          case "admin":
            window.location.href = "/admin/default";
            break;
          case "faculty":
            window.location.href = "/faculty/default";
            break;
          case "student":
            window.location.href = "/student/default";
            break;
          default:
            toast.error("Invalid role", {
              position: "top-center",
              style: { background: "#ef4444", color: "#fff" } // red
            });
        }
      }, 1200);

    } catch (err) {
      toast.error("Invalid credentials or unauthorized access.", {
        position: "top-center",
        style: { background: "#ef4444", color: "#fff" } // red
      });
    }
  };

  return (
    <div className="flex h-screen w-full relative">
      <Toaster /> {/* Toast container */}

      {/* Top-Left Project Name */}
      <div className="absolute top-6 left-10 flex items-center gap-2 z-10">
        <div className="bg-white rounded-full p-4 shadow-md">
          <FaUniversity className="text-blue-600" size={28} />
        </div>
        <h2 className="text-3xl font-extrabold text-blue-600">Academix</h2>
      </div>

      {/* Left Side - Image */}
      <div className="ml-20 mr-10 w-1/2 flex items-center justify-center bg-blue-0 rounded-l-[3rem]">
        <img
          src={illustration}
          alt="Login Illustration"
          className="w-[98%] h-[98%] object-contain"
        />
      </div>

      {/* Right Side - Centered Content */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <h4 className="text-4xl font-extrabold mb-8 text-center text-blue-600 flex items-center gap-3">
          Welcome to <span className="text-black">Academix</span> 👋
        </h4>

        <div className="w-full max-w-md bg-[#3B82F6] p-10 rounded-2xl shadow-2xl text-white">
          <h3 className="text-xl font-bold mb-8 text-center">
            Login to your account..!
          </h3>

          {/* Username Field */}
          <div className="mb-6 relative">
            <span className="absolute left-3 top-3.5 text-black">
              <User size={20} />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition"
            />
          </div>

          {/* Password Field with toggle */}
          <div className="mb-6 relative">
            <span className="absolute left-3 top-3.5 text-black">
              <Lock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"} // toggle
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 py-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition"
            />
            <span
              className="absolute right-3 top-3.5 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" />
              <span>Remember me</span>
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
