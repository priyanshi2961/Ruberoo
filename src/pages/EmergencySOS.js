import React, { useState, useEffect } from 'react';
import { Shield, Phone, MapPin, AlertTriangle, X } from 'lucide-react';
import './EmergencySOS.css';

const EmergencySOS = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [calledPerson, setCalledPerson] = useState('');
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  useEffect(() => {
    // Load emergency contacts from localStorage
    const loadContacts = () => {
      const contacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
      setEmergencyContacts(contacts);
    };

    loadContacts();
  }, []);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;

    const updatedContacts = [...emergencyContacts, newContact];
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
    setEmergencyContacts(updatedContacts);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddContact(false);
  };

  const handleCall = (contact) => {
    setCalledPerson(contact.name);
    setShowCallPopup(true);
    setTimeout(() => {
      setShowCallPopup(false);
      setCalledPerson('');
    }, 3000);
  };

  const handleSOS = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // Send SOS to all emergency contacts
        emergencyContacts.forEach(contact => {
          // In a real app, this would send an SMS or make a call
          console.log(`Sending SOS to ${contact.name} at ${contact.phone}`);
          console.log(`Location: https://www.google.com/maps?q=${latitude},${longitude}`);
        });

        alert('SOS signal sent to all emergency contacts!');
      });
    }
  };

  return (
    <div className="sos-container">
      <div className="sos-header">
        <h1>Emergency SOS</h1>
        <p>Quick access to emergency services and contacts</p>
      </div>

      <div className="sos-actions">
        <button className="sos-button" onClick={handleSOS}>
          <AlertTriangle size={24} />
          Send SOS Signal
        </button>
      </div>

      {showCallPopup && (
        <div className="call-popup">
          <p>Calling {calledPerson}...</p>
        </div>
      )}

      <div className="emergency-contacts">
        <div className="contacts-header">
          <h2>Emergency Contacts</h2>
          <button 
            className="add-contact-btn"
            onClick={() => setShowAddContact(true)}
          >
            Add Contact
          </button>
        </div>

        <div className="contacts-list">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <p className="relationship">{contact.relationship}</p>
              </div>
              <button className="call-btn" onClick={() => handleCall(contact)}>
                <Phone size={20} />
                Call
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
            <h2>Add Emergency Contact</h2>
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

export default EmergencySOS; 