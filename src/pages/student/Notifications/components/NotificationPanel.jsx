import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: '📢 New assignment uploaded', time: '2 mins ago' },
    { id: 2, message: '✅ Attendance submitted', time: '10 mins ago' },
    { id: 3, message: '📝 Exam interface updated', time: '1 hour ago' },
    { id: 4, message: '📌 Reminder: Staff meeting at 3 PM', time: '2 hours ago' },
    { id: 5, message: '📚 New course materials uploaded', time: '4 hours ago' },
    { id: 6, message: '🔒 Password changed successfully', time: '5 hours ago' },
    { id: 7, message: '💡 Tips: Improve class engagement', time: 'Yesterday' },
    { id: 8, message: '🔔 Notification test message', time: 'Yesterday' },
    { id: 9, message: '🎓 Student feedback received', time: '2 days ago' },
    { id: 10, message: '📅 Calendar updated with holidays', time: '2 days ago' },
    { id: 11, message: '📥 File uploaded to your class', time: '3 days ago' },
    { id: 12, message: '📤 File shared to CSE dept', time: '3 days ago' },
    { id: 13, message: '👩‍🏫 Faculty development program', time: '4 days ago' },
    { id: 14, message: '📋 Quiz results are out', time: '4 days ago' },
    { id: 15, message: '💬 Feedback requested', time: '5 days ago' },
    { id: 16, message: '🆕 New update available', time: '6 days ago' },
    { id: 17, message: '⚠️ Maintenance scheduled', time: '1 week ago' },
    { id: 18, message: '📊 Survey results published', time: '1 week ago' },
    { id: 19, message: '📤 Shared Google Form', time: '8 days ago' },
    { id: 20, message: '✅ System backup completed', time: '9 days ago' },
  ]);

  const clearNotifications = () => setNotifications([]);

  const bottomRef = useRef(null);

  // Scroll to bottom on mount or when notifications change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notifications]);

  return (
    <div className="absolute top-31 right-4.5 w-72 max-h-[670px] bg-white shadow-md rounded-lg border border-gray-200 z-50 flex flex-col text-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2 border-b bg-gray-50 rounded-t-md">
        <h2 className="text-base font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={clearNotifications}
          className="text-xs text-blue-600 hover:underline hover:text-blue-800"
        >
          Clear
        </button>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto flex-1 px-3 py-2 custom-scrollbar">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-10">No notifications</p>
        ) : (
          <ul className="flex flex-col-reverse space-y-reverse space-y-1">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="bg-gray-100 rounded p-2 shadow-sm hover:bg-gray-200 transition"
              >
                <p className="text-sm text-gray-800">{n.message}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
              </li>
            ))}
            <div ref={bottomRef} />
          </ul>
        )}
      </div>

      {/* Scroll Down Icon */}
      {notifications.length > 5 && (
        <div className="flex justify-center py-1 bg-white rounded-b-md text-gray-400">
          <ChevronDown className="animate-bounce h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
