import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import LandingPage from "./components/LandingPage.js";
import DashBoard from "./components/DashBoard.js";
import useAuthStore from "./store/auth.js";

function App() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  return (
      <div className="App">
        {token ? (
          <>
            <DashBoard logout={logout} />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard logout={logout} />} />
          </Routes>
        )}
      </div>
  );
}

export default App;
