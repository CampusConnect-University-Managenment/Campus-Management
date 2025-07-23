"use client"

import { useState } from "react"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Badge from "./ui/Badge"
import { Users, Send, MoreVertical, Eye } from "lucide-react"
import { ScrollArea } from "./ui/ScrollArea"

const ChatArea = ({ selectedChat, onSendMessage }) => {
  const [message, setMessage] = useState("")
  const [showParticipants, setShowParticipants] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSendMessage = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "GENERAL":
        return "bg-green-100 text-green-800"
      case "FACULTY":
        return "bg-orange-100 text-orange-800"
      case "GROUP":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvatarColor = (chatId, chatName) => {
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
    const index = (chatId || chatName || "").length % colors.length
    return colors[index]
  }

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 bg-white">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Select a chat to start messaging</h3>
          <p className="text-gray-500">Choose a conversation from the sidebar to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Header with only participant viewing */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: getAvatarColor(selectedChat.id, selectedChat.name) }}
            >
              {selectedChat.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selectedChat.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{selectedChat.participants} participants</span>
                </div>
                <Badge className={`text-xs ${getTypeColor(selectedChat.type)}`}>{selectedChat.type} CHAT</Badge>
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
                <h3 className="text-lg font-semibold text-gray-800">Participants ({selectedChat.participants})</h3>
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
                {selectedChat.participantNames?.map((name, index) => (
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

      {/* Messages Area - Adjusted height to make chat box higher */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ paddingBottom: "8px" }}>
        {selectedChat.messages?.length === 0 ? (
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
          selectedChat.messages?.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                  msg.isOwn ? "bg-blue-500 text-white" : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                {!msg.isOwn && <div className="text-xs font-medium mb-1 text-gray-600">{msg.sender}</div>}
                <div className="text-sm leading-relaxed">{msg.content || msg.message}</div>
                <div className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input - Positioned higher with reduced margin */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0" style={{ marginTop: "-8px" }}>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatArea
