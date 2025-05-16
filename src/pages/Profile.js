import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, Users, Car, Lock, Shield } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '123, Main Street, City',
    subscription: 'Basic',
    poolMembership: '',
    password: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for active session
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      navigate('/login');
      return;
    }

    // Load user profile from session
    setProfile(prev => ({
      ...prev,
      ...session.user
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (isEditing && profile.password && profile.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return false;
    }

    if (isEditing && profile.password !== profile.confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === profile.email);

      if (userIndex === -1) {
        setMessage('User not found');
        setLoading(false);
        return;
      }

      // Update user data
      const updatedUser = {
        ...users[userIndex],
        name: profile.name,
        phone: profile.phone,
        age: profile.age,
        address: profile.address
      };

      // Update password if changed
      if (profile.password) {
        updatedUser.password = profile.password;
      }

      // Update users array
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      // Update session
      const session = JSON.parse(localStorage.getItem('session'));
      session.user = {
        ...session.user,
        name: profile.name,
        phone: profile.phone,
        age: profile.age
      };
      localStorage.setItem('session', JSON.stringify(session));

      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setMessage('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className={`edit-btn ${isEditing ? 'cancel' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
          disabled={loading}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <User size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="input-group">
              <Mail size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                disabled={true}
                required
              />
            </div>

            <div className="input-group">
              <Phone size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="input-group">
              <Calendar size={20} />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={profile.age}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="input-group">
              <MapPin size={20} />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            {isEditing && (
              <>
                <div className="input-group">
                  <Lock size={20} />
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={profile.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <Lock size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {message && <div className="message">{message}</div>}

            {isEditing && (
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </form>
        </div>

        <div className="subscription-card">
          <h2>Subscription & Pool</h2>
          <div className="subscription-info">
            <div className="info-item">
              <CreditCard size={20} />
              <div>
                <h3>Current Plan</h3>
                <p>{profile.subscription}</p>
                <Link to="/upgrade" className="upgrade-link">
                  Upgrade Plan
                </Link>
              </div>
            </div>
            <div className="info-item">
              <Users size={20} />
              <div>
                <h3>Pool Membership</h3>
                <p>{profile.poolMembership || "No membership"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
