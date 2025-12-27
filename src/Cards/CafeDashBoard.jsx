import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CafeDashboard.css";

/* ⭐ Star Rating Component */
const StarRating = ({ rating, max = 5 }) => {
  return (
    <div className="star-rating">
      {[...Array(max)].map((_, i) => {
        const value = i + 1;

        if (rating >= value) {
          return <span key={i} className="star full">★</span>;
        } else if (rating >= value - 0.5) {
          return <span key={i} className="star half">★</span>;
        } else {
          return <span key={i} className="star empty">★</span>;
        }
      })}
    </div>
  );
};

const CafeDashboard = () => {
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetch("https://reviewbackend-990d.onrender.com/auth/cafe/getCafe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => res.json())
      .then((cafe)=>{
        setCafe(cafe);
        let reviewsCount = 0;
        for(let cafeDish of cafe.dishes){
          for(let count of cafeDish.ratingCount) reviewsCount += count;
        }
        setTotalReviews(reviewsCount);
      })
      .catch(() => navigate("/createcafe"));
  }, []);

  if (!cafe) return null;


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Cafe Dashboard</h1>

      {/* OVERVIEW */}
      <div className="overview-card">
        <div>
          <h2>{cafe.name}</h2>
          <p className="address"><i className="fa-solid fa-location-dot"></i>{cafe.address}</p>
        </div>

        <div className="stats">
          <div className="stat">
            <StarRating rating={cafe.cafeRating} />
            <span className="stat-label">Overall Rating</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalReviews}</span>
            <span className="stat-label"> Total Reviews</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="actions-grid">
        <button onClick={() => navigate("/edit-cafe-name")}>Edit Name</button>
        <button onClick={() => navigate("/manage-images")}>Manage Images</button>
        <button onClick={() => navigate("/add-dishes")}>Add Dishes</button>
      </div>

      {/* IMAGES */}
      <div className="section">
        <h3>Cafe Images</h3>
        <div className="image-grid">
          {cafe.images.map((img, idx) => (
            <img key={idx} src={img} alt="cafe" />
          ))}
        </div>
      </div>

      {/* DISHES */}
      <div className="section">
        <h3>Dishes</h3>
        <div className="dish-grid">
          {cafe.dishes.map((dish, idx) => (
            <div key={idx} className="dish-card">
              <img src={dish.url} alt={dish.name} />
              <h4>{dish.name}</h4>
              <StarRating rating={dish.rating || 0} />
              <p>{(dish.ratingCount !== undefined)?dish.ratingCount[idx][0]+dish.ratingCount[idx][1]+dish.ratingCount[idx][2]+dish.ratingCount[idx][3]+dish.ratingCount[idx][4]:0} reviews</p>
              <button
                className="reviews-btn"
                onClick={() => navigate(`/dishreviews/${cafe.id}/${dish.name}`)}
              >
                View Reviews
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CafeDashboard;