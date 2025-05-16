import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are committed to providing safe and reliable transportation solutions for everyone. Our mission is to make travel easier, safer, and more accessible.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/women-safety">Women Safety</Link></li>
            <li><Link to="/ride-history">Ride History</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><Link to="/upgrade-plan">Upgrade Plan</Link></li>
            <li><Link to="/emergency-sos">Emergency SOS</Link></li>
            <li><Link to="/share-ride-details">Share Ride</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <p>Follow us on social media for updates and news.</p>
          <div className="footer-social">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ruberoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
