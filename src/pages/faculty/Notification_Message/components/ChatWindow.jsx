"use client"

import { useRef, useEffect, useState } from "react"
import { Users, MoreVertical, Eye, Send, UserMinus, X } from "lucide-react"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import { ScrollArea } from "./ui/ScrollArea"
import { toast } from "sonner"

const SimpleMessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) textareaRef.current.style.height = "auto"
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

const ChatWindow = ({ chat, currentUser, onSendMessage, participantDetails = {}, onUpdateParticipants }) => {
  const messagesEndRef = useRef(null)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showRemoveParticipant, setShowRemoveParticipant] = useState(false)
  const [removeId, setRemoveId] = useState("")
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  // Fetch participant details when chat changes
  useEffect(() => {
    const fetchParticipants = async () => {
      if (chat?.id && chat?.id !== "global") {
        setLoading(true)
        try {
          console.log("Fetching participants for group:", chat.id)

          const response = await fetch(`http://localhost:8081/api/groups/${chat.id}`)
          if (response.ok) {
            const groupData = await response.json()
            console.log("Group data:", groupData)

            const memberIds = groupData.memberIds || []
            setParticipants(memberIds)
            console.log("Participants:", memberIds)
          } else {
            console.error("Failed to fetch group data:", response.status)
            toast.error("Failed to load group details")
          }
        } catch (error) {
          console.error("Error fetching participants:", error)
          toast.error("Failed to load participants")
        } finally {
          setLoading(false)
        }
      } else if (chat?.id === "global") {
        setParticipants(["everyone"])
      }
    }

    fetchParticipants()
  }, [chat?.id])

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "general":
        return "bg-green-100 text-green-800"
      case "faculty":
        return "bg-orange-100 text-orange-800"
      case "group":
        return "bg-purple-100 text-purple-800"
      case "global":
        return "bg-blue-100 text-blue-800"
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
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday " + messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return (
        messageDate.toLocaleDateString() +
        " " +
        messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    }
  }

  // Check if current user is faculty
  const isFaculty = currentUser.role === "faculty" || currentUser.id.startsWith("P")

  // Handle remove participant
  const handleRemoveParticipant = async () => {
    if (!removeId.trim()) {
      toast.error("Please enter a valid participant ID")
      return
    }

    if (!isFaculty) {
      toast.error("Only faculty can remove participants")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`http://localhost:8081/api/groups/${chat.id}/remove-member/${removeId.trim()}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const updatedGroup = await response.json()

        // Update local state
        const newMemberIds = updatedGroup.memberIds || []
        setParticipants(newMemberIds)

        // Send system message
        onSendMessage(`${removeId.trim()} has been removed from the group.`)

        // Update parent component
        if (onUpdateParticipants) {
          onUpdateParticipants(newMemberIds)
        }

        toast.success(`Successfully removed ${removeId.trim()}`)
        setRemoveId("")
        setShowRemoveParticipant(false)
      } else {
        const errorData = await response.text()
        toast.error(errorData || "Failed to remove participant")
      }
    } catch (error) {
      console.error("Error removing participant:", error)
      toast.error("Failed to remove participant. Please try again.")
    } finally {
      setLoading(false)
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
                <span>{participants.length} participants</span>
                <span className="text-gray-300">•</span>
                <Badge className={`text-xs ${getTypeColor(chat.type)}`}>{chat.type?.toUpperCase() || "CHAT"}</Badge>
              </div>
            </div>
          </div>

          {/* Three Dots Menu */}
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
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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

                {/* Only show Remove Participant option for faculty */}
                {isFaculty && chat.id !== "global" && (
                  <button
                    onClick={() => {
                      setShowRemoveParticipant(true)
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 rounded-lg"
                  >
                    <UserMinus className="w-4 h-4" />
                    <span>Remove Participant</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remove Participant Modal */}
      {showRemoveParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Remove Participant</h3>
              <button
                onClick={() => setShowRemoveParticipant(false)}
                className="text-gray-600 hover:text-red-600 text-xl font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Participant ID (Student ID or Faculty ID)
              </label>
              <input
                type="text"
                placeholder="Enter ID (e.g., S102, P104)"
                value={removeId}
                onChange={(e) => setRemoveId(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Show available participants for reference */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-700 mb-2">Current participants:</div>
                <div className="flex flex-wrap gap-1">
                  {participants
                    .filter((p) => p !== currentUser.id && p !== "everyone")
                    .map((participantId) => (
                      <span
                        key={participantId}
                        onClick={() => setRemoveId(participantId)}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                      >
                        {participantId}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveParticipant(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveParticipant}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!removeId.trim() || loading}
              >
                {loading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Participants Modal */}
      {showParticipants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Participants ({participants.length})</h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ScrollArea className="flex-1 p-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-500">Loading participants...</span>
                </div>
              ) : participants.length > 0 ? (
                <div className="space-y-3">
                  {participants.map((participantId, index) => {
                    const isCurrentUser = participantId === currentUser.id
                    const isFacultyMember = participantId.startsWith("P")
                    const isStudent = participantId.startsWith("S")

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: getAvatarColor(participantId, participantId) }}
                          >
                            {participantId === "everyone" ? "🌍" : participantId.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-base font-semibold text-gray-900">
                                {participantId === "everyone" ? "Everyone" : participantId}
                              </span>
                              {isCurrentUser && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                  You
                                </span>
                              )}
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  isFacultyMember
                                    ? "bg-orange-100 text-orange-800"
                                    : isStudent
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {isFacultyMember ? "Faculty" : isStudent ? "Student" : "User"}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {participantId === "everyone"
                                ? "Global chat participant"
                                : `${participantId.toLowerCase()}@campus.edu`}
                            </div>
                          </div>
                        </div>

                        {/* Remove button for faculty only */}
                        {isFaculty && !isCurrentUser && participantId !== "everyone" && (
                          <button
                            onClick={() => {
                              setRemoveId(participantId)
                              setShowParticipants(false)
                              setShowRemoveParticipant(true)
                            }}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title={`Remove ${participantId}`}
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No participants found</p>
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Participants Summary */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{participants.length}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {participants.filter((p) => p.startsWith("P")).length}
                  </div>
                  <div className="text-sm text-gray-600">Faculty</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {participants.filter((p) => p.startsWith("S")).length}
                  </div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>
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

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <SimpleMessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
