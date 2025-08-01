import React, { useEffect, useState } from "react";

const MarkAttendanceScreen = ({ selectedClasses, onBack, onSubmit }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedClasses.length === 0) return;

    const { batch, courseCode } = selectedClasses[0]; // assuming same for all

    fetch(
      `http://localhost:8080/attendance/students?batch=${batch}&courseCode=${courseCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        const initial = {};
        data.forEach((s) => {
          initial[s.studentId] = "Present"; // default
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

  const handleStatusChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
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

    fetch("http://localhost:8080/attendance/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records),
    })
      .then((res) => {
        if (res.ok) {
          alert("Attendance submitted successfully!");
          onSubmit?.(records);
        } else {
          alert("Failed to submit attendance.");
        }
      })
      .catch((err) => {
        console.error("Submit failed", err);
        alert("Error occurred.");
      });
  };

  if (loading) return <div>Loading students...</div>;

  return (
    <div>
      <h2>Mark Attendance</h2>
      {students.map((student) => (
        <div key={student.studentId}>
          {student.studentName} ({student.studentId}) -{" "}
          <select
            value={attendance[student.studentId]}
            onChange={(e) =>
              handleStatusChange(student.studentId, e.target.value)
            }
          >
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default MarkAttendanceScreen;
