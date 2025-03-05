import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

const DashBoard = ({ logout }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);  
  const fetchUsername = useAuthStore((state) => state.fetchUsername);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {  
          await fetchUsername(); 
        }
      } catch (err) {
        console.error("Error fetching username:", err);
        setError("Failed to fetch username.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, username, fetchUsername]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <header>
          <h1>Welcome, {username}!</h1>
          <p>This is a protected area that only logged-in users can access.</p>
        </header>

        <section className="stats">
          <h3>Dashboard Stats</h3>
          <div className="stats-container">
            <div className="stat">
              <h4>Total Visits</h4>
              <p>1,500</p>
            </div>
            <div className="stat">
              <h4>Active Users</h4>
              <p>100</p>
            </div>
            <div className="stat">
              <h4>Messages</h4>
              <p>25</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashBoard;