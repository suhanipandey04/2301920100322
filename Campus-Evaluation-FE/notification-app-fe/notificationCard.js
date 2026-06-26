
import React from 'react';


const categoryEmoji = {
  Exam: '📝',
  Event: '🎉',
  Holiday: '🏖️',
  Fee: '💰',
  General: '📢',
};

function NotificationCard({ notification, onMarkRead, onDelete, isAdmin }) {
  const { _id, title, message, category, targetAudience, createdBy, createdAt, isRead } = notification;

  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`notification-card ${isRead ? 'read' : 'unread'}`}>
      {/* Unread dot indicator */}
      {!isRead && <span className="unread-dot" />}

      <div className="card-header">
        <div className="card-title-row">
          <span className="category-emoji">{categoryEmoji[category] || '📢'}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-badges">
          <span className={`badge category-badge ${category}`}>{category}</span>
          <span className="badge audience-badge">{targetAudience}</span>
        </div>
      </div>

      <p className="card-message">{message}</p>

      <div className="card-footer">
        <div className="card-meta">
          <span>👤 {createdBy?.name || 'Admin'}</span>
          <span>🕐 {formattedDate}</span>
        </div>

        <div className="card-actions">
          {/* Mark as read button (only if not read yet) */}
          {!isRead && (
            <button className="btn btn-read" onClick={() => onMarkRead(_id)}>
              ✅ Mark as Read
            </button>
          )}
          {/* Delete button (admin only) */}
          {isAdmin && (
            <button className="btn btn-delete" onClick={() => onDelete(_id)}>
              🗑️ Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
