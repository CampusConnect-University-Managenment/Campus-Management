import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SelectCourseScreen from "./SelectCourseScreen";
import SelectHourScreen from "./SelectHourScreen";
import MarkAttendanceScreen from "./SelectAttendanceScreen";

axios.defaults.baseURL = "http://localhost:8080";

const AttendanceUploadPage = ({ onNewSubmission, submittedHours }) => {
  const [step, setStep] = useState(1);

  const [filters, setFilters] = useState({
    date: new Date(),
    batch: "",
    courseCode: "",
  });

  const [classData, setClassData] = useState([]);
  const [availableBatches, setAvailableBatches] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [hourBlocks, setHourBlocks] = useState([]);

  const toYYYYMMDD = (dateObj) => {
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  };

  const formattedDate = useMemo(() => {
    const dateObj =
      filters.date instanceof Date ? filters.date : new Date(filters.date);
    return toYYYYMMDD(dateObj);
  }, [filters.date]);

  useEffect(() => {
    if (!formattedDate) return;
    axios
      .get("/attendance/classes/by-date", { params: { date: formattedDate } })
      .then((res) => setClassData(res.data))
      .catch((err) => {
        console.error("Class fetch failed", err);
        alert("Failed to load classes.");
      });
  }, [formattedDate]);

  useEffect(() => {
    if (!formattedDate) return;
    axios
      .get("/attendance/classes/batches", { params: { date: formattedDate } })
      .then((res) => setAvailableBatches(res.data))
      .catch((err) => {
        console.error("Batch fetch failed", err);
        setAvailableBatches([]);
      });
  }, [formattedDate]);

  useEffect(() => {
    if (!filters.batch) {
      setAvailableCourses([]);
      return;
    }
    const filtered = classData.filter((c) => c.batch === filters.batch);
    const uniqueCourses = [
      ...new Map(filtered.map((c) => [c.courseCode, c])).values(),
    ];
    setAvailableCourses(uniqueCourses);
  }, [filters.batch, classData]);

  useEffect(() => {
    if (!filters.date || !filters.batch || !filters.courseCode) return;
    const dateObj =
      filters.date instanceof Date ? filters.date : new Date(filters.date);
    const formatted = toYYYYMMDD(dateObj);
    axios
      .get("/attendance/classes/hour", {
        params: {
          date: formatted,
          batch: filters.batch,
          courseCode: filters.courseCode,
        },
      })
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.hour - b.hour);
        const grouped = sorted.reduce((acc, current) => {
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
        setHourBlocks(grouped);
      })
      .catch((err) => {
        console.error("Hour fetch failed", err);
        setHourBlocks([]);
      });
  }, [filters.date, filters.batch, filters.courseCode]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (isNaN(selectedDate)) {
      alert("Invalid date format");
      return;
    }
    setFilters({
      date: selectedDate,
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
    const selected = []
      .concat(...hourBlocks)
      .filter((c) => selectedHourIds.includes(c.id));

    setSelectedClasses(selected);

    const first = selected[0];
    if (!first) {
      alert("Please select at least one hour");
      return;
    }

    axios
      .get("/attendance/students", {
        params: {
          batch: first.batch,
          courseCode: first.courseCode,
        },
      })
      .then((res) => {
        setStudentData(res.data);
        setStep(3);
      })
      .catch((err) => {
        console.error("Student fetch failed", err);
        alert("Failed to load student data");
      });
  };

  const handleSubmit = (attendanceData) => {
    const dateStr = toYYYYMMDD(filters.date);
    const fixedSelectedClasses = selectedClasses.map((cls) => ({
      ...cls,
      id: `${dateStr}-${filters.courseCode}-${cls.hour}`,
    }));

    console.log(
      "✅ Final class IDs:",
      fixedSelectedClasses.map((c) => c.id)
    );

    axios
      .post("/attendance/submit", {
        filters,
        selectedClasses: fixedSelectedClasses,
        students: studentData,
        attendanceData,
      })
      .then((res) => {
        alert(res.data);
        onNewSubmission?.({
          filters,
          selectedClasses: fixedSelectedClasses,
          students: studentData,
          attendanceData,
        });
        setStep(1);
        setSelectedClasses([]);
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("Failed to submit attendance.");
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
