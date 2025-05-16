import React from 'react';
import './RideCard.css';

const RideCard = ({ pickup, drop, time, womenOnly }) => {
  return (
    <div className="ride-card">
      <h4>{pickup} ➝ {drop}</h4>
      <p>⏰ {time}</p>
      {womenOnly && <span className="badge-women">🚺 Women-only Ride</span>}
    </div>
  );
};

export default RideCard;
