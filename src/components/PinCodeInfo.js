import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './PinCodeInfo.css';

const PinCodeInfo = () => {
  const locations = [
    { name: 'Katwa', pinCode: '713130' },
    { name: 'Khajurdihi', pinCode: '713150' }
  ];

  return (
    <div className="pin-code-container">
      <h2>Available Areas</h2>
      <div className="locations-grid">
        {locations.map((location, index) => (
          <div key={index} className="location-card">
            <h3>{location.name}</h3>
            <div className="pin-code">
              <span className="value">{location.pinCode}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating WhatsApp Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 12px 35px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
      }}
      onClick={() => window.open('https://wa.me/916295932396', '_blank')}
      >
        <FaWhatsapp />
      </div>
    </div>
  );
};

export default PinCodeInfo;
