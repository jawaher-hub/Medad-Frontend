import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDonations, categories } from '../../data/mockDonations';
import '../../styles/charity/BrowseFeed.css';

const BrowseFeed = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDonations(mockDonations);
      setFilteredDonations(mockDonations);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let results = donations;
    if (searchTerm) {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }
    setFilteredDonations(results);
  }, [searchTerm, selectedCategory, donations]);

  const handleCardClick = (donationId) => {
    navigate(`/donation/${donationId}`);
  };

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <p>Loading available donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1 className="browse-title">Food Donations Near You</h1>
        <p className="browse-subtitle">Browse and request surplus food from local restaurants</p>
      </div>

      <div className="browse-search-section">
        <input
          type="text"
          placeholder="Search by food name or restaurant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="browse-search-input"
        />
      </div>

      <div className="browse-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="browse-results-count">
        Found {filteredDonations.length} donations
      </div>

      <div className="browse-grid">
        {filteredDonations.map(donation => (
          <div key={donation.id} className="donation-card" onClick={() => handleCardClick(donation.id)}>
            <img src={donation.image} alt={donation.title} className="donation-card-image" />
            <div className="donation-card-content">
              <h3 className="donation-card-title">{donation.title}</h3>
              <p className="donation-card-restaurant">{donation.restaurantName}</p>
              <div className="donation-card-details">
                <span>🍽️ {donation.quantity}</span>
                <span>📍 {donation.distance}</span>
              </div>
              <div className="donation-card-expiry">
                ⏰ Expires: {new Date(donation.expiryDate).toLocaleString('en-US')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <div className="auth-form" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>No donations found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseFeed;