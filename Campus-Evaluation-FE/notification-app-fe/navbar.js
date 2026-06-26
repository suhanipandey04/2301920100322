import React from 'react';

function Navbar({ user, currentPage, onNavigate, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🏫 Campus Notifications
      </div>

      <div className="navbar-links">
        {/* Home button - everyone sees this */}
        <button
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          🔔 Notifications
        </button>

        {/* Admin panel button - only admins see this */}
        {user.role === 'admin' && (
          <button
            className={`nav-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
          >
            ➕ Send Notification
          </button>
        )}
      </div>

      <div className="navbar-user">
        <span className="user-info">
          👤 {user.name}
          <span className={`role-badge ${user.role}`}>{user.role}</span>
        </span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
