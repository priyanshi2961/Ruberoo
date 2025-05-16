import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Users, Shield, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only redirect if we're not loading and there's no authenticated user
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, isAuthenticated, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Don't render anything if there's no authenticated user
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="welcome-heading">Welcome to Ruberoo, {user.name}</h1>
        <p>Track your rides and manage your account</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Car size={24} />
          </div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Total Rides</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>5</h3>
            <p>Pool Rides</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div className="stat-info">
            <h3>8</h3>
            <p>Safety Alerts</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/book" className="action-card">
            <div className="action-icon">
              <Car size={24} />
            </div>
            <h3>Book Ride</h3>
            <p>Book a new ride now</p>
          </Link>
          <Link to="/safety" className="action-card">
            <div className="action-icon">
              <Shield size={24} />
            </div>
            <h3>Safety Pool</h3>
            <p>Join a safety pool</p>
          </Link>
          <Link to="/history" className="action-card">
            <div className="action-icon">
              <Clock size={24} />
            </div>
            <h3>Ride History</h3>
            <p>View past rides</p>
          </Link>
        </div>
      </div>

      <div className="recent-rides">
        <h2>Recent Rides</h2>
        <div className="rides-list">
          <div className="ride-card">
            <div className="ride-info">
              <h3>City Center to Airport</h3>
              <p>Today, 2:30 PM</p>
              <p>₹450</p>
            </div>
            <span className="ride-status completed">Completed</span>
          </div>
          <div className="ride-card">
            <div className="ride-info">
              <h3>Mall to Home</h3>
              <p>Yesterday, 7:15 PM</p>
              <p>₹280</p>
            </div>
            <span className="ride-status completed">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
