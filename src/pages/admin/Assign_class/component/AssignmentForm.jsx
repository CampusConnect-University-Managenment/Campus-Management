import { useEffect, useState } from "react";
import axios from "axios";

const romanToInt = (roman) => {
  const map = { I: 1, II: 2, III: 3, IV: 4 };
  return map[roman] || 0;
};

const getSemesterNumber = (year, semester) => {
  const yearNum = romanToInt(year);
  const semNum = semester === "I" ? 1 : 2;
  return ((yearNum - 1) * 2 + semNum).toString();
};

const AssignmentForm = ({ onCreateAssignment, courseToAssignedStudents = {} }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableFaculties, setAvailableFaculties] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [rawStudents, setRawStudents] = useState([]);

  const years = ["I", "II", "III", "IV"];
  const semesterOptionsPerYear = {
    I: [{ value: "I", label: "Semester I" }, { value: "II", label: "Semester II" }],
    II: [{ value: "III", label: "Semester III" }, { value: "IV", label: "Semester IV" }],
    III: [{ value: "V", label: "Semester V" }, { value: "VI", label: "Semester VI" }],
    IV: [{ value: "VII", label: "Semester VII" }, { value: "VIII", label: "Semester VIII" }],
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDepartment && selectedYear && selectedSemester) {
        const semesterNumber = getSemesterNumber(selectedYear, selectedSemester);

        try {
          // 1. Get real courses
          const courseRes = await axios.get(`http://localhost:8081/admin/courses`, {
            params: {
              department: selectedDepartment,
              year: selectedYear,
              semester: semesterNumber,
            },
          });
          const courseList = courseRes.data.data || [];
          setAvailableCourses(courseList.map((course) => course.courseCode));

          // 2. Get dummy students/faculties
          const dummyRes = await axios.get(`http://localhost:8081/admin/class-assignments/assignable`, {
            params: { year: selectedYear, department: selectedDepartment, semester: semesterNumber },
          });
          const dummyData = dummyRes.data.data || {};
          setAvailableFaculties(dummyData.faculties || []);
          setRawStudents(dummyData.students || []);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchData();
  }, [selectedDepartment, selectedYear, selectedSemester]);

  // 🔁 Filter students dynamically whenever selected course or rawStudents changes
  useEffect(() => {
    if (selectedCourse && rawStudents.length > 0) {
      const alreadyAssigned = courseToAssignedStudents[selectedCourse] || new Set();
      const filtered = rawStudents.filter((s) => !alreadyAssigned.has(s.roll));
      setAvailableStudents(filtered);
    } else {
      setAvailableStudents([]);
    }
  }, [selectedCourse, rawStudents, courseToAssignedStudents]);

  const handleConfirm = () => {
    if (selectedCourse && selectedFaculty && selectedYear && selectedSemester && selectedDepartment) {
      const newAssignment = {
        course: selectedCourse,
        faculty: selectedFaculty,
        year: selectedYear,
        semester: selectedSemester,
        department: selectedDepartment,
        students: availableStudents,
        selectedStudents: [],
        page: 0,
        rowsPerPage: 20,
        isConfirmed: false,
      };
      onCreateAssignment(newAssignment);

      // Reset
      setSelectedCourse("");
      setSelectedFaculty("");
      setSelectedYear("");
      setSelectedSemester("");
      setSelectedDepartment("");
      setAvailableCourses([]);
      setAvailableFaculties([]);
      setAvailableStudents([]);
      setRawStudents([]);
    }
  };

  const semesterOptions = selectedYear ? semesterOptionsPerYear[selectedYear] : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Assignment</h2>

{selectedYear && selectedSemester && selectedDepartment && selectedCourse && (
  <h3 className="text-md font-medium text-gray-700 mb-4">
    Assignment for {selectedYear} Year - Semester {selectedSemester} - {selectedDepartment} Department - Course: {selectedCourse}
  </h3>
)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSemester("");
              setSelectedDepartment("");
              setSelectedCourse("");
              setSelectedFaculty("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose a year</option>
            {years.map((year, idx) => (
              <option key={idx} value={year}>Year {year}</option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setSelectedDepartment("");
              setSelectedCourse("");
              setSelectedFaculty("");
            }}
            disabled={!selectedYear}
            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          >
            <option value="">Choose a semester</option>
            {semesterOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedCourse("");
              setSelectedFaculty("");
            }}
            disabled={!selectedYear || !selectedSemester}
            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          >
            <option value="">Choose a department</option>
            {["IT", "CSE", "ECE", "EEE", "MECH", "CIVIL"].map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedFaculty("");
            }}
            disabled={availableCourses.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          >
            <option value="">Choose a course</option>
            {availableCourses.map((course, idx) => (
              <option key={idx} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Faculty</label>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            disabled={availableFaculties.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          >
            <option value="">Choose a faculty</option>
            {availableFaculties.map((faculty, idx) => (
              <option key={idx} value={faculty}>{faculty}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCourse && selectedFaculty && selectedYear && selectedSemester && selectedDepartment && (
        <div className="mt-4">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentForm;
