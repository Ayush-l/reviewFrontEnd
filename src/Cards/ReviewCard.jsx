import React from "react";
import "../CSS/ReviewCard.css";

export default function ReviewCard({ name, rating, comment, image }) {
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < count ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={image || "https://cdn-icons-png.flaticon.com/512/219/219986.png"}
          alt={name}
          className="review-avatar"
        />
        <div className="review-user-info">
          <h3 className="review-name">{name}</h3>
        </div>
      </div>

      <div className="review-rating">{renderStars(rating)}</div>

      <p className="review-comment">“{comment}”</p>
    </div>
  );
}
