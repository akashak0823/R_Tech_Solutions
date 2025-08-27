// src/admin/components/Sidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Styles/admin/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <img src="/assets/Logo.png" alt="RTech Logo" />
        <span>RTech Admin</span>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/admin/dashboard"
          className={isActive("/admin/dashboard") ? "active" : ""}
        >
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>

        <Link
          to="/admin/products"
          className={isActive("/admin/products") ? "active" : ""}
        >
          <i className="fas fa-box-open"></i> Products
        </Link>

        <Link
          to="/admin/services"
          className={isActive("/admin/services") ? "active" : ""}
        >
          <i className="fas fa-cogs"></i> Services
        </Link>

        <Link
          to="/admin/testimonials" // ✅ Matches route
          className={isActive("/admin/testimonials") ? "active" : ""} // ✅ Matches the link path
        >
          <i className="fas fa-comment-dots"></i> Testimonials
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
