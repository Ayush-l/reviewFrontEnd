import React, { useState } from "react";
import "../CSS/Auth.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: formData.email.toLowerCase(),
      password: formData.password,
      role: formData.role,
    };

    fetch("https://reviewbackend-990d.onrender.com/create/gettoken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) return res.text();
        throw new Error("Invalid credentials");
      })
      .then((data) => {
        localStorage.setItem("jwtTokenPauriWebSite", data);
        localStorage.setItem("role", formData.role);

        if (formData.role === "owner") navigate("/cafedashboard");
        else if (formData.role === "admin") navigate("/adminpanel");
        else navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="role-cards">
            <div
              className={`role-card ${
                formData.role === "user" ? "selected" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "user" }))
              }
            >
              <i className="fa fa-user" /> <span>User</span>
            </div>

            <div
              className={`role-card ${
                formData.role === "owner" ? "selected" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "owner" }))
              }
            >
              <i className="fa fa-store" /> <span>Owner</span>
            </div>

            <div
              className={`role-card ${
                formData.role === "admin" ? "selected" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "admin" }))
              }
            >
              <i className="fa fa-shield-alt" /> <span>Admin</span>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;