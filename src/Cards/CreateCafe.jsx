import React, { useState } from "react";
import "../CSS/CreateCafe.css";
import { useNavigate } from "react-router-dom";

const CreateCafe = () => {
  const [cafeName, setCafeName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://reviewbackend-990d.onrender.com/auth/cafe/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cafe: {
            name: cafeName,
            address: address,
          },
          authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Cafe registration failed");
      }

      alert("Cafe Registered!");
      navigate("/cafeDashBoard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while registering the cafe.");
    }
  };

  return (
    <div className="cafe-page">
      <div className="cafe-card">
        <h2 className="cafe-title">Register Your Cafe</h2>
        <p className="cafe-subtitle">
          Add your cafe to the Pauri review website.
        </p>

        <form className="cafe-form" onSubmit={handleSubmit}>
          {/* Cafe Name */}
          <div className="form-group">
            <label htmlFor="cafeName" className="cafe-label">
              Cafe Name
            </label>
            <input
              id="cafeName"
              type="text"
              className="cafe-input"
              placeholder="Enter cafe name"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              required
            />
          </div>

          {/* Cafe Address */}
          <div className="form-group">
            <label htmlFor="cafeAddress" className="cafe-label">
              Cafe Address
            </label>
            <textarea
              id="cafeAddress"
              className="cafe-input"
              placeholder="Enter cafe address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              required
            />
          </div>

          <button type="submit" className="cafe-btn">
            Register Cafe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCafe;