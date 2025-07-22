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

  const [studentRequests, setStudentRequests] = useState([
    { id: 1, studentName: "Alex Johnson", type: "Classroom Issue", description: "Air conditioning not working in Room 205", department: "CS", priority: "Medium" },
    { id: 2, studentName: "Maria Garcia", type: "Teacher Feedback", description: "Excellent teaching methods by Prof. Smith", department: "IT", priority: "Low" },
    { id: 3, studentName: "John Smith", type: "Classroom Issue", description: "Projector malfunction in Lab 3", department: "ECE", priority: "High" },
    { id: 4, studentName: "Emma Wilson", type: "Teacher Feedback", description: "Request for additional practice sessions", department: "EEE", priority: "Medium" },
    { id: 5, studentName: "Ryan Lee", type: "Classroom Issue", description: "Broken chair in Room 101", department: "CS", priority: "Low" },
    { id: 6, studentName: "Olivia Brown", type: "Classroom Issue", description: "Wi-Fi connectivity issues in Library", department: "IT", priority: "Medium" },
    { id: 7, studentName: "Ethan Davis", type: "Teacher Feedback", description: "Needs additional office hours for Math", department: "ECE", priority: "High" },
    { id: 8, studentName: "Sophia Martinez", type: "Classroom Issue", description: "Leaking ceiling in Lab 1", department: "CS", priority: "High" },
    { id: 9, studentName: "Liam Thompson", type: "Teacher Feedback", description: "Prof. Allen explains very clearly", department: "EEE", priority: "Low" },
    { id: 10, studentName: "Mason Clark", type: "Classroom Issue", description: "No power supply in Room 210", department: "ECE", priority: "High" },
    { id: 11, studentName: "Ava Rodriguez", type: "Teacher Feedback", description: "More examples needed in programming class", department: "CS", priority: "Medium" },
    { id: 12, studentName: "Noah Walker", type: "Classroom Issue", description: "Whiteboard markers missing", department: "IT", priority: "Low" },
    { id: 13, studentName: "Isabella Hall", type: "Classroom Issue", description: "Computer lab PCs very slow", department: "ECE", priority: "Medium" },
    { id: 14, studentName: "James Allen", type: "Teacher Feedback", description: "Request for additional lab sessions", department: "EEE", priority: "Medium" },
    { id: 15, studentName: "Charlotte King", type: "Classroom Issue", description: "Printer not working in library", department: "IT", priority: "High" },
     { id: 11, studentName: "Ava Rodriguez", type: "Teacher Feedback", description: "More examples needed in programming class", department: "CS", priority: "Medium" },
    { id: 12, studentName: "Noah Walker", type: "Classroom Issue", description: "Whiteboard markers missing", department: "IT", priority: "Low" },
    { id: 13, studentName: "Isabella Hall", type: "Classroom Issue", description: "Computer lab PCs very slow", department: "ECE", priority: "Medium" },
    { id: 14, studentName: "James Allen", type: "Teacher Feedback", description: "Request for additional lab sessions", department: "EEE", priority: "Medium" },
    { id: 15, studentName: "Charlotte King", type: "Classroom Issue", description: "Printer not working in library", department: "IT", priority: "High" },
  ]);

  const [selectedTab, setSelectedTab] = useState("students");
  const [studentPage, setStudentPage] = useState(1);
  const [facultyPage, setFacultyPage] = useState(1);
  const itemsPerPage = 15;

  const handleApproveLeave = (requestId) => {
    setFacultyLeaveRequests(facultyLeaveRequests.filter((req) => req.id !== requestId));
  };

  const handleDeclineLeave = (requestId) => {
    setFacultyLeaveRequests(facultyLeaveRequests.filter((req) => req.id !== requestId));
  };

  const handleMarkCompleted = (requestId) => {
    setStudentRequests(studentRequests.filter((req) => req.id !== requestId));
  };

  const paginate = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPaginationControls = (page, setPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div style={{ textAlign: "center", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            fontSize: "18px",
            padding: "6px 12px",
            backgroundColor: page === 1 ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: page === 1 ? "default" : "pointer",
            width: "40px",
            height: "40px",
          }}
        >
          ←
        </button>
        <span style={{ fontWeight: "bold" }}>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{
            fontSize: "18px",
            padding: "6px 12px",
            backgroundColor: page === totalPages ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: page === totalPages ? "default" : "pointer",
            width: "40px",
            height: "40px",
          }}
        >
          →
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-full">
      <div ref={ref} style={{ padding: "1rem", fontFamily: "Segoe UI, Roboto, sans-serif" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "#333" }}>HELP DESK</h1>

        {/* Toggle Buttons */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <button
            onClick={() => {
              setSelectedTab("students");
              setStudentPage(1);
            }}
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
            onClick={() => {
              setSelectedTab("faculty");
              setFacultyPage(1);
            }}
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

        {/* Student Requests */}
        {selectedTab === "students" && (
          <section>
            <h2 style={{ fontWeight: "600", fontSize: "20px", marginBottom: "10px", color: "#444" }}>Student Requests</h2>
            {paginate(
              [...studentRequests].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
              studentPage
            ).map((req) => (
              <article
                key={req.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  lineHeight: "1.5",
                }}
              >
                <p><strong>Name:</strong> {req.studentName}</p>
                <p><strong>Department:</strong> {req.department}</p>
                <p><strong>Priority:</strong> {req.priority}</p>
                <p><strong>Message:</strong> {req.description}</p>
                <button
                  onClick={() => handleMarkCompleted(req.id)}
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✅ Mark as Completed
                </button>
              </article>
            ))}

            {renderPaginationControls(studentPage, setStudentPage, studentRequests.length)}
          </section>
        )}

        {/* Faculty Leave Requests */}
        {selectedTab === "faculty" && (
          <section>
            <h2 style={{ fontWeight: "600", fontSize: "20px", marginBottom: "10px", color: "#444" }}>Faculty Leave Requests</h2>
            {paginate(facultyLeaveRequests, facultyPage).map((req) => (
              <article
                key={req.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  lineHeight: "1.5",
                }}
              >
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Department:</strong> {req.department}</p>
                <p><strong>Reason:</strong> {req.reason}</p>
                <p><strong>Duration:</strong> {formatDate(req.startDate)} to {formatDate(req.endDate)}</p>
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => handleApproveLeave(req.id)}
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
            ))}

            {renderPaginationControls(facultyPage, setFacultyPage, facultyLeaveRequests.length)}
          </section>
        )}
      </div>
    </div>
  );
};

export default Notification;
