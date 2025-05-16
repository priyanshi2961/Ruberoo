import React, { useState, useEffect } from 'react';
import { Share2, MapPin, Clock, Car, Users, X } from 'lucide-react';
import './ShareRideDetails.css';

const ShareRideDetails = () => {
  const [activeRide, setActiveRide] = useState(null);
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  useEffect(() => {
    // Load trusted contacts from localStorage
    const loadContacts = () => {
      const contacts = JSON.parse(localStorage.getItem('trustedContacts')) || [];
      setTrustedContacts(contacts);
    };

    // Load active ride from localStorage
    const loadActiveRide = () => {
      const session = JSON.parse(localStorage.getItem('session'));
      if (!session) return;

      const allRides = JSON.parse(localStorage.getItem('rides')) || [];
      const activeRide = allRides.find(
        ride => ride.userId === session.user.email && ride.status === 'scheduled'
      );

      setActiveRide(activeRide);
    };

    loadContacts();
    loadActiveRide();
  }, []);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;

    const updatedContacts = [...trustedContacts, newContact];
    localStorage.setItem('trustedContacts', JSON.stringify(updatedContacts));
    setTrustedContacts(updatedContacts);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddContact(false);
  };

  const handleShareRide = (contact) => {
    if (!activeRide) return;

    // In a real app, this would send an SMS or notification
    console.log(`Sharing ride details with ${contact.name} at ${contact.phone}`);
    console.log('Ride Details:', {
      from: activeRide.from,
      to: activeRide.to,
      date: activeRide.date,
      time: activeRide.time,
      type: activeRide.type,
      driver: activeRide.driver
    });

    alert(`Ride details shared with ${contact.name}!`);
  };

  return (
    <div className="share-container">
      <div className="share-header">
        <h1>Share Ride Details</h1>
        <p>Share your ride information with trusted contacts</p>
      </div>

      {activeRide ? (
        <div className="active-ride">
          <h2>Current Ride</h2>
          <div className="ride-details">
            <div className="detail-row">
              <MapPin size={20} />
              <div>
                <p>From: {activeRide.from}</p>
                <p>To: {activeRide.to}</p>
              </div>
            </div>
            <div className="detail-row">
              <Clock size={20} />
              <p>{activeRide.date} at {activeRide.time}</p>
            </div>
            <div className="detail-row">
              {activeRide.type === 'pool' ? <Users size={20} /> : <Car size={20} />}
              <p>{activeRide.type === 'pool' ? 'Pool Ride' : 'Regular Ride'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-active-ride">
          <p>No active ride found</p>
        </div>
      )}

      <div className="trusted-contacts">
        <div className="contacts-header">
          <h2>Trusted Contacts</h2>
          <button 
            className="add-contact-btn"
            onClick={() => setShowAddContact(true)}
          >
            Add Contact
          </button>
        </div>

        <div className="contacts-list">
          {trustedContacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <p className="relationship">{contact.relationship}</p>
              </div>
              <button 
                className="share-btn"
                onClick={() => handleShareRide(contact)}
                disabled={!activeRide}
              >
                <Share2 size={20} />
                Share Ride
              </button>
            </div>
          ))}
        </div>
      </div>

      {showAddContact && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowAddContact(false)}>
              <X size={20} />
            </button>
            <h2>Add Trusted Contact</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
            </div>
            <button className="submit-btn" onClick={handleAddContact}>
              Add Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRideDetails; 