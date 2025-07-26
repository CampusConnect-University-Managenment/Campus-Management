"use client"

import { useState } from "react"
import { Users, Search, Check, X } from "lucide-react"

// Mock data for filtering (same as in new-chat-modal)
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

const Notification_Message = () => {
  const [showForm, setShowForm] = useState(false)
  const [events, setEvents] = useState([
    {
      name: "Faculty Meeting",
      time: "10:00 AM",
      venue: "Conference Room A",
      date: "",
      audience: "Faculty",
      recipients: [],
    },
    {
      name: "Student Orientation",
      time: "2:00 PM",
      venue: "Main Auditorium",
      date: "",
      audience: "Student",
      recipients: [],
    },
    {
      name: "Library Workshop",
      time: "3:30 PM",
      venue: "Library Hall",
      date: "",
      audience: "Both",
      recipients: [],
    },
    {
      name: "Emergency Drill",
      time: "4:00 PM",
      venue: "Campus Wide",
      date: "",
      audience: "Both",
      recipients: [],
    },
  ])

  const [newEvent, setNewEvent] = useState({
    name: "",
    time: "",
    venue: "",
    date: "",
    audience: "",
  })

  // Filtering states
  const [activeParticipantView, setActiveParticipantView] = useState("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState([])

  const [studentFilters, setStudentFilters] = useState({
    year: "",
    department: "",
    section: "",
  })

  const [facultyFilters, setFacultyFilters] = useState({
    department: "",
  })

  // Enhanced filtering functions
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

  const toggleRecipient = (participant) => {
    setSelectedRecipients((prev) => {
      const exists = prev.find((p) => p.id === participant.id && p.type === participant.type)
      if (exists) {
        return prev.filter((p) => !(p.id === participant.id && p.type === participant.type))
      } else {
        return [...prev, participant]
      }
    })
  }

  // Select All functionality
  const handleSelectAll = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const currentTypeParticipants = selectedRecipients.filter((p) => p.type === type.slice(0, -1))

    if (currentTypeParticipants.length === filteredParticipants.length) {
      // Deselect all of this type
      setSelectedRecipients((prev) => prev.filter((p) => p.type !== type.slice(0, -1)))
    } else {
      // Select all of this type
      const otherTypeParticipants = selectedRecipients.filter((p) => p.type !== type.slice(0, -1))
      setSelectedRecipients([...otherTypeParticipants, ...filteredParticipants])
    }
  }

  // Check if all filtered participants of a type are selected
  const areAllSelected = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const selectedOfType = selectedRecipients.filter((p) => p.type === type.slice(0, -1))
    return filteredParticipants.length > 0 && selectedOfType.length === filteredParticipants.length
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))

    // Reset filters and selections when audience changes
    if (name === "audience") {
      setSelectedRecipients([])
      setStudentFilters({ year: "", department: "", section: "" })
      setFacultyFilters({ department: "" })
      setSearchQuery("")
      setActiveParticipantView("students")
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const istDateTime = new Date(`${newEvent.date}T${newEvent.time}`)
    const istTimeString = istDateTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })

    const newEntry = {
      ...newEvent,
      time: istTimeString,
      recipients: selectedRecipients,
    }

    setEvents([newEntry, ...events])
    setShowForm(false)
    setNewEvent({
      name: "",
      time: "",
      venue: "",
      date: "",
      audience: "",
    })
    setSelectedRecipients([])
    setStudentFilters({ year: "", department: "", section: "" })
    setFacultyFilters({ department: "" })
    setSearchQuery("")
  }

  // Get unique values for filter options
  const availableDepartments = [...new Set([...mockStudents, ...mockFaculty].map((p) => p.department))]
  const availableYears = [...new Set(mockStudents.map((s) => s.year))]
  const availableSections = [...new Set(mockStudents.map((s) => s.section))]

  const shouldShowFiltering = newEvent.audience && newEvent.audience !== ""

  return (
    <div className="flex min-h-screen bg-gray-50 mt-[50px]">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">📢 Notice Board - Today's Events</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center"
              onClick={() => setShowForm(!showForm)}
              aria-label="Add Event"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <form onSubmit={handleFormSubmit} className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={newEvent.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To whom the notifications should reach?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="audience"
                      value="Student"
                      checked={newEvent.audience === "Student"}
                      onChange={handleInputChange}
                      required
                    />
                    Student
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="audience"
                      value="Faculty"
                      checked={newEvent.audience === "Faculty"}
                      onChange={handleInputChange}
                    />
                    Faculty
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="audience"
                      value="Both"
                      checked={newEvent.audience === "Both"}
                      onChange={handleInputChange}
                    />
                    Both
                  </label>
                </div>
              </div>

              {/* Enhanced Filtering Section */}
              {shouldShowFiltering && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Select Recipients
                  </h3>

                  {/* Selected recipients summary */}
                  {selectedRecipients.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-blue-800">
                            Selected Recipients ({selectedRecipients.length})
                          </span>
                          <div className="flex items-center space-x-2 text-sm text-blue-600">
                            <span className="bg-blue-100 px-2 py-1 rounded-full">
                              {selectedRecipients.filter((p) => p.type === "student").length} Students
                            </span>
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                              {selectedRecipients.filter((p) => p.type === "faculty").length} Faculty
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedRecipients([])}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                        {selectedRecipients.map((recipient) => (
                          <span
                            key={`${recipient.type}-${recipient.id}`}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              recipient.type === "student" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {recipient.type === "student"
                              ? `${recipient.firstName} ${recipient.lastName}`
                              : recipient.name}
                            <button
                              type="button"
                              onClick={() => toggleRecipient(recipient)}
                              className="ml-1 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tabs for Both audience */}
                  {newEvent.audience === "Both" && (
                    <div className="flex border-b border-gray-200 mb-4">
                      <button
                        type="button"
                        onClick={() => setActiveParticipantView("students")}
                        className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                          activeParticipantView === "students"
                            ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        Select Students
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveParticipantView("faculty")}
                        className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                          activeParticipantView === "faculty"
                            ? "bg-green-50 text-green-600 border-b-2 border-green-600"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        Select Faculty
                      </button>
                    </div>
                  )}

                  {/* Search and filters */}
                  <div className="space-y-4 mb-4">
                    {/* Search bar */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder={`Search ${
                            newEvent.audience === "Student" ||
                            (newEvent.audience === "Both" && activeParticipantView === "students")
                              ? "students"
                              : "faculty"
                          }...`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectAll(
                            newEvent.audience === "Student" ||
                              (newEvent.audience === "Both" && activeParticipantView === "students")
                              ? "students"
                              : "faculty",
                          )
                        }
                        className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
                          areAllSelected(
                            newEvent.audience === "Student" ||
                              (newEvent.audience === "Both" && activeParticipantView === "students")
                              ? "students"
                              : "faculty",
                          )
                            ? (
                                newEvent.audience === "Student" ||
                                  (newEvent.audience === "Both" && activeParticipantView === "students")
                              )
                              ? "bg-blue-600 text-white"
                              : "bg-green-600 text-white"
                            : (
                                  newEvent.audience === "Student" ||
                                    (newEvent.audience === "Both" && activeParticipantView === "students")
                                )
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>
                          {areAllSelected(
                            newEvent.audience === "Student" ||
                              (newEvent.audience === "Both" && activeParticipantView === "students")
                              ? "students"
                              : "faculty",
                          )
                            ? "Deselect All"
                            : "Select All"}
                        </span>
                      </button>
                    </div>

                    {/* Filter controls */}
                    {newEvent.audience === "Student" ||
                    (newEvent.audience === "Both" && activeParticipantView === "students") ? (
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
                  <div className="max-h-60 overflow-y-auto border rounded-lg">
                    {(() => {
                      const participants =
                        newEvent.audience === "Student" ||
                        (newEvent.audience === "Both" && activeParticipantView === "students")
                          ? getFilteredStudents()
                          : getFilteredFaculty()

                      if (participants.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                            <Users className="w-8 h-8 text-gray-300 mb-2" />
                            <p className="text-sm">
                              No{" "}
                              {newEvent.audience === "Student" ||
                              (newEvent.audience === "Both" && activeParticipantView === "students")
                                ? "students"
                                : "faculty"}{" "}
                              found
                            </p>
                          </div>
                        )
                      }

                      return (
                        <div className="space-y-1 p-2">
                          {participants.map((participant) => {
                            const isSelected = selectedRecipients.find(
                              (p) => p.id === participant.id && p.type === participant.type,
                            )
                            const isStudent = participant.type === "student"

                            return (
                              <div
                                key={`${participant.type}-${participant.id}`}
                                className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? isStudent
                                      ? "bg-blue-50 border-blue-200"
                                      : "bg-green-50 border-green-200"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => toggleRecipient(participant)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs ${
                                        isStudent ? "bg-blue-500" : "bg-green-500"
                                      }`}
                                    >
                                      {isStudent
                                        ? `${participant.firstName?.[0] || ""}${participant.lastName?.[0] || ""}`
                                        : participant.name?.[0] || ""}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-medium text-gray-900 text-sm">
                                        {isStudent
                                          ? `${participant.firstName} ${participant.lastName}`
                                          : participant.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {isStudent ? (
                                          <>
                                            {participant.rollNumber} • {participant.year} Year •{" "}
                                            {participant.department} • Section {participant.section}
                                          </>
                                        ) : (
                                          <>
                                            {participant.position} • {participant.department}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${
                                        isStudent ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {isStudent ? "Student" : "Faculty"}
                                    </span>
                                    {isSelected && (
                                      <div
                                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                          isStudent ? "bg-blue-600" : "bg-green-600"
                                        }`}
                                      >
                                        <Check className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
              >
                Submit
              </button>
            </form>
          )}

          {/* Event List */}
          <div>
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-blue-50 hover:bg-blue-500 hover:text-white transition-colors rounded-lg p-4 mb-4 shadow"
              >
                <div className="text-lg font-bold">{event.name}</div>
                <div className="text-sm">🕒 {event.time}</div>
                <div className="text-sm">📍 {event.venue}</div>
                <div className="text-sm">🎯 For: {event.audience}</div>
                {event.recipients && event.recipients.length > 0 && (
                  <div className="text-sm mt-2">
                    👥 Recipients: {event.recipients.length} selected
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.recipients.slice(0, 3).map((recipient, idx) => (
                        <span key={idx} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          {recipient.type === "student"
                            ? `${recipient.firstName} ${recipient.lastName}`
                            : recipient.name}
                        </span>
                      ))}
                      {event.recipients.length > 3 && (
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          +{event.recipients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification_Message
