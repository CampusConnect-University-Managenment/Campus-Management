import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line
} from 'recharts';

const Performance = () => {
  const student = {
    name: "John Doe",
    branch: "CSE",
    rollNo: "CS2021-045",
    semester: "5th",
    college: "ABC Engineering College",
    course: "B.Tech - Computer Science",
    grades: {
      "Data Structures": "A",
      "Operating Systems": "B+",
      "DBMS": "A-",
      "Computer Networks": "A"
    },
    sports: "Football - State Level",
    competitions: [
      { name: "Inter-College Quiz", year: 2024, position: "1st" },
      { name: "Hackathon", year: 2023, position: "Top 10%" }
    ]
  };

  const allowedBranches = ["CSE", "IT", "CST", "CD"];

  const gradeToValue = {
    "A+": 95, "A": 90, "A-": 85,
    "B+": 80, "B": 75, "B-": 70,
    "C+": 65, "C": 60, "C-": 55
  };

  const gradeData = Object.entries(student.grades).map(([subject, grade]) => ({
    subject: subject.toUpperCase(),
    score: gradeToValue[grade] || 50
  }));

  const weeklyProgress = [
    { week: "Week 1", score: 80 },
    { week: "Week 2", score: 83 },
    { week: "Week 3", score: 87 },
    { week: "Week 4", score: 92 },
    { week: "Week 5", score: 90 },
    { week: "Week 6", score: 93 },
    { week: "Week 7", score: 95 },
  ];

  if (!allowedBranches.includes(student.branch)) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "red" }}>
          Performance data is only available for CSE, IT, CST, and CD branches.
        </h2>
      </div>
    );
  }

  // Reusable Title Component Style
  const sectionTitle = (icon, text, color) => ({
    fontSize: "22px",
    borderLeft: `5px solid ${color}`,
    paddingLeft: "10px",
    color: "#333",
    marginBottom: "16px"
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
        {student.name} ({student.branch}) – Performance Dashboard
      </h1>

      {/* College Info Section */}
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        backgroundColor: "#f9f9f9"
      }}>
        <h2 style={sectionTitle("🎓", "College Info", "#4287f5")}>🎓 College Info</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.8em" }}>
          <li><strong>College:</strong> {student.college}</li>
          <li><strong>Course:</strong> {student.course}</li>
          <li><strong>Semester:</strong> {student.semester}</li>
          <li><strong>Roll Number:</strong> {student.rollNo}</li>
        </ul>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginBottom: "40px" }}>
        {/* Grades Bar Chart */}
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "480px" }}>
          <h2 style={sectionTitle("📘", "Subject Grades", "#4287f5")}>📘 Subject Grades (CSE Core)</h2>
          <BarChart width={500} height={300} data={gradeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              angle={-30}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="score" fill="#4287f5" />
          </BarChart>
        </div>

        {/* Week-End Test Scores Line Chart */}
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", flex: 1, minWidth: "480px" }}>
          <h2 style={sectionTitle("📊", "Test Progress", "#f59e0b")}>📊 Week-End Test Scores</h2>
          <LineChart width={500} height={300} data={weeklyProgress} margin={{ top: 20, right: 30, left: 50, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12 }}
              label={{ value: "Test Week", position: "bottom", offset: 10 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{
                value: "Test Score (out of 100)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" }
              }}
            />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </div>
      </div>

      {/* Sports Participation */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
        <h2 style={sectionTitle("🏅", "Sports", "#f59e0b")}>🏅 Sports Participation</h2>
        <p>{student.sports}</p>
      </div>

      {/* Competitions */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
        <h2 style={sectionTitle("🏆", "Competitions", "#4287f5")}>🏆 Competitions</h2>
        <ul>
          {student.competitions.map((comp, i) => (
            <li key={i}>{comp.name} ({comp.year}) – {comp.position}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Performance;
