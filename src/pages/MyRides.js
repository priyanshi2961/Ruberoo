import React, { useState, useEffect } from 'react';
import { Car, Calendar, Clock, MapPin, DollarSign, Star, Shield, Users, X } from 'lucide-react';
import './MyRides.css';

const MyRides = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [rides, setRides] = useState({
    upcoming: [],
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
        upcoming: userRides.filter(ride => ride.status === 'scheduled'),
        completed: userRides.filter(ride => ride.status === 'completed'),
        cancelled: userRides.filter(ride => ride.status === 'cancelled')
      };

      setRides(categorizedRides);
    };

    loadRides();
    // Add event listener for storage changes
    window.addEventListener('storage', loadRides);

    // Set up interval to check for completed rides
    const interval = setInterval(() => {
      const now = new Date();
      const allRides = JSON.parse(localStorage.getItem('rides')) || [];
      const updatedRides = allRides.map(ride => {
        if (ride.status === 'scheduled') {
          const rideDateTime = new Date(`${ride.date}T${ride.time}`);
          if (rideDateTime < now) {
            return { ...ride, status: 'completed' };
          }
        }
        return ride;
      });

      localStorage.setItem('rides', JSON.stringify(updatedRides));
      loadRides();
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('storage', loadRides);
      clearInterval(interval);
    };
  }, []);

  const handleCancelRide = (ride) => {
    setSelectedRide(ride);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    if (!selectedRide) return;

    // Update the rides in localStorage
    const allRides = JSON.parse(localStorage.getItem('rides')) || [];
    const updatedRides = allRides.map(ride => {
      if (ride.id === selectedRide.id) {
        return {
          ...ride,
          status: 'cancelled',
          cancellationReason: 'Cancelled by user',
          cancelledAt: new Date().toISOString()
        };
      }
      return ride;
    });

    localStorage.setItem('rides', JSON.stringify(updatedRides));

    // Update local state
    setRides(prevRides => {
      const updatedUpcoming = prevRides.upcoming.filter(r => r.id !== selectedRide.id);
      const cancelledRide = {
        ...selectedRide,
        status: 'cancelled',
        cancellationReason: 'Cancelled by user',
        cancelledAt: new Date().toISOString()
      };

      return {
        ...prevRides,
        upcoming: updatedUpcoming,
        cancelled: [...prevRides.cancelled, cancelledRide]
      };
    });

    setShowCancelModal(false);
    setSelectedRide(null);
  };

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
        {ride.status === 'scheduled' && (
          <button 
            className="cancel-btn"
            onClick={() => handleCancelRide(ride)}
          >
            Cancel Ride
          </button>
        )}
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
      <h1>My Rides</h1>

      <div className="rides-tabs">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
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

      {showCancelModal && selectedRide && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowCancelModal(false)}>
              <X size={20} />
            </button>
            <h2>Cancel Ride</h2>
            <p>Are you sure you want to cancel this ride?</p>
            <p>From: {selectedRide.from}</p>
            <p>To: {selectedRide.to}</p>
            <p>Date: {selectedRide.date} {selectedRide.time}</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={confirmCancellation}>
                Yes, Cancel Ride
              </button>
              <button className="secondary-btn" onClick={() => setShowCancelModal(false)}>
                Keep Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {showRatingModal && selectedRide && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowRatingModal(false)}>
              <X size={20} />
            </button>
            <h2>Rate your Ride</h2>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  className="star"
                  fill={i < rating ? '#ffc107' : 'none'}
                  stroke={i < rating ? '#ffc107' : '#666'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setRating(i + 1)}
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

export default MyRides;
