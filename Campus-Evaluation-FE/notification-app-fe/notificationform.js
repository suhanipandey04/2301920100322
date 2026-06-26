

import React, { useState } from 'react';
import { createNotification } from '../services/api';

function NotificationForm({ onNotificationCreated }) {
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'General',
    targetAudience: 'All',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await createNotification(formData);
      setSuccessMsg('✅ Notification sent successfully!');
      // Clear form after success
      setFormData({ title: '', message: '', category: 'General', targetAudience: 'All' });
      // Tell parent to refresh the notification list
      if (onNotificationCreated) onNotificationCreated();
    } catch (error) {
      setErrorMsg('❌ Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">📢 Send New Notification</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="notif-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Exam Schedule Released"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your notification message here..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {/* Category and Target in a row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option value="General">📢 General</option>
              <option value="Exam">📝 Exam</option>
              <option value="Event">🎉 Event</option>
              <option value="Holiday">🏖️ Holiday</option>
              <option value="Fee">💰 Fee</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="targetAudience">Target Audience</label>
            <select id="targetAudience" name="targetAudience" value={formData.targetAudience} onChange={handleChange}>
              <option value="All">Everyone</option>
              <option value="Students">Students Only</option>
              <option value="Faculty">Faculty Only</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : '🚀 Send Notification'}
        </button>
      </form>
    </div>
  );
}

export default NotificationForm;
