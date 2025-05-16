import React, { useState, useEffect } from 'react';
import { Car, Calendar, Clock, MapPin, Star, Shield, Users, X } from 'lucide-react';
import './MyRides.css';

const RideHistory = () => {
  const [activeTab, setActiveTab] = useState('completed');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rating, setRating] = useState(0);
  const [rides, setRides] = useState({
    completed: [],
    cancelled: []
  });

  useEffect(() => {
    // Load rides from localStorage
    const loadRides = () => {
      const session = JSON.parse(localStorage.getItem('session'));
      if (!session) return;

      const allRides = JSON.parse(localStorage.getItem('rides')) || [];
      const userRides = allRides.filter(ride => ride.userId === session.user.email);

      // Categorize rides
      const categorizedRides = {
        completed: userRides.filter(ride => ride.status === 'completed'),
        cancelled: userRides.filter(ride => ride.status === 'cancelled')
      };

      setRides(categorizedRides);
    };

    loadRides();
    // Add event listener for storage changes
    window.addEventListener('storage', loadRides);
    return () => window.removeEventListener('storage', loadRides);
  }, []);

  const handleRateRide = (ride) => {
    setSelectedRide(ride);
    setRating(ride.rating || 0);
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (!selectedRide) return;

    // Update the ride's rating in localStorage
    const allRides = JSON.parse(localStorage.getItem('rides')) || [];
    const updatedRides = allRides.map(ride => {
      if (ride.id === selectedRide.id) {
        return { ...ride, rating };
      }
      return ride;
    });

    localStorage.setItem('rides', JSON.stringify(updatedRides));

    // Update local state
    setRides(prevRides => {
      const updatedCompleted = prevRides.completed.map(ride => 
        ride.id === selectedRide.id ? { ...ride, rating } : ride
      );

      return {
        ...prevRides,
        completed: updatedCompleted
      };
    });

    setShowRatingModal(false);
    setSelectedRide(null);
    setRating(0);
  };

  const renderRideCard = (ride) => (
    <div key={ride.id} className="ride-card">
      <div className="ride-header">
        <div className="ride-type">
          {ride.type === 'pool' ? (
            <Users size={20} />
          ) : (
            <Car size={20} />
          )}
          <span>
            {ride.type === 'pool' ? ride.poolName : 'Regular Ride'}
            {(ride.isWomenOnly || ride.isWomenSafety) && (
              <span className="women-safety-badge">
                <Shield size={16} />
                Women Safety
              </span>
            )}
          </span>
        </div>
        <div className="ride-status">{ride.status}</div>
      </div>

      <div className="ride-details">
        <div className="detail-row">
          <MapPin size={18} />
          <div>
            <p>From: {ride.from}</p>
            <p>To: {ride.to}</p>
          </div>
        </div>

        <div className="detail-row">
          <Calendar size={18} />
          <p>{ride.date}</p>
          <Clock size={18} />
          <p>{ride.time}</p>
        </div>

        <div className="detail-row">
          <p>₹{ride.fare}</p>
        </div>

        {ride.rating && (
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < ride.rating ? '#ffc107' : 'none'}
                stroke={i < ride.rating ? '#ffc107' : '#666'}
              />
            ))}
          </div>
        )}

        {ride.cancellationReason && (
          <div className="cancellation-reason">
            <p>Reason: {ride.cancellationReason}</p>
          </div>
        )}
      </div>

      <div className="ride-actions">
        {ride.status === 'completed' && !ride.rating && (
          <button 
            className="rate-btn"
            onClick={() => handleRateRide(ride)}
          >
            Rate Ride
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="my-rides-container">
      <h1>Ride History</h1>

      <div className="rides-tabs">
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="rides-list">
        {rides[activeTab].length > 0 ? (
          rides[activeTab].map(renderRideCard)
        ) : (
          <div className="no-rides">
            <p>No {activeTab} rides found</p>
          </div>
        )}
      </div>

      {showRatingModal && selectedRide && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowRatingModal(false)}>
              <X size={20} />
            </button>
            <h2>Rate Your Ride</h2>
            <div className="rating-input">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill={i < rating ? '#ffc107' : 'none'}
                  stroke={i < rating ? '#ffc107' : '#666'}
                  onClick={() => setRating(i + 1)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <button className="submit-btn" onClick={submitRating}>
              Submit Rating
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideHistory; 