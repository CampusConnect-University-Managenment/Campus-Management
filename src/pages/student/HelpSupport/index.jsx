

import React, { useState } from "react";

export default function HelpSupport() {
  const [formState, setFormState] = useState({
    name: "John Doe",
    registerNumber: "21CSR015",
    department: "Computer Science",
    type: "Academic",
    location: "",
    priority: "Medium",
    description: "",
  });

  const [previousRequests, setPreviousRequests] = useState([
    {
      id: 1,
      type: "Hostel",
      location: "Block B",
      priority: "High",
      status: "Pending",
      description: "Fan not working",
      createdAt: "2025-07-20T09:30:00",
    },
    {
      id: 2,
      type: "Facilities",
      location: "Library",
      priority: "Low",
      status: "In Progress",
      description: "WiFi is slow",
      createdAt: "2025-07-18T14:00:00",
    },
    {
      id: 3,
      type: "Academic",
      location: "Academic Hall",
      priority: "Medium",
      status: "In Progress",
      description: "Need projector maintenance",
      createdAt: "2025-07-17T12:00:00",
    },
    {
      id: 4,
      type: "Hostel",
      location: "Block D",
      priority: "High",
      status: "Pending",
      description: "Water leakage",
      createdAt: "2025-07-16T08:00:00",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: previousRequests.length + 1,
      ...formState,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setPreviousRequests([newRequest, ...previousRequests]);
    setFormState((prev) => ({
      ...prev,
      type: "Academic",
      location: "",
      priority: "Medium",
      description: "",
    }));
  };

  const filteredRequests =
    filterStatus === "All"
      ? previousRequests
      : previousRequests.filter((r) => r.status === filterStatus);

  const paginatedRequests = filteredRequests.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const locationOptions =
    formState.type === "Hostel"
      ? [
          "Block A",
          "Block B",
          "Block C",
          "Block D",
          "Block E",
          "Block F",
          "Block G",
          "Mess A",
          "Mess B",
        ]
      : [
          "Academic Hall",
          "Library",
          "Cafeteria",
          "Block A",
          "Block B",
          "Block C",
          "Block D",
          "Block E",
        ];

  return (
    <div className="px-6 pt-24 pb-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">🛠 Help & Support</h1>
      <p className="text-gray-600 mb-6">
        Fill out the form below and our support team will get back to you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4 border"
      >
        <input
          type="text"
          name="name"
          value={formState.name}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
        <input
          type="text"
          name="registerNumber"
          value={formState.registerNumber}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
        <input
          type="text"
          name="department"
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

      {/* Previous Requests with Pagination */ }
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
                key={req.id}
                className="border p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-lg">{req.type}</p>
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
              </div>
            ))}
            {/* Pagination Buttons */ }
            <div className="flex justify-between pt-4">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={(page + 1) * pageSize >= filteredRequests.length}
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
