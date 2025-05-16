import React from 'react';
import './PageStyles.css';
import { CarFront, Clock, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="page home-page enhanced-home">
      <div className="home-content">
        <h1><CarFront size={40} /> Welcome to <span className="brand">Ruberoo</span></h1>
        <p className="home-description">
          Beat the surge and ride smart with intelligent peak-time pooling. <br />
          Schedule your ride in advance and enjoy faster, affordable travel.
        </p>
        <div className="feature-cards">
          <div className="feature-card">
            <MapPin size={30} />
            <h4>Flexible Pickups</h4>
            <p>Choose from multiple nearby pickup points for faster matches.</p>
          </div>
          <div className="feature-card">
            <Clock size={30} />
            <h4>Time-based Pooling</h4>
            <p>Smart time-slot matching for optimal pool efficiency.</p>
          </div>
          <div className="feature-card">
            <CarFront size={30} />
            <h4>Cheaper Commutes</h4>
            <p>Save money by sharing rides during peak hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
