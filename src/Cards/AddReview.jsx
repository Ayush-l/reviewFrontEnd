import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/AddReview.css";

/* Interactive Star Rating */
const StarInput = ({ rating, setRating }) => {
  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={val}
          className={`star ${val <= rating ? "active" : ""}`}
          onClick={() => setRating(val)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const AddReview = () => {
  const navigate = useNavigate();
  const { cafeId, dishName } = useParams(); // if routed like /add-review/:cafeId/:dishName

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res=await fetch("http://localhost:8080/review/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cafe:{
            id: cafeId
          },
          review:{
            rating: rating,
            review: comment,
          },
          dish:{
            name: dishName
          },
          authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
        }),
      });
      if(!res.ok) throw new Error("Failed to submit review");
      alert("Review submitted successfully!");
      navigate(-1);
    }
    catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page">
      <div className="review-card">
        <h1>Add Review</h1>
        <p className="subtitle">
          Share your experience to help others
        </p>

        <form onSubmit={handleSubmit}>
          <label>Rating</label>
          <StarInput rating={rating} setRating={setRating} />

          <label>Comment</label>
          <textarea
            placeholder="Write your experience here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="button-row">
            <button
              type="button"
              className="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
