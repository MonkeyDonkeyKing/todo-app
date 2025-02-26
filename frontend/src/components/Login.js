import React from "react";
import { useState } from "react";
import useAuthStore from "../store/auth.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Benutzername" data-testid="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Passwort" data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" data-testid="submit">Login</button>
    </form>
  );
};

export default Login;