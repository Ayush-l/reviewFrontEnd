import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import "../CSS/DishCard2.css";

const DishCard2 = ({ src, name, rating, idDish, id }) => {
  const navigate = useNavigate();

  const goToDish = () => {
    navigate(`${idDish}`);
  };

  const goToReviews = (e) => {
    e.stopPropagation();
    console.log("Navigating to reviews for dish:", idDish, "in cafe:", id);
    navigate(`/dishreviews/${id}/${idDish}`);
  };

  return (
    <div className="dish-card" onClick={goToDish}>
      <div className="dish-image-wrapper">
        <img src={src} alt={name} />
      </div>

      <div className="dish-info">
        <h3 className="dish-name">{name}</h3>

        <div className="dish-rating">
          <StarRating onRate={rating} readOnly />
        </div>

        <button className="see-reviews-btn" onClick={goToReviews}>
          See Reviews
        </button>
      </div>
    </div>
  );
};

export default DishCard2;
