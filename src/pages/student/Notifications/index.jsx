"use client"

import { useState, useEffect } from "react"
import ChatWindow from "./components/ChatWindow"
import UserList from "./components/UserList"
import NotificationPanel from "./components/NotificationPanel"
import useSocket from "./hooks/useSocket"
import { mockUsers, mockChats } from "./utils/mockData"

// Define dummy notifications outside component to ensure they're always available
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    message: "📢 New assignment uploaded for Computer Science",
    time: "2 mins ago",
    type: "assignment",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 2,
    message: "✅ Attendance submitted successfully",
    time: "10 mins ago",
    type: "success",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 3,
    message: "📝 Exam interface updated - Check new features",
    time: "1 hour ago",
    type: "update",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: 4,
    message: "📌 Reminder: Staff meeting at 3 PM today",
    time: "2 hours ago",
    type: "reminder",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 5,
    message: "📚 New course materials uploaded to Database Systems",
    time: "4 hours ago",
    type: "course",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: 6,
    message: "🔒 Password changed successfully for your account",
    time: "5 hours ago",
    type: "security",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 7,
    message: "💡 Tips: Improve class engagement with interactive polls",
    time: "Yesterday",
    type: "tip",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 8,
    message: "🔔 System maintenance completed - All services restored",
    time: "Yesterday",
    type: "system",
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
  },
  {
    id: 9,
    message: "🎓 Student feedback received for Advanced Algorithms",
    time: "2 days ago",
    type: "feedback",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 10,
    message: "📅 Calendar updated with holiday schedule",
    time: "2 days ago",
    type: "calendar",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 11,
    message: "📥 File uploaded to your class: Lecture_Notes_Ch5.pdf",
    time: "3 days ago",
    type: "file",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 12,
    message: "📤 File shared to CSE department: Grade_Report.xlsx",
    time: "3 days ago",
    type: "share",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 13,
    message: "👩‍🏫 Faculty development program registration open",
    time: "4 days ago",
    type: "program",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 14,
    message: "📋 Quiz results are out for Data Structures",
    time: "4 days ago",
    type: "results",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 15,
    message: "💬 New message in Faculty Discussion group",
    time: "5 days ago",
    type: "message",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 16,
    message: "🆕 New update available - Version 2.1.0",
    time: "6 days ago",
    type: "update",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: 17,
    message: "⚠️ Scheduled maintenance on Sunday 2-4 AM",
    time: "1 week ago",
    type: "maintenance",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 18,
    message: "📊 Survey results published: Student Satisfaction 2024",
    time: "1 week ago",
    type: "survey",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 19,
    message: "🏆 Congratulations! Your class achieved 95% attendance",
    time: "1 week ago",
    type: "achievement",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 20,
    message: "📖 Library resources updated with new e-books",
    time: "1 week ago",
    type: "library",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 21,
    message: "🔐 Two-factor authentication enabled successfully",
    time: "2 weeks ago",
    type: "security",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 22,
    message: "📈 Performance analytics report generated",
    time: "2 weeks ago",
    type: "analytics",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 23,
    message: "🎯 Goal achieved: 100% assignment submissions",
    time: "2 weeks ago",
    type: "achievement",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 24,
    message: "📧 Email notification settings updated",
    time: "2 weeks ago",
    type: "settings",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 25,
    message: "🌟 New feature: Real-time collaboration tools",
    time: "3 weeks ago",
    type: "feature",
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
]

function App() {
  // Add these debug logs right at the beginning
  console.log("🚀 App starting...")
  console.log("📊 DUMMY_NOTIFICATIONS length:", DUMMY_NOTIFICATIONS.length)
  console.log("📋 First 3 notifications:", DUMMY_NOTIFICATIONS.slice(0, 3))

  const [currentUser, setCurrentUser] = useState(mockUsers[0])
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState(mockChats)
  const [notifications, setNotifications] = useState(() => {
    console.log("🔔 Initializing notifications state with:", DUMMY_NOTIFICATIONS.length, "items")
    return DUMMY_NOTIFICATIONS
  })
  const [onlineUsers, setOnlineUsers] = useState(mockUsers)
  const [showNotifications, setShowNotifications] = useState(false)
  const socket = useSocket("http://localhost:3001")

  // Add this useEffect right after your state declarations
  useEffect(() => {
    console.log("📱 Notifications state changed:", notifications.length, "items")
    console.log("📝 Current notifications:", notifications.slice(0, 3))
  }, [notifications])

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === message.chatId ? { ...chat, messages: [...chat.messages, message] } : chat,
          ),
        )

        if (message.senderId !== currentUser.id) {
          setNotifications((prev) => [
            {
              id: Date.now(),
              message: `💬 New message from ${message.senderName}: "${message.content.substring(0, 30)}${message.content.length > 30 ? "..." : ""}"`,
              time: "Just now",
              type: "message",
            },
            ...prev,
          ])
        }
      })
    }
  }, [socket, currentUser.id])

  const sendMessage = (content) => {
    if (!selectedChat || !content.trim()) return

    const message = {
      id: Date.now(),
      content,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date(),
      chatId: selectedChat.id,
    }

    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id ? { ...chat, messages: [...chat.messages, message] } : chat,
    )
    setChats(updatedChats)

    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))

    if (socket) {
      socket.emit("sendMessage", message)
    }
  }

  const handleChatSelect = (chat) => {
    const updatedChat = chats.find((c) => c.id === chat.id) || chat
    setSelectedChat(updatedChat)
  }

  const getAvailableChats = () => {
    return chats.filter((chat) => {
      if (currentUser.role === "admin") return true
      if (currentUser.role === "faculty") {
        return chat.type === "faculty" || chat.participants.includes(currentUser.id)
      }
      if (currentUser.role === "student") {
        return chat.type === "general" || chat.participants.includes(currentUser.id)
      }
      return false
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const removeNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  return (
    <div className="h-screen flex flex-col mt-[80px] bg-gray-100 relative">
      {/* Bell Icon - Fixed position */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="fixed top-24 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200"
        title={showNotifications ? "Hide Notifications" : "Show Notifications"}
      >
        <span className="text-xl">{showNotifications ? "🔕" : "🔔"}</span>
        {notifications && notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length > 99 ? "99+" : notifications.length}
          </span>
        )}
      </button>

      <div className="flex flex-1 overflow-hidden">
        {/* User List */}
        <div className="w-[300px] bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            <UserList
              users={onlineUsers}
              chats={getAvailableChats()}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelect}
              currentUser={currentUser}
            />
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${showNotifications ? "mr-[280px]" : ""}`}
        >
          <ChatWindow chat={selectedChat} currentUser={currentUser} onSendMessage={sendMessage} />
        </div>

        {/* Notifications Panel */}
        <div
          className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-[280px] bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            showNotifications ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <NotificationPanel
            notifications={notifications}
            onClearNotifications={clearAllNotifications}
            onRemoveNotification={removeNotification}
          />
        </div>
      </div>
    </div>
  )
}

export default App
