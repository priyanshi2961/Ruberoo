import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    // Age validation
    if (form.age < 18 || form.age > 100) {
      setError('Age must be between 18 and 100');
      return false;
    }

    return true;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(user => user.email === form.email)) {
        setError('Email already registered');
        setLoading(false);
        return;
      }

      // Create new user object without confirmPassword
      const { confirmPassword, ...userData } = form;
      
      // Add user to localStorage
      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Show success message and redirect to login
      alert('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <input 
          name="name" 
          type="text" 
          placeholder="Full Name" 
          value={form.name}
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={form.email}
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password}
          onChange={handleChange} 
          required 
        />
        <input 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          value={form.confirmPassword}
          onChange={handleChange} 
          required 
        />
        <input 
          name="phone" 
          type="tel" 
          placeholder="Phone Number" 
          value={form.phone}
          onChange={handleChange} 
          required 
        />
        <input 
          name="age" 
          type="number" 
          placeholder="Age" 
          value={form.age}
          onChange={handleChange} 
          required 
        />
        <select 
          name="gender" 
          value={form.gender}
          onChange={handleChange} 
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
