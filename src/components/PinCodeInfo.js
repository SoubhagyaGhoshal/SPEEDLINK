import React from 'react';
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
    </div>
  );
};

export default PinCodeInfo;
