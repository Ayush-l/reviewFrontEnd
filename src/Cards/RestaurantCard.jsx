import React from "react";
import StarRating from "./StarRating";
import "../CSS/RestaurantCard.css";
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ name, rating, id ,srcImg}) {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/card/${id}`)}
    >
      <img
        src={srcImg}
        alt={name}
      />

      <div className="card-content">
        <h2>{name}</h2>
        <StarRating onRate={rating} />
      </div>
    </div>
  );
}
