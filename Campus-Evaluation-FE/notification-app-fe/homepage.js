

import React, { useState, useEffect, useCallback } from 'react';
import NotificationList from '../components/NotificationList';
import { fetchNotifications, markNotificationRead, deleteNotification } from '../services/api';

function HomePage({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications();
      setNotifications(res.data);
    } catch (err) {
      setError('Failed to load notifications. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load when page first opens
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  
  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
     
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      alert('Failed to mark as read');
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert('Failed to delete notification');
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>⚠️ {error}</p>
        <button className="btn btn-primary" onClick={loadNotifications}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📬 Notifications</h1>
        <p>Hello, <strong>{user.name}</strong>! Here are all campus announcements.</p>
      </div>

      <NotificationList
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onDelete={handleDelete}
        isAdmin={user.role === 'admin'}
      />
    </div>
  );
}

export default HomePage;
