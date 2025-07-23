import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AssignClass = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assignments, setAssignments] = useState([]); // store multiple assignments

  // Map courses to faculties and enrolled classes
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
    if (selectedCourse && selectedFaculty && selectedClass) {
      setAssignments((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          course: selectedCourse,
          faculty: selectedFaculty,
          enrolledClass: selectedClass,
        },
      ]);

      // Reset dropdowns for next assignment
      setSelectedCourse("");
      setSelectedFaculty("");
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
        Browse and assign classes for selected courses, faculty, and enrolled
        departments.
      </Typography>

      {/* Selection Form */}
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, maxWidth: "900px" }}>
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
            <FormControl
              sx={{ flex: 1, minWidth: 200 }}
              disabled={!selectedCourse}
            >
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

            {/* Enrolled Class Dropdown */}
            <FormControl
              sx={{ flex: 1, minWidth: 200 }}
              disabled={!selectedCourse}
            >
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
          {selectedCourse && selectedFaculty && selectedClass && (
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
                <TableCell>Enrolled Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.faculty}</TableCell>
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
