import React, { useState } from "react";
import "../CSS/Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isOwner: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email.toLowerCase(),
      password: formData.password,
      role: "user",
    };

    fetch("https://reviewbackend-990d.onrender.com/create/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Signup successful!");
          navigate("/login");
        } else {
          alert("Account already exists or signup failed");
          navigate("/login");
        }
      })
      .catch((err) =>{
        navigate("/login");
        localStorage.removeItem("jwtTokenPauriWebSite");
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p>Join the Café Community — as a User or Owner ☕</p>

        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />


          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
