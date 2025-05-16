import React, { useState, useEffect } from 'react';
import Map from './Map';
import { Shield, Users, MapPin, Clock } from 'lucide-react';

const SafetyPool = () => {
  const [pools, setPools] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check for active session
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      setError('Please login to join safety pools');
      return;
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => setError('Error getting location: ' + error.message)
      );
    }
    
    // Get safety pools from localStorage
    const savedPools = JSON.parse(localStorage.getItem('safetyPools')) || [];
    setPools(savedPools);
  }, []);

  const joinPool = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Check session
      const session = JSON.parse(localStorage.getItem('session'));
      if (!session) {
        setError('Please login to join safety pools');
        setLoading(false);
        return;
      }

      if (!location) {
        setError('Please enable location services');
        setLoading(false);
        return;
      }

      // Check if user is already in a pool
      const existingPool = pools.find(pool => pool.userId === session.user.email);
      if (existingPool) {
        setError('You are already in a safety pool');
        setLoading(false);
        return;
      }

      const newPool = {
        id: Date.now(),
        userId: session.user.email,
        name: session.user.name,
        latitude: location.latitude,
        longitude: location.longitude,
        active: true,
        joinedAt: new Date().toISOString()
      };

      const updatedPools = [...pools, newPool];
      setPools(updatedPools);
      localStorage.setItem('safetyPools', JSON.stringify(updatedPools));
      
      setSuccess('Successfully joined safety pool!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('An error occurred while joining the pool');
    } finally {
      setLoading(false);
    }
  };

  const leavePool = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const session = JSON.parse(localStorage.getItem('session'));
      if (!session) {
        setError('Please login to leave safety pools');
        setLoading(false);
        return;
      }

      const updatedPools = pools.filter(pool => pool.userId !== session.user.email);
      setPools(updatedPools);
      localStorage.setItem('safetyPools', JSON.stringify(updatedPools));
      
      setSuccess('Successfully left safety pool');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('An error occurred while leaving the pool');
    } finally {
      setLoading(false);
    }
  };

  const isUserInPool = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) return false;
    return pools.some(pool => pool.userId === session.user.email);
  };

  return (
    <div className="safety-pool">
      <div className="safety-pool-header">
        <h2>Safety Pool</h2>
        <p>Join a safety pool to share your location with trusted contacts</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="safety-pool-actions">
        {!isUserInPool() ? (
          <button 
            onClick={joinPool} 
            className="join-pool-btn"
            disabled={loading}
          >
            <Shield size={20} />
            {loading ? 'Joining...' : 'Join Safety Pool'}
          </button>
        ) : (
          <button 
            onClick={leavePool} 
            className="leave-pool-btn"
            disabled={loading}
          >
            <Shield size={20} />
            {loading ? 'Leaving...' : 'Leave Safety Pool'}
          </button>
        )}
      </div>

      <div className="pool-stats">
        <div className="stat-item">
          <Users size={20} />
          <span>{pools.length} Members</span>
        </div>
        <div className="stat-item">
          <MapPin size={20} />
          <span>{location ? 'Location Active' : 'Location Inactive'}</span>
        </div>
      </div>

      <div className="map-container">
        <Map
          markers={pools.map(pool => ({
            position: {
              lat: parseFloat(pool.latitude),
              lng: parseFloat(pool.longitude)
            },
            data: pool
          }))}
          onMarkerClick={(marker) => {
            console.log('Safety pool member:', marker.data);
          }}
        />
      </div>
    </div>
  );
};

export default SafetyPool; 