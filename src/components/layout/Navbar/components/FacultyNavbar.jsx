"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import axios from "axios"
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
  Clock,
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Modal Component for Full Notification View
const NotificationModal = ({ notification, isOpen, onClose, onMarkAsRead }) => {
  if (!isOpen || !notification) return null

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes) => {
    if (typeof bytes === "string") return bytes
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

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
    return <IconComponent className="w-8 h-8" />
  }

  const handleMarkAsRead = () => {
    onMarkAsRead(notification._id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-start gap-4 pr-12">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">📢 {notification.name}</h1>
              <div className="flex items-center gap-4 text-blue-100">
                <span className="text-sm">{formatDate(notification.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-4">
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-sm">
                        {formatDate(notification.startDate)}
                        {notification.startDate !== notification.endDate && ` - ${formatDate(notification.endDate)}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Time</div>
                      <div className="text-sm">
                        {formatTime(notification.startTime)} - {formatTime(notification.endTime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Audience */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="font-medium">Venue</div>
                      <div className="text-sm">{notification.venue}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Audience</div>
                      <div className="text-sm">{notification.audience}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
           {/* Attachments */}
{notification.fileName && notification.fileData && (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Attachment</h3>
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-500" />
        <div>
          <div className="font-medium text-gray-800">{notification.fileName}</div>
          <div className="text-sm text-gray-500">{notification.fileType}</div>
        </div>
      </div>
      <a
        href={`data:${notification.fileType};base64,${notification.fileData.data}`}
        download={notification.fileName}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
)}

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>Created: {new Date(notification.createdAt).toLocaleString("en-IN")}</div>
                <div className="flex items-center gap-2">
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                    {notification.type || "notification"}
                  </span>
                  {!notification.isRead && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Unread</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            {!notification.isRead && (
              <button
                onClick={handleMarkAsRead}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark as Read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Notification Panel Component
const NotificationPanel = ({
  notifications = [],
  onClearNotifications,
  onRemoveNotification,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
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
                key={notification._id}
                className={`rounded-lg p-3 transition-all duration-200 cursor-pointer border shadow-sm relative group hover:shadow-md transform hover:scale-[1.02] ${getNotificationColor(notification.type, notification.isRead)}`}
                onClick={() => {
                  onNotificationClick(notification)
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveNotification(notification._id)
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
                      📢 <strong>{notification.name}</strong> at <strong>{notification.venue}</strong>
                    </div>
                    <div className="text-xs text-gray-600">
                      {notification.startDate} at {notification.startTime}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <div>{notification.audience}</div>
                      <div className="flex items-center gap-2">
                        <span>{formatTime(notification.createdAt)}</span>
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
  const [notifications, setNotifications] = useState([])
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const role = "faculty"

  const lastScrollY = useRef(0)
  const profileRef = useRef()
  const notificationRef = useRef()
  const navigate = useNavigate()

  // Fetch notifications from API
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/notifications/audience/${role}`)
      .then((res) => {
        const reversed = res.data.slice().reverse()
        setNotifications(reversed)
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err)
      })
  }, [role])

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

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id))
  }, [])

  const markAsRead = useCallback(async (id) => {
    try {
      // Update in backend
      await axios.patch(`http://localhost:8081/api/notifications/${id}/read`)

      // Update local state
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)))
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
      // Still update local state even if API call fails
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)))
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      // Update all unread notifications in backend
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n._id)
      await Promise.all(unreadIds.map((id) => axios.patch(`http://localhost:8082/api/notifications/${id}/read`)))

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
      // Still update local state even if API calls fail
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }
  }, [notifications])

  const handleNotificationClick = useCallback((notification) => {
    setSelectedNotification(notification)
    setShowModal(true)
    setShowNotifications(false) // Close the dropdown
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedNotification(null)
  }, [])

  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.isRead), [notifications])

  return (
    <>
      <nav
        className={`fixed top-3 left-[19rem] w-[calc(100%-19rem-1rem)] z-50 bg-white rounded-2xl shadow-lg px-8 py-4 flex items-center justify-end transition-transform duration-150 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-6">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <Bell className="h-5 w-5 text-blue-600" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 z-50">
                <NotificationPanel
                  notifications={notifications}
                  onClearNotifications={clearAllNotifications}
                  onRemoveNotification={removeNotification}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onNotificationClick={handleNotificationClick}
                />
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <User className="text-blue-600 w-5 h-5" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-blue-300 rounded-xl shadow-xl z-50 px-4 py-3 space-y-2">
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

      {/* Notification Modal */}
      <NotificationModal
        notification={selectedNotification}
        isOpen={showModal}
        onClose={handleCloseModal}
        onMarkAsRead={markAsRead}
      />
    </>
  )
}
