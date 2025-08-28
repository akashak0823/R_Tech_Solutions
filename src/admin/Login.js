// src/pages/admin/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminToken", "true");
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/admin/dashboard"),
      });
    } else {
      toast.error("Invalid username or password", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="admin-login-container">
      {/* 🔥 Background Video */}
      <video className="login-bg-video" autoPlay muted loop playsInline>
       <source src="/assets/Animations/Login.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>

      {/* 🔒 Login Form */}
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <img
          src="/assets/Logo.png"
          alt="Logo"
          className="admin-login-logo"
        />

        <h2>Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* 🍞 Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;

