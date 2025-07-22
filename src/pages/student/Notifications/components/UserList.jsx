"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Users, MessageSquare } from "lucide-react"

const UserList = ({ users, chats, selectedChat, onChatSelect, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getChatForUser = (userId) => {
    return chats.find((chat) => {
      if (Array.isArray(chat.participantIds)) {
        return chat.participantIds.includes(userId)
      }
      if (Array.isArray(chat.participants)) {
        return chat.participants.includes(userId)
      }
      return false
    })
  }

  const getUserStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-sm"
        />
      </div>

      <div className="overflow-y-auto">
        {filteredUsers.map((user) => {
          const chat = getChatForUser(user.id)
          const isSelected = selectedChat && chat && selectedChat.id === chat.id
          const isCurrentUser = user.id === currentUser.id

          return (
            !isCurrentUser && (
              <div
                key={user.id}
                className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer ${
                  isSelected ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
                }`}
                onClick={() => {
                  if (chat) {
                    onChatSelect(chat)
                  } else {
                    const newChat = {
                      id: Date.now(),
                      name: `${currentUser.name} & ${user.name}`,
                      type: "direct",
                      participantIds: [currentUser.id, user.id],
                      participants: 2,
                      messages: [],
                    }
                    onChatSelect(newChat)
                  }
                }}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.department}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${getUserStatusColor(user.status)}`} title={user.status} />
                  {chat ? (
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Users className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default UserList
