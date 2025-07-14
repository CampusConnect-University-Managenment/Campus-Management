import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const Performance = () => {
  const student = {
    name: "John Doe",
    attendance: 92,
    grades: {
      math: "A",
      physics: "B+",
      chemistry: "A-",
      english: "A"
    },
    sports: "Football - State Level",
    competitions: [
      { name: "Inter-College Quiz", year: 2024, position: "1st" },
      { name: "Hackathon", year: 2023, position: "Top 10%" }
    ]
  };

  const gradeToValue = {
    "A+": 95, "A": 90, "A-": 85,
    "B+": 80, "B": 75, "B-": 70,
    "C+": 65, "C": 60, "C-": 55
  };

  const gradeData = Object.entries(student.grades).map(([subject, grade]) => ({
    subject: subject.toUpperCase(),
    score: gradeToValue[grade] || 50
  }));

  const attendanceData = [
    { name: "Present", value: student.attendance },
    { name: "Absent", value: 100 - student.attendance }
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  const weeklyProgress = [
    { week: "Week 1", score: 80 },
    { week: "Week 2", score: 83 },
    { week: "Week 3", score: 87 },
    { week: "Week 4", score: 92 },
    { week: "Week 5", score: 90 },
    { week: "Week 6", score: 93 },
    { week: "Week 7", score: 95 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Student Performance Analysis
      </h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Attendance Pie Chart */}
 <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
  <h2>Attendance</h2>
  <PieChart width={300} height={220}>
    <Pie
      data={attendanceData}
      cx={150}
      cy={100}
      outerRadius={70}
      dataKey="value"
      labelLine={false}
    >
      {attendanceData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
  </PieChart>
  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
    <div style={{ color: COLORS[0], fontWeight: "bold" }}>● Present</div>
    <div style={{ color: COLORS[1], fontWeight: "bold" }}>● Absent</div>
  </div>
</div>


        {/* Grades Bar Chart */}
        <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
          <h2>Grades</h2>
          <BarChart
            width={400}
            height={250}
            data={gradeData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "30px" }}>
        {/* Weekly Progress Line Chart */}
        <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
          <h2>Weekly Progress</h2>
          <LineChart
            width={400}
            height={250}
            data={weeklyProgress}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Radar Chart for Subject Strength */}
        <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
          <h2>Subject Strength</h2>
          <RadarChart outerRadius={90} width={400} height={250} data={gradeData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </div>
      </div>

      {/* Sports Participation */}
      <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginTop: "20px" }}>
        <h2>Sports Participation</h2>
        <p>{student.sports}</p>
      </div>

      {/* Competitions */}
      <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginTop: "20px" }}>
        <h2>Competitions</h2>
        <ul>
          {student.competitions.map((comp, i) => (
            <li key={i}>
              {comp.name} ({comp.year}) - {comp.position}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Performance;
