import React, { useEffect, useState } from "react";
import "./MarkAttendanceScreen.css"; // for styling (see below)

const MarkAttendanceScreen = ({ selectedClasses, onBack, onSubmit }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedClasses.length === 0) return;

    const { batch, courseCode } = selectedClasses[0];

    fetch(
      `http://localhost:5003/attendance/students?batch=${batch}&courseCode=${courseCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        const initial = {};
        data.forEach((s) => {
          initial[s.studentId] = "P";
        });
        setAttendance(initial);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch students", err);
        alert("Failed to load student list.");
        setLoading(false);
      });
  }, [selectedClasses]);

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const records = [];

    selectedClasses.forEach((cls) => {
      const formattedDate = new Date(cls.date).toISOString().split("T")[0];

      students.forEach((student) => {
        records.push({
          studentId: student.studentId,
          studentName: student.studentName,
          batch: cls.batch,
          courseCode: cls.courseCode,
          date: formattedDate,
          hour: cls.hour,
          status: attendance[student.studentId],
        });
      });
    });

    fetch("http://localhost:5003/attendance/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records),
    })
      .then(async (res) => {
        if (res.ok) {
          alert("Attendance submitted successfully!");
          onSubmit?.(records);
        } else {
          const errMsg = await res.text();
          console.error("Backend error:", errMsg);
          alert("Failed to submit attendance.");
        }
      })
      .catch((err) => {
        console.error("Submit failed", err);
        alert("Error occurred while submitting.");
      });
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="attendance-container">
      <h2 className="title">Mark Attendance</h2>
      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th className="p">P</th>
              <th className="a">A</th>
              <th className="od">OD</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.studentId}>
                <td>{index + 1}</td>
                <td>{s.studentId}</td>
                <td>{s.studentName}</td>
                {["P", "A", "OD"].map((status) => (
                  <td key={status}>
                    <input
                      type="checkbox"
                      checked={attendance[s.studentId] === status}
                      onChange={() => handleStatusChange(s.studentId, status)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceScreen;
