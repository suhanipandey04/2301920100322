import React, { useState } from 'react';
import NotificationCard from './NotificationCard';

const CATEGORIES = ['All', 'Exam', 'Event', 'Holiday', 'Fee', 'General'];

function NotificationList({ notifications, onMarkRead, onDelete, isAdmin }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  
  const filtered = notifications.filter((n) => {
    const categoryMatch = activeFilter === 'All' || n.category === activeFilter;
    const readMatch = !showUnreadOnly || !n.isRead;
    return categoryMatch && readMatch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notification-list-container">
      {/* Stats bar */}
      <div className="stats-bar">
        <span className="stat">📬 Total: <strong>{notifications.length}</strong></span>
        <span className="stat unread">🔴 Unread: <strong>{unreadCount}</strong></span>
        <span className="stat read">✅ Read: <strong>{notifications.length - unreadCount}</strong></span>
      </div>

      {/* Filter controls */}
      <div className="filter-bar">
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="unread-toggle">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
          />
          Show unread only
        </label>
      </div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>🎉 No notifications to show!</p>
        </div>
      ) : (
        <div className="notifications-grid">
          {filtered.map((notif) => (
            <NotificationCard
              key={notif._id}
              notification={notif}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationList;
