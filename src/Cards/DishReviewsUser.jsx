import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/DishReviewsUser.css";
import StarRating from "./StarRating";

const DishReviews = () => {
  const { cafeId, dishName } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(
      `https://reviewbackend-990d.onrender.com/getcafe/reviews/${dishName}/${cafeId}/${page}`
    )
      .then((res) => res.json())
      .then((res)=>{
        setReviews(res.content)
        setTotalPages(res.totalPages)
        if(page >= res.totalPages && res.totalPages > 0){
          setPage(res.totalPages - 1)
        }
      })
      .catch(console.error);
  }, [cafeId, dishName, page]);

  return (
    <div className="reviews-page">
      {/* HEADER */}
      <div className="reviews-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>{dishName}</h1>
        <p className="subtitle">Customer Reviews</p>
      </div>

      {/* REVIEWS LIST */}
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review, idx) =>(
              <div key={idx} className="review-card">
                <div className="review-top">
                  <strong>{review.user.firstName+" "+review.user.lastName}</strong>
                  <StarRating onRate={review.rating} readOnly />
                </div>
                <p className="comment">{review.review}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* ADD REVIEW */}
      {localStorage.getItem("role") === "user" && (
        <button
          className="add-review-btn"
          onClick={() =>
            navigate(`/add-review/${cafeId}/${dishName}`)
          }
        >
          Add Review
        </button>
      )}
    </div>
  );
};

export default DishReviews;