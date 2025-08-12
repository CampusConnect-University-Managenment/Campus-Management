"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search } from "lucide-react"
import ChatWindow from "./components/ChatWindow"
import UserList from "./components/UserList"
import ChatList from "./components/chat-list"
import useSocket from "./hooks/useSocket"
import Input from "./components/ui/Input"

export default function NotificationMessage() {
  const [currentUser, setCurrentUser] = useState({
    id: "1234", // Replace with real logged-in user ID
    name: "John Doe",
    role: "faculty",
  })

  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const socket = useSocket("http://localhost:3001")

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/chat/messages/108
          `)
        const data = await res.json()
        setChats(data)
        setSelectedChat(data[0] || null)
      } catch (err) {
        console.error("Error fetching chats", err)
      }
    }

    if (currentUser?.id) fetchChats()
  }, [currentUser])

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        if (message.senderId === currentUser.id) return

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === message.chatId
              ? { ...chat, messages: [...(chat.messages || []), message] }
              : chat
          )
        )

        setSelectedChat((prevSelected) => {
          if (prevSelected && prevSelected.id === message.chatId) {
            return { ...prevSelected, messages: [...(prevSelected.messages || []), message] }
          }
          return prevSelected
        })
      })

      return () => {
        socket.off("message")
      }
    }
  }, [socket, currentUser.id])

  const filteredChats = useMemo(
    () => chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [chats, searchQuery]
  )

  const sendMessage = useCallback(
    async (content) => {
      if (!selectedChat || !content.trim()) return

      const messageId = `msg-${selectedChat.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const message = {
        id: messageId,
        content,
        senderId: currentUser.id,
        senderName: currentUser.name,
        receiverId: selectedChat.id,
        timestamp: new Date(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: selectedChat.type,
        isOwn: true,
      }

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: [...(chat.messages || []), message],
                lastMessage: content,
                lastMessageTime: message.time,
              }
            : chat
        )
      )

      setSelectedChat((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), message],
        lastMessage: content,
        lastMessageTime: message.time,
      }))

      try {
        await fetch("http://localhost:8081/api/chat/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        })
      } catch (err) {
        console.error("Error sending message", err)
      }

      if (socket) socket.emit("sendMessage", message)
    },
    [selectedChat, currentUser, socket]
  )

  const handleChatSelect = useCallback(
    (chat) => {
      const updatedChat = chats.find((c) => c.id === chat.id) || chat
      setSelectedChat(updatedChat)
    },
    [chats]
  )

  const handleChatUpdate = useCallback(
    (updatedChat) => {
      setChats((prevChats) => prevChats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)))
      if (selectedChat?.id === updatedChat.id) {
        setSelectedChat(updatedChat)
      }
    },
    [selectedChat]
  )

  return (
    <div className="h-screen flex bg-gray-50 relative" style={{ marginTop: "80px" }}>
      <div className="flex flex-1 overflow-hidden h-full">
        <>
          {/* Sidebar */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm h-full">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Chats ({filteredChats.length})</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatList chats={filteredChats} selectedChat={selectedChat} onSelectChat={handleChatSelect} />
            </div>
          </div>

          {/* Main Chat Window */}
          <div className="flex-1 transition-all duration-300 h-full">
            <ChatWindow
              chat={selectedChat}
              currentUser={currentUser}
              onSendMessage={sendMessage}
              onUpdateChat={handleChatUpdate}
            />
          </div>
        </>
      </div>
    </div>
  )
}