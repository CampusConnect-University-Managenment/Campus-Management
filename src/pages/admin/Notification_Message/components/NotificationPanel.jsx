import React from 'react';

const NotificationPanel = ({ notifications, onClearNotifications }) => {
  return (
    <div className="notification-panel notification-full-page">
      <div className="notification-header">
        <h2>🔔 Notifications</h2>
        {notifications.length > 0 && (
          <button className="clear-button" onClick={onClearNotifications}>
            Clear All
          </button>
        )}
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <span role="img" aria-label="no-notification">📭</span> No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className="notification-message">
                {notification.message}
              </div>
              <div className="notification-time">
                {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;