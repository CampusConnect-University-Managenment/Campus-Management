import React from "react";

/* ---------- HELPER FUNCTION (Inlined) ---------- */
const toYYYYMMDD = (date) =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";
/* ---------------------------------------------- */

const SelectCourseScreen = ({
  filters,
  handleDateChange,
  handleBatchChange,
  handleCourseChange,
  onProceed,
  availableBatches,
  availableCourses,
}) => {
  const canProceed = filters.date && filters.batch && filters.courseCode;

  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Select Class Details
        </h2>
        <p className="text-gray-500">
          Choose the date, batch, and course to continue.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg md:grid-cols-3">
        <div>
          <label
            htmlFor="attendance-date"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="attendance-date"
            value={toYYYYMMDD(filters.date)}
            onChange={handleDateChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Batch
          </label>
          <select
            value={filters.batch}
            onChange={handleBatchChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Batch</option>
            {availableBatches.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            value={filters.courseCode}
            onChange={handleCourseChange}
            disabled={!filters.batch}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
          >
            <option value="">Select Course</option>
            {availableCourses.map((course) => (
              <option key={course.courseCode} value={course.courseCode}>
                {course.courseCode} - {course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={onProceed}
          disabled={!canProceed}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Select Hour(s) →
        </button>
      </div>
    </div>
  );
};

export default SelectCourseScreen;
