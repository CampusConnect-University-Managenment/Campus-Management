import React, { useEffect, useState } from "react";

const Notification = () => {
  const [studentRequests, setStudentRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [openSections, setOpenSections] = useState({
    Pending: true,
    "In Progress": false,
    Resolved: false,
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests");
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudentRequests(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  const toggleDescription = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleStatusUpdate = async (id, actionType) => {
    const endpoint =
      actionType === "resolve"
        ? `http://localhost:5000/api/requests/resolve/${id}`
        : `http://localhost:5000/api/requests/markAsRead/${id}`;

    try {
      const res = await fetch(endpoint, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedRequest = await res.json();

      setStudentRequests((prev) =>
        prev.map((req) =>
          req._id === id ? updatedRequest : req
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update request status.");
    }
  };

  const statuses = ["Pending", "In Progress", "Resolved"];

  const getRequestsByStatus = (status) =>
    studentRequests.filter(
      (req) =>
        (req.status || "").trim().toLowerCase() ===
        status.toLowerCase()
    );

  const toggleSection = (status) => {
    setOpenSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">HelpDesk</h1>

      {statuses.map((status) => {
        const requests = getRequestsByStatus(status);
        const isOpen = openSections[status];

        return (
          <div key={status} className="mb-6 bg-white rounded shadow">
            <button
              onClick={() => toggleSection(status)}
              className="w-full text-left p-4 font-semibold bg-blue-100 hover:bg-blue-200 rounded-t"
            >
              {status} ({requests.length})
            </button>

            {isOpen && (
              <div className="p-4 space-y-4">
                {requests.length === 0 ? (
                  <p className="text-gray-500">
                    No {status.toLowerCase()} requests available.
                  </p>
                ) : (
                  requests.map((req) => {
                    const isResolved =
                      req.status.toLowerCase() === "resolved";
                    const isRead =
                      req.status.toLowerCase() === "in progress" ||
                      isResolved;

                    const imageUrl = req.imagePath
                      ? `http://localhost:5000/api/requests/image/${req.imagePath}`
                      : null;

                    const isExpanded = expandedId === req._id;

                    return (
                      <article
                        key={req._id}
                        className={`border rounded p-4 bg-gray-50 shadow-sm transition-all duration-300 ${
                          isExpanded ? "scale-105 shadow-lg" : ""
                        }`}
                      >
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

                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Attached"
                            className="w-64 h-auto my-2 rounded shadow-md"
                          />
                        )}

                        {isExpanded ? (
                          <p>
                            <strong>Description:</strong>{" "}
                            {req.description}
                          </p>
                        ) : (
                          <p>
                            <strong>Subject:</strong> {req.subject}
                          </p>
                        )}

                        <button
                          onClick={() => toggleDescription(req._id)}
                          className="text-blue-600 text-sm mt-2"
                        >
                          {isExpanded ? "View Less" : "View More"}
                        </button>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {isResolved ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-medium">
                              Resolved
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, "resolve")
                              }
                              className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600"
                            >
                              Mark as Completed
                            </button>
                          )}

                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "read")
                            }
                            className={`px-3 py-1 rounded text-white ${
                              isRead
                                ? "bg-orange-300 opacity-50 cursor-not-allowed"
                                : "bg-orange-400 hover:bg-orange-500"
                            }`}
                            disabled={isRead}
                          >
                            Mark as Read
                          </button>
                        </div>

                        <div className="text-sm text-gray-500 mt-3">
                          ⏱{" "}
                          {new Date(req.createdAt).toLocaleString()} | ⚡{" "}
                          {req.priority}
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
