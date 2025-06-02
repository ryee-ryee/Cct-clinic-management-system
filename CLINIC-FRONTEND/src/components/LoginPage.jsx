import React, { useState } from "react";
import './Main.css';
import logo from "../assets/logo.png";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (email === "admin@citycollegeoftagaytay.edu.ph" && password === "1234") {
    onLogin();
  } else {
    alert("Invalid email or password");
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">CCT Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <br />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}