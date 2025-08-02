import { useState } from "react";

// Helper: Roman numeral to integer
const romanToInt = (roman) => {
  const map = {
    I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8
  };
  return map[roman] || 0;
};

// Get semester number from year and semester Roman numerals
const getSemesterNumber = (year, semester) => {
  const yearNum = romanToInt(year);
  const semNum = semester === "I" ? 1 : 2; // We will adjust semester selection below accordingly
  return ((yearNum - 1) * 2 + semNum).toString();
};

const AssignmentForm = ({ onCreateAssignment, permanentlyAssignedStudents }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const years = ["I", "II", "III", "IV"];
  
  // Define semesters per year for dropdown
  // For Year I: semesters 1 (I) and 2(II)
  // For Year II: semesters 3 (III) and 4 (IV)
  // For Year III: semesters 5 (V) and 6 (VI)
  // For Year IV: semesters 7 (VII) and 8 (VIII)
  
  const semesterOptionsPerYear = {
    I: [{ value: "I", label: "Semester I" }, { value: "II", label: "Semester II" }],
    II: [{ value: "III", label: "Semester III" }, { value: "IV", label: "Semester IV" }],
    III: [{ value: "V", label: "Semester V" }, { value: "VI", label: "Semester VI" }],
    IV: [{ value: "VII", label: "Semester VII" }, { value: "VIII", label: "Semester VIII" }],
  };

  // Department courses data
  const departmentCourses = {
    IT: ["Java Programming", "Web Development", "Cloud Computing", "Database Management", "Software Engineering"],
    CSE: ["Java Programming", "Python Development", "Data Science", "Machine Learning", "Algorithms"],
    ECE: ["Digital Signal Processing", "Embedded Systems", "VLSI Design", "Communication Systems", "Microprocessors"],
    EEE: ["Power Systems", "Electrical Machines", "Control Systems", "Power Electronics", "Circuit Analysis"],
    MECH: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing Processes", "Heat Transfer"],
    CIVIL: ["Structural Engineering", "Concrete Technology", "Surveying", "Environmental Engineering", "Geotechnical Engineering"],
  };

  // All available faculties
  const allFaculties = [
    "Dr. Smith", "Prof. Johnson", "Dr. Brown", "Prof. Taylor",
    "Prof. Thomas", "Dr. Jackson", "Prof. White", "Dr. Harris",
    "Prof. Martin", "Dr. Thompson", "Prof. Garcia", "Dr. Martinez",
    "Prof. Robinson", "Dr. Clark", "Prof. Rodriguez", "Dr. Lewis",
    "Prof. Lee", "Dr. Walker", "Prof. Hall", "Dr. Anderson",
    "Prof. Wilson", "Dr. Moore", "Prof. Davis", "Dr. Miller",
    "Prof. Wilson", "Dr. Jones", "Prof. Williams", "Dr. Garcia",
    "Prof. Martinez", "Dr. Hernandez", "Prof. Lopez", "Dr. Young",
    "Prof. King", "Dr. Wright", "Prof. Scott", "Dr. Torres",
    "Prof. Nguyen", "Dr. Hill", "Prof. Adams", "Dr. Campbell",
  ];

  // Department students data (no changes from your data)
  const departmentStudents = {
    IT: {
      I: ["Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela"],
      II: ["Frank", "Faye", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco"],
      III: ["Liam", "Kara", "Kurt", "Kelly", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra"],
      IV: ["Quinn", "Pam", "Peter", "Paula", "Pia", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix"],
      V: ["Victor", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai"],
      VI: ["Aaron", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah"],
      VII: ["Finn", "Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena"],
      VIII: ["Kyle", "Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier"],
    },
    CSE: {
      I: ["Alan", "Bella", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela"],
      II: ["Fiona", "Faye", "Felix", "Frances", "Farah", "Frank", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco"],
      III: ["Kevin", "Kara", "Kurt", "Kelly", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra"],
      IV: ["Piper", "Pam", "Peter", "Paula", "Pia", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix"],
      V: ["Ursula", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai"],
      VI: ["Zara", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah"],
      VII: ["Eli", "Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena"],
      VIII: ["Jackie", "Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier"],
    },
    ECE: {
      I: ["Amy", "Ben", "Alex", "Annie", "Aiden", "Arlo", "Alyssa", "Anthony", "Amber", "Axel", "Ariana", "Albert", "Andrew", "April", "Asher", "Alvin", "Arthur", "Aimee", "Alan", "Alana"],
      II: ["Felix", "Floyd", "Faith", "Fabian", "Fleur", "Freya", "Francine", "Fernando", "Flint", "Fallon", "Fergus", "Fia", "Farrah", "Frida", "Fletcher", "Fynn", "Faron", "Fitz", "Felicity", "Foster"],
      III: ["Kelly", "Kurt", "Kara", "Kendall", "Keira", "Kobe", "Kassidy", "Krista", "Kyra", "Khalil", "Kaiden", "Knox", "Kamil", "Kimber", "Kiana", "Kade", "Kallie", "Kenny", "Kara", "Kason"],
      IV: ["Peter", "Pia", "Pam", "Penny", "Paxton", "Portia", "Pablo", "Patrick", "Philippa", "Perry", "Phoebe", "Piers", "Paige", "Patrice", "Pearl", "Polly", "Patton", "Priya", "Phoenix", "Parker"],
      V: ["Uma", "Ulises", "Uriel", "Urban", "Ursula", "Usman", "Ulric", "Ulysses", "Usha", "Umberto", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulrich", "Unai", "Umaira"],
      VI: ["Zack", "Zane", "Zion", "Zoey", "Zander", "Zuri", "Zelda", "Zane", "Zyra", "Zuriella", "Zeke", "Zayn", "Zoltan", "Zahara", "Zach", "Zaid", "Zeni", "Zionah", "Zayden", "Zella"],
      VII: ["Elsa", "Eliot", "Emily", "Eden", "Eric", "Eva", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Elijah", "Edwin", "Elise", "Emmy", "Esme", "Esther", "Elena", "Enzo", "Ezra"],
      VIII: ["Jace", "Jill", "Jasper", "Jodie", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie"],
    },
    EEE: {
      I: ["Andrew", "Alice", "Aaron", "Abigail", "Alec", "Amira", "Arthur", "Arlo", "Amos", "Ava", "Axel", "Albert", "Amber", "Allan", "Aimee", "April", "Asher", "Anita", "Anya", "Adam"],
      II: ["Floyd", "Felix", "Fiona", "Francine", "Freddie", "Fergus", "Fletcher", "Faye", "Fallon", "Fritz", "Fabian", "Flora", "Fernando", "Farah", "Foster", "Faith", "Faron", "Frida", "Fynn", "Fia"],
      III: ["Kate", "Kelly", "Kurt", "Kaitlyn", "Kai", "Kristen", "Kyra", "Karl", "Kendra", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Kelsey", "Khalil"],
      IV: ["Paula", "Pia", "Peter", "Pam", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker"],
      V: ["Ulrich", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulysses", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira"],
      VI: ["Zion", "Zane", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah", "Zayden"],
      VII: ["Emily", "Eliot", "Elsa", "Eden", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra"],
      VIII: ["Jill", "Jodie", "Jasper", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie"],
    },
    MECH: {
      I: ["Aiden", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela", "Amber"],
      II: ["Finn", "Faye", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Floyd", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco"],
      III: ["Kara", "Kelly", "Kurt", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Khalil"],
      IV: ["Pia", "Pam", "Peter", "Paula", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker"],
      V: ["Ulysses", "Uma", "Ulises", "Uriel", "Urban", "Usha", "Ulrich", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira"],
      VI: ["Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah", "Zayden"],
      VII: ["Eden", "Emily", "Eliot", "Elsa", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra"],
      VIII: ["Jasper", "Jodie", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie"],
    },
    CIVIL: {
      I: ["Abel", "Amy", "Aaron", "Abby", "Ava", "Arthur", "Anya", "Adam", "Amelia", "Austin", "Aria", "Albert", "Allan", "Andre", "April", "Anita", "Ashlyn", "Axel", "Alan", "Angela"],
      II: ["Faye", "Floyd", "Felix", "Frances", "Farah", "Fiona", "Freddie", "Flora", "Fernando", "Fritz", "Frida", "Francis", "Fabian", "Fallon", "Fitz", "Flynn", "Forrest", "Faith", "Fletcher", "Franco"],
      III: ["Kurt", "Kelly", "Kara", "Kaitlyn", "Khalid", "Kai", "Kendra", "Kristen", "Kyra", "Karl", "Kane", "Knox", "Kimberly", "Kian", "Kassidy", "Keira", "Kyson", "Kade", "Kassandra", "Khalil"],
      IV: ["Pam", "Pia", "Peter", "Paula", "Piper", "Phoebe", "Philip", "Pearl", "Patrick", "Prudence", "Paxton", "Penelope", "Patricia", "Porter", "Priya", "Paige", "Pablo", "Polly", "Phoenix", "Parker"],
      V: ["Usha", "Uma", "Ulises", "Uriel", "Urban", "Ulrich", "Usman", "Umberto", "Ugo", "Unity", "Uriah", "Uzair", "Uzoma", "Upton", "Uvaldo", "Uzi", "Ulric", "Unai", "Umaira"],
      VI: ["Zora", "Zane", "Zion", "Zack", "Zander", "Zoey", "Zara", "Zeb", "Zuri", "Zelda", "Zeke", "Zayn", "Zuriella", "Zyra", "Zoltan", "Zach", "Zaid", "Zahara", "Zeni", "Zionah"],
      VII: ["Eliot", "Emily", "Eden", "Elsa", "Eric", "Eva", "Enzo", "Everett", "Eddie", "Eloise", "Ezekiel", "Ethan", "Edwin", "Elise", "Elijah", "Emmy", "Esme", "Esther", "Elena", "Ezra"],
      VIII: ["Jodie", "Jasper", "Jill", "Jace", "Jordan", "Jared", "Josie", "Jayden", "Janet", "James", "Joan", "Julian", "Justice", "Juno", "Jules", "Jonas", "Joanna", "Joelle", "Javier", "Jamie"],
    },
  };

  // Generate students list for selected department, year, and semester
  const generateStudentsForCourse = (department, year, semester) => {
    let students = [];
    // Here semester param is the semester Roman for the semester dropdown ("I"..."VIII")
    const semesterRoman = semester;
    const names = departmentStudents[department]?.[semesterRoman] || [];
    names.forEach((name, idx) => {
      // roll number format: DEPT-year-semester-index
      const rollNumber = `${department}-${year}-${semesterRoman}-${(idx + 1).toString().padStart(3, "0")}`;
      students.push({
        roll: rollNumber,
        name,
        department,
        year,
        semester: semesterRoman,
      });
    });
    return students;
  };

  // Get courses based on selected department
  const availableCourses = selectedDepartment ? departmentCourses[selectedDepartment] || [] : [];

  // Get semesters dropdown options depending on selectedYear
  const semesterOptions = selectedYear ? (semesterOptionsPerYear[selectedYear] || []) : [];

  const handleConfirm = () => {
    if (selectedCourse && selectedFaculty && selectedYear && selectedSemester && selectedDepartment) {
      let students = generateStudentsForCourse(selectedDepartment, selectedYear, selectedSemester);
      students = students.filter((s) => !permanentlyAssignedStudents.includes(s.roll));

      const newAssignment = {
        course: selectedCourse,
        faculty: selectedFaculty,
        year: selectedYear,
        semester: selectedSemester,
        department: selectedDepartment,
        students,
        selectedStudents: [],
        page: 0,
        rowsPerPage: 20,
        isConfirmed: false,
      };

      onCreateAssignment(newAssignment);
      
      // Reset form
      setSelectedCourse("");
      setSelectedFaculty("");
      setSelectedYear("");
      setSelectedSemester("");
      setSelectedDepartment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Assignment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              const yearValue = e.target.value;
              setSelectedYear(yearValue);

              // Reset semester, department, course, faculty when year changes
              setSelectedSemester("");
              setSelectedDepartment("");
              setSelectedCourse("");
              setSelectedFaculty("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a year</option>
            {years.map((year, idx) => (
              <option key={idx} value={year}>
                Year {year}
              </option>
            ))}
          </select>
        </div>
        
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Choose a semester</option>
            {semesterOptions.map(({ value, label }, idx) => (
              <option key={idx} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Choose a department</option>
            {Object.keys(departmentCourses).map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedFaculty("");
            }}
            disabled={!selectedDepartment}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Choose a course</option>
            {availableCourses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Faculty</label>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            disabled={!selectedCourse}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Choose a faculty</option>
            {allFaculties.map((faculty, idx) => (
              <option key={idx} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedCourse && selectedFaculty && selectedYear && selectedSemester && selectedDepartment && (
        <div className="mt-4">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentForm;