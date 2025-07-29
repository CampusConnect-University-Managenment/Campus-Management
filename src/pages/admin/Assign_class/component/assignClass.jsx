import { useState, useMemo, useEffect } from "react";

const AssignClass = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [confirmedAssignments, setConfirmedAssignments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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
      faculties: [
        "Prof. Martin",
        "Dr. Thompson",
        "Prof. Garcia",
        "Dr. Martinez",
      ],
      classes: ["IT", "MECH"],
    },
    "Data Science": {
      faculties: [
        "Prof. Robinson",
        "Dr. Clark",
        "Prof. Rodriguez",
        "Dr. Lewis",
      ],
      classes: ["CSE", "CIVIL"],
    },
    "Cloud Computing": {
      faculties: ["Prof. Lee", "Dr. Walker", "Prof. Hall"],
      classes: ["IT", "ECE"],
    },
  };

  const courses = Object.keys(courseData);
  const faculties = selectedCourse ? courseData[selectedCourse].faculties : [];

  const departmentStudents = {
    IT: {
      I: [ "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela" ],
      II: [ "Frank", "Faye", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco" ],
      III: [ "Liam", "Kara", "Kurt", "Kelly", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra" ],
      IV: [ "Quinn", "Pam", "Peter", "Paula", "Pia", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix" ],
      V: [ "Victor", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai" ],
      VI: [ "Aaron", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah" ],
      VII: [ "Finn", "Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena" ],
      VIII: [ "Kyle", "Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier" ],
    },
    CSE: {
      I: [ "Alan", "Bella", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela" ],
      II: [ "Fiona", "Faye", "Felix", "Frances", "Farah", "Frank", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco" ],
      III: [ "Kevin", "Kara", "Kurt", "Kelly", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra" ],
      IV: [ "Piper", "Pam", "Peter", "Paula", "Pia", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix" ],
      V: [ "Ursula", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai" ],
      VI: [ "Zara", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah" ],
      VII: [ "Eli", "Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena" ],
      VIII: [ "Jackie", "Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier" ],
    },
    ECE: {
      I: [ "Amy", "Ben", "Alex", "Annie", "Aiden", "Arlo", "Alyssa", "Anthony", "Amber", "Axel", "Ariana", "Albert", "Andrew", "April", "Asher", "Alvin", "Arthur", "Aimee", "Alan", "Alana" ],
      II: [ "Felix", "Floyd", "Faith", "Fabian", "Fleur", "Freya", "Francine", "Fernando", "Flint", "Fallon", "Fergus", "Fia", "Farrah", "Frida", "Fletcher", "Fynn", "Faron", "Fitz", "Felicity", "Foster" ],
      III: [ "Kelly", "Kurt", "Kara", "Kendall", "Keira", "Kobe", "Kassidy", "Krista", "Kyra", "Khalil", "Kaiden", "Knox", "Kamil", "Kimber", "Kiana", "Kade", "Kallie", "Kenny", "Kara", "Kason" ],
      IV: [ "Peter", "Pia", "Pam", "Penny", "Paxton", "Portia", "Pablo", "Patrick", "Philippa", "Perry", "Phoebe", "Piers", "Paige", "Patrice", "Pearl", "Polly", "Patton", "Priya", "Phoenix", "Parker" ],
      V: [ "Uma", "Ulises", "Uriel", "Urban", "Ursula", "Usman", "Ulric", "Ulysses", "Usha", "Umberto", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulrich", "Unai", "Umaira" ],
      VI: [ "Zack", "Zane", "Zion", "Zoey", "Zander", "Zuri", "Zelda", "Zane", "Zyra", "Zuriella", "Zeke", "Zayn", "Zoltan", "Zahara", "Zach", "Zaid", "Zeni", "Zionah", "Zayden", "Zella" ],
      VII: [ "Elsa", "Eliot", "Emily", "Eden", "Eric", "Eva", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Elijah", "Edwin", "Elise", "Emmy", "Esme", "Esther", "Elena", "Enzo", "Ezra" ],
      VIII: [ "Jace", "Jill", "Jasper", "Jodie", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie" ],
    },
    EEE: {
      I: [ "Andrew", "Alice", "Aaron", "Abigail", "Alec", "Amira", "Arthur", "Arlo", "Amos", "Ava", "Axel", "Albert", "Amber", "Allan", "Aimee", "April", "Asher", "Anita", "Anya", "Adam" ],
      II: [ "Floyd", "Felix", "Fiona", "Francine", "Freddie", "Fergus", "Fletcher", "Faye", "Fallon", "Fritz", "Fabian", "Flora", "Fernando", "Farah", "Foster", "Faith", "Faron", "Frida", "Fynn", "Fia" ],
      III: [ "Kate", "Kelly", "Kurt", "Kaitlyn", "Kai", "Kristen", "Kyra", "Karl", "Kendra", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Kelsey", "Khalil" ],
      IV: [ "Paula", "Pia", "Peter", "Pam", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker" ],
      V: [ "Ulrich", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira" ],
      VI: [ "Zion", "Zane", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah", "Zayden" ],
      VII: [ "Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra" ],
      VIII: [ "Jill", "Jodie", "Jasper", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie" ],
    },
    MECH: {
      I: [ "Aiden", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela", "Amber" ],
      II: [ "Finn", "Faye", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco" ],
      III: [ "Kara", "Kelly", "Kurt", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Khalil" ],
      IV: [ "Pia", "Pam", "Peter", "Paula", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker" ],
      V: [ "Ulysses", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira" ],
      VI: [ "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah", "Zayden" ],
      VII: [ "Eden", "Emily", "Eliot", "Elsa", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra" ],
      VIII: [ "Jasper", "Jodie", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie" ],
    },
    CIVIL: {
      I: [ "Abel", "Amy", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela" ],
      II: [ "Faye", "Floyd", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Fritz", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco" ],
      III: [ "Kurt", "Kelly", "Kara", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Khalil" ],
      IV: [ "Pam", "Pia", "Peter", "Paula", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker" ],
      V: [ "Usha", "Uma", "Ulises", "Uriel", "Urban", "Ulrich", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira" ],
      VI: [ "Zora", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah" ],
      VII: [ "Eliot", "Emily", "Eden", "Elsa", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra" ],
      VIII: [ "Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie" ],
    },
  };

  const generateStudentsForCourse = (departments, semester) => {
    let students = [];
    departments.forEach((dept) => {
      const names = departmentStudents[dept]?.[semester] || [];
      names.forEach((name, idx) => {
        const rollNumber = `${dept}-${semester}-${(idx + 1).toString().padStart(3, "0")}`;
        const section = idx < 10 ? "A" : idx < 20 ? "B" : "C";
        students.push({ roll: rollNumber, name, department: dept, section, semester });
      });
    });
    return students;
  };

  const permanentlyAssignedStudents = useMemo(() => confirmedAssignments.flatMap((a) => a.assignedStudents), [confirmedAssignments]);
  const temporarilySelectedStudents = useMemo(() => assignments.flatMap((a) => a.selectedStudents), [assignments]);

  const unavailableStudents = useMemo(() => [...new Set([...permanentlyAssignedStudents, ...temporarilySelectedStudents])], [permanentlyAssignedStudents, temporarilySelectedStudents]);

  const hasPendingAssignments = assignments.some((a) => !a.isConfirmed);

  const availableDepartments = useMemo(() => {
    const depts = new Set();
    assignments
      .filter(a => !a.isConfirmed)
      .forEach(a => {
        a.students.forEach(s => depts.add(s.department));
      });
    return Array.from(depts);
  }, [assignments]);

  useEffect(() => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((a) => a.students.some((s) => !permanentlyAssignedStudents.includes(s.roll)))
    );
  }, [permanentlyAssignedStudents]);

  const handleConfirm = () => {
    if (selectedCourse && selectedFaculty && selectedSemester) {
      setAssignments((prev) => {
        const existing = prev.find(a => a.course === selectedCourse && a.semester === selectedSemester && a.faculty === selectedFaculty);
        if (existing) return prev;

        const departments = courseData[selectedCourse].classes;
        let students = generateStudentsForCourse(departments, selectedSemester);
        students = students.filter(s => !permanentlyAssignedStudents.includes(s.roll));

        return [
          ...prev,
          { id: prev.length + 1, course: selectedCourse, faculty: selectedFaculty, semester: selectedSemester, students, selectedStudents: [], page: 0, rowsPerPage: 20, isConfirmed: false },
        ];
      });
      setSelectedCourse("");
      setSelectedFaculty("");
      setSelectedSemester("");
      setSelectedDepartment("");
    }
  };

  const toggleStudentSelection = (assignmentId, roll) => {
    if (permanentlyAssignedStudents.includes(roll)) return;
    const otherAssignments = assignments.filter((a) => a.id !== assignmentId);
    if (otherAssignments.flatMap((a) => a.selectedStudents).includes(roll)) return;

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, selectedStudents: assignment.selectedStudents.includes(roll) ? assignment.selectedStudents.filter((r) => r !== roll) : [...assignment.selectedStudents, roll] }
          : assignment
      )
    );
  };

  const toggleSelectAll = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id === assignmentId) {
          const filteredStudents = assignment.students.filter(s => !selectedDepartment || s.department === selectedDepartment);
          const availableRolls = filteredStudents.filter(s => !unavailableStudents.includes(s.roll)).map(s => s.roll);
          const isAllSelected = assignment.selectedStudents.length === availableRolls.length && availableRolls.length > 0;
          return { ...assignment, selectedStudents: isAllSelected ? [] : availableRolls };
        }
        return assignment;
      })
    );
  };

  const handleChangePage = (assignmentId, newPage) => {
    setAssignments((prev) => prev.map((a) => (a.id === assignmentId ? { ...a, page: newPage } : a)));
  };

  const handleFinalConfirm = (assignment) => {
    if (assignment.selectedStudents.length === 0) {
      setPopupMessage("Please select at least one student before confirming.");
      setShowPopup(true);
      return;
    }

    const assignedStudentDetails = assignment.students.filter(student => assignment.selectedStudents.includes(student.roll));
    const assignedDepartments = [...new Set(assignedStudentDetails.map(student => student.department))];

    const confirmedAssignment = {
      id: assignment.id,
      course: assignment.course,
      faculty: assignment.faculty,
      semester: assignment.semester,
      assignedStudents: assignment.selectedStudents,
      assignedCount: assignment.selectedStudents.length,
      totalStudents: assignment.students.length,
      departments: assignedDepartments,
    };

    setConfirmedAssignments((prev) => [...prev, confirmedAssignment]);
    setAssignments((prev) => prev.map((a) => (a.id === assignment.id ? { ...a, isConfirmed: true, selectedStudents: [] } : a)));
    setPopupMessage(`Course "${assignment.course}" - Semester ${assignment.semester} successfully assigned to ${assignment.faculty}. Assigned: ${assignment.selectedStudents.length} students.`);
    setShowPopup(true);
  };

  const getStudentStatus = (roll) => {
    if (permanentlyAssignedStudents.includes(roll)) {
      const confirmedAssignment = confirmedAssignments.find((ca) => ca.assignedStudents.includes(roll));
      return { status: "confirmed", color: "bg-red-100 text-red-800", info: `Assigned to ${confirmedAssignment.faculty}` };
    }
    const tempAssignment = assignments.find((a) => a.selectedStudents.includes(roll) && !a.isConfirmed);
    if (tempAssignment) {
      return { status: "selected", color: "bg-yellow-100 text-yellow-800", info: `Selected for ${tempAssignment.faculty}` };
    }
    return { status: "available", color: "bg-green-100 text-green-800", info: "Available" };
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Class</h1>
        <p className="text-gray-600 mb-6">Browse and assign classes for selected courses, faculty, and semester. Students can only be assigned to one faculty permanently.</p>

        {/* Selection Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); setSelectedFaculty(""); setSelectedSemester(""); setAssignments([]); setSelectedDepartment(""); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Choose a course</option>
                {courses.map((course, idx) => (<option key={idx} value={course}>{course}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Faculty</label>
              <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} disabled={!selectedCourse} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                <option value="">Choose a faculty</option>
                {faculties.map((faculty, idx) => (<option key={idx} value={faculty}>{faculty}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Semester</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} disabled={!selectedCourse} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                <option value="">Choose a semester</option>
                {semesters.map((sem, idx) => (<option key={idx} value={sem}>Semester {sem}</option>))}
              </select>
            </div>
          </div>
          {selectedCourse && selectedFaculty && selectedSemester && (<div className="mt-4"><button onClick={handleConfirm} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Create Assignment</button></div>)}
        </div>

        {/* Confirmed Assignments Table */}
        {confirmedAssignments.length > 0 && !hasPendingAssignments && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmed Assignments ({confirmedAssignments.length})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {confirmedAssignments.map((ca) => (
                    <tr key={ca.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ca.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ca.faculty}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ca.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ca.departments?.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{ca.assignedCount}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ca.totalStudents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending Assignments */}
        {assignments.filter(a => !a.isConfirmed).length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pending Assignments</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
                <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Departments</option>
                  {availableDepartments.map((dept, idx) => (<option key={idx} value={dept}>{dept}</option>))}
                </select>
              </div>
            </div>
            {assignments.filter((a) => !a.isConfirmed).map((assignment) => {
              const selectedStudents = assignment.selectedStudents || [];
              const filteredStudents = assignment.students.filter((s) => !selectedDepartment || s.department === selectedDepartment);
              const { page, rowsPerPage } = assignment;
              const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
              const paginatedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
              return (
                <div key={assignment.id} className="mb-8 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold text-gray-900">{assignment.course} - Semester {assignment.semester} (Faculty: {assignment.faculty})</h3><span className="text-sm text-gray-600">{selectedStudents.length} selected of {filteredStudents.length} available</span></div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left"><input type="checkbox" checked={selectedStudents.length === filteredStudents.filter(s => !unavailableStudents.includes(s.roll)).length && filteredStudents.length > 0} onChange={() => toggleSelectAll(assignment.id)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedStudents.map((student) => {
                          const studentStatus = getStudentStatus(student.roll);
                          const isDisabled = permanentlyAssignedStudents.includes(student.roll) || assignments.filter((a) => a.id !== assignment.id).flatMap((a) => a.selectedStudents).includes(student.roll);
                          return (
                            <tr key={student.roll} className={isDisabled ? "bg-gray-50" : "hover:bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" checked={selectedStudents.includes(student.roll)} disabled={isDisabled} onChange={() => toggleStudentSelection(assignment.id, student.roll)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50" /></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.roll}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.department}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.section}</td>
                              <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${studentStatus.color}`}>{studentStatus.info}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {totalPages > 1 && (<div className="flex items-center justify-between mt-4"><div className="text-sm text-gray-700">Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredStudents.length)} of {filteredStudents.length} results</div><div className="flex space-x-2"><button onClick={() => handleChangePage(assignment.id, page - 1)} disabled={page === 0} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Previous</button><span className="px-3 py-1 text-sm text-gray-700">Page {page + 1} of {totalPages}</span><button onClick={() => handleChangePage(assignment.id, page + 1)} disabled={page >= totalPages - 1} className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Next</button></div></div>)}
                  <div className="mt-4 flex justify-end"><button onClick={() => handleFinalConfirm(assignment)} disabled={selectedStudents.length === 0} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">Confirm Selected Students ({selectedStudents.length})</button></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-3"><h3 className="text-sm font-medium text-gray-900">Assignment Confirmed</h3></div>
              </div>
              <div className="mt-2"><p className="text-sm text-gray-500">{popupMessage}</p></div>
              <div className="mt-4"><button onClick={() => setShowPopup(false)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Close</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignClass;