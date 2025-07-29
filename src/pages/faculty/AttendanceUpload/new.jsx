import React, { useState, useMemo, useEffect } from 'react';

// --- MOCK DATA (Updated with student enrollments) ---
const masterTimetable = [
  { id: 1, day: 'Monday', batch: '2021-2025', department: 'CSE', courseCode: 'CS202', courseName: 'Data Structures', hour: 3, time: '10:30 AM - 11:30 AM' },
  { id: 2, day: 'Monday', batch: '2021-2025', department: 'CSE', courseCode: 'CS202', courseName: 'Data Structures', hour: 4, time: '11:30 AM - 12:30 PM' },
  { id: 3, day: 'Monday', batch: '2022-2026', department: 'MECH', courseCode: 'ME101', courseName: 'Thermodynamics', hour: 2, time: '09:30 AM - 10:30 AM' },
  { id: 4, day: 'Tuesday', batch: '2021-2025', department: 'CSE', courseCode: 'CS204', courseName: 'Web Technologies', hour: 1, time: '08:30 AM - 09:30 AM' },
  { id: 5, day: 'Tuesday', batch: '2021-2025', department: 'ECE', courseCode: 'EC202', courseName: 'Digital Circuits', hour: 2, time: '09:30 AM - 10:30 AM' },
  { id: 6, day: 'Wednesday', batch: '2021-2025', department: 'CSE', courseCode: 'GE101', courseName: 'Professional Ethics', hour: 1, time: '08:30 AM - 09:30 AM' },
  { id: 7, day: 'Wednesday', batch: '2021-2025', department: 'ECE', courseCode: 'GE101', courseName: 'Professional Ethics', hour: 1, time: '08:30 AM - 09:30 AM' },
];

// NEW: Student list now includes an 'enrolledCourses' array for accurate filtering.
const mockStudentList = [
  { id: '21CS001', name: 'Priya Sharma', batch: '2021-2025', department: 'CSE', enrolledCourses: ['CS202', 'CS204', 'GE101'] },
  { id: '21CS002', name: 'Rohan Gupta', batch: '2021-2025', department: 'CSE', enrolledCourses: ['CS202', 'CS204'] },
  { id: '21EC015', name: 'Suresh Kumar', batch: '2021-2025', department: 'ECE', enrolledCourses: ['EC202', 'GE101']},
  { id: '22ME034', name: 'Anjali Verma', batch: '2022-2026', department: 'MECH', enrolledCourses: ['ME101'] },
];

// --- HELPER FUNCTIONS ---
const getUniqueObjects = (arr, key) => [...new Map(arr.map(item => [item[key], item])).values()];
const getUniqueValues = (data, key) => [...new Set(data.map(item => item[key]))];
const toYYYYMMDD = (date) => date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : '';
const getDayString = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long' });


// =================================================================================================
// UPLOAD WIZARD: PARENT CONTAINER (Updated student filtering logic)
// =================================================================================================
const AttendanceUploadPage = ({ onNewSubmission, submittedHours }) => {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({ date: new Date(), batch: '', courseCode: '' });
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Filter logic for dropdowns remains the same
  const dayOfWeek = useMemo(() => getDayString(filters.date), [filters.date]);
  const classesOnSelectedDay = useMemo(() => masterTimetable.filter(c => c.day === dayOfWeek), [dayOfWeek]);
  const availableBatches = useMemo(() => getUniqueValues(classesOnSelectedDay, 'batch'), [classesOnSelectedDay]);
  const classesForSelectedBatch = useMemo(() => {
    if (!filters.batch) return [];
    return classesOnSelectedDay.filter(c => c.batch === filters.batch);
  }, [classesOnSelectedDay, filters.batch]);
  const availableCourses = useMemo(() => getUniqueObjects(classesForSelectedBatch, 'courseCode'), [classesForSelectedBatch]);

  // NEW: Rewritten logic to get students based on their actual enrollment.
  const studentsToDisplay = useMemo(() => {
    if (!filters.batch || !filters.courseCode) return [];
    
    // Filter students who are in the selected batch AND have the course code in their personal enrollment list.
    return mockStudentList.filter(student => 
      student.batch === filters.batch &&
      student.enrolledCourses.includes(filters.courseCode)
    );
  }, [filters.batch, filters.courseCode]);

  // Grouping logic for consecutive hours remains the same
  const hourBlocks = useMemo(() => {
    const availableHours = masterTimetable
      .filter(c => c.courseCode === filters.courseCode && c.day === dayOfWeek && c.batch === filters.batch && !submittedHours.includes(c.id))
      .sort((a, b) => a.hour - b.hour);
    if (availableHours.length === 0) return [];
    return availableHours.reduce((acc, currentHour) => {
      const lastBlock = acc[acc.length - 1];
      if (lastBlock && currentHour.hour === lastBlock[lastBlock.length - 1].hour + 1) {
        lastBlock.push(currentHour);
      } else {
        acc.push([currentHour]);
      }
      return acc;
    }, []);
  }, [filters.courseCode, dayOfWeek, filters.batch, submittedHours]);

  // --- Handlers ---
  const handleDateChange = (e) => setFilters({ date: new Date(e.target.value), batch: '', courseCode: '' });
  const handleBatchChange = (e) => setFilters(prev => ({ ...prev, batch: e.target.value, courseCode: '' }));
  const handleCourseChange = (e) => setFilters(prev => ({ ...prev, courseCode: e.target.value }));
  const handleProceedToHourSelection = () => setStep(2);
  const handleHourSelect = (selectedHourIds) => {
    setSelectedClasses(masterTimetable.filter(c => selectedHourIds.includes(c.id)));
    setStep(3);
  };
  const handleSubmit = (attendanceData) => {
    onNewSubmission({ filters, selectedClasses, students: studentsToDisplay, attendanceData });
    alert('Attendance submitted successfully!');
    setStep(1);
    setSelectedClasses([]);
  };
  const goBack = () => {
    if (step === 3) setSelectedClasses([]);
    setStep(prev => prev - 1);
  };
  
  return (
    <>
      {step === 1 && <SelectCourseScreen filters={filters} handleDateChange={handleDateChange} handleBatchChange={handleBatchChange} handleCourseChange={handleCourseChange} onProceed={handleProceedToHourSelection} availableBatches={availableBatches} availableCourses={availableCourses} />}
      {step === 2 && <SelectHourScreen onProceed={handleHourSelect} onBack={goBack} hourBlocks={hourBlocks} />}
      {step === 3 && <MarkAttendanceScreen selectedClasses={selectedClasses} students={studentsToDisplay} onBack={goBack} onSubmit={handleSubmit} />}
    </>
  );
};


// =================================================================================================
// ALL OTHER COMPONENTS (No changes were needed for them)
// =================================================================================================

const HistoryReportScreen = ({ history, onBack }) => {
  const [filters, setFilters] = useState({ date: null, batch: 'All', courseCode: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const availableDates = useMemo(() => getUniqueValues(history, 'date').sort((a, b) => new Date(b) - new Date(a)), [history]);
  const availableBatches = useMemo(() => { if (!filters.date) return []; const recordsOnDate = history.filter(rec => rec.date === toYYYYMMDD(filters.date)); return getUniqueValues(recordsOnDate, 'batch'); }, [history, filters.date]);
  const availableCourses = useMemo(() => { if (!filters.date || filters.batch === 'All') return []; const recordsForBatch = history.filter(rec => rec.date === toYYYYMMDD(filters.date) && rec.batch === filters.batch); return getUniqueObjects(recordsForBatch, 'courseCode'); }, [history, filters.date, filters.batch]);
  const showData = useMemo(() => filters.date && filters.batch !== 'All' && filters.courseCode !== 'All', [filters]);
  const filteredHistory = useMemo(() => { if (!showData) return []; return history.filter(rec => rec.date === toYYYYMMDD(filters.date) && rec.batch === filters.batch && rec.courseCode === filters.courseCode); }, [history, filters, showData]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredHistory.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredHistory.length / recordsPerPage);
  const handleFilterChange = (field, value) => { setCurrentPage(1); setFilters(prev => { const newFilters = { ...prev, [field]: value }; if (field === 'date') { newFilters.batch = 'All'; newFilters.courseCode = 'All'; } if (field === 'batch') { newFilters.courseCode = 'All'; } return newFilters; }); };
  const downloadCSV = () => { if (filteredHistory.length === 0) return; const headers = ['Date', 'Batch', 'Course Code', 'Course Name', 'Hour', 'Roll No', 'Student Name', 'Status']; const csvContent = [headers.join(','), ...filteredHistory.map(row => [row.date, row.batch, row.courseCode, `"${row.courseName}"`, row.hour, row.studentId, row.studentName, row.status].join(','))].join('\n'); const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement('a'); const url = URL.createObjectURL(blob); link.setAttribute('href', url); link.setAttribute('download', `attendance_history_${toYYYYMMDD(new Date())}.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link); };
  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200 sm:flex sm:items-center sm:justify-between"><div><h2 className="text-2xl font-bold text-gray-800">Attendance History</h2><p className="mt-1 text-gray-500">Filter and review submitted records.</p></div><div className="flex mt-4 space-x-3 sm:mt-0"><button onClick={onBack} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">← Back to Upload</button><button onClick={downloadCSV} disabled={!showData || filteredHistory.length === 0} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 disabled:bg-green-300">Download Filtered CSV</button></div></div>
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg md:grid-cols-3"><div><label className="block mb-1 text-sm font-medium text-gray-700">Date</label><select value={toYYYYMMDD(filters.date)} onChange={e => handleFilterChange('date', new Date(e.target.value))} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"><option value="">Select a Date</option>{availableDates.map(d => <option key={d} value={d}>{d}</option>)}</select></div><div><label className="block mb-1 text-sm font-medium text-gray-700">Batch</label><select disabled={!filters.date} value={filters.batch} onChange={e => handleFilterChange('batch', e.target.value)} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"><option value="All">Select Batch</option>{availableBatches.map(b => <option key={b} value={b}>{b}</option>)}</select></div><div><label className="block mb-1 text-sm font-medium text-gray-700">Course</label><select disabled={!filters.date || filters.batch === 'All'} value={filters.courseCode} onChange={e => handleFilterChange('courseCode', e.target.value)} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"><option value="All">Select Course</option>{availableCourses.map(c => <option key={c.courseCode} value={c.courseCode}>{c.courseCode} - {c.courseName}</option>)}</select></div></div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg"><table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr>{['Date', 'Batch', 'Course', 'Hour', 'Roll No', 'Student Name', 'Status'].map(header => <th key={header} className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-600 uppercase">{header}</th>)}</tr></thead><tbody className="bg-white divide-y divide-gray-200">{showData && currentRecords.length > 0 ? currentRecords.map((rec, index) => (<tr key={index} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{rec.date}</td><td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{rec.batch}</td><td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{rec.courseCode}</td><td className="px-6 py-4 text-sm text-center text-gray-700 whitespace-nowrap">{rec.hour}</td><td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{rec.studentId}</td><td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{rec.studentName}</td><td className="px-6 py-4 text-sm font-semibold whitespace-nowrap"><span className={`px-2 py-1 text-xs rounded-full ${rec.status === 'P' ? 'bg-green-100 text-green-800' : rec.status === 'A' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{rec.status}</span></td></tr>)) : (<tr><td colSpan="7" className="p-8 text-center text-gray-500">{!showData ? "Please select a date, batch, and course to view records." : "No records match your filters."}</td></tr>)}</tbody></table></div>
      {showData && filteredHistory.length > recordsPerPage && (<div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 rounded-lg"><button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Previous</button><div className="text-sm text-gray-700">Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span></div><button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Next</button></div>)}
    </div>
  );
};

const SelectCourseScreen = ({ filters, handleDateChange, handleBatchChange, handleCourseChange, onProceed, availableBatches, availableCourses }) => {
  const canProceed = filters.date && filters.batch && filters.courseCode;
  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200"><h2 className="text-2xl font-bold text-gray-800">Select Class Details</h2><p className="text-gray-500">Choose the date, batch, and course to continue.</p></div>
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg md:grid-cols-3"><div><label htmlFor="attendance-date" className="block mb-1 text-sm font-medium text-gray-700">Date</label><input type="date" id="attendance-date" value={toYYYYMMDD(filters.date)} onChange={handleDateChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/></div><div><label className="block mb-1 text-sm font-medium text-gray-700">Batch</label><select value={filters.batch} onChange={handleBatchChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value="">Select Batch</option>{availableBatches.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div><div><label className="block mb-1 text-sm font-medium text-gray-700">Course</label><select value={filters.courseCode} onChange={handleCourseChange} disabled={!filters.batch} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"><option value="">Select Course</option>{availableCourses.map(course => <option key={course.courseCode} value={course.courseCode}>{course.courseCode} - {course.courseName}</option>)}</select></div></div>
      <div className="flex justify-end mt-8"><button onClick={onProceed} disabled={!canProceed} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">Select Hour(s) →</button></div>
    </div>
  );
};

const SelectHourScreen = ({ onProceed, onBack, hourBlocks }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const handleCheckboxChange = (block) => { setSelectedBlock(prevBlock => (prevBlock === block ? null : block)); };
  const formatBlockText = (block) => { const hours = block.map(h => h.hour); const ordinals = {1: 'st', 2: 'nd', 3: 'rd'}; const formatHour = (h) => `${h}${ordinals[h] || 'th'}`; if (hours.length === 1) { return `${formatHour(hours[0])} Hour (${block[0].time})`; } const hourText = hours.map(formatHour).join(' & '); return `${hourText} Hours (${block[0].time.split(' - ')[0]} - ${block[block.length-1].time.split(' - ')[1]})`; };
  const courseInfo = hourBlocks[0]?.[0];
  const selectedHourIds = selectedBlock ? selectedBlock.map(h => h.id) : [];
  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200"><h2 className="text-2xl font-bold text-gray-800">Select Hour Block</h2>{courseInfo && <p className="text-gray-500">Choose the class hours for {courseInfo.courseCode} - {courseInfo.courseName}.</p>}</div>
      <div className="space-y-4">{hourBlocks.length > 0 ? hourBlocks.map((block, index) => (<label key={index} className="flex items-center p-5 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"><input type="checkbox" checked={selectedBlock === block} onChange={() => handleCheckboxChange(block)} className="w-5 h-5 mr-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/><h3 className="text-lg font-semibold text-gray-900">{formatBlockText(block)}</h3></label>)) : <p className="p-4 text-center text-gray-500 bg-gray-100 rounded-md">No available hours for this course, or attendance has already been submitted.</p>}</div>
      <div className="flex justify-between mt-8"><button onClick={onBack} className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">← Back</button><button onClick={() => onProceed(selectedHourIds)} disabled={selectedHourIds.length === 0} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300">Proceed →</button></div>
    </div>
  );
};

const MarkAttendanceScreen = ({ selectedClasses, students, onBack, onSubmit }) => {
  const [attendance, setAttendance] = useState({});
  useEffect(() => { setAttendance(students.reduce((acc, student) => ({ ...acc, [student.id]: 'P' }), {})) }, [students]);
  const handleStatusChange = (studentId, status) => setAttendance(prev => ({ ...prev, [studentId]: status }));
  const selectedHoursText = selectedClasses.map(c => c.hour).sort((a,b)=>a-b).map(h => `${h}${ {1:'st',2:'nd',3:'rd'}[h] || 'th' }`).join(' & ');
  const courseInfo = selectedClasses[0];
  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200">{courseInfo && <h2 className="text-2xl font-bold text-gray-800">Mark Attendance: {courseInfo.courseCode}</h2>}<p className="text-gray-500"><strong>Hour(s):</strong> {selectedHoursText}</p></div>
      <div className="overflow-hidden border border-gray-200 rounded-lg"><table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr>{['S.No', 'Roll No', 'Student Name', 'Status'].map(header => <th key={header} className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-600 uppercase">{header}</th>)}</tr></thead><tbody className="bg-white divide-y divide-gray-200">{students.map((student, index) => (<tr key={student.id} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td><td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td><td className="px-6 py-4 text-sm text-gray-800">{student.name}</td><td className="px-6 py-4"><div className="flex items-center space-x-4">{['P', 'A', 'OD'].map(status => (<label key={status} className="flex items-center space-x-2 text-sm cursor-pointer"><input type="radio" name={`status_${student.id}`} checked={attendance[student.id] === status} onChange={() => handleStatusChange(student.id, status)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/><span>{status}</span></label>))}</div></td></tr>))}</tbody></table></div>
      <div className="flex justify-between mt-8"><button onClick={onBack} className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">← Back</button><button onClick={() => onSubmit(attendance)} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">Submit</button></div>
    </div>
  );
};

const AttendanceManager = () => {
  const [view, setView] = useState('upload');
  const [attendanceHistory, setAttendanceHistory] = useState(() => { try { const savedHistory = localStorage.getItem('attendanceHistory'); return savedHistory ? JSON.parse(savedHistory) : []; } catch (error) { console.error("Failed to parse attendance history:", error); return []; } });
  useEffect(() => { localStorage.setItem('attendanceHistory', JSON.stringify(attendanceHistory)); }, [attendanceHistory]);
  const submittedHours = useMemo(() => getUniqueValues(attendanceHistory, 'classId'), [attendanceHistory]);
  const handleNewSubmission = ({ filters, selectedClasses, students, attendanceData }) => { const newRecords = []; const date = toYYYYMMDD(filters.date); for (const sClass of selectedClasses) { for (const student of students) { newRecords.push({ date, batch: sClass.batch, courseCode: sClass.courseCode, courseName: sClass.courseName, hour: sClass.hour, classId: sClass.id, studentId: student.id, studentName: student.name, status: attendanceData[student.id] || 'N/A' }); } } setAttendanceHistory(prev => [...prev, ...newRecords].sort((a,b) => new Date(b.date) - new Date(a.date))); };
  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <main className="max-w-6xl p-4 mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {view === 'upload' && (<><div className="flex justify-end p-4 border-b border-gray-200"><button onClick={() => setView('history')} className="font-semibold text-blue-600 hover:text-blue-800">View History Report →</button></div><AttendanceUploadPage onNewSubmission={handleNewSubmission} submittedHours={submittedHours} /></>)}
          {view === 'history' && <HistoryReportScreen history={attendanceHistory} onBack={() => setView('upload')} />}
        </div>
      </main>
    </div>
  );
};

export default AttendanceManager;