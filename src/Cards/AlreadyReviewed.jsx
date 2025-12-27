import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/AlreadyReviewed.css";

const AlreadyReviewed = () => {
  const navigate = useNavigate();
  const { cafeId, dishName } = useParams();

  return (
    <div className="already-reviewed-page">
      <div className="already-reviewed-card">
        <div className="icon">✔</div>

        <h1>Review Already Submitted</h1>

        <p className="message">
          You have already reviewed the dish
          <span className="highlight"> {dishName}</span>.
        </p>

        <p className="sub-message">
          Each dish can be reviewed only once for a cafe.
        </p>

        <div className="button-group">
          <button className="primary-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyReviewed;
