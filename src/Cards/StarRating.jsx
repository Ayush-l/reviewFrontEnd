import React, { useState } from "react";
import "../CSS/StarRating.css";

export default function StarRating({
  totalStars = 5,
  onRate = 0,
  onChange,
  readOnly = false,
  size = "md"
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className={`star-rating ${size} ${readOnly ? "readonly" : ""}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= (hover || Math.round(onRate));

        return (
          <span
            key={index}
            className={`star ${filled ? "filled" : ""}`}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange?.(starValue)}
          >
            ★
          </span>
        );
      })}

      <span className="rating-text">{onRate.toFixed(1)}</span>
    </div>
  );
}
