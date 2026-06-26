


import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

function LoginPage({ onLogin }) {
  
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isRegister) {
        response = await registerUser(formData);
      } else {
        response = await loginUser({ email: formData.email, password: formData.password });
      }

      const { token, user } = response.data;

      // Save token and user to localStorage (so they stay logged in on refresh)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Tell App.js that login was successful
      onLogin(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo / Header */}
        <div className="login-header">
          <div className="login-logo">🏫</div>
          <h1>Campus Notification System</h1>
          <p>Stay updated with all campus announcements</p>
        </div>

        {/* Toggle Login / Register */}
        <div className="auth-toggle">
          <button
            className={!isRegister ? 'active' : ''}
            onClick={() => { setIsRegister(false); setError(''); }}
          >
            Login
          </button>
          <button
            className={isRegister ? 'active' : ''}
            onClick={() => { setIsRegister(true); setError(''); }}
          >
            Register
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Name field - only for register */}
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@campus.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role selector - only for register */}
          {isRegister && (
            <div className="form-group">
              <label>I am a...</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? '✅ Create Account' : '🔑 Login'}
          </button>
        </form>

        <p className="switch-mode">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
