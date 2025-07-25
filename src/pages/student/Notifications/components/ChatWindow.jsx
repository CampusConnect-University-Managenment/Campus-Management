"use client"

import { useRef, useEffect, useState } from "react"
import { Users, MoreVertical, Eye, UserPlus, UserMinus, X, Search, Check } from "lucide-react"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import MessageInput from "./MessageInput"
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
]

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

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

  const getFilteredStudents = () => {
    return mockStudents.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())

      // Don't show students who are already participants
      const isAlreadyParticipant = chat?.participantNames?.some((name) => name.toLowerCase() === fullName)

      return matchesSearch && !isAlreadyParticipant
    })
  }

  const getFilteredFaculty = () => {
    return mockFaculty.filter((faculty) => {
      const matchesSearch = !searchQuery || faculty.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Don't show faculty who are already participants
      const isAlreadyParticipant = chat?.participantNames?.some(
        (name) => name.toLowerCase() === faculty.name.toLowerCase(),
      )

      return matchesSearch && !isAlreadyParticipant
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
  }

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
    <div className="h-full flex flex-col bg-white relative">
      {/* Chat Header with enhanced participant management */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: getAvatarColor(chat.id, chat.name) }}
            >
              {chat.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg text-gray-800 font-semibold">{chat.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{chat.participants || 0} participants</span>
                <span className="text-gray-300">•</span>
                <Badge className={`text-xs ${getTypeColor(chat.type)}`}>{chat.type?.toUpperCase() || "CHAT"}</Badge>
              </div>
            </div>
          </div>

          {/* Header Actions with enhanced options */}
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

      {/* View Participants Modal */}
      {showParticipants && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
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

      {/* Add Participants Modal */}
      {showAddParticipants && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Add Participants</h3>
                <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {/* Selected participants summary */}
              {selectedNewParticipants.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">Selected ({selectedNewParticipants.length})</span>
                    <button
                      onClick={() => setSelectedNewParticipants([])}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNewParticipants.map((participant) => (
                      <span
                        key={`${participant.type}-${participant.id}`}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
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

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Participant type tabs */}
              <div className="flex mb-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveParticipantView("students")}
                  className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "students"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveParticipantView("faculty")}
                  className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                    activeParticipantView === "faculty"
                      ? "border-b-2 border-green-600 text-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Faculty
                </button>
              </div>

              {/* Participants list */}
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Users className="w-8 h-8 text-gray-300 mb-2" />
                    <p>No available {activeParticipantView} to add</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {(activeParticipantView === "students" ? getFilteredStudents() : getFilteredFaculty()).map(
                      (participant) => {
                        const isSelected = selectedNewParticipants.find(
                          (p) => p.id === participant.id && p.type === participant.type,
                        )
                        return (
                          <div
                            key={`${participant.type}-${participant.id}`}
                            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                              isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                            }`}
                            onClick={() => toggleNewParticipant(participant)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                                    activeParticipantView === "students" ? "bg-blue-500" : "bg-green-500"
                                  }`}
                                >
                                  <span className="text-xs">
                                    {activeParticipantView === "students"
                                      ? `${participant.firstName?.[0] || ""}${participant.lastName?.[0] || ""}`
                                      : participant.name?.[0] || ""}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-sm">
                                    {activeParticipantView === "students"
                                      ? `${participant.firstName} ${participant.lastName}`
                                      : participant.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {activeParticipantView === "students" ? (
                                      <>
                                        {participant.rollNumber} • {participant.department}
                                      </>
                                    ) : (
                                      <>
                                        {participant.position} • {participant.department}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
              <Button variant="outline" onClick={closeAllModals}>
                Cancel
              </Button>
              <Button
                onClick={handleAddParticipants}
                disabled={selectedNewParticipants.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add {selectedNewParticipants.length} Participant{selectedNewParticipants.length !== 1 ? "s" : ""}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Participants Modal */}
      {showRemoveParticipants && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Remove Participants</h3>
                <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {selectedRemoveParticipants.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-800">
                      Selected for removal ({selectedRemoveParticipants.length})
                    </span>
                    <button
                      onClick={() => setSelectedRemoveParticipants([])}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {chat.participantNames?.map((name, index) => {
                  const isSelected = selectedRemoveParticipants.includes(name)
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "bg-red-50 border border-red-200" : ""
                      }`}
                      onClick={() => toggleRemoveParticipant(name)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                          style={{ backgroundColor: getAvatarColor(index, name) }}
                        >
                          {name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700">{name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-red-600" />}
                    </div>
                  )
                }) || (
                  <div className="text-center text-gray-500 py-8">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No participants to remove</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
              <Button variant="outline" onClick={closeAllModals}>
                Cancel
              </Button>
              <Button
                onClick={handleRemoveParticipants}
                disabled={selectedRemoveParticipants.length === 0}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Remove {selectedRemoveParticipants.length} Participant
                {selectedRemoveParticipants.length !== 1 ? "s" : ""}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ paddingBottom: "8px" }}>
        {chat.messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-lg font-medium mb-1">No messages yet</p>
              <p className="text-sm">Start the conversation by sending a message!</p>
            </div>
          </div>
        ) : (
          <>
            {chat.messages?.map((message, index) => {
              const isOwnMessage = message.senderId === currentUser.id
              const showAvatar = index === 0 || chat.messages[index - 1].senderId !== message.senderId

              return (
                <div key={message.id} className={`mb-3 flex items-end gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                  {/* Message Avatar */}
                  <div className="w-8 h-8 flex-shrink-0">
                    {showAvatar && !isOwnMessage && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        title={message.senderName}
                        style={{ backgroundColor: getAvatarColor(message.senderId, message.senderName) }}
                      >
                        {message.senderName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-[70%] ${isOwnMessage ? "text-right" : ""}`}>
                    {!isOwnMessage && showAvatar && chat.type?.toLowerCase() === "group" && (
                      <div className="text-xs text-gray-500 mb-1 px-1">{message.senderName}</div>
                    )}

                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm relative ${
                        isOwnMessage
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
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

      {/* Message Input */}
      <div className="flex-shrink-0" style={{ marginTop: "-8px" }}>
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
