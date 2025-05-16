import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Auth/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || userData.email !== formData.email || userData.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    // Update login status
    userData.isLoggedIn = true;
    localStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <a href="/register" className="auth-link">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
};

export default Login;
