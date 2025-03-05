import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("error"); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setMessage("Registration successful!");
      setSeverity("success"); 
      setOpenSnackbar(true);

      setTimeout(() => {navigate("/login"); },2000)
      
    } catch (err) {
      
      setMessage(err.response.data.errorResponse.errmsg || "An error occurred");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <button onClick={() => navigate("/login")} className="register-button">Go to Login</button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
