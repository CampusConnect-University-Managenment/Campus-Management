"use client"

import { useRef, useEffect, useState } from "react"
import { Users, MoreVertical, Eye, UserPlus, UserMinus, X, Search, Check, Send } from "lucide-react"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import { ScrollArea } from "./ui/ScrollArea"

// Mock data for adding participants (same as in new-chat-modal)
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

// Simple Message Input Component (completely without file upload, improved positioning)
const SimpleMessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleTextareaChange = (e) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <div className="border-t-2 border-gray-300 bg-white px-3 py-3 sm:px-4 sm:py-4 shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full resize-none rounded-xl border-2 border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-base transition-all duration-200 bg-gray-50 hover:bg-white shadow-sm"
            rows={1}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0 shadow-md transform hover:scale-105 active:scale-95"
        >
          <Send className="h-5 w-5 sm:h-5 sm:w-5" />
        </button>
      </form>
    </div>
  )
}

const ChatWindow = ({ chat, currentUser, onSendMessage, onUpdateChat }) => {
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showAddParticipants, setShowAddParticipants] = useState(false)
  const [showRemoveParticipants, setShowRemoveParticipants] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeParticipantView, setActiveParticipantView] = useState("students")
  const [selectedNewParticipants, setSelectedNewParticipants] = useState([])
  const [selectedRemoveParticipants, setSelectedRemoveParticipants] = useState([])

  // Enhanced filtering states
  const [studentFilters, setStudentFilters] = useState({
    year: "",
    department: "",
    section: "",
    name: "",
  })

  const [facultyFilters, setFacultyFilters] = useState({
    department: "",
    name: "",
  })

  // Responsive design state
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  // Check for mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "general":
        return "bg-green-100 text-green-800"
      case "faculty":
        return "bg-orange-100 text-orange-800"
      case "group":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvatarColor = (senderId, senderName) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ]
    const index = (senderId || senderName || "").length % colors.length
    return colors[index]
  }

  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - messageDate) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (diffInHours < 48) {
      return (
        "Yesterday " +
        messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    } else {
      return (
        messageDate.toLocaleDateString() +
        " " +
        messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }
  }

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

      // Apply filters
      const matchesYear = !studentFilters.year || student.year === studentFilters.year
      const matchesDepartment = !studentFilters.department || student.department === studentFilters.department
      const matchesSection = !studentFilters.section || student.section === studentFilters.section
      const matchesName =
        !studentFilters.name ||
        fullName.includes(studentFilters.name.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(studentFilters.name.toLowerCase())

      // Apply search query
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())

      // Don't show students who are already participants
      const isAlreadyParticipant = chat?.participantNames?.some((name) => name.toLowerCase() === fullName)

      return matchesYear && matchesDepartment && matchesSection && matchesName && matchesSearch && !isAlreadyParticipant
    })
  }

  const getFilteredFaculty = () => {
    return mockFaculty.filter((faculty) => {
      // Apply filters
      const matchesDepartment = !facultyFilters.department || faculty.department === facultyFilters.department
      const matchesName = !facultyFilters.name || faculty.name.toLowerCase().includes(facultyFilters.name.toLowerCase())

      // Apply search query
      const matchesSearch = !searchQuery || faculty.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Don't show faculty who are already participants
      const isAlreadyParticipant = chat?.participantNames?.some(
        (name) => name.toLowerCase() === faculty.name.toLowerCase(),
      )

      return matchesDepartment && matchesName && matchesSearch && !isAlreadyParticipant
    })
  }

  const toggleNewParticipant = (participant) => {
    setSelectedNewParticipants((prev) => {
      const exists = prev.find((p) => p.id === participant.id && p.type === participant.type)
      if (exists) {
        return prev.filter((p) => !(p.id === participant.id && p.type === participant.type))
      } else {
        return [...prev, participant]
      }
    })
  }

  const toggleRemoveParticipant = (participantName) => {
    setSelectedRemoveParticipants((prev) => {
      if (prev.includes(participantName)) {
        return prev.filter((name) => name !== participantName)
      } else {
        return [...prev, participantName]
      }
    })
  }

  // Select All functionality for add participants
  const handleSelectAll = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const currentTypeParticipants = selectedNewParticipants.filter((p) => p.type === type.slice(0, -1)) // Remove 's' from 'students'

    if (currentTypeParticipants.length === filteredParticipants.length) {
      // Deselect all of this type
      setSelectedNewParticipants((prev) => prev.filter((p) => p.type !== type.slice(0, -1)))
    } else {
      // Select all of this type
      const otherTypeParticipants = selectedNewParticipants.filter((p) => p.type !== type.slice(0, -1))
      setSelectedNewParticipants([...otherTypeParticipants, ...filteredParticipants])
    }
  }

  // Select All functionality for remove participants
  const handleSelectAllRemove = () => {
    if (selectedRemoveParticipants.length === chat?.participantNames?.length) {
      // Deselect all
      setSelectedRemoveParticipants([])
    } else {
      // Select all
      setSelectedRemoveParticipants([...(chat?.participantNames || [])])
    }
  }

  // Check if all filtered participants of a type are selected
  const areAllSelected = (type) => {
    const filteredParticipants = type === "students" ? getFilteredStudents() : getFilteredFaculty()
    const selectedOfType = selectedNewParticipants.filter((p) => p.type === type.slice(0, -1))
    return filteredParticipants.length > 0 && selectedOfType.length === filteredParticipants.length
  }

  const handleAddParticipants = () => {
    if (selectedNewParticipants.length === 0) return

    const newParticipantNames = selectedNewParticipants.map((p) =>
      p.type === "student" ? `${p.firstName} ${p.lastName}` : p.name,
    )

    const updatedChat = {
      ...chat,
      participants: chat.participants + selectedNewParticipants.length,
      participantNames: [...(chat.participantNames || []), ...newParticipantNames],
    }

    onUpdateChat?.(updatedChat)
    setSelectedNewParticipants([])
    setShowAddParticipants(false)
    setSearchQuery("")
    // Reset filters
    setStudentFilters({ year: "", department: "", section: "", name: "" })
    setFacultyFilters({ department: "", name: "" })
  }

  const handleRemoveParticipants = () => {
    if (selectedRemoveParticipants.length === 0) return

    const updatedChat = {
      ...chat,
      participants: chat.participants - selectedRemoveParticipants.length,
      participantNames: chat.participantNames?.filter((name) => !selectedRemoveParticipants.includes(name)) || [],
    }

    onUpdateChat?.(updatedChat)
    setSelectedRemoveParticipants([])
    setShowRemoveParticipants(false)
  }

  const closeAllModals = () => {
    setShowParticipants(false)
    setShowAddParticipants(false)
    setShowRemoveParticipants(false)
    setShowDropdown(false)
    setSearchQuery("")
    setSelectedNewParticipants([])
    setSelectedRemoveParticipants([])
    // Reset filters
    setStudentFilters({ year: "", department: "", section: "", name: "" })
    setFacultyFilters({ department: "", name: "" })
  }

  // Get unique values for filter options
  const availableDepartments = [...new Set([...mockStudents, ...mockFaculty].map((p) => p.department))]
  const availableYears = [...new Set(mockStudents.map((s) => s.year))]
  const availableSections = [...new Set(mockStudents.map((s) => s.section))]

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600 text-lg bg-white h-full">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No chat selected</h3>
          <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  const isGroupChat = chat.type?.toLowerCase() === "group"
  return (
    <div className="flex flex-col bg-white relative h-full max-h-full">
      {/* Chat Header with enhanced participant management */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: getAvatarColor(chat.id, chat.name) }}
            >
              {chat.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base md:text-lg text-gray-800 font-semibold">{chat.name}</h2>
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span>{chat.participants || 0} participants</span>
                <span className="text-gray-300">•</span>
                <Badge className={`text-xs ${getTypeColor(chat.type)}`}>{chat.type?.toUpperCase() || "CHAT"}</Badge>
              </div>
            </div>
          </div>

          {/* Header Actions with enhanced options */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* More Options Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>

              {/* Enhanced Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowParticipants(true)
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 rounded-t-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Participants</span>
                  </button>

                  {isGroupChat && (
                    <>
                      <button
                        onClick={() => {
                          setShowAddParticipants(true)
                          setShowDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Add Participants</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowRemoveParticipants(true)
                          setShowDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 rounded-b-lg"
                      >
                        <UserMinus className="w-4 h-4" />
                        <span>Remove Participants</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Participants Modal */}
      {showParticipants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Participants ({chat.participants})</h3>
                <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
                  ×
                </button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {chat.participantNames?.map((name, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: getAvatarColor(index, name) }}
                    >
                      {name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                )) || (
                  <div className="text-center text-gray-500 py-8">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No participant information available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Enhanced Add Participants Modal with Comprehensive Filtering */}
      {showAddParticipants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-center space-x-2 relative">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Add Participants</h2>
                <button
                  onClick={closeAllModals}
                  className="absolute right-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1 text-center">Select users to add to "{chat.name}"</p>
            </div>

            {/* Selected participants summary */}
            {selectedNewParticipants.length > 0 && (
              <div className="px-4 py-3 border-b border-gray-200 bg-blue-50 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-blue-800">
                      Selected Participants ({selectedNewParticipants.length})
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <span className="bg-blue-100 px-2 py-1 rounded-full">
                        {selectedNewParticipants.filter((p) => p.type === "student").length} Students
                      </span>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {selectedNewParticipants.filter((p) => p.type === "faculty").length} Faculty
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNewParticipants([])}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {selectedNewParticipants.map((participant) => (
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
                        onClick={() => toggleNewParticipant(participant)}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main content area with proper flex and overflow */}
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
                {/* Search bar */}
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
                    onClick={() => handleSelectAll(activeParticipantView)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
                      areAllSelected(activeParticipantView)
                        ? activeParticipantView === "students"
                          ? "bg-blue-600 text-white"
                          : "bg-green-600 text-white"
                        : activeParticipantView === "students"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{areAllSelected(activeParticipantView) ? "Deselect All" : "Select All"}</span>
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

              {/* Participants list - This is the scrollable area */}
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
                        const isSelected = selectedNewParticipants.find(
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
                            onClick={() => toggleNewParticipant(participant)}
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
                  onClick={closeAllModals}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddParticipants}
                  disabled={selectedNewParticipants.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Participants ({selectedNewParticipants.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Remove Participants Modal with Select All */}
      {showRemoveParticipants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-center space-x-2 relative">
                <UserMinus className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-800">Remove Participants</h2>
                <button
                  onClick={closeAllModals}
                  className="absolute right-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1 text-center">Select participants to remove from "{chat.name}"</p>
            </div>

            {/* Select All option */}
            <div className="px-4 py-2 border-b border-gray-200 flex-shrink-0">
              <button
                onClick={handleSelectAllRemove}
                className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors w-full ${
                  selectedRemoveParticipants.length === chat?.participantNames?.length
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                <Check className="w-4 h-4" />
                <span>
                  {selectedRemoveParticipants.length === chat?.participantNames?.length ? "Deselect All" : "Select All"}
                </span>
              </button>
            </div>

            {/* Selected participants summary */}
            {selectedRemoveParticipants.length > 0 && (
              <div className="px-4 py-3 border-b border-gray-200 bg-red-50 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-red-800">
                    Selected for removal ({selectedRemoveParticipants.length})
                  </span>
                  <button
                    onClick={() => setSelectedRemoveParticipants([])}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {selectedRemoveParticipants.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {name}
                      <button
                        onClick={() => toggleRemoveParticipant(name)}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Participants list */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {chat.participantNames?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Users className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-lg font-medium">No participants to remove</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chat.participantNames?.map((name, index) => {
                    const isSelected = selectedRemoveParticipants.includes(name)
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "bg-red-50 border-red-200 shadow-sm"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => toggleRemoveParticipant(name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                              style={{ backgroundColor: getAvatarColor(index, name) }}
                            >
                              {name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="font-medium text-gray-900">{name}</div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-600">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveParticipants}
                disabled={selectedRemoveParticipants.length === 0}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Remove Participants ({selectedRemoveParticipants.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 bg-gray-50 min-h-0">
        {chat.messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </div>
              <p className="text-base sm:text-lg font-medium mb-1">No messages yet</p>
              <p className="text-sm">Start the conversation by sending a message!</p>
            </div>
          </div>
        ) : (
          <>
            {chat.messages?.map((message, index) => {
              const isOwnMessage = message.senderId === currentUser.id
              const showAvatar = index === 0 || chat.messages[index - 1].senderId !== message.senderId

              return (
                <div
                  key={message.id}
                  className={`mb-2 sm:mb-3 flex items-end gap-1 sm:gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}
                >
                  {/* Message Avatar */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0">
                    {showAvatar && !isOwnMessage && (
                      <div
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        title={message.senderName}
                        style={{ backgroundColor: getAvatarColor(message.senderId, message.senderName) }}
                      >
                        {message.senderName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-[80%] sm:max-w-[75%] md:max-w-[70%] ${isOwnMessage ? "text-right" : ""}`}>
                    {!isOwnMessage && showAvatar && chat.type?.toLowerCase() === "group" && (
                      <div className="text-xs text-gray-500 mb-1 px-1">{message.senderName}</div>
                    )}

                    <div
                      className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-2xl shadow-sm relative ${
                        isOwnMessage
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <div className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
                        {message.content || message.message}
                      </div>
                    </div>

                    <div className={`text-xs mt-1 px-1 ${isOwnMessage ? "text-gray-400 text-right" : "text-gray-500"}`}>
                      {formatMessageTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Now fixed at the bottom of the chat window */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <SimpleMessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
