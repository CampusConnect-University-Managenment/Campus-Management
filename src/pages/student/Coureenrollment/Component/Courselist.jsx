import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";

const dummyCourses = [
  { name: "HTML & CSS Fundamentals", code: "FS101", credit: 3 },
  { name: "JavaScript & ES6", code: "FS102", credit: 3 },
  { name: "ReactJS", code: "FS103", credit: 4 },
  { name: "NodeJS & ExpressJS", code: "FS104", credit: 4 },
  { name: "MongoDB", code: "FS105", credit: 3 },
  { name: "REST API Development", code: "FS106", credit: 3 },
  { name: "Git & GitHub", code: "FS107", credit: 2 },
  { name: "Deployment with Heroku/Vercel", code: "FS108", credit: 2 },
];

const CourseList = () => {
  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCheckboxChange = (code) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleSubmit = () => {
    const enrolled = dummyCourses.filter((course) => selectedCourses[course.code]);
    alert("Enrolled Courses:\n" + enrolled.map((c) => c.name).join(", "));
  };

  return (
    <div style={{ backgroundColor: "#e6f0ff", minHeight: "100vh", paddingTop: "130px" }}>
      <Container
        fluid
        className="d-flex flex-column align-items-center"
        style={{ paddingLeft: "100px", paddingRight: "100px" }}
      >
        {/* Heading */}
        <h2 className="fw-bold mb-4 text-center" style={{ fontSize: "2rem" }}>
          Course Enrollment
        </h2>

        {/* Table Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <Table
            bordered
            hover
            responsive
            className="mb-0"
            style={{ fontSize: "1.05rem", borderCollapse: "collapse", width: "100%" }}
          >
<thead className="text-center">
  <tr
    style={{
      backgroundColor: "#0F1B4C",
      color: "white",
      fontSize: "1.15rem", // Increased font size
      paddingTop: "8px",
      paddingBottom: "8px",
    }}
  >
    <th style={{ textAlign: "left", borderRight: "1px solid #ccc", padding: "10px" }}>
      Course Name
    </th>
    <th style={{ borderRight: "1px solid #ccc", padding: "10px" }}>Course Code</th>
    <th style={{ borderRight: "1px solid #ccc", padding: "10px" }}>Credit</th>
    <th style={{ padding: "10px" }}>Status</th>
  </tr>
</thead>


       <tbody>
  {dummyCourses.map((course, index) => (
    <tr
      key={course.code}
      style={{
        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Zebra striping
        lineHeight: "2.5rem", // Row spacing
        borderBottom: "1px solid #ccc", // Row line
      }}
    >
      <td style={{ textAlign: "left", borderRight: "1px solid #ccc" }}>{course.name}</td>
      <td style={{ textAlign: "center", borderRight: "1px solid #ccc" }}>{course.code}</td>
      <td style={{ textAlign: "center", borderRight: "1px solid #ccc" }}>{course.credit}</td>
      <td style={{ textAlign: "center" }}>
        <Form.Check
          type="checkbox"
          checked={selectedCourses[course.code] || false}
          onChange={() => handleCheckboxChange(course.code)}
        />
      </td>
    </tr>
  ))}
</tbody>


          </Table>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{
              color: "white",
              fontWeight: "bold",
              padding: "8px 30px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#0F1B4C",
              borderColor: "#0d6efd",
              width: "auto",
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CourseList;
