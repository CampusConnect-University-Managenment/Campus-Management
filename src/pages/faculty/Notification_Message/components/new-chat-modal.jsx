"use client"

import { useState } from "react"
import { X, MessageCircle, Users, Search, Check } from "lucide-react"

// Mock data (same as in ChatWindow)
const mockStudents = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    rollNumber: "CS2021001",
    year: "3rd",
    department: "Computer Science",
    section: "A",
    type: "student",
    email: "john.doe@university.edu",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    rollNumber: "CS2021002",
    year: "3rd",
    department: "Computer Science",
    section: "A",
    type: "student",
    email: "jane.smith@university.edu",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    rollNumber: "CS2022001",
    year: "2nd",
    department: "Computer Science",
    section: "B",
    type: "student",
    email: "mike.johnson@university.edu",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Wilson",
    rollNumber: "IT2021001",
    year: "3rd",
    department: "Information Technology",
    section: "A",
    type: "student",
    email: "sarah.wilson@university.edu",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    rollNumber: "CS2023001",
    year: "1st",
    department: "Computer Science",
    section: "A",
    type: "student",
    email: "david.brown@university.edu",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    rollNumber: "IT2022001",
    year: "2nd",
    department: "Information Technology",
    section: "B",
    type: "student",
    email: "emily.davis@university.edu",
  },
  {
    id: 7,
    firstName: "Alex",
    lastName: "Chen",
    rollNumber: "CS2021003",
    year: "3rd",
    department: "Computer Science",
    section: "B",
    type: "student",
    email: "alex.chen@university.edu",
  },
  {
    id: 8,
    firstName: "Maria",
    lastName: "Garcia",
    rollNumber: "IT2023001",
    year: "1st",
    department: "Information Technology",
    section: "A",
    type: "student",
    email: "maria.garcia@university.edu",
  },
]

const mockFaculty = [
  {
    id: 101,
    name: "Dr. Robert Brown",
    department: "Computer Science",
    type: "faculty",
    email: "robert.brown@university.edu",
    position: "Associate Professor",
  },
  {
    id: 102,
    name: "Prof. Lisa Davis",
    department: "Information Technology",
    type: "faculty",
    email: "lisa.davis@university.edu",
    position: "Assistant Professor",
  },
  {
    id: 103,
    name: "Dr. Mark Wilson",
    department: "Computer Science",
    type: "faculty",
    email: "mark.wilson@university.edu",
    position: "Professor",
  },
  {
    id: 104,
    name: "Prof. Emily Johnson",
    department: "Mathematics",
    type: "faculty",
    email: "emily.johnson@university.edu",
    position: "Associate Professor",
  },
  {
    id: 105,
    name: "Dr. Sarah Miller",
    department: "Computer Science",
    type: "faculty",
    email: "sarah.miller@university.edu",
    position: "Professor",
  },
  {
    id: 106,
    name: "Prof. Michael Chen",
    department: "Information Technology",
    type: "faculty",
    email: "michael.chen@university.edu",
    position: "Assistant Professor",
  },
]

const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [activeTab, setActiveTab] = useState("individual")
  const [activeParticipantView, setActiveParticipantView] = useState("students")
  const [searchQuery, setSearchQuery] = useState("")

  // Individual chat states
  const [selectedIndividualParticipant, setSelectedIndividualParticipant] = useState(null)

  // Group chat states
  const [selectedGroupParticipants, setSelectedGroupParticipants] = useState([])
  const [groupName, setGroupName] = useState("")

  // Enhanced filtering states
  const [studentFilters, setStudentFilters] = useState({
    year: "",
    department: "",
    section: "",
  })

  const [facultyFilters, setFacultyFilters] = useState({
    department: "",
  })

  const handleStudentFilterChange = (field, value) => {
    setStudentFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleFacultyFilterChange = (field, value) => {
    setFacultyFilters((prev) => ({ ...prev, [field]: value }))
  }

  const getFilteredStudents = () => {
    return mockStudents.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()

      const matchesYear = !studentFilters.year || student.year === studentFilters.year
      const matchesDepartment = !studentFilters.department || student.department === studentFilters.department
      const matchesSection = !studentFilters.section || student.section === studentFilters.section

      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesYear && matchesDepartment && matchesSection && matchesSearch
    })
  }

  const getFilteredFaculty = () => {
    return mockFaculty.filter((faculty) => {
      const matchesDepartment = !facultyFilters.department || faculty.department === facultyFilters.department
      const matchesSearch = !searchQuery || faculty.name.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesDepartment && matchesSearch
    })
  }

  // Individual chat participant selection
  const handleIndividualParticipantSelect = (participant) => {
    setSelectedIndividualParticipant(participant)
  }

  // Group chat participant selection
  const toggleGroupParticipant = (participant) => {
    setSelectedGroupParticipants((prev) => {
      const exists = prev.find((p) => p.id === participant.id && p.type === participant.type)
      if (exists) {
        return prev.filter((p) => !(p.id === participant.id && p.type === participant.type))
      } else {
        return [...prev, participant]
      }
    })
  }

  // Select All functionality for group chat creation
  const handleGroupSelectAll = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const currentTypeParticipants = selectedGroupParticipants.filter((p) => p.type === type.slice(0, -1))

    if (currentTypeParticipants.length === filteredParticipants.length) {
      // Deselect all of this type
      setSelectedGroupParticipants((prev) => prev.filter((p) => p.type !== type.slice(0, -1)))
    } else {
      // Select all of this type
      const otherTypeParticipants = selectedGroupParticipants.filter((p) => p.type !== type.slice(0, -1))
      setSelectedGroupParticipants([...otherTypeParticipants, ...filteredParticipants])
    }
  }

  // Check if all filtered participants of a type are selected for group chat
  const areAllGroupSelected = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const selectedOfType = selectedGroupParticipants.filter((p) => p.type === type.slice(0, -1))
    return filteredParticipants.length > 0 && selectedOfType.length === filteredParticipants.length
  }

  const handleCreateIndividualChat = () => {
    if (!selectedIndividualParticipant) return

    const chatName =
      selectedIndividualParticipant.type === "student"
        ? `${selectedIndividualParticipant.firstName} ${selectedIndividualParticipant.lastName}`
        : selectedIndividualParticipant.name

    onCreateChat?.({
      type: "individual",
      name: chatName,
      participants: [selectedIndividualParticipant],
    })

    handleClose()
  }

  const handleCreateGroupChat = () => {
    if (selectedGroupParticipants.length === 0 || !groupName.trim()) return

    onCreateChat?.({
      type: "group",
      name: groupName.trim(),
      participants: selectedGroupParticipants,
    })

    handleClose()
  }

  const handleClose = () => {
    // Reset all states
    setActiveTab("individual")
    setActiveParticipantView("students")
    setSearchQuery("")
    setSelectedIndividualParticipant(null)
    setSelectedGroupParticipants([])
    setGroupName("")
    setStudentFilters({ year: "", department: "", section: "" })
    setFacultyFilters({ department: "" })
    onClose()
  }

  // Get unique values for filter options
  const availableDepartments = [...new Set([...mockStudents, ...mockFaculty].map((p) => p.department))]
  const availableYears = [...new Set(mockStudents.map((s) => s.year))]
  const availableSections = [...new Set(mockStudents.map((s) => s.section))]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-center space-x-2 relative">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Create New Chat</h2>
            <button
              onClick={handleClose}
              className="absolute right-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Tab Selection */}
        <div className="flex border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setActiveTab("individual")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "individual"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            Individual Chat
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "group"
                ? "bg-purple-50 text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            Group Chat
          </button>
        </div>

        {activeTab === "individual" ? (
          /* Individual Chat Creation */
          <>
            {/* Selected participant summary */}
            {selectedIndividualParticipant && (
              <div className="px-4 py-3 border-b border-gray-200 bg-blue-50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-blue-800">Selected:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                        {selectedIndividualParticipant.type === "student"
                          ? `${selectedIndividualParticipant.firstName?.[0] || ""}${selectedIndividualParticipant.lastName?.[0] || ""}`
                          : selectedIndividualParticipant.name?.[0] || ""}
                      </div>
                      <span className="font-medium text-gray-800">
                        {selectedIndividualParticipant.type === "student"
                          ? `${selectedIndividualParticipant.firstName} ${selectedIndividualParticipant.lastName}`
                          : selectedIndividualParticipant.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIndividualParticipant(null)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 flex-shrink-0">
                <button
                  onClick={() => setActiveParticipantView("students")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "students"
                      ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveParticipantView("faculty")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "faculty"
                      ? "bg-green-50 text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Faculty
                </button>
              </div>

              {/* Search and filters section */}
              <div className="p-4 border-b border-gray-200 flex-shrink-0 space-y-4">
                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Search ${activeParticipantView}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filter controls */}
                {activeParticipantView === "students" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select
                        value={studentFilters.year}
                        onChange={(e) => handleStudentFilterChange("year", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All years</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year} Year
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={studentFilters.department}
                        onChange={(e) => handleStudentFilterChange("department", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All departments</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                      <select
                        value={studentFilters.section}
                        onChange={(e) => handleStudentFilterChange("section", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All sections</option>
                        {availableSections.map((section) => (
                          <option key={section} value={section}>
                            Section {section}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={facultyFilters.department}
                        onChange={(e) => handleFacultyFilterChange("department", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      >
                        <option value="">All departments</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Participants list */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium">
                      No {activeParticipantView === "students" ? "students" : "faculty"} found
                    </p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).map(
                      (participant) => {
                        const isSelected =
                          selectedIndividualParticipant?.id === participant.id &&
                          selectedIndividualParticipant?.type === participant.type
                        return (
                          <div
                            key={`${participant.type}-${participant.id}`}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? activeParticipantView === "students"
                                  ? "bg-blue-50 border-blue-200 shadow-sm ring-2 ring-blue-500"
                                  : "bg-green-50 border-green-200 shadow-sm ring-2 ring-green-500"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                            onClick={() => handleIndividualParticipantSelect(participant)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                                    activeParticipantView === "students" ? "bg-blue-500" : "bg-green-500"
                                  }`}
                                >
                                  {activeParticipantView === "students"
                                    ? `${participant.firstName?.[0] || ""}${participant.lastName?.[0] || ""}`
                                    : participant.name?.[0] || ""}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-gray-900 truncate">
                                    {activeParticipantView === "students"
                                      ? `${participant.firstName} ${participant.lastName}`
                                      : participant.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {activeParticipantView === "students" ? (
                                      <>
                                        {participant.rollNumber} • {participant.year} Year • {participant.department} •
                                        Section {participant.section}
                                      </>
                                    ) : (
                                      <>
                                        {participant.position} • {participant.department}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    activeParticipantView === "students"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {activeParticipantView === "students" ? "Student" : "Faculty"}
                                </span>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateIndividualChat}
                  disabled={!selectedIndividualParticipant}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Create Chat
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Group Chat Creation */
          <>
            {/* Group name input */}
            <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
              <input
                type="text"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Selected participants summary */}
            {selectedGroupParticipants.length > 0 && (
              <div className="px-4 py-3 border-b border-gray-200 bg-purple-50 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-purple-800">
                      Selected Participants ({selectedGroupParticipants.length})
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {selectedGroupParticipants.filter((p) => p.type === "student").length} Students
                      </span>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {selectedGroupParticipants.filter((p) => p.type === "faculty").length} Faculty
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedGroupParticipants([])}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {selectedGroupParticipants.map((participant) => (
                    <span
                      key={`${participant.type}-${participant.id}`}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        participant.type === "student" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {participant.type === "student"
                        ? `${participant.firstName} ${participant.lastName}`
                        : participant.name}
                      <button
                        onClick={() => toggleGroupParticipant(participant)}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 flex-shrink-0">
                <button
                  onClick={() => setActiveParticipantView("students")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "students"
                      ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Add Students
                </button>
                <button
                  onClick={() => setActiveParticipantView("faculty")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "faculty"
                      ? "bg-green-50 text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Add Faculty
                </button>
              </div>

              {/* Search and filters section */}
              <div className="p-4 border-b border-gray-200 flex-shrink-0 space-y-4">
                {/* Search bar with Select All */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={`Search ${activeParticipantView}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleGroupSelectAll(activeParticipantView)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
                      areAllGroupSelected(activeParticipantView)
                        ? activeParticipantView === "students"
                          ? "bg-blue-600 text-white"
                          : "bg-green-600 text-white"
                        : activeParticipantView === "students"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{areAllGroupSelected(activeParticipantView) ? "Deselect All" : "Select All"}</span>
                  </button>
                </div>

                {/* Filter controls */}
                {activeParticipantView === "students" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select
                        value={studentFilters.year}
                        onChange={(e) => handleStudentFilterChange("year", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All years</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year} Year
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={studentFilters.department}
                        onChange={(e) => handleStudentFilterChange("department", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All departments</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                      <select
                        value={studentFilters.section}
                        onChange={(e) => handleStudentFilterChange("section", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">All sections</option>
                        {availableSections.map((section) => (
                          <option key={section} value={section}>
                            Section {section}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={facultyFilters.department}
                        onChange={(e) => handleFacultyFilterChange("department", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      >
                        <option value="">All departments</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Participants list */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium">
                      No {activeParticipantView === "students" ? "students" : "faculty"} found
                    </p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).map(
                      (participant) => {
                        const isSelected = selectedGroupParticipants.find(
                          (p) => p.id === participant.id && p.type === participant.type,
                        )
                        return (
                          <div
                            key={`${participant.type}-${participant.id}`}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? activeParticipantView === "students"
                                  ? "bg-blue-50 border-blue-200 shadow-sm"
                                  : "bg-green-50 border-green-200 shadow-sm"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                            onClick={() => toggleGroupParticipant(participant)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                                    activeParticipantView === "students" ? "bg-blue-500" : "bg-green-500"
                                  }`}
                                >
                                  {activeParticipantView === "students"
                                    ? `${participant.firstName?.[0] || ""}${participant.lastName?.[0] || ""}`
                                    : participant.name?.[0] || ""}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-gray-900 truncate">
                                    {activeParticipantView === "students"
                                      ? `${participant.firstName} ${participant.lastName}`
                                      : participant.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {activeParticipantView === "students" ? (
                                      <>
                                        {participant.rollNumber} • {participant.year} Year • {participant.department} •
                                        Section {participant.section}
                                      </>
                                    ) : (
                                      <>
                                        {participant.position} • {participant.department}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    activeParticipantView === "students"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {activeParticipantView === "students" ? "Student" : "Faculty"}
                                </span>
                                {isSelected && (
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                      activeParticipantView === "students" ? "bg-blue-600" : "bg-green-600"
                                    }`}
                                  >
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroupChat}
                  disabled={selectedGroupParticipants.length === 0 || !groupName.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Create Group ({selectedGroupParticipants.length})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NewChatModal
