import React, { useState, useEffect } from "react";

const Notification = ({ isAdminView = false }) => {
  const [priority, setPriority] = useState("High");
  const [studentRequests, setStudentRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [readIds, setReadIds] = useState(new Set());
  const [completedIds, setCompletedIds] = useState(new Set());

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests");
        const data = await res.json();
        setStudentRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, []);

  const toggleDescription = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleStatusUpdate = async (id, actionType) => {
    if (actionType === "read") {
      setReadIds((prev) => new Set([...prev, id]));
    } else if (actionType === "resolve") {
      setCompletedIds((prev) => new Set([...prev, id]));
    }

    const endpoint =
      actionType === "resolve"
        ? `http://localhost:5000/api/requests/resolve/${id}`
        : `http://localhost:5000/api/requests/markAsRead/${id}`;

    try {
      const res = await fetch(endpoint, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to update status");

      const updatedRequest = await res.json();

      if (actionType === "resolve") {
        setStudentRequests((prev) => prev.filter((req) => req.id !== id));
      } else if (actionType === "read") {
        setStudentRequests((prev) =>
          prev.map((req) => (req.id === id ? updatedRequest : req))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Status update failed");
    }
  };

  const filteredRequests = studentRequests.filter(
    (req) => req.priority === priority && req.status !== "Resolved"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-[100px]">
      <h1 className="text-2xl font-bold mb-6 text-center">HELP DESK</h1>

      <div className="flex justify-center space-x-4 mb-4">
        {["High", "Medium", "Low"].map((level) => (
          <button
            key={level}
            onClick={() => {
              setPriority(level);
              setExpandedId(null);
            }}
            className={`px-4 py-2 rounded ${
              priority === level
                ? level === "High"
                  ? "bg-blue-600 text-white"
                  : level === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {level} Priority
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        {priority} Priority Requests
      </h2>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          No {priority.toLowerCase()} priority requests available.
        </p>
      ) : (
        filteredRequests.map((req) => (
          <article key={req.id} className="bg-white p-4 mb-4 rounded shadow">
            <p>
              <strong>Name:</strong> {req.name}
            </p>
            <p>
              <strong>Roll No.:</strong> {req.registerNumber}
            </p>
            <p>
              <strong>Department:</strong> {req.department}
            </p>
            <p>
              <strong>Location:</strong> {req.location}
            </p>

            {expandedId === req.id ? (
              <p>
                <strong>Description:</strong> {req.description}
              </p>
            ) : (
              <p>
                <strong>Subject:</strong>{" "}
                {req.subject || (req.description?.slice(0, 50) + "...")}
              </p>
            )}

            <button
              onClick={() => toggleDescription(req.id)}
              className="text-blue-600 text-sm mt-2"
            >
              {expandedId === req.id ? "View Less" : "View More"}
            </button>

            <div className="mt-4 flex space-x-2">
              {/* ✅ Mark as Completed / Resolved Label */}
              {(isAdminView && completedIds.has(req.id)) ||
              req.status === "Resolved" ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-medium">
                  Resolved
                </span>
              ) : (
                <button
                  onClick={() => handleStatusUpdate(req.id, "resolve")}
                  className="px-3 py-1 rounded text-white transition bg-green-500 hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              )}

              {/* ✅ Mark as Read */}
              <button
                onClick={() => handleStatusUpdate(req.id, "read")}
                className={`px-3 py-1 rounded text-white transition ${
                  readIds.has(req.id) || completedIds.has(req.id)
                    ? "bg-orange-300 opacity-50 cursor-not-allowed pointer-events-none"
                    : "bg-orange-400 hover:bg-orange-500"
                }`}
                disabled={readIds.has(req.id) || completedIds.has(req.id)}
              >
                Mark as Read
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default Notification;
