import React, { useState } from "react";
import "../styles/Auth.css";
import { useAuth } from "./AuthContext"; // Импортируйте useAuth

export default function AuthLogin() {
  const { setAuthenticated } = useAuth(); // Используйте setAuthenticated из контекста
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setAuthenticated(true);
    } else if (username === "user" && password === "user") {
      setAuthenticated(false);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h1>Auth</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
      </div>
      <button onClick={handleLogin} className="auth-button">
        Login
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}
