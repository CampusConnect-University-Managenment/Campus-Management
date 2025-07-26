import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const Notification = () => {
  const { ref } = useInView({ triggerOnce: true });

  const [studentRequests, setStudentRequests] = useState([
    { id: 1, studentName: "Alex Johnson", rollNo: "CS2021001", location: "Block A", subject: "AC not working in Room 205", description: "The air conditioning unit in Room 205 has stopped functioning since yesterday. Students are finding it very difficult to concentrate in the class due to the heat. Requesting urgent maintenance.", department: "CS", priority: "Medium", read: false },
    { id: 2, studentName: "Maria Garcia", rollNo: "IT2021002", location: "Block B", subject: "Praise for Prof. Smith", description: "Prof. Smith has been using innovative teaching techniques that help students understand concepts much faster. She incorporates interactive sessions and real-life examples, making the classes engaging and productive.", department: "IT", priority: "Low", read: false },
    { id: 3, studentName: "John Smith", rollNo: "ECE2021003", location: "Block C", subject: "Projector malfunction in Lab 3", description: "The projector in Lab 3 has stopped turning on. Multiple students have reported being unable to view lecture slides, and several classes have already been delayed due to this technical issue.", department: "ECE", priority: "High", read: false },
    { id: 4, studentName: "Emma Wilson", rollNo: "EEE2021004", location: "Block A", subject: "Need more practice sessions", description: "Students are struggling to keep up with lab assignments and would appreciate additional practice sessions, particularly before exams, to clarify doubts and practice more problems.", department: "EEE", priority: "Medium", read: false },
    { id: 5, studentName: "Ryan Lee", rollNo: "CS2021005", location: "Block B", subject: "Broken chair in Room 101", description: "One of the chairs in Room 101 is broken and poses a safety hazard. Students are avoiding using it as it wobbles and could break further, causing injury.", department: "CS", priority: "Low", read: false },
    { id: 6, studentName: "Olivia Brown", rollNo: "IT2021006", location: "Library", subject: "Wi-Fi issues in Library", description: "Wi-Fi connectivity in the library has been intermittent for the past week, making it difficult for students to access online study materials and complete assignments.", department: "IT", priority: "Medium", read: false },
    { id: 7, studentName: "Ethan Davis", rollNo: "ECE2021007", location: "Block C", subject: "Need extra office hours", description: "Students in the ECE department are finding the Math module challenging and have requested that the professor hold additional office hours to provide more guidance.", department: "ECE", priority: "High", read: false },
    { id: 8, studentName: "Sophia Martinez", rollNo: "CS2021008", location: "Lab 1", subject: "Leaking ceiling in Lab 1", description: "Water leakage from the ceiling in Lab 1 has become a recurring issue, especially during rains, creating unsafe conditions for students and equipment.", department: "CS", priority: "High", read: false },
    { id: 9, studentName: "Liam Thompson", rollNo: "EEE2021009", location: "Room 103", subject: "Appreciation for Prof. Allen", description: "Prof. Allen explains concepts with clarity and patience. Students find his classes easy to follow, even for complex topics, and wanted to share their appreciation.", department: "EEE", priority: "Low", read: false },
    { id: 10, studentName: "Mason Clark", rollNo: "ECE2021010", location: "Room 210", subject: "No power in Room 210", description: "The electrical power supply in Room 210 is non-functional. Classes have been interrupted multiple times due to this, and students cannot use any equipment.", department: "ECE", priority: "High", read: false },
    { id: 11, studentName: "Ava Rodriguez", rollNo: "CS2021011", location: "Lab 5", subject: "Need more programming examples", description: "Students have requested additional examples in programming classes as the current examples are too few and do not cover enough real-world scenarios.", department: "CS", priority: "Medium", read: false },
    { id: 12, studentName: "Noah Walker", rollNo: "IT2021012", location: "IT Block", subject: "Whiteboard markers missing", description: "Most classrooms in the IT block lack working whiteboard markers. Professors often have to borrow markers from other rooms, disrupting classes.", department: "IT", priority: "Low", read: false },
    { id: 13, studentName: "Isabella Hall", rollNo: "ECE2021013", location: "ECE Lab", subject: "Slow computer lab PCs", description: "The PCs in the ECE computer lab are very slow, making it difficult for students to complete lab work efficiently. Many systems frequently hang during use.", department: "ECE", priority: "Medium", read: false },
    { id: 14, studentName: "James Allen", rollNo: "EEE2021014", location: "Lab 2", subject: "Request for more lab sessions", description: "Students in EEE would like additional lab sessions to better prepare for practical exams and to clarify doubts in person.", department: "EEE", priority: "Medium", read: false },
    { id: 15, studentName: "Charlotte King", rollNo: "IT2021015", location: "Library", subject: "Printer not working in Library", description: "The main printer in the library has been out of service for three days. Students are unable to print notes or assignments, causing inconvenience.", department: "IT", priority: "High", read: false },
  ]);

  const [studentPage, setStudentPage] = useState(1);
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [expandedId, setExpandedId] = useState(null);
  const itemsPerPage = 15;

  const handleMarkCompleted = (id) =>
    setStudentRequests(studentRequests.filter((r) => r.id !== id));
  const handleMarkRead = (id) =>
    setStudentRequests(studentRequests.map((r) => r.id === id ? { ...r, read: true } : r));
  const toggleDescription = (id) =>
    setExpandedId(expandedId === id ? null : id);

  const paginate = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const buttonStyle = (disabled) => ({
    fontSize: "18px",
    padding: "6px 12px",
    backgroundColor: disabled ? "#ccc" : "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: disabled ? "default" : "pointer",
    width: "40px",
    height: "40px",
  });

  const renderPaginationControls = (page, setPage, totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div style={{ textAlign: "center", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={buttonStyle(page === 1)}>←</button>
        <span style={{ fontWeight: "bold" }}>{page} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={buttonStyle(page === totalPages)}>→</button>
      </div>
    );
  };

  const filteredRequests = paginate(
    studentRequests.filter((r) => r.priority === selectedPriority),
    studentPage
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border h-full">
      <div ref={ref} style={{ padding: "1rem", fontFamily: "Segoe UI, Roboto, sans-serif" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "#333" }}>HELP DESK</h1>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          {["High", "Medium", "Low"].map((priority) => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority)}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedPriority === priority ? "#1976d2" : "#e0e0e0",
                color: selectedPriority === priority ? "#fff" : "#333",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {priority} Priority
            </button>
          ))}
        </div>

        <section>
          <h2 style={{ fontWeight: "600", fontSize: "20px", marginBottom: "10px", color: "#444", textAlign: "center" }}>
            {selectedPriority} Priority Requests
          </h2>

          {filteredRequests.map((req) => (
            <article
              key={req.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: req.read ? "#e6ffe6" : "#f9f9f9",
                lineHeight: "1.5",
              }}
            >
              <p><strong>Name:</strong> {req.studentName}</p>
              <p><strong>Roll No.:</strong> {req.rollNo}</p>
              <p><strong>Department:</strong> {req.department}</p>
              <p><strong>Location:</strong> {req.location}</p>

              <p style={{ display: "flex", alignItems: "center", gap: "6px", maxWidth: "100%", marginBottom: "5px" }}>
                <strong>Subject:</strong>
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {req.subject}
                </span>
              </p>

              <button
                onClick={() => toggleDescription(req.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1976d2",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginBottom: "5px",
                }}
              >
                {expandedId === req.id ? "Hide" : "View More"}
              </button>

              {expandedId === req.id && (
                <p style={{ marginTop: "5px", whiteSpace: "pre-line" }}>
                  <strong>Description:</strong> {req.description}
                </p>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  onClick={() => handleMarkCompleted(req.id)}
                  style={{ backgroundColor: "#4caf50", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleMarkRead(req.id)}
                  style={{ backgroundColor: "#ff9800", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                >
                  Mark as Read
                </button>
              </div>
            </article>
          ))}
        </section>

        {renderPaginationControls(studentPage, setStudentPage, studentRequests.filter((r) => r.priority === selectedPriority).length)}
      </div>
    </div>
  );
};

export default Notification;
