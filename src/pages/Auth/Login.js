import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../PageStyles.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === form.email && u.password === form.password);

      if (!user) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // Create user data object without password
      const userData = {
        email: user.email,
        name: user.name,
        gender: user.gender,
        age: user.age,
        phone: user.phone
      };

      // Use the login function from AuthContext
      login(userData);

      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;