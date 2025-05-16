import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Phone, MapPin, Share2 } from 'lucide-react';
import './WomenSafety.css';

const WomenSafety = () => {
  const safetyFeatures = [
    {
      icon: <Shield size={24} />,
      title: 'Emergency SOS',
      description: 'Quick access to emergency services with one tap',
      link: '/sos'
    },
    {
      icon: <AlertTriangle size={24} />,
      title: 'Real-time Alerts',
      description: 'Get instant alerts if your ride deviates from the route'
    },
    {
      icon: <Phone size={24} />,
      title: 'Share Ride Details',
      description: 'Share your ride details with trusted contacts',
      link: '/share-ride'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Live Location Tracking',
      description: 'Your location is continuously tracked during the ride'
    }
  ];

  return (
    <div className="safety-container">
      <div className="safety-header">
        <h1>Women Safety Features</h1>
        <p>Your safety is our top priority</p>
      </div>
      
      <div className="safety-features">
        {safetyFeatures.map((feature, index) => (
          <div key={index} className="safety-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.link && (
              <Link to={feature.link} className="feature-link">
                Learn More
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="safety-actions">
        <Link to="/sos" className="sos-button">
          <Shield size={24} />
          Emergency SOS
        </Link>
        <Link to="/share-ride" className="share-button">
          <Share2 size={24} />
          Share Ride Details
        </Link>
      </div>
    </div>
  );
};

export default WomenSafety; 