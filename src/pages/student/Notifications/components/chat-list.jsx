"use client"

import Badge from "./ui/Badge"
import { Users } from "lucide-react"

export default function ChatList({ chats, selectedChat, onSelectChat }) {
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

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
            selectedChat.id === chat.id ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
          }`}
          onClick={() => onSelectChat(chat)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getTypeColor(chat.type)}`}>{chat.type}</Badge>
              {chat.unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{chat.unreadCount}</Badge>}
            </div>
          </div>

          <p className="text-sm text-gray-600 truncate mb-2">{chat.lastMessage}</p>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{chat.participants} participants</span>
            </div>
            <span>{chat.lastMessageTime}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
