import React, { useEffect, useState } from "react";
import "../CSS/DishReviews.css";
import { useNavigate } from "react-router-dom";

const DishReviewsPage = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("https://reviewbackend-990d.onrender.com/auth/cafe/getCafe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => setDishes(data.dishes || []))
      .catch(() => navigate("/cafedashboard"));
  }, []);

  const totalReviews = (ratingCount = []) =>
    ratingCount.reduce((a, b) => a + b, 0);

  return (
    <div className="dish-reviews-container">
      <h1 className="page-title">Dish Reviews</h1>

      <div className="dishes-grid">
        {dishes && dishes.map((dish, idx) => {
          const total = totalReviews(dish.ratingCount);

          return (
            <div key={idx} className="dish-card">
              <img src={dish.url} alt={dish.name} className="dish-img" />

              <h2 className="dish-name">
                {dish.name.charAt(0).toUpperCase() + dish.name.slice(1)}
              </h2>

              {/* Rating Bars */}
              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = dish.ratingCount?.[star - 1] || 0;
                  const percent = total === 0 ? 0 : (count / total) * 100;

                  return (
                    <div key={star} className="rating-bar-row">
                      <span className="star-label">{star}★</span>

                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <span className="count">{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Reviews */}
              <div className="reviews-list">
                {dish.reviews && {dish.reviews?.length === 0 ? (
                  <p className="no-reviews">No reviews yet</p>
                ) : (
                  dish.reviews.map((r, i) => (
                    <div key={i} className="review-card">
                      <strong>{r.user}</strong> ({r.rating}★)
                      <p>{r.comment}</p>
                    </div>
                  ))
                )}}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishReviewsPage;