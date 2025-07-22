"use client"
import { useEffect, useRef } from "react"

const NotificationPanel = ({ notifications = [], onClearNotifications, onRemoveNotification }) => {
  console.log("🔔 NotificationPanel received:", notifications)
  console.log("📊 Notifications length:", notifications?.length)
  console.log("🔍 Is array?", Array.isArray(notifications))

  const bottomRef = useRef(null)
  const notificationList = Array.isArray(notifications) ? notifications : []

  useEffect(() => {
    if (bottomRef.current && notificationList.length > 0) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [notificationList])

  const getNotificationColor = (type) => {
    const colors = {
      assignment: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      success: "bg-green-50 border-green-200 hover:bg-green-100",
      update: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      reminder: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      course: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      security: "bg-red-50 border-red-200 hover:bg-red-100",
      tip: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      system: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      feedback: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      calendar: "bg-teal-50 border-teal-200 hover:bg-teal-100",
      file: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
      share: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      program: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      results: "bg-lime-50 border-lime-200 hover:bg-lime-100",
      message: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      maintenance: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      survey: "bg-slate-50 border-slate-200 hover:bg-slate-100",
      achievement: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      library: "bg-stone-50 border-stone-200 hover:bg-stone-100",
      analytics: "bg-sky-50 border-sky-200 hover:bg-sky-100",
      settings: "bg-neutral-50 border-neutral-200 hover:bg-neutral-100",
      feature: "bg-rose-50 border-rose-200 hover:bg-rose-100",
    }
    return colors[type] || "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Fixed */}
      <div className="px-4 py-4 border-b border-gray-200 bg-purple-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-purple-600">🔔</span>
          <h3 className="text-base text-gray-800 font-medium">Notifications ({notificationList.length})</h3>
        </div>
      </div>

      {/* DEBUG SECTION - Remove this in production */}
      <div className="px-4 py-2 bg-yellow-100 border-b border-yellow-200 text-xs flex-shrink-0">
        <div className="font-bold text-yellow-800">🐛 DEBUG INFO:</div>
        <div className="text-yellow-700">• Total notifications: {notificationList.length}</div>
        <div className="text-yellow-700">
          • Array is: {Array.isArray(notifications) ? "✅ Valid Array" : "❌ Not Array"}
        </div>
        {notificationList.length > 0 && (
          <div className="text-yellow-700">
            • First notification: "{notificationList[0].message.substring(0, 30)}..."
          </div>
        )}
      </div>

      {/* Scrollable Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notificationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <div className="text-4xl mb-3">🔕</div>
            <div className="text-sm text-center font-bold text-red-600">⚠️ NO NOTIFICATIONS FOUND!</div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              If you should see notifications, check the console for errors.
            </div>
            <div className="text-xs text-red-500 mt-2 text-center font-mono">Expected: 25 dummy notifications</div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg p-3 transition-colors cursor-pointer border shadow-sm relative group ${getNotificationColor(notification.type)}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveNotification && onRemoveNotification(notification.id)
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
                <div className="text-sm text-gray-800 mb-1 leading-relaxed pr-6">{notification.message}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    {notification.time ||
                      (notification.timestamp
                        ? notification.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Unknown time")}
                  </div>
                  {notification.type && (
                    <div className="text-xs text-gray-500 capitalize bg-white/50 px-2 py-0.5 rounded">
                      {notification.type}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Fixed Clear All Button at Bottom */}
      {notificationList.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClearNotifications}
            className="w-full text-red-600 text-sm hover:text-red-800 hover:bg-red-50 transition-colors font-medium py-2 px-4 rounded-md border border-red-200 hover:border-red-300"
          >
            Clear All Notifications
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationPanel
