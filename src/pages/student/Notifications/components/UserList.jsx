"use client"

import { useState } from "react"

const UserList = ({ users, chats, selectedChat, onChatSelect, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="w-full bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-base text-gray-800 mb-3 font-medium">Chats ({filteredChats.length})</h3>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedChat?.id === chat.id ? "bg-purple-100 border-r-4 border-r-purple-500" : ""
            }`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800 text-sm truncate flex-1">{chat.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-xl font-medium uppercase ml-2 ${
                  chat.type === "general"
                    ? "bg-green-100 text-green-800"
                    : chat.type === "faculty"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-pink-100 text-pink-800"
                }`}
              >
                {chat.type}
              </span>
            </div>
            <div className="text-sm text-gray-600 truncate">
              {chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1].content : "No messages yet"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
