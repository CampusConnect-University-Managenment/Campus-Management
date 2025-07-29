// import React, { useState, useEffect } from "react";

// export default function HelpSupport() {
//   const [formState, setFormState] = useState({
//     name: "Riya Sharma",
//     registerNumber: "21CSE019",
//     department: "Computer Science",
//     type: "Academic", // renamed from issueType
//     location: "",
//     priority: "Medium",
//     subject: "",
//     description: "",
//   });

//   const [previousRequests, setPreviousRequests] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [page, setPage] = useState(0);
//   const pageSize = 3;

//   useEffect(() => {
//     fetchRequests(filterStatus);
//   }, [filterStatus]);

//   const fetchRequests = async (status = "All") => {
//     try {
//       let url =
//         status === "All"
//           ? `http://localhost:5000/api/requests/student/${formState.registerNumber}`
//           : `http://localhost:5000/api/requests/student/${formState.registerNumber}?status=${status}`;

//       const res = await fetch(url);
//       const data = await res.json();
//       setPreviousRequests(Array.isArray(data) ? data.reverse() : []);
//     } catch (err) {
//       console.error("Error fetching requests", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "subject") {
//       const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
//       if (wordCount > 20) return;
//     }

//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newRequest = {
//       ...formState,
//       status: "Pending",
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/requests/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newRequest),
//       });

//       if (res.ok) {
//         fetchRequests(); // refresh list
//         setFormState((prev) => ({
//           ...prev,
//           type: "Academic",
//           location: "",
//           priority: "Medium",
//           subject: "",
//           description: "",
//         }));
//       } else {
//         throw new Error("Request submission failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   const paginatedRequests = previousRequests.slice(
//     page * pageSize,
//     page * pageSize + pageSize
//   );

//   const locationOptions =
//     formState.type === "Hostel"
//       ? ["Block A", "Block B", "Block C", "Block D", "Block E", "Block F"]
//       : ["Academic Hall", "Library", "Cafeteria", "Block A", "Block B"];

//   return (
//     <div className="px-6 pt-24 pb-10 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold text-blue-700 mb-2">🛠 Help & Support</h1>
//       <p className="text-gray-600 mb-6">
//         Fill out the form below and our support team will get back to you.
//       </p>

//       {/* ✅ Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-lg shadow p-6 space-y-4 border"
//       >
//         <input type="text" value={formState.name} readOnly className="w-full p-3 border rounded bg-gray-100" />
//         <input type="text" value={formState.registerNumber} readOnly className="w-full p-3 border rounded bg-gray-100" />
//         <input type="text" value={formState.department} readOnly className="w-full p-3 border rounded bg-gray-100" />

//         <select name="type" value={formState.type} onChange={handleChange} className="w-full p-3 border rounded" required>
//           <option value="Academic">Academic</option>
//           <option value="Facilities">Facilities</option>
//           <option value="Hostel">Hostel</option>
//         </select>

//         <select name="location" value={formState.location} onChange={handleChange} className="w-full p-3 border rounded" required>
//           <option value="">Select Location</option>
//           {locationOptions.map((loc) => (
//             <option key={loc} value={loc}>{loc}</option>
//           ))}
//         </select>

//         <select
//           name="priority"
//           value={formState.priority}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//           required
//         >
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//         </select>

//         <div>
//           <input
//             type="text"
//             name="subject"
//             value={formState.subject}
//             onChange={handleChange}
//             className="w-full p-3 border rounded"
//             placeholder="Specify your issue (max 20 words)"
//             required
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             {formState.subject.trim().split(/\s+/).filter(Boolean).length}/20 words
//           </p>
//         </div>

//         <textarea
//           name="description"
//           value={formState.description}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//           placeholder="Describe your issue..."
//           rows="4"
//           required
//         />

//         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit Request</button>
//       </form>

//       {/* ✅ Previous Requests Section */}
//       <div className="mt-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-blue-700">📋 Previous Requests</h2>
//           <select
//             value={filterStatus}
//             onChange={(e) => {
//               setPage(0);
//               setFilterStatus(e.target.value);
//             }}
//             className="border p-2 rounded"
//           >
//             <option value="All">All</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
//         </div>

//         {paginatedRequests.length === 0 ? (
//           <p className="text-gray-500">No requests found.</p>
//         ) : (
//           <div className="space-y-4">
//             {paginatedRequests.map((req) => (
//               <div key={req.id || req._id} className="border p-4 rounded-md bg-gray-50 shadow-sm">
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="font-medium text-lg">{req.type}</p>
//                     <p className="text-sm font-semibold">📌 {req.subject}</p>
//                     <p className="text-gray-600 text-sm">{req.description}</p>
//                   </div>
//                   <span
//                     className={`font-semibold text-sm px-2 py-1 rounded ${
//                       req.status === "Resolved"
//                         ? "bg-green-100 text-green-600"
//                         : req.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-blue-100 text-blue-600"
//                     }`}
//                   >
//                     {req.status}
//                   </span>
//                 </div>
//                 <div className="text-sm text-gray-500 mt-2">
//                   📍 {req.location} | ⚡ {req.priority} | 🕒 {new Date(req.createdAt).toLocaleString()}
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-between pt-4">
//               <button disabled={page === 0} onClick={() => setPage((prev) => prev - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
//                 Previous
//               </button>
//               <button disabled={(page + 1) * pageSize >= previousRequests.length} onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function HelpSupport() {
  const [formState, setFormState] = useState({
    name: "Riya Sharma",
    registerNumber: "21CSE019",
    department: "Computer Science",
    type: "Academic",
    location: "",
    priority: "Medium",
    subject: "",
    description: "",
  });

  const [previousRequests, setPreviousRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    fetchRequests(filterStatus);
  }, [filterStatus]);

  const fetchRequests = async (status = "All") => {
    try {
      let url =
        status === "All"
          ? `http://localhost:5000/api/requests/student/${formState.registerNumber}`
          : `http://localhost:5000/api/requests/student/${formState.registerNumber}?status=${status}`;

      const res = await fetch(url);
      const data = await res.json();
      setPreviousRequests(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subject") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 20) return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      ...formState,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (res.ok) {
        fetchRequests(); // refresh list
        setFormState((prev) => ({
          ...prev,
          type: "Academic",
          location: "",
          priority: "Medium",
          subject: "",
          description: "",
        }));
      } else {
        throw new Error("Request submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  const paginatedRequests = previousRequests.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const locationOptions =
    formState.type === "Hostel"
      ? ["Block A", "Block B", "Block C", "Block D", "Block E", "Block F"]
      : ["Academic Hall", "Library", "Cafeteria", "Block A", "Block B"];

  return (
    <div className="px-6 pt-24 pb-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">🛠 Help & Support</h1>
      <p className="text-gray-600 mb-6">
        Fill out the form below and our support team will get back to you.
      </p>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4 border"
      >
        <input
          type="text"
          value={formState.name}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
        <input
          type="text"
          value={formState.registerNumber}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
        <input
          type="text"
          value={formState.department}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />

        <select
          name="type"
          value={formState.type}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="Academic">Academic</option>
          <option value="Facilities">Facilities</option>
          <option value="Hostel">Hostel</option>
        </select>

        <select
          name="location"
          value={formState.location}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Location</option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          name="priority"
          value={formState.priority}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div>
          <input
            type="text"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Specify your issue (max 20 words)"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formState.subject.trim().split(/\s+/).filter(Boolean).length}/20
            words
          </p>
        </div>

        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Describe your issue..."
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>

      {/* ✅ Previous Requests Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            📋 Previous Requests
          </h2>
          <select
            value={filterStatus}
            onChange={(e) => {
              setPage(0);
              setFilterStatus(e.target.value);
            }}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {paginatedRequests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <div className="space-y-4">
            {paginatedRequests.map((req) => (
              <div
                key={req.id || req._id}
                className="border p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-lg">{req.type}</p>
                    <p className="text-sm font-semibold">📌 {req.subject}</p>
                    <p className="text-gray-600 text-sm">{req.description}</p>
                  </div>
                  <span
                    className={`font-semibold text-sm px-2 py-1 rounded ${
                      req.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  📍 {req.location} | ⚡ {req.priority} | 🕒{" "}
                  {new Date(req.createdAt).toLocaleString()}
                </div>

                {/* ✅ Show faculty response if resolved */}
                {req.status === "Resolved" && req.responseMessage && (
                  <div className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded">
                    <strong>Faculty Response:</strong>{" "}
                    {req.responseMessage}
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={(page + 1) * pageSize >= previousRequests.length}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
