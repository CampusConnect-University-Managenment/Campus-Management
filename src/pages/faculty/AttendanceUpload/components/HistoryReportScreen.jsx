import React, { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 🔧 Helper functions
const toYYYYMMDD = (date) =>
  date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";

const getUniqueValues = (data, key) => [
  ...new Set(data.map((item) => item[key])),
];

const getUniqueObjects = (data, key) => {
  const map = new Map();
  data.forEach((item) => {
    if (!map.has(item[key])) map.set(item[key], item);
  });
  return Array.from(map.values());
};

const HistoryReportScreen = ({ onBack }) => {
  const [history, setHistory] = useState([]);
  const [filters, setFilters] = useState({
    date: null,
    batch: "All",
    courseCode: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5003/attendance/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  const availableDates = useMemo(
    () =>
      getUniqueValues(history, "date").sort(
        (a, b) => new Date(b) - new Date(a)
      ),
    [history]
  );

  const availableBatches = useMemo(() => {
    if (!filters.date) return [];
    const recordsOnDate = history.filter(
      (rec) => rec.date === toYYYYMMDD(filters.date)
    );
    return getUniqueValues(recordsOnDate, "batch");
  }, [history, filters.date]);

  const availableCourses = useMemo(() => {
    if (!filters.date || filters.batch === "All") return [];
    const filtered = history.filter(
      (rec) =>
        rec.date === toYYYYMMDD(filters.date) && rec.batch === filters.batch
    );
    return getUniqueObjects(filtered, "courseCode");
  }, [history, filters.date, filters.batch]);

  const showData = useMemo(
    () =>
      filters.date && filters.batch !== "All" && filters.courseCode !== "All",
    [filters]
  );

  const filteredHistory = useMemo(() => {
    if (!showData) return [];
    return history.filter(
      (rec) =>
        rec.date === toYYYYMMDD(filters.date) &&
        rec.batch === filters.batch &&
        rec.courseCode === filters.courseCode
    );
  }, [history, filters, showData]);

  const groupedRecords = useMemo(() => {
    if (!showData) return [];
    const map = new Map();
    filteredHistory.forEach((rec) => {
      if (map.has(rec.studentId)) {
        map.get(rec.studentId).hours.push(rec.hour);
      } else {
        map.set(rec.studentId, { ...rec, hours: [rec.hour] });
      }
    });
    return Array.from(map.values());
  }, [filteredHistory, showData]);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = groupedRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(groupedRecords.length / recordsPerPage);

  const handleFilterChange = (field, value) => {
    setCurrentPage(1);
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: value };
      if (field === "date") {
        newFilters.batch = "All";
        newFilters.courseCode = "All";
      }
      if (field === "batch") {
        newFilters.courseCode = "All";
      }
      return newFilters;
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 15);

    const tableColumn = [
      "Date",
      "Batch",
      "Course",
      "Hours",
      "Roll No",
      "Name",
      "Status",
    ];
    const tableRows = [];

    groupedRecords.forEach((rec) => {
      tableRows.push([
        rec.date,
        rec.batch,
        `${rec.courseCode}`,
        rec.hours.sort((a, b) => a - b).join(" & "),
        rec.studentId,
        rec.studentName,
        rec.status,
      ]);
    });

    // Use autoTable function directly
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 102, 204] },
    });

    doc.save(`attendance_report_${toYYYYMMDD(new Date())}.pdf`);
  };

  return (
    <div className="p-8 mt-20">
      <div className="pb-4 mb-6 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Attendance History
          </h2>
          <p className="mt-1 text-gray-500">
            Filter and review submitted records.
          </p>
        </div>
        <div className="flex mt-4 space-x-3 sm:mt-0">
          <button
            onClick={onBack}
            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ← Back to Upload
          </button>
          <button
            onClick={downloadPDF}
            disabled={!showData || groupedRecords.length === 0}
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 disabled:bg-red-300"
          >
            Download Filtered PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg md:grid-cols-3">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Date
          </label>
          <select
            value={toYYYYMMDD(filters.date)}
            onChange={(e) =>
              handleFilterChange("date", new Date(e.target.value))
            }
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select a Date</option>
            {availableDates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Batch
          </label>
          <select
            disabled={!filters.date}
            value={filters.batch}
            onChange={(e) => handleFilterChange("batch", e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"
          >
            <option value="All">Select Batch</option>
            {availableBatches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            disabled={!filters.date || filters.batch === "All"}
            value={filters.courseCode}
            onChange={(e) => handleFilterChange("courseCode", e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"
          >
            <option value="All">Select Course</option>
            {availableCourses.map((c) => (
              <option key={c.courseCode} value={c.courseCode}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Date",
                "Batch",
                "Course",
                "Hour(s)",
                "Roll No",
                "Student Name",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-600 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {showData && currentRecords.length > 0 ? (
              currentRecords.map((rec) => (
                <tr key={rec.studentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {rec.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {rec.batch}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {rec.courseCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700 whitespace-nowrap">
                    {rec.hours.sort((a, b) => a - b).join(" & ")}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {rec.studentId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {rec.studentName}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        rec.status === "P"
                          ? "bg-green-100 text-green-800"
                          : rec.status === "A"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  {!showData
                    ? "Please select a date, batch, and course to view records."
                    : "No records match your filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showData && groupedRecords.length > recordsPerPage && (
        <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 rounded-lg">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryReportScreen;
