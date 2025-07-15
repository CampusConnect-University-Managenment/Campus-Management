import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

// Helper function to format date
const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Priority order for sorting
const priorityOrder = { High: 1, Medium: 2, Low: 3 };

const Notification = () => {
  const { ref } = useInView({ triggerOnce: true });

  const [facultyLeaveRequests, setFacultyLeaveRequests] = useState([
    {
      id: 1,
      name: "Dr. Sarah Martinez",
      department: "Computer Science",
      reason: "Medical Leave",
      startDate: "20/1/2025",
      endDate: "27/1/2025",
    },
    {
      id: 2,
      name: "Prof. David Kumar",
      department: "IT",
      reason: "Conference Attendance",
      startDate: "22/1/2025",
      endDate: "25/1/2025",
    },
    {
      id: 3,
      name: "Dr. Jennifer Park",
      department: "ECE",
      reason: "Personal Emergency",
      startDate: "18/1/2025",
      endDate: "20/1/2025",
    },
  ]);

  const [studentRequests] = useState([
    {
      id: 1,
      studentName: "Alex Johnson",
      type: "Classroom Issue",
      description: "Air conditioning not working in Room 205",
      department: "CS",
      priority: "Medium",
    },
    {
      id: 2,
      studentName: "Maria Garcia",
      type: "Teacher Feedback",
      description: "Excellent teaching methods by Prof. Smith",
      department: "IT",
      priority: "Low",
    },
    {
      id: 3,
      studentName: "John Smith",
      type: "Classroom Issue",
      description: "Projector malfunction in Lab 3",
      department: "ECE",
      priority: "High",
    },
    {
      id: 4,
      studentName: "Emma Wilson",
      type: "Teacher Feedback",
      description: "Request for additional practice sessions",
      department: "EEE",
      priority: "Medium",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("students");

  const handleApproveLeave = (requestId) => {
    setFacultyLeaveRequests(facultyLeaveRequests.filter((req) => req.id !== requestId));
  };

  const handleDeclineLeave = (requestId) => {
    setFacultyLeaveRequests(facultyLeaveRequests.filter((req) => req.id !== requestId));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-full">
    <div ref={ref} style={{ padding: "1rem", fontFamily: "Segoe UI, Roboto, sans-serif" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
          color: "#333",
        }}
      >
        HELP DESK
      </h1>

      {/* Toggle Buttons */}
      <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <button
          onClick={() => setSelectedTab("students")}
          aria-label="Show student requests"
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            backgroundColor: selectedTab === "students" ? "#1976d2" : "#e0e0e0",
            color: selectedTab === "students" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Students
        </button>
        <button
          onClick={() => setSelectedTab("faculty")}
          aria-label="Show faculty leave requests"
          style={{
            padding: "8px 16px",
            backgroundColor: selectedTab === "faculty" ? "#1976d2" : "#e0e0e0",
            color: selectedTab === "faculty" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Faculty
        </button>
      </div>

      {/* Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        {/* Student Requests */}
        {selectedTab === "students" && (
          <section>
            <h2 style={{ fontWeight: "600", fontSize: "20px", marginBottom: "10px", color: "#444" }}>
              Student Requests
            </h2>
            {[...studentRequests]
              .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
              .map((req) => (
                <article
                  key={req.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <strong>{req.studentName}</strong> ({req.department})<br />
                  <span><strong>Type:</strong> {req.type}</span><br />
                  <span><strong>Priority:</strong> {req.priority}</span>
                  <p style={{ marginTop: "4px" }}>{req.description}</p>
                </article>
              ))}
          </section>
        )}

        {/* Faculty Leave Requests */}
        {selectedTab === "faculty" && (
          <section>
            <h2 style={{ fontWeight: "600", fontSize: "20px", marginBottom: "10px", color: "#444" }}>
              Faculty Leave Requests
            </h2>
            {facultyLeaveRequests.length === 0 ? (
              <p>No pending requests.</p>
            ) : (
              facultyLeaveRequests.map((req) => (
                <article
                  key={req.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <strong>{req.name}</strong> ({req.department})<br />
                  <span><strong>Reason:</strong> {req.reason}</span><br />
                  <span><strong>Duration:</strong> {formatDate(req.startDate)} to {formatDate(req.endDate)}</span>
                  <div style={{ marginTop: "8px" }}>
                    <button
                      onClick={() => handleApproveLeave(req.id)}
                      aria-label={`Approve leave for ${req.name}`}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleDeclineLeave(req.id)}
                      aria-label={`Decline leave for ${req.name}`}
                      style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      ❌ Decline
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        )}
      </div>
    </div>
    </div>
  );
};

export default Notification;
