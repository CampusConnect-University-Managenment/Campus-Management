"use client"

import { useState } from "react"
import { X, MessageCircle, Users } from "lucide-react"

// Mock data for filtering
const mockStudents = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    rollNumber: "CS2021001",
    year: "3rd",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    rollNumber: "CS2021002",
    year: "3rd",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    rollNumber: "CS2022001",
    year: "2nd",
    department: "Computer Science",
    section: "B",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Wilson",
    rollNumber: "IT2021001",
    year: "3rd",
    department: "Information Technology",
    section: "A",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    rollNumber: "CS2023001",
    year: "1st",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    rollNumber: "IT2022001",
    year: "2nd",
    department: "Information Technology",
    section: "B",
  },
  {
    id: 7,
    firstName: "Alex",
    lastName: "Johnson",
    rollNumber: "CS2021003",
    year: "3rd",
    department: "Computer Science",
    section: "B",
  },
  {
    id: 8,
    firstName: "Maria",
    lastName: "Garcia",
    rollNumber: "IT2021002",
    year: "3rd",
    department: "Information Technology",
    section: "A",
  },
  {
    id: 9,
    firstName: "James",
    lastName: "Miller",
    rollNumber: "CS2022002",
    year: "2nd",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 10,
    firstName: "Lisa",
    lastName: "Anderson",
    rollNumber: "IT2022002",
    year: "2nd",
    department: "Information Technology",
    section: "B",
  },
  {
    id: 11,
    firstName: "Robert",
    lastName: "Taylor",
    rollNumber: "CS2021004",
    year: "3rd",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 12,
    firstName: "Jennifer",
    lastName: "White",
    rollNumber: "IT2021003",
    year: "3rd",
    department: "Information Technology",
    section: "B",
  },
  {
    id: 13,
    firstName: "Michael",
    lastName: "Clark",
    rollNumber: "CS2022003",
    year: "2nd",
    department: "Computer Science",
    section: "C",
  },
  {
    id: 14,
    firstName: "Jessica",
    lastName: "Martinez",
    rollNumber: "IT2022003",
    year: "2nd",
    department: "Information Technology",
    section: "A",
  },
  {
    id: 15,
    firstName: "Christopher",
    lastName: "Lee",
    rollNumber: "CS2023002",
    year: "1st",
    department: "Computer Science",
    section: "B",
  },
  {
    id: 16,
    firstName: "Amanda",
    lastName: "Harris",
    rollNumber: "IT2023001",
    year: "1st",
    department: "Information Technology",
    section: "A",
  },
  {
    id: 17,
    firstName: "Daniel",
    lastName: "Thompson",
    rollNumber: "CS2021005",
    year: "3rd",
    department: "Computer Science",
    section: "C",
  },
  {
    id: 18,
    firstName: "Ashley",
    lastName: "Moore",
    rollNumber: "IT2021004",
    year: "3rd",
    department: "Information Technology",
    section: "A",
  },
  {
    id: 19,
    firstName: "Matthew",
    lastName: "Jackson",
    rollNumber: "CS2022004",
    year: "2nd",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 20,
    firstName: "Stephanie",
    lastName: "Martin",
    rollNumber: "IT2022004",
    year: "2nd",
    department: "Information Technology",
    section: "C",
  },
  {
    id: 21,
    firstName: "Kevin",
    lastName: "Rodriguez",
    rollNumber: "CS2023003",
    year: "1st",
    department: "Computer Science",
    section: "A",
  },
  {
    id: 22,
    firstName: "Rachel",
    lastName: "Lewis",
    rollNumber: "IT2023002",
    year: "1st",
    department: "Information Technology",
    section: "B",
  },
  {
    id: 23,
    firstName: "Brandon",
    lastName: "Walker",
    rollNumber: "CS2021006",
    year: "3rd",
    department: "Computer Science",
    section: "B",
  },
  {
    id: 24,
    firstName: "Nicole",
    lastName: "Hall",
    rollNumber: "IT2021005",
    year: "3rd",
    department: "Information Technology",
    section: "C",
  },
  {
    id: 25,
    firstName: "Tyler",
    lastName: "Allen",
    rollNumber: "CS2022005",
    year: "2nd",
    department: "Computer Science",
    section: "B",
  },
]

const mockFaculty = [
  { id: 1, name: "Dr. Robert Brown", department: "Computer Science" },
  { id: 2, name: "Prof. Lisa Davis", department: "Information Technology" },
  { id: 3, name: "Dr. Mark Wilson", department: "Computer Science" },
  { id: 4, name: "Prof. Emily Johnson", department: "Mathematics" },
  { id: 5, name: "Dr. Sarah Thompson", department: "Computer Science" },
  { id: 6, name: "Prof. Michael Chen", department: "Information Technology" },
]

const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [activeTab, setActiveTab] = useState("individual")
  const [chatType, setChatType] = useState("student")
  const [chatName, setChatName] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState([])

  // Individual chat form data
  const [individualForm, setIndividualForm] = useState({
    chatType: "student",
    firstName: "",
    lastName: "",
    rollNumber: "",
    facultyName: "",
    department: "",
  })

  // Group chat filters
  const [groupFilters, setGroupFilters] = useState({
    year: "",
    department: "",
    section: "",
    name: "",
    facultyDepartment: "",
    facultyName: "",
  })

  const handleIndividualFormChange = (field, value) => {
    setIndividualForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleGroupFilterChange = (field, value) => {
    setGroupFilters((prev) => ({ ...prev, [field]: value }))
  }

  const getFilteredStudents = () => {
    return mockStudents.filter((student) => {
      return (
        (!groupFilters.year || student.year === groupFilters.year) &&
        (!groupFilters.department || student.department === groupFilters.department) &&
        (!groupFilters.section || student.section === groupFilters.section) &&
        (!groupFilters.name ||
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(groupFilters.name.toLowerCase()))
      )
    })
  }

  const getFilteredFaculty = () => {
    return mockFaculty.filter((faculty) => {
      return (
        (!groupFilters.facultyDepartment || faculty.department === groupFilters.facultyDepartment) &&
        (!groupFilters.facultyName || faculty.name.toLowerCase().includes(groupFilters.facultyName.toLowerCase()))
      )
    })
  }

  const toggleParticipant = (participant) => {
    setSelectedParticipants((prev) => {
      const exists = prev.find((p) => p.id === participant.id && p.type === chatType)
      if (exists) {
        return prev.filter((p) => !(p.id === participant.id && p.type === chatType))
      } else {
        return [...prev, { ...participant, type: chatType }]
      }
    })
  }

  const handleCreateChat = () => {
    if (activeTab === "individual") {
      const chatData = {
        name:
          individualForm.chatType === "student"
            ? `${individualForm.firstName} ${individualForm.lastName}`
            : individualForm.facultyName,
        type: individualForm.chatType.toUpperCase(),
        participants: [individualForm],
      }
      onCreateChat(chatData)
    } else {
      const chatData = {
        name: chatName || `Group Chat (${selectedParticipants.length} members)`,
        type: "GROUP",
        participants: selectedParticipants,
      }
      onCreateChat(chatData)
    }
    // Reset form
    setIndividualForm({
      chatType: "student",
      firstName: "",
      lastName: "",
      rollNumber: "",
      facultyName: "",
      department: "",
    })
    setGroupFilters({
      year: "",
      department: "",
      section: "",
      name: "",
      facultyDepartment: "",
      facultyName: "",
    })
    setSelectedParticipants([])
    setChatName("")
  }

  const filteredStudents = getFilteredStudents()
  const filteredFaculty = getFilteredFaculty()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="px-6 py-4 border-b border-gray-200 relative flex-shrink-0">
          <div className="flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Create New Chat</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Tab Selection - Fixed */}
        <div className="px-6 pt-6 flex-shrink-0">
          <div className="flex w-full mb-6">
            <button
              onClick={() => setActiveTab("individual")}
              className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === "individual"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              Individual Chat
            </button>
            <button
              onClick={() => setActiveTab("group")}
              className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === "group"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              Group Chat
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6">
          {activeTab === "individual" ? (
            /* Individual Chat Section */
            <div className="space-y-6 pb-6">
              {/* Chat Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chat Type</label>
                <select
                  value={individualForm.chatType}
                  onChange={(e) => handleIndividualFormChange("chatType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              {/* Form Fields */}
              {individualForm.chatType === "student" ? (
                <div className="space-y-4">
                  {/* First Name and Last Name - Side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={individualForm.firstName}
                        onChange={(e) => handleIndividualFormChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={individualForm.lastName}
                        onChange={(e) => handleIndividualFormChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {/* Student Roll Number - Full width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Roll Number</label>
                    <input
                      type="text"
                      value={individualForm.rollNumber}
                      onChange={(e) => handleIndividualFormChange("rollNumber", e.target.value)}
                      placeholder="Enter roll number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Name</label>
                    <input
                      type="text"
                      value={individualForm.facultyName}
                      onChange={(e) => handleIndividualFormChange("facultyName", e.target.value)}
                      placeholder="Enter faculty name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={individualForm.department}
                      onChange={(e) => handleIndividualFormChange("department", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Group Chat Section */
            <div className="space-y-6 pb-6">
              {/* Group Chat Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Chat Name</label>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder="Enter group chat name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Students/Faculty Selection */}
              <div className="flex w-full border-b border-gray-200">
                <button
                  onClick={() => {
                    setChatType("student")
                    setSelectedParticipants([])
                  }}
                  className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
                    chatType === "student"
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => {
                    setChatType("faculty")
                    setSelectedParticipants([])
                  }}
                  className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
                    chatType === "faculty"
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Faculty
                </button>
              </div>

              {/* Filter Section */}
              {chatType === "student" ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Filter Students</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <select
                        value={groupFilters.year}
                        onChange={(e) => handleGroupFilterChange("year", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <select
                        value={groupFilters.department}
                        onChange={(e) => handleGroupFilterChange("department", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                      <select
                        value={groupFilters.section}
                        onChange={(e) => handleGroupFilterChange("section", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={groupFilters.name}
                        onChange={(e) => handleGroupFilterChange("name", e.target.value)}
                        placeholder="Search by name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Filter Faculty</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <select
                        value={groupFilters.facultyDepartment}
                        onChange={(e) => handleGroupFilterChange("facultyDepartment", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Mathematics">Mathematics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={groupFilters.facultyName}
                        onChange={(e) => handleGroupFilterChange("facultyName", e.target.value)}
                        placeholder="Search by name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Participants List */}
              <div className="border border-gray-200 rounded-lg">
                <div className="max-h-60 overflow-y-auto">
                  {(chatType === "student" ? filteredStudents : filteredFaculty).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <Users className="w-8 h-8 text-gray-300 mb-2" />
                      <p>No {chatType === "student" ? "students" : "faculty"} found</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {(chatType === "student" ? filteredStudents : filteredFaculty).map((participant) => {
                        const isSelected = selectedParticipants.find((p) => p.id === participant.id)
                        return (
                          <div
                            key={participant.id}
                            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                              isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                            }`}
                            onClick={() => toggleParticipant(participant)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {chatType === "student"
                                    ? `${participant.firstName} ${participant.lastName}`
                                    : participant.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {chatType === "student" ? (
                                    <>
                                      {participant.rollNumber} • {participant.year} Year • {participant.department} •
                                      Section {participant.section}
                                    </>
                                  ) : (
                                    participant.department
                                  )}
                                </div>
                              </div>
                              {isSelected && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Selected
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Participants */}
              {selectedParticipants.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">
                      Selected Participants ({selectedParticipants.length})
                    </span>
                    <button
                      onClick={() => setSelectedParticipants([])}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedParticipants.map((participant, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {participant.type === "student"
                          ? `${participant.firstName} ${participant.lastName}`
                          : participant.name}
                        <button
                          onClick={() => toggleParticipant(participant)}
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            disabled={
              activeTab === "individual"
                ? individualForm.chatType === "student"
                  ? !individualForm.firstName || !individualForm.lastName || !individualForm.rollNumber
                  : !individualForm.facultyName || !individualForm.department
                : selectedParticipants.length === 0
            }
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewChatModal
