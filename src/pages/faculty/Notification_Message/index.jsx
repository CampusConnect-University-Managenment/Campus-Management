"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search } from "lucide-react"

// Import components
import ChatWindow from "./components/ChatWindow"
import UserList from "./components/UserList"
import ChatList from "./components/chat-list"
import useSocket from "./hooks/useSocket"

// Import UI components
import Input from "./components/ui/Input"

// Mock data
import { mockUsers } from "./utils/mockData"

// Enhanced mock chats data
const mockChatsNew = [
  {
    id: 1,
    name: "General Announcements",
    type: "GENERAL",
    participantIds: [1, 2, 3, 4],
    participants: 6,
    participantNames: ["Admin User", "Dr. Sarah Johnson", "John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson"],
    lastMessage: "Please remember to check your emails regularly for important updates.",
    lastMessageTime: "11:15 am",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "Admin User",
        senderId: 3,
        senderName: "Admin User",
        content: "Welcome to Campus Connect! This is the general announcements channel.",
        message: "Welcome to Campus Connect! This is the general announcements channel.",
        time: "10:45 am",
        timestamp: new Date(Date.now() - 60000),
        isOwn: false,
      },
      {
        id: 2,
        sender: "Admin User",
        senderId: 3,
        senderName: "Admin User",
        content: "Please remember to check your emails regularly for important updates.",
        message: "Please remember to check your emails regularly for important updates.",
        time: "11:15 am",
        timestamp: new Date(Date.now() - 30000),
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    name: "Faculty Discussion",
    type: "FACULTY",
    participantIds: [1, 3],
    participants: 12,
    participantNames: [
      "Dr. Sarah Johnson",
      "Admin User",
      "Dr. Robert Brown",
      "Prof. Lisa Davis",
      "Dr. Mark Wilson",
      "Prof. Emily Johnson",
      "Dr. James Lee",
      "Prof. Maria Rodriguez",
      "Dr. Kevin White",
      "Prof. Rachel Green",
      "Dr. Michael Chen",
      "Prof. Anna Taylor",
    ],
    lastMessage: "Going well! I have updated my course materials for the new semester.",
    lastMessageTime: "10:45 am",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "Dr. Sarah Johnson",
        senderId: 1,
        senderName: "Dr. Sarah Johnson",
        content: "How is the new semester going?",
        message: "How is the new semester going?",
        time: "10:30 am",
        timestamp: new Date(Date.now() - 120000),
        isOwn: false,
      },
    ],
  },
  {
    id: 3,
    name: "Computer Science Students",
    type: "GROUP",
    participantIds: [2, 4, 5, 6, 7],
    participants: 45,
    participantNames: [
      "John Smith",
      "Jane Doe",
      "Mike Johnson",
      "Sarah Wilson",
      "David Brown",
      "Emily Davis",
      "Alex Miller",
      "Lisa Garcia",
      "Tom Anderson",
      "Anna Taylor",
    ],
    lastMessage: "When will the assignment schedule be available?",
    lastMessageTime: "9:30 am",
    unreadCount: 5,
    messages: [
      {
        id: 1,
        sender: "John Smith",
        senderId: 2,
        senderName: "John Smith",
        content: "When will the assignment schedule be available?",
        message: "When will the assignment schedule be available?",
        time: "9:30 am",
        timestamp: new Date(Date.now() - 180000),
        isOwn: false,
      },
    ],
  },
]

// Global state to persist data across navigation
const globalState = {
  chats: mockChatsNew,
  selectedChat: mockChatsNew[0],
}

export default function NotificationMessage() {
  // State management with persistence (notifications now handled in navbar)
  const [currentUser, setCurrentUser] = useState(mockUsers?.[0] || { id: 1, name: "Default User", role: "faculty" })
  const [selectedChat, setSelectedChat] = useState(globalState.selectedChat)
  const [chats, setChats] = useState(globalState.chats)
  const [onlineUsers, setOnlineUsers] = useState(mockUsers || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("chat")
  const [chatType, setChatType] = useState("INDIVIDUAL")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState([])

  // Socket connection
  const socket = useSocket("http://localhost:3001")

  // Update global state whenever local state changes
  useEffect(() => {
    globalState.chats = chats
    globalState.selectedChat = selectedChat
  }, [chats, selectedChat])

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(
      (user) => user.id !== currentUser.id && user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Memoized calculations
  const filteredChats = useMemo(
    () => chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [chats, searchQuery],
  )

  // Socket message handling
  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        // Prevent processing our own messages
        if (message.senderId === currentUser.id) return

        // Only update the specific chat that received the message
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === message.chatId ? { ...chat, messages: [...(chat.messages || []), message] } : chat,
          ),
        )

        // Only update selectedChat if it's the same chat
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

  const handleUserSelect = (user) => {
    if (chatType === "INDIVIDUAL") {
      setSelectedParticipants([user])
    } else {
      if (selectedParticipants.some((u) => u.id === user.id)) {
        setSelectedParticipants((prev) => prev.filter((u) => u.id !== user.id))
      } else {
        setSelectedParticipants((prev) => [...prev, user])
      }
    }
  }

  // Message sending
  const sendMessage = useCallback(
    (content) => {
      if (!selectedChat || !content.trim()) return

      const messageId = `msg-${selectedChat.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const message = {
        id: messageId,
        content,
        senderId: currentUser.id,
        senderName: currentUser.name,
        timestamp: new Date(),
        chatId: selectedChat.id,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }

      // Update chats state
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: [...(chat.messages || []), message],
                lastMessage: content,
                lastMessageTime: message.time,
              }
            : chat,
        ),
      )

      // Update selected chat state
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), message],
        lastMessage: content,
        lastMessageTime: message.time,
      }))

      // Emit to socket
      if (socket) {
        socket.emit("sendMessage", message)
      }
    },
    [selectedChat, currentUser, socket],
  )

  // Chat selection
  const handleChatSelect = useCallback(
    (chat) => {
      const updatedChat = chats.find((c) => c.id === chat.id) || chat
      setSelectedChat(updatedChat)
    },
    [chats],
  )

  // Chat update handler
  const handleChatUpdate = useCallback(
    (updatedChat) => {
      setChats((prevChats) => prevChats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)))

      if (selectedChat && selectedChat.id === updatedChat.id) {
        setSelectedChat(updatedChat)
      }
    },
    [selectedChat],
  )

  // Helper function to check if user is participant
  const isUserParticipant = useCallback((chat, userId) => {
    if (Array.isArray(chat.participantIds)) {
      return chat.participantIds.includes(userId)
    }
    if (Array.isArray(chat.participants)) {
      return chat.participants.includes(userId)
    }
    return false
  }, [])

  // Available chats based on user role
  const getAvailableChats = useCallback(() => {
    return chats.filter((chat) => {
      if (currentUser.role === "admin") return true
      if (currentUser.role === "faculty") {
        return chat.type === "FACULTY" || chat.type === "GENERAL" || isUserParticipant(chat, currentUser.id)
      }
      if (currentUser.role === "student") {
        return chat.type === "GENERAL" || isUserParticipant(chat, currentUser.id)
      }
      return false
    })
  }, [chats, currentUser, isUserParticipant])

  // Function to find existing individual chat
  const findExistingIndividualChat = useCallback(
    (participantName) => {
      return chats.find(
        (chat) => chat.type === "INDIVIDUAL" && chat.name === participantName && chat.participants === 1,
      )
    },
    [chats],
  )

  // New chat creation
  const handleNewChat = useCallback(
    (chatData) => {
      console.log("Creating new chat:", chatData)

      // Check for existing individual chat
      if (chatData.type === "INDIVIDUAL" && chatData.participants && chatData.participants.length > 0) {
        const participant = chatData.participants[0]
        const participantName =
          participant.type === "student" ? `${participant.firstName} ${participant.lastName}` : participant.name

        const existingChat = findExistingIndividualChat(participantName)

        if (existingChat) {
          setSelectedChat(existingChat)
          return
        }
      }

      let participantIds = []
      let participantCount = 0
      let participantNames = []

      if (Array.isArray(chatData.participants)) {
        participantIds = chatData.participants.map((p) => (typeof p === "object" ? p.id : p))
        participantCount = chatData.participants.length
        participantNames = chatData.participants.map((p) =>
          typeof p === "object" ? (p.type === "student" ? `${p.firstName} ${p.lastName}` : p.name) : p,
        )
      } else if (typeof chatData.participants === "number") {
        participantCount = chatData.participants
      }

      const newChat = {
        id: chats.length + 1,
        name: chatData.name,
        type: chatData.type,
        participantIds: participantIds,
        participants: participantCount,
        participantNames: participantNames,
        lastMessage: "Chat created",
        lastMessageTime: "now",
        unreadCount: 0,
        messages: [],
      }

      setChats([...chats, newChat])
      setSelectedChat(newChat)
    },
    [chats, findExistingIndividualChat],
  )

  return (
    <div className="h-screen flex bg-gray-50 relative" style={{ marginTop: "80px" }}>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden h-full">
        {activeView === "chat" ? (
          <>
            {/* Enhanced Chat System */}
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

            {/* Chat Area - Full width */}
            <div className="flex-1 transition-all duration-300 h-full">
              <ChatWindow
                chat={selectedChat}
                currentUser={currentUser}
                onSendMessage={sendMessage}
                onUpdateChat={handleChatUpdate}
              />
            </div>
          </>
        ) : (
          <>
            {/* Legacy Chat System */}
            <div className="w-[300px] bg-white border-r border-gray-200 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <UserList
                  users={onlineUsers}
                  chats={getAvailableChats()}
                  selectedChat={selectedChat}
                  onChatSelect={handleChatSelect}
                  currentUser={currentUser}
                />
              </div>
            </div>

            <div className="flex-1 transition-all duration-300 h-full">
              <ChatWindow
                chat={selectedChat}
                currentUser={currentUser}
                onSendMessage={sendMessage}
                onUpdateChat={handleChatUpdate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
