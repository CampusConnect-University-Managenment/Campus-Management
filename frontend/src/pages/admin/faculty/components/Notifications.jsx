import React, { useState } from 'react';
import { MdInfo, MdCheckCircle, MdWarning, MdError } from 'react-icons/md';

const notificationIcons = {
  info: <MdInfo className="text-blue-500" />,
  success: <MdCheckCircle className="text-green-500" />,
  warning: <MdWarning className="text-yellow-500" />,
  error: <MdError className="text-red-500" />,
};

const defaultNotifications = [
  { id: 1, type: 'info', message: 'Faculty meeting at 10 AM tomorrow.' },
  { id: 2, type: 'warning', message: 'EEE department attendance below 75%!' },
  { id: 3, type: 'success', message: 'CSE seminar successfully completed!' },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(defaultNotifications);

  const addNotification = () => {
    const types = ['info', 'success', 'warning', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const message = prompt('Enter notification message:');

    if (message) {
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          type: randomType,
          message,
        },
      ]);
    }
  };

  return (
    <div className="space-y-2 mt-24">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button
          onClick={addNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Add Notification
        </button>
      </div>
      {notifications.map((note) => (
        <div
          key={note.id}
          className={`flex items-center space-x-2 border-l-4 p-3 rounded shadow-sm bg-white ${
            {
              info: 'border-blue-500',
              success: 'border-green-500',
              warning: 'border-yellow-500',
              error: 'border-red-500',
            }[note.type]
          }`}
        >
          {notificationIcons[note.type]}
          <div className="text-sm">{note.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
