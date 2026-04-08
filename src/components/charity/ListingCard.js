import React from 'react';
import '../src/styles/charity/BrowseFeed.css';

const ListingCard = ({ donation, onClick }) => {
  return (
    <div className="listing-card" onClick={onClick}>
      <img src={donation.image} alt={donation.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{donation.title}</h3>
        <p className="card-restaurant">{donation.restaurantName}</p>
        <div className="card-details">
          <span className="card-quantity">🍽️ {donation.quantity}</span>
          <span className="card-distance">📍 {donation.distance}</span>
        </div>
        <div className="card-expiry">
          ⏰ Expires: {new Date(donation.expiryDate).toLocaleString()}
        </div>
        <div className="card-category">{donation.category}</div>
      </div>
    </div>
  );
};

export default ListingCard;