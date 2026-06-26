//export default function App() {
  //return "Notifications App";
//}
// ============================================
// FILE: notification-app-fe/src/App.js
// Main app - decides which page to show
// ============================================

import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';

function App() {
  // Store the logged-in user in state
  const [user, setUser] = useState(null);
  // Which page to show: 'home' or 'admin'
  const [currentPage, setCurrentPage] = useState('home');

  // When the app loads, check if user was already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Called when user logs in
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Called when user logs out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('home');
  };

  // If not logged in, show the login page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Navbar
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {/* Students see HomePage, Admins can also switch to AdminPage */}
        {currentPage === 'home' && <HomePage user={user} />}
        {currentPage === 'admin' && user.role === 'admin' && <AdminPage />}
      </main>
    </div>
  );
}

export default App;