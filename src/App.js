import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import BookRide from './pages/BookRide';
import MyRides from './pages/MyRides';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WomenSafety from './pages/WomenSafety';
import RideHistory from './pages/RideHistory';
import EmergencySOS from './pages/EmergencySOS';
import ShareRideDetails from './pages/ShareRideDetails';
import UpgradePlan from './pages/UpgradePlan';
import JoinNewPool from './pages/JoinNewPool';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookRide />} />
            <Route path="/myrides" element={<MyRides />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/safety" element={<WomenSafety />} />
            <Route path="/history" element={<RideHistory />} />
            <Route path="/sos" element={<EmergencySOS />} />
            <Route path="/share-ride" element={<ShareRideDetails />} />
            <Route path="/upgrade" element={<UpgradePlan />} />
            <Route path="/join-pool" element={<JoinNewPool />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;