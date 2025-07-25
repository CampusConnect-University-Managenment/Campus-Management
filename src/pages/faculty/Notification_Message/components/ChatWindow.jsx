"use client"

import { useRef, useEffect, useState } from "react"
import { Users, MoreVertical, Eye } from "lucide-react"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import MessageInput from "./MessageInput"
import { ScrollArea } from "./ui/ScrollArea"

const ChatWindow = ({ chat, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
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
    <div className="h-full flex flex-col bg-white relative">
      {/* Chat Header with only participant viewing */}
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

          {/* Header Actions with only View Participants option */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>

            {/* Dropdown Menu - Only View Participants */}
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

      {/* Participants Modal */}
      {showParticipants && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Participants ({chat.participants})</h3>
                <button
                  onClick={() => setShowParticipants(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
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

      {/* Messages Container - Adjusted height to make chat box higher */}
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

      {/* Message Input - Positioned higher with reduced padding */}
      <div className="flex-shrink-0" style={{ marginTop: "-8px" }}>
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
