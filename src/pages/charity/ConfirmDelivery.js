import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveDeliveryConfirmation, getDeliveryConfirmation } from '../../utils/localStorageHelpers';
import '../../styles/charity/ConfirmDelivery.css';

const ConfirmDelivery = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [beneficiaryPhones, setBeneficiaryPhones] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = getDeliveryConfirmation(requestId);
    if (saved) {
      setBeneficiaryPhones(saved.beneficiaryPhones || '');
      setDriverPhone(saved.driverPhone || '');
      setPhotos(saved.photos || []);
      setNotes(saved.notes || '');
    }
  }, [requestId]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos];
    
    files.forEach(file => {
      if (newPhotos.length < 3) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result);
          setPhotos([...newPhotos]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!beneficiaryPhones.trim()) {
      setError('Please enter beneficiary phone number(s)');
      return;
    }
    if (!driverPhone.trim()) {
      setError('Please enter driver phone number');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      saveDeliveryConfirmation(requestId, {
        beneficiaryPhones,
        driverPhone,
        photos,
        notes
      });
      setIsSubmitting(false);
      navigate(`/rating/${requestId}`);
    }, 1000);
  };

  return (
    <div className="confirm-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="confirm-card">
        <h2>Confirm Food Delivery</h2>
        <p className="subtitle">Please provide delivery details below</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Beneficiary Phone Number(s) *</label>
            <input
              type="text"
              value={beneficiaryPhones}
              onChange={(e) => setBeneficiaryPhones(e.target.value)}
              placeholder="e.g., 05xxxxxxxx, 05xxxxxxxx"
            />
            <small>Separate multiple numbers with commas</small>
          </div>

          <div className="input-group">
            <label>Delivery Driver/Volunteer Phone *</label>
            <input
              type="tel"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              placeholder="05xxxxxxxx"
            />
          </div>

          <div className="input-group">
            <label>Upload Delivery Photos (Up to 3)</label>
            <div className="image-upload-section">
              <div className="photo-preview-grid">
                {photos.map((photo, idx) => (
                  <div key={idx} className="photo-preview">
                    <img src={photo} alt={`Preview ${idx}`} />
                    <button type="button" className="remove-photo" onClick={() => removePhoto(idx)}>✕</button>
                  </div>
                ))}
                {photos.length < 3 && (
                  <label className="upload-placeholder">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <span>+</span>
                    <p>Add Photo</p>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Distribution Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="How many people were served? Any issues or feedback?"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Delivery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDelivery;