import React, { useEffect, useState } from "react";
import "../Styles/admin/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaCogs, FaUsers, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    products: 0,
    services: 0,
    users: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [productsRes, servicesRes, usersRes] = await Promise.all([
        axios.get("https://r-tech-backend.onrender.com/api/products"),
        axios.get("https://r-tech-backend.onrender.com/api/services"),
        axios.get("https://r-tech-backend.onrender.com/api/users"), // Ensure this exists
      ]);

      setCounts({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        users: usersRes.data.length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const stats = [
    {
      title: "Total Products",
      count: counts.products,
      color: "#007bff",
      icon: <FaBoxOpen />,
      route: "/admin/products",
    },
    {
      title: "Total Services",
      count: counts.services,
      color: "#28a745",
      icon: <FaCogs />,
      route: "/admin/services",
    },
    {
      title: "Total Users",
      count: counts.users,
      color: "#ffc107",
      icon: <FaUsers />,
      route: "/admin/users",
    },
  ];

  return (
    <div className="dashboard">
      {/* Top Bar */}
      <div className="dashboard-topbar">
        <h2>Dashboard Overview</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Stat Cards */}
      <div className="dashboard-cards">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            style={{ borderLeftColor: item.color, cursor: "pointer" }}
            onClick={() => navigate(item.route)}
          >
            <div className="dashboard-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="dashboard-text">
              <h3>{item.title}</h3>
              <p>{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
