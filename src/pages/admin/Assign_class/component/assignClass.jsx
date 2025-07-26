import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AssignClass = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assignments, setAssignments] = useState([]);

  const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const courseData = {
    "Java Programming": {
      faculties: ["Dr. Smith", "Prof. Johnson", "Dr. Brown", "Prof. Taylor"],
      classes: ["IT", "CSE"],
    },
    "Python Development": {
      faculties: ["Prof. Thomas", "Dr. Jackson", "Prof. White", "Dr. Harris"],
      classes: ["CSE", "ECE"],
    },
    "Web Development": {
      faculties: ["Prof. Martin", "Dr. Thompson", "Prof. Garcia", "Dr. Martinez"],
      classes: ["IT", "MECH"],
    },
    "Data Science": {
      faculties: ["Prof. Robinson", "Dr. Clark", "Prof. Rodriguez", "Dr. Lewis"],
      classes: ["CSE", "CIVIL"],
    },
    "Cloud Computing": {
      faculties: ["Prof. Lee", "Dr. Walker", "Prof. Hall"],
      classes: ["IT", "ECE"],
    },
  };

  const courses = Object.keys(courseData);
  const faculties = selectedCourse ? courseData[selectedCourse].faculties : [];
  const classes = selectedCourse ? courseData[selectedCourse].classes : [];

  const handleConfirm = () => {
    if (selectedCourse && selectedFaculty && selectedSemester && selectedClass) {
      setAssignments((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          course: selectedCourse,
          faculty: selectedFaculty,
          semester: selectedSemester,
          enrolledClass: selectedClass,
        },
      ]);

      setSelectedCourse("");
      setSelectedFaculty("");
      setSelectedSemester("");
      setSelectedClass("");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-24">
      <Box p={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Assign Class
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Browse and assign classes for selected courses, faculty, semester, and enrolled departments.
        </Typography>

        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, maxWidth: "1000px" }}>
          <CardContent>
            <Box display="flex" gap={3} flexWrap="wrap">
              {/* Course Dropdown */}
              <FormControl sx={{ flex: 1, minWidth: 200 }}>
                <InputLabel>Select Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedFaculty("");
                    setSelectedSemester("");
                    setSelectedClass("");
                  }}
                >
                  {courses.map((course, idx) => (
                    <MenuItem key={idx} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Faculty Dropdown */}
              <FormControl sx={{ flex: 1, minWidth: 200 }} disabled={!selectedCourse}>
                <InputLabel>Select Faculty</InputLabel>
                <Select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  {faculties.map((faculty, idx) => (
                    <MenuItem key={idx} value={faculty}>
                      {faculty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Semester Dropdown */}
              <FormControl sx={{ flex: 1, minWidth: 150 }} disabled={!selectedCourse}>
                <InputLabel>Select Semester</InputLabel>
                <Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  {semesters.map((sem, idx) => (
                    <MenuItem key={idx} value={sem}>
                      {sem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Enrolled Class Dropdown */}
              <FormControl sx={{ flex: 1, minWidth: 200 }} disabled={!selectedCourse}>
                <InputLabel>Enrolled Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {classes.map((cl, idx) => (
                    <MenuItem key={idx} value={cl}>
                      {cl}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Confirm Button */}
            {selectedCourse && selectedFaculty && selectedSemester && selectedClass && (
              <Box mt={3}>
                <Button variant="contained" color="primary" onClick={handleConfirm}>
                  Confirm
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Table for All Assignments */}
        {assignments.length > 0 && (
          <Paper sx={{ mt: 5, p: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Confirmed Assignments
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Faculty</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Enrolled Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.course}</TableCell>
                    <TableCell>{item.faculty}</TableCell>
                    <TableCell>{item.semester}</TableCell>
                    <TableCell>{item.enrolledClass}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default AssignClass;
