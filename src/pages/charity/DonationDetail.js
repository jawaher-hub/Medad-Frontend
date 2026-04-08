import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockDonations } from '../../data/mockDonations';
import { addRequestedDonation, isDonationRequested } from '../../utils/localStorageHelpers';
import '../../styles/charity/DonationDetail.css';

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [requested, setRequested] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const found = mockDonations.find(d => d.id === id);
      setDonation(found);
      setIsLoading(false);
      const alreadyRequested = isDonationRequested(id);
      setRequested(alreadyRequested);
    }, 300);
  }, [id]);

  const handleRequest = () => {
    addRequestedDonation(id);
    setRequested(true);
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <p>Loading donation details...</p>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <p>Donation not found</p>
          <button onClick={() => navigate('/browse')} className="submit-btn" style={{ marginTop: '20px' }}>Back to Browse</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/browse')} className="back-btn">← Back to Browse</button>
      
      <div className="detail-card">
        <div className="detail-image-section">
          <img src={donation.image} alt={donation.title} className="detail-main-image" />
        </div>
        
        <div className="detail-info-section">
          <h1 className="detail-title">{donation.title}</h1>
          <p className="detail-restaurant">{donation.restaurantName}</p>
          <p className="detail-address">{donation.restaurantAddress}</p>
          
          <div className="detail-meta">
            <p><strong>📦 Quantity:</strong> {donation.quantity}</p>
            <p><strong>📍 Distance:</strong> {donation.distance}</p>
            <p><strong>⏰ Expires:</strong> {new Date(donation.expiryDate).toLocaleString('en-US')}</p>
          </div>
          
          <div className="safety-card">
            <h3>⚠️ Safety Information</h3>
            <p>{donation.safetyNotes}</p>
          </div>
          
          <div className="restaurant-contact">
            <h3>🏪 Restaurant Contact</h3>
            <p>{donation.restaurantPhone}</p>
          </div>
          
          {!requested ? (
            <button className="submit-btn" onClick={() => setShowModal(true)}>
              Request This Donation
            </button>
          ) : (
            <div className="requested-badge">✓ Request Sent - Awaiting Approval</div>
          )}
        </div>
      </div>
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Request</h3>
            <p>Are you sure you want to request this donation?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleRequest}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetail;