"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  Bell,
  User,
  BellOff,
  X,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  Award,
  MessageSquare,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Enhanced notifications data
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    message: "📢 New assignment uploaded for Computer Science",
    time: "2 mins ago",
    type: "assignment",
    priority: "high",
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 2,
    message: "✅ Attendance submitted successfully",
    time: "10 mins ago",
    type: "success",
    priority: "low",
    isRead: false,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 3,
    message: "📝 Exam interface updated - Check new features",
    time: "1 hour ago",
    type: "update",
    priority: "medium",
    isRead: false,
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: 4,
    message: "📌 Reminder: Staff meeting at 3 PM today",
    time: "2 hours ago",
    type: "reminder",
    priority: "high",
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 5,
    message: "📚 New course materials uploaded to Database Systems",
    time: "4 hours ago",
    type: "course",
    priority: "medium",
    isRead: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
]

// Notification Panel Component
const NotificationPanel = ({
  notifications = [],
  onClearNotifications,
  onRemoveNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const bottomRef = useRef(null)
  const notificationList = Array.isArray(notifications) ? notifications : []

  useEffect(() => {
    if (bottomRef.current && notificationList.length > 0) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [notificationList])

  const getNotificationIcon = (type) => {
    const iconMap = {
      assignment: BookOpen,
      success: CheckCircle,
      update: Info,
      reminder: AlertCircle,
      course: BookOpen,
      security: AlertCircle,
      tip: Info,
      system: Settings,
      feedback: MessageSquare,
      calendar: Calendar,
      file: FileText,
      achievement: Award,
      message: MessageSquare,
      default: Bell,
    }

    const IconComponent = iconMap[type] || iconMap.default
    return <IconComponent className="w-4 h-4" />
  }

  const getNotificationColor = (type, isRead = false) => {
    const baseOpacity = isRead ? "opacity-60" : ""
    const colors = {
      assignment: `bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800 ${baseOpacity}`,
      success: `bg-green-50 border-green-200 hover:bg-green-100 text-green-800 ${baseOpacity}`,
      update: `bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800 ${baseOpacity}`,
      reminder: `bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800 ${baseOpacity}`,
      course: `bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800 ${baseOpacity}`,
      security: `bg-red-50 border-red-200 hover:bg-red-100 text-red-800 ${baseOpacity}`,
      tip: `bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-800 ${baseOpacity}`,
      system: `bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800 ${baseOpacity}`,
      feedback: `bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-800 ${baseOpacity}`,
      calendar: `bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-800 ${baseOpacity}`,
      file: `bg-cyan-50 border-cyan-200 hover:bg-cyan-100 text-cyan-800 ${baseOpacity}`,
      achievement: `bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-800 ${baseOpacity}`,
      message: `bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800 ${baseOpacity}`,
    }
    return colors[type] || `bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800 ${baseOpacity}`
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "Unknown time"

    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  const unreadCount = notificationList.filter((n) => !n.isRead).length

  return (
    <div className="w-80 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg text-gray-800 font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">{unreadCount}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{notificationList.length} notifications</span>
          {unreadCount > 0 && (
            <button onClick={onMarkAllAsRead} className="text-blue-600 hover:text-blue-800 font-medium">
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notificationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-4">
            <BellOff className="w-8 h-8 text-gray-300 mb-2" />
            <div className="text-sm font-medium text-gray-600 mb-1">No notifications</div>
            <div className="text-xs text-gray-400 text-center">You're all caught up!</div>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg p-3 transition-all duration-200 cursor-pointer border shadow-sm relative group hover:shadow-md ${getNotificationColor(notification.type, notification.isRead)}`}
                onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveNotification && onRemoveNotification(notification.id)
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="Remove notification"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="flex items-start gap-3 pr-6">
                  <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm leading-relaxed mb-1 ${notification.isRead ? "text-gray-600" : "text-gray-800 font-medium"}`}
                    >
                      {notification.message}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {formatTime(notification.timestamp || notification.time)}
                      </div>
                      <div className="flex items-center gap-2">
                        {notification.type && (
                          <span className="text-xs capitalize bg-white bg-opacity-50 px-2 py-1 rounded">
                            {notification.type}
                          </span>
                        )}
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" title="Unread" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {notificationList.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex gap-2">
            <button
              onClick={onClearNotifications}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 bg-transparent transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300 bg-transparent transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark All Read
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FacultyNavbar() {
  const [visible, setVisible] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS)

  const lastScrollY = useRef(0)
  const profileRef = useRef()
  const notificationRef = useRef()
  const navigate = useNavigate()

  // Memoized calculations
  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.isRead), [notifications])

  // Handle Navbar scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Notification handlers
  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const removeNotification = useCallback((notificationId) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }, [])

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }, [])

  return (
    <nav
      className={`fixed top-3 left-[19rem] w-[calc(100%-19rem-1rem)] z-50 bg-white rounded-2xl shadow-lg px-8 py-4 flex items-center justify-end transition-transform duration-150 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        {/* 🔔 Notification Bell - Enhanced with functionality */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Bell className="h-5 w-5 text-blue-600" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 z-50">
              <NotificationPanel
                notifications={notifications}
                onClearNotifications={clearAllNotifications}
                onRemoveNotification={removeNotification}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            </div>
          )}
        </div>

        {/* 👤 Profile Dropdown - Kept exactly as original */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <User className="text-blue-600 w-5 h-5" />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-300 rounded-xl shadow-xl z-50 px-4 py-3 space-y-2">
              {/* Top Profile Section */}
              <div className="flex items-center gap-3 border-b pb-3">
                <img
                  src="https://ui-avatars.com/api/?name=Vishwanathan+S"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Yeswanth</h4>
                  <p className="text-xs text-orange-500 font-medium">Premium Member</p>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                <span
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    setShowProfileMenu(false)
                    navigate("/faculty/attendance")
                  }}
                >
                  Progress
                </span>
                <span className="cursor-pointer hover:text-blue-600">Points</span>
              </div>
              {/* Footer Links */}
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <span className="cursor-pointer hover:text-blue-600">Settings</span>
                <span className="cursor-pointer hover:text-blue-600">Orders</span>
                <span
                  onClick={() => {
                    setShowProfileMenu(false)
                    navigate("/faculty/profile")
                  }}
                  className="cursor-pointer hover:text-blue-600 font-medium"
                >
                  Go to Profile
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
