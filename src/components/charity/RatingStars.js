import React from 'react';

const RatingStars = ({ rating, setRating, interactive = false }) => {
  const handleClick = (value) => {
    if (interactive && setRating) {
      setRating(value);
    }
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;