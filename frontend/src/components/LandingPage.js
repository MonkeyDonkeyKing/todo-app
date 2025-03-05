import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Task Manager</h1>
      <p className="landing-subtitle">Manage your tasks efficiently with this sleek dashboard</p>
      <div className="button-container">
        <Link to="/login" className="button login-button">Login</Link>
        <Link to="/register" className="button register-button">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
