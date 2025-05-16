import React from 'react';
import { Shield, Users, Car, Clock } from 'lucide-react';
import './PageStyles.css';

const About = () => {
  return (
    <div className="page about-page">
      <div className="about-header">
        <h1>About Ruberoo</h1>
        <p className="tagline">Connecting journeys, ensuring safety, building community</p>
      </div>      
      <div className="contributors-section">
        <h2>Our Team</h2>
        <div className="contributors-grid">
          <div className="contributor-card">
            <h3>Mitali Dhumal</h3>
          </div>
          <div className="contributor-card">
            <h3>Shaurya Belgaonkar</h3>
          </div>
          <div className="contributor-card">
            <h3>Priyanshi Mehta</h3>
          </div>
          <div className="contributor-card">
            <h3>Anish Patil</h3>
          </div>
        </div>
      </div>

      <div className="about-sections">
        <div className="about-section">
          <h2><Car className="section-icon" /> Our Mission</h2>
          <p>
            Ruberoo is a revolutionary peak-time ride pooling platform that connects passengers headed in similar directions.
            We're committed to making transportation safer, more efficient, and accessible for everyone while reducing the carbon footprint
            through shared rides.
          </p>
        </div>

        <div className="about-section">
          <h2><Shield className="section-icon" /> Safety First</h2>
          <p>
            We prioritize passenger safety with our dedicated women's safety features, real-time tracking,
            and verified driver partnerships. Our unique safety pools and women-only ride options ensure
            a secure travel experience for all passengers, especially women travelers.
          </p>
        </div>

        <div className="about-section">
          <h2><Users className="section-icon" /> Community Driven</h2>
          <p>
            Ruberoo builds more than just a ride-sharing platform; we create communities of trusted co-passengers.
            Our pool system helps you connect with fellow travelers on similar routes, making daily commutes more
            social and cost-effective.
          </p>
        </div>

        <div className="about-section">
          <h2><Clock className="section-icon" /> Smart Solutions</h2>
          <p>
            From flexible pool timings to instant ride booking, we've designed our platform to adapt to your schedule.
            Our smart matching algorithm ensures you find the perfect ride or pool that fits your timing and route
            preferences.
          </p>
        </div>
      </div>

      <div className="about-footer">
        <h3>Join the Ruberoo Community</h3>
        <p>
          Together, we're building a future where transportation is not just about reaching destinations,
          but about creating connections, ensuring safety, and making every journey count.
        </p>
      </div>
    </div>
  );
};

export default About;
