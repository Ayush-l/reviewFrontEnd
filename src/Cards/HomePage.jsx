import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our App</h1>
      <div className="card-grid">
        {/* Leaderboard Card */}
        <div
          className="home-card"
          onClick={() => navigate("/product/LeaderBoard/1")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
            alt="Leaderboard"
            className="card-icon"
          />
          <h2>Leaderboard</h2>
          <p>View the top-performing items or users.</p>
        </div>

        {/* Search Menu Card */}
        <div
          className="home-card"
          onClick={() => navigate("/product/SearchMenu")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="Search"
            className="card-icon"
          />
          <h2>Search Menu</h2>
          <p>Find your desired products or restaurants easily.</p>
        </div>
      </div>
    </div>
  );
}
