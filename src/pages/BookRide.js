import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Car, DollarSign, Clock, Users, CreditCard, X, Shield, Search, Banknote } from 'lucide-react';
import OSMap from '../components/OSMap';
import './BookRide.css';

const BASE_FARE = 50;
const PER_KM_RATE = 10;
const WOMEN_SAFETY_PREMIUM = 1.2;

function BookRide() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [fare, setFare] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [rideType, setRideType] = useState('regular');
  const [showPayment, setShowPayment] = useState(false);
  const [showPoolModal, setShowPoolModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [isWomenSafety, setIsWomenSafety] = useState(false);
  const [userGender, setUserGender] = useState('');
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([12.9716, 77.5946]); // Default to Bangalore
  const [availablePools, setAvailablePools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const mapRef = useRef();

  useEffect(() => {
    // Get user's gender from session
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.user) {
      setUserGender(session.user.gender);
    }

    // Load available pools
    const savedPools = JSON.parse(localStorage.getItem('safetyPools')) || [];
    setAvailablePools(savedPools);
  }, []);

  const pools = [
    { 
      id: 1, 
      name: 'Office Commute', 
      members: 3, 
      price: '₹200/day',
      isWomenOnly: false,
      route: 'Andheri to BKC',
      pickup: 'Andheri',
      drop: 'BKC',
      time: '09:00 AM'
    },
    { 
      id: 2, 
      name: 'Women College Route', 
      members: 4, 
      price: '₹150/day',
      isWomenOnly: true,
      route: 'Powai to Juhu',
      pickup: 'Powai',
      drop: 'Juhu',
      time: '08:00 AM'
    },
    { 
      id: 3, 
      name: 'Ladies Shopping Mall', 
      members: 2, 
      price: '₹100/day',
      isWomenOnly: true,
      route: 'Malad to Goregaon',
      pickup: 'Malad',
      drop: 'Goregaon',
      time: '02:00 PM'
    },
    { 
      id: 4, 
      name: 'Tech Park Express', 
      members: 3, 
      price: '₹180/day',
      isWomenOnly: false,
      route: 'Thane to Airoli',
      pickup: 'Thane',
      drop: 'Airoli',
      time: '08:30 AM'
    },
    { 
      id: 5, 
      name: 'Women Night Shift', 
      members: 3, 
      price: '₹250/day',
      isWomenOnly: true,
      route: 'Lower Parel to Andheri',
      pickup: 'Lower Parel',
      drop: 'Andheri',
      time: '08:00 PM'
    },
    { 
      id: 6, 
      name: 'Weekend Market Pool', 
      members: 4, 
      price: '₹120/day',
      isWomenOnly: false,
      route: 'Bandra to Dadar',
      pickup: 'Bandra',
      drop: 'Dadar',
      time: '10:00 AM'
    }
  ];

  const handleLocationInput = (type, value) => {
    if (type === 'pickup') {
      setPickup(value);
      // For demo purposes, we'll use a simple coordinate mapping
      if (value.toLowerCase().includes('andheri')) {
        setPickupCoords({ lat: 19.1136, lng: 72.8697 });
      } else if (value.toLowerCase().includes('bkc')) {
        setPickupCoords({ lat: 19.0662, lng: 72.8684 });
      } else if (value.toLowerCase().includes('powai')) {
        setPickupCoords({ lat: 19.1192, lng: 72.8997 });
      } else if (value.toLowerCase().includes('juhu')) {
        setPickupCoords({ lat: 19.1077, lng: 72.8263 });
      } else if (value.toLowerCase().includes('malad')) {
        setPickupCoords({ lat: 19.1867, lng: 72.8486 });
      } else if (value.toLowerCase().includes('goregaon')) {
        setPickupCoords({ lat: 19.1550, lng: 72.8497 });
      } else if (value.toLowerCase().includes('bandra')) {
        setPickupCoords({ lat: 19.0544, lng: 72.8405 });
      } else if (value.toLowerCase().includes('colaba')) {
        setPickupCoords({ lat: 18.9068, lng: 72.8156 });
      } else if (value.toLowerCase().includes('thane')) {
        setPickupCoords({ lat: 19.2183, lng: 72.9781 });
      } else if (value.toLowerCase().includes('dadar')) {
        setPickupCoords({ lat: 19.0176, lng: 72.8427 });
      }
    } else {
      setDrop(value);
      // For demo purposes, we'll use a simple coordinate mapping
      if (value.toLowerCase().includes('andheri')) {
        setDropCoords({ lat: 19.1136, lng: 72.8697 });
      } else if (value.toLowerCase().includes('bkc')) {
        setDropCoords({ lat: 19.0662, lng: 72.8684 });
      } else if (value.toLowerCase().includes('powai')) {
        setDropCoords({ lat: 19.1192, lng: 72.8997 });
      } else if (value.toLowerCase().includes('juhu')) {
        setDropCoords({ lat: 19.1077, lng: 72.8263 });
      } else if (value.toLowerCase().includes('malad')) {
        setDropCoords({ lat: 19.1867, lng: 72.8486 });
      } else if (value.toLowerCase().includes('goregaon')) {
        setDropCoords({ lat: 19.1550, lng: 72.8497 });
      } else if (value.toLowerCase().includes('bandra')) {
        setDropCoords({ lat: 19.0544, lng: 72.8405 });
      } else if (value.toLowerCase().includes('colaba')) {
        setDropCoords({ lat: 18.9068, lng: 72.8156 });
      } else if (value.toLowerCase().includes('thane')) {
        setDropCoords({ lat: 19.2183, lng: 72.9781 });
      } else if (value.toLowerCase().includes('dadar')) {
        setDropCoords({ lat: 19.0176, lng: 72.8427 });
      }
    }

    // Update markers
    const newMarkers = [];
    if (type === 'pickup' && pickupCoords) {
      newMarkers.push({
        position: [pickupCoords.lat, pickupCoords.lng],
        popup: 'Pickup Location'
      });
    }
    if (type === 'drop' && dropCoords) {
      newMarkers.push({
        position: [dropCoords.lat, dropCoords.lng],
        popup: 'Drop Location'
      });
    }
    setMarkers(newMarkers);

    // Center map between pickup and drop if both are selected
    if (pickupCoords && dropCoords) {
      const centerLat = (pickupCoords.lat + dropCoords.lat) / 2;
      const centerLng = (pickupCoords.lng + dropCoords.lng) / 2;
      setCenter([centerLat, centerLng]);
    } else if (type === 'pickup' && pickupCoords) {
      setCenter([pickupCoords.lat, pickupCoords.lng]);
    } else if (type === 'drop' && dropCoords) {
      setCenter([dropCoords.lat, dropCoords.lng]);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const coords = { lat, lng };
    
    // Determine which location to update based on which one is empty
    if (!pickup) {
      handleLocationInput('pickup', `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } else if (!drop) {
      handleLocationInput('drop', `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  const calculateRoute = () => {
    if (!pickup || !drop) {
      alert('Please enter both pickup and drop locations');
      return;
    }

    if (!pickupCoords || !dropCoords) {
      alert('Please select valid locations from the list');
      return;
    }

    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const lat1 = pickupCoords.lat * Math.PI / 180;
    const lat2 = dropCoords.lat * Math.PI / 180;
    const deltaLat = (dropCoords.lat - pickupCoords.lat) * Math.PI / 180;
    const deltaLng = (dropCoords.lng - pickupCoords.lng) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distanceInKm = R * c;

    // Calculate fare
    let calculatedFare = Math.round(BASE_FARE + (distanceInKm * PER_KM_RATE));
    if (isWomenSafety) {
      calculatedFare = Math.round(calculatedFare * WOMEN_SAFETY_PREMIUM);
    }

    // Estimate duration (assuming average speed of 30 km/h)
    const durationInMinutes = Math.round((distanceInKm / 30) * 60);

    setFare(calculatedFare);
    setDuration(`${durationInMinutes} mins`);
    setDistance(`${distanceInKm.toFixed(1)} km`);
  };

  const handleBookRide = () => {
    if (!fare) {
      alert('Please calculate the route first');
      return;
    }
    setShowPayment(true);
  };

  const handleJoinPool = (pool) => {
    if (pool.isWomenOnly && userGender !== 'Female') {
      alert('This pool is exclusively for women passengers');
      return;
    }
    setSelectedPool(pool);
    setShowPoolModal(true);
  };

  const handleWomenSafetyToggle = () => {
    if (userGender !== 'Female') {
      alert('Women Safety feature is only available for female passengers');
      return;
    }
    setIsWomenSafety(!isWomenSafety);
  };

  const handlePayment = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      alert('Please login to book a ride');
      return;
    }

    // Create new ride object
    const newRide = {
      id: Date.now(),
      type: rideType,
      from: pickup,
      to: drop,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      fare: fare,
      status: 'scheduled',
      isWomenSafety: isWomenSafety,
      userId: session.user.email
    };

    // Save to localStorage
    const existingRides = JSON.parse(localStorage.getItem('rides')) || [];
    const updatedRides = [...existingRides, newRide];
    localStorage.setItem('rides', JSON.stringify(updatedRides));

    alert('Payment successful! Your ride has been booked.');
    setShowPayment(false);
  };

  const handlePoolJoin = () => {
    if (!selectedPool) return;

    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      alert('Please login to join a pool');
      return;
    }

    // Create new pool ride object
    const newPoolRide = {
      id: Date.now(),
      type: 'pool',
      poolId: selectedPool.id,
      poolName: selectedPool.name,
      from: selectedPool.pickup,
      to: selectedPool.drop,
      date: new Date().toISOString().split('T')[0],
      time: selectedPool.time,
      fare: selectedPool.price,
      status: 'scheduled',
      isWomenOnly: selectedPool.isWomenOnly,
      userId: session.user.email
    };

    // Save to localStorage
    const existingRides = JSON.parse(localStorage.getItem('rides')) || [];
    const updatedRides = [...existingRides, newPoolRide];
    localStorage.setItem('rides', JSON.stringify(updatedRides));

    // Update pool members
    const newPoolMember = {
      poolId: selectedPool.id,
      userId: session.user.email,
      name: session.user.name,
      joinedAt: new Date().toISOString()
    };

    const updatedPools = [...availablePools, newPoolMember];
    setAvailablePools(updatedPools);
    localStorage.setItem('safetyPools', JSON.stringify(updatedPools));

    alert(`Successfully joined ${selectedPool.name} pool!`);
    setShowPoolModal(false);
  };

  const filteredPools = pools.filter(pool => 
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-ride-container">
      <div className="ride-form">
        <h1>Book a Ride</h1>
        
        <div className="ride-type-selector">
          <button 
            className={`ride-type-btn ${rideType === 'regular' ? 'active' : ''}`}
            onClick={() => {
              setRideType('regular');
              setIsWomenSafety(false);
            }}
          >
            <Car size={20} />
            Regular Ride
          </button>
          <button 
            className={`ride-type-btn ${rideType === 'pool' ? 'active' : ''}`}
            onClick={() => {
              setRideType('pool');
              setIsWomenSafety(false);
            }}
          >
            <Users size={20} />
            Join Pool
          </button>
          <button 
            className={`ride-type-btn ${isWomenSafety ? 'women-safety' : ''}`}
            onClick={handleWomenSafetyToggle}
          >
            <Shield size={20} />
            Women Safety
          </button>
        </div>

        {rideType === 'regular' ? (
          <>
            <div className="location-inputs">
              <div className="input-group">
                <MapPin size={20} />
                <input
                  type="text"
                  placeholder="Enter pickup location (e.g., Andheri, BKC, Powai)"
                  value={pickup}
                  onChange={(e) => handleLocationInput('pickup', e.target.value)}
                  onFocus={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo(center, 13);
                    }
                  }}
                />
              </div>

              <div className="input-group">
                <MapPin size={20} />
                <input
                  type="text"
                  placeholder="Enter drop location (e.g., Andheri, BKC, Powai)"
                  value={drop}
                  onChange={(e) => handleLocationInput('drop', e.target.value)}
                  onFocus={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo(center, 13);
                    }
                  }}
                />
              </div>
            </div>

            <div className="map-container">
              <OSMap 
                center={center}
                markers={markers}
                ref={mapRef}
                onClick={handleMapClick}
              />
            </div>

            <button className="calculate-btn" onClick={calculateRoute}>
              Calculate Route
            </button>

            {fare && (
              <div className="ride-details">
                <div className="detail-item">
                  <Clock size={20} />
                  <span>Duration: {duration}</span>
                </div>
                <div className="detail-item">
                  <DollarSign size={20} />
                  <span>Distance: {distance}</span>
                </div>
                <div className="detail-item">
                  <DollarSign size={20} />
                  <span>Fare: ₹{fare}</span>
                </div>
              </div>
            )}

            <button className="book-btn" onClick={handleBookRide}>
              Book Ride
            </button>
          </>
        ) : (
          <div className="pool-section">
            <div className="search-pool">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search pools by name or route"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="pools-list">
              {filteredPools.map(pool => (
                <div key={pool.id} className="pool-card">
                  <div className="pool-header">
                    <h3>{pool.name}</h3>
                    {pool.isWomenOnly && (
                      <span className="women-only-badge">
                        <Shield size={16} />
                        Women Only
                      </span>
                    )}
                  </div>
                  <div className="pool-details">
                    <p><MapPin size={16} /> {pool.route}</p>
                    <p><Users size={16} /> {pool.members} members</p>
                    <p><Clock size={16} /> {pool.time}</p>
                    <p><Banknote size={16} /> {pool.price}</p>
                  </div>
                  <button 
                    className="join-pool-btn"
                    onClick={() => handleJoinPool(pool)}
                  >
                    Join Pool
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showPayment && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowPayment(false)}>
              <X size={20} />
            </button>
            <h2>Payment Details</h2>
            <div className="payment-amount">
              <span>Amount to Pay:</span>
              <span>₹{fare}</span>
            </div>
            <div className="payment-methods">
              <button className="payment-method">
                <CreditCard size={20} />
                Credit Card
              </button>
              <button className="payment-method">
                <CreditCard size={20} />
                Debit Card
              </button>
              <button className="payment-method">
                <CreditCard size={20} />
                UPI
              </button>
            </div>
            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      )}

      {showPoolModal && selectedPool && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowPoolModal(false)}>
              <X size={20} />
            </button>
            <h2>Join Pool</h2>
            <div className="pool-details">
              <h3>{selectedPool.name}</h3>
              <p><MapPin size={16} /> Route: {selectedPool.route}</p>
              <p><Users size={16} /> Members: {selectedPool.members}</p>
              <p><Clock size={16} /> Time: {selectedPool.time}</p>
              <p><Banknote size={16} /> Price: {selectedPool.price}</p>
            </div>
            <button className="join-btn" onClick={handlePoolJoin}>
              Confirm Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookRide;
