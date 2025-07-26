"use client"

import { useEffect, useRef } from "react"
import {
  Bell,
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

const NotificationPanel = ({
  notifications = [],
  onClearNotifications,
  onRemoveNotification,
  onMarkAsRead,
  onMarkAllAsRead,
  showDebug = false,
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
    <div className="h-full flex flex-col bg-white rounded-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
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
      <div className="flex-1 overflow-y-auto max-h-80">
        {notificationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <BellOff className="w-12 h-12 text-gray-300 mb-4" />
            <div className="text-lg font-medium text-gray-600 mb-2">No notifications</div>
            <div className="text-sm text-gray-400 text-center max-w-xs">
              You're all caught up! New notifications will appear here.
            </div>
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
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg flex-shrink-0">
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

export default NotificationPanel
