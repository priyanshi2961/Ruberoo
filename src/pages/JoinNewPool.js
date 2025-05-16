import React, { useState, useEffect } from 'react';
import { Users, MapPin, Clock, Car, Search, Plus, X } from 'lucide-react';
import './JoinNewPool.css';

const JoinNewPool = () => {
  const [pools, setPools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePool, setShowCreatePool] = useState(false);
  const [newPool, setNewPool] = useState({
    name: '',
    from: '',
    to: '',
    time: '',
    days: [],
    maxMembers: 4
  });

  useEffect(() => {
    // Load pools from localStorage
    const loadPools = () => {
      const allPools = JSON.parse(localStorage.getItem('pools')) || [];
      setPools(allPools);
    };

    loadPools();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreatePool = () => {
    if (!newPool.name || !newPool.from || !newPool.to || !newPool.time) return;

    const pool = {
      id: Date.now().toString(),
      ...newPool,
      members: [],
      createdAt: new Date().toISOString()
    };

    const updatedPools = [...pools, pool];
    localStorage.setItem('pools', JSON.stringify(updatedPools));
    setPools(updatedPools);
    setNewPool({
      name: '',
      from: '',
      to: '',
      time: '',
      days: [],
      maxMembers: 4
    });
    setShowCreatePool(false);
  };

  const handleJoinPool = (poolId) => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) return;

    const updatedPools = pools.map(pool => {
      if (pool.id === poolId && pool.members.length < pool.maxMembers) {
        return {
          ...pool,
          members: [...pool.members, session.user.email]
        };
      }
      return pool;
    });

    localStorage.setItem('pools', JSON.stringify(updatedPools));
    setPools(updatedPools);
    alert('Successfully joined the pool!');
  };

  const filteredPools = pools.filter(pool => 
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pools-container">
      <div className="pools-header">
        <h1>Join a Ride Pool</h1>
        <p>Find and join existing ride pools or create your own</p>
      </div>

      <div className="pools-actions">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search pools by name, from, or to"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button 
          className="create-pool-btn"
          onClick={() => setShowCreatePool(true)}
        >
          <Plus size={20} />
          Create New Pool
        </button>
      </div>

      <div className="pools-list">
        {filteredPools.map((pool) => (
          <div key={pool.id} className="pool-card">
            <div className="pool-header">
              <h2>{pool.name}</h2>
              <span className="members-count">
                <Users size={16} />
                {pool.members.length}/{pool.maxMembers}
              </span>
            </div>

            <div className="pool-details">
              <div className="detail-row">
                <MapPin size={18} />
                <div>
                  <p>From: {pool.from}</p>
                  <p>To: {pool.to}</p>
                </div>
              </div>
              <div className="detail-row">
                <Clock size={18} />
                <p>{pool.time}</p>
              </div>
              <div className="detail-row">
                <p>Days: {pool.days.join(', ')}</p>
              </div>
            </div>

            <button 
              className="join-btn"
              onClick={() => handleJoinPool(pool.id)}
              disabled={pool.members.length >= pool.maxMembers}
            >
              Join Pool
            </button>
          </div>
        ))}
      </div>

      {showCreatePool && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowCreatePool(false)}>
              <X size={20} />
            </button>
            <h2>Create New Pool</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Pool Name"
                value={newPool.name}
                onChange={(e) => setNewPool({ ...newPool, name: e.target.value })}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="From"
                value={newPool.from}
                onChange={(e) => setNewPool({ ...newPool, from: e.target.value })}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="To"
                value={newPool.to}
                onChange={(e) => setNewPool({ ...newPool, to: e.target.value })}
              />
            </div>
            <div className="input-group">
              <input
                type="time"
                value={newPool.time}
                onChange={(e) => setNewPool({ ...newPool, time: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Days:</label>
              <div className="days-selector">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <label key={day} className="day-checkbox">
                    <input
                      type="checkbox"
                      checked={newPool.days.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewPool({
                            ...newPool,
                            days: [...newPool.days, day]
                          });
                        } else {
                          setNewPool({
                            ...newPool,
                            days: newPool.days.filter(d => d !== day)
                          });
                        }
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Maximum Members:</label>
              <input
                type="number"
                min="2"
                max="8"
                value={newPool.maxMembers}
                onChange={(e) => setNewPool({ ...newPool, maxMembers: parseInt(e.target.value) })}
              />
            </div>
            <button className="submit-btn" onClick={handleCreatePool}>
              Create Pool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinNewPool; 