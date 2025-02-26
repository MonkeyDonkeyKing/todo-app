import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import useAuthStore from "./store/auth";

function App() {
  const [view, setView] = useState("login");
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  if (token) {
    return (
      <div className="App">
        <h2>Erfolgreich eingeloggt!</h2>
        <img
          src="https://via.placeholder.com/300x200.png?text=Erfolgreich+eingeloggt"
          alt="Erfolgreich eingeloggt"
        />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="toggle-buttons">
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Register</button>
      </div>
      <div className="form-container">
        {view === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default App;
