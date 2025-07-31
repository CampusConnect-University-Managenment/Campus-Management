import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SelectCourseScreen from "./SelectCourseScreen";
import SelectHourScreen from "./SelectHourScreen";
import MarkAttendanceScreen from "./AttendanceManager";

// ✅ Set backend base URL
axios.defaults.baseURL = "http://localhost:8080";

const AttendanceUploadPage = ({ onNewSubmission, submittedHours }) => {
  const [step, setStep] = useState(1);

  const [filters, setFilters] = useState({
    date: new Date(),
    batch: "",
    courseCode: "",
  });

  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const formattedDate = useMemo(() => {
    return new Date(filters.date).toISOString().split("T")[0]; // yyyy-MM-dd
  }, [filters.date]);

  const dayOfWeek = useMemo(() => {
    return new Date(filters.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  }, [filters.date]);

  // ✅ Fetch class schedule data by date
  useEffect(() => {
    if (!formattedDate) return;

    axios
      .get("/attendance/classes/by-date", { params: { date: formattedDate } })
      .then((res) => setClassData(res.data))
      .catch((err) => {
        console.error("Class fetch failed", err);
        alert("Failed to load classes. Check backend API.");
      });
  }, [formattedDate]);

  // ✅ Fetch student list
  useEffect(() => {
    if (filters.batch && filters.courseCode) {
      axios
        .get("/attendance/students", {
          params: {
            batch: filters.batch,
            courseCode: filters.courseCode,
          },
        })
        .then((res) => setStudentData(res.data))
        .catch((err) => console.error("Failed to fetch students", err));
    }
  }, [filters.batch, filters.courseCode]);

  // ✅ Utility Functions
  const getUniqueValues = (data, key) => [
    ...new Set(data.map((item) => item[key])),
  ];

  const getUniqueObjects = (arr, key) => [
    ...new Map(arr.map((item) => [item[key], item])).values(),
  ];

  // ✅ Derived data
  const availableBatches = useMemo(
    () => getUniqueValues(classData, "batch"),
    [classData]
  );

  const classesForBatch = useMemo(
    () => classData.filter((c) => c.batch === filters.batch),
    [classData, filters.batch]
  );

  const availableCourses = useMemo(
    () => getUniqueObjects(classesForBatch, "courseCode"),
    [classesForBatch]
  );

  const hourBlocks = useMemo(() => {
    const filtered = classData
      .filter(
        (c) =>
          c.courseCode === filters.courseCode &&
          c.batch === filters.batch &&
          c.day === dayOfWeek &&
          !submittedHours.includes(c.id)
      )
      .sort((a, b) => a.hour - b.hour);

    return filtered.reduce((acc, current) => {
      const lastGroup = acc[acc.length - 1];
      if (
        lastGroup &&
        current.hour === lastGroup[lastGroup.length - 1].hour + 1
      ) {
        lastGroup.push(current);
      } else {
        acc.push([current]);
      }
      return acc;
    }, []);
  }, [classData, filters, dayOfWeek, submittedHours]);

  // ✅ Handlers
  const handleDateChange = (e) => {
    setFilters({
      date: new Date(e.target.value),
      batch: "",
      courseCode: "",
    });
  };

  const handleBatchChange = (e) =>
    setFilters((prev) => ({
      ...prev,
      batch: e.target.value,
      courseCode: "",
    }));

  const handleCourseChange = (e) =>
    setFilters((prev) => ({
      ...prev,
      courseCode: e.target.value,
    }));

  const handleProceedToHourSelection = () => setStep(2);

  const handleHourSelect = (selectedHourIds) => {
    const selected = classData.filter((c) => selectedHourIds.includes(c.id));
    setSelectedClasses(selected);
    setStep(3);
  };

  const handleSubmit = (attendanceData) => {
    axios
      .post("/attendance/submit", {
        filters,
        selectedClasses,
        students: studentData,
        attendanceData,
      })
      .then((res) => {
        alert(res.data);
        onNewSubmission?.({
          filters,
          selectedClasses,
          students: studentData,
          attendanceData,
        });
        setStep(1);
        setSelectedClasses([]);
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Error submitting attendance.");
      });
  };

  const goBack = () => {
    if (step === 3) setSelectedClasses([]);
    setStep((prev) => prev - 1);
  };

  return (
    <>
      {step === 1 && (
        <SelectCourseScreen
          filters={filters}
          handleDateChange={handleDateChange}
          handleBatchChange={handleBatchChange}
          handleCourseChange={handleCourseChange}
          onProceed={handleProceedToHourSelection}
          availableBatches={availableBatches}
          availableCourses={availableCourses}
        />
      )}
      {step === 2 && (
        <SelectHourScreen
          onProceed={handleHourSelect}
          onBack={goBack}
          hourBlocks={hourBlocks}
        />
      )}
      {step === 3 && (
        <MarkAttendanceScreen
          selectedClasses={selectedClasses}
          students={studentData}
          onBack={goBack}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AttendanceUploadPage;
