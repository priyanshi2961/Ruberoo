import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Shield, Home, Car, History, Info, User, LogIn, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for active session
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) {
      setIsLoggedIn(true);
      setUser(session.user);
    }
  }, []);

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem('session');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">RUBEROO</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <Home size={20} />
          <span>Home</span>
        </Link>
        {isLoggedIn && (
          <Link to="/dashboard" className="nav-link">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/book" className="nav-link">
            <Car size={20} />
            <span>Book Ride</span>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/safety" className="nav-link">
            <Shield size={20} />
            <span>Women Safety</span>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/myrides" className="nav-link">
            <History size={20} />
            <span>My Rides</span>
          </Link>
        )}
        <Link to="/about" className="nav-link">
          <Info size={20} />
          <span>About</span>
        </Link>
      </div>
      <div className="nav-auth">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">
              <LogIn size={20} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="nav-link">
              <User size={20} />
              <span>Register</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-link">
              <User size={20} />
              <span>{user?.name || 'Profile'}</span>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
