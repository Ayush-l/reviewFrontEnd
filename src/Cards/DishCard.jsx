import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import "../CSS/DishCard.css";

const DishCard = ({ src, name, rating, idDish ,id}) => {
  const navigate = useNavigate();

  return (
    <div className="dish-card" onClick={() => navigate(`/add-review/${id}/${idDish}`)}>
      <div className="dish-image-wrapper">
        <img src={src} alt={name} />
      </div>

      <div className="dish-info">
        <h3 className="dish-name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>

        <div className="dish-rating">
          <StarRating rating={rating} />
          <span className="rating-number">
            {rating ? rating.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
