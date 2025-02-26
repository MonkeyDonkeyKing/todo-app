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
      <input type="text" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;