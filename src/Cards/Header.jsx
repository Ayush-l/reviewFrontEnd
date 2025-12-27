import React from "react";
import "../CSS/Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <h1>Restaurant / Cafe Review Website — Pauri</h1>
        <p>Discover • Review • Share your food experience</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
