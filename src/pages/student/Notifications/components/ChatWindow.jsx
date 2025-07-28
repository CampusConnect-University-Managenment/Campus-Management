"use client"

import { useRef, useEffect, useState } from "react"
import { Users, MoreVertical, Eye, X, Send } from "lucide-react"
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

const ChatWindow = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef(null)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

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

  return (
    <div className="flex flex-col bg-white relative h-full max-h-full">
      {/* Chat Header */}
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
          {/* Header Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowParticipants(true)
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Participants</span>
                  </button>
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
                <button onClick={() => setShowParticipants(false)} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
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

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <SimpleMessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
