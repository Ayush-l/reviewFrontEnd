import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import "../CSS/DishCard2.css";

const DishCard2 = ({ src, name, rating, idDish, id ,reviews}) => {
  const navigate = useNavigate();


  const goToReviews = (e) => {
    e.stopPropagation();
    navigate(`/dishreviews/${id}/${idDish}`);
  };

  return (
    
    <div className="dish-card">
      <div className="dish-image-wrapper">
        <img src={src} alt={name} />
      </div>

      <div className="dish-info">
        <h3 className="dish-name">{name}</h3>

        <div className="dish-rating">
          <StarRating onRate={rating} readOnly />
        </div>

        {reviews > 0 && (
          <button className="add-reviews-btn" onClick={goToReviews}>
            Add Review
          </button>
        )}
      </div>
    </div>
  );
};

export default DishCard2;
