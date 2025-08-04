import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/Logo.png";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { servicesData } from "../utils/servicesData";
import productsData from "../utils/productsData";

const groupedProducts = productsData.reduce((acc, product) => {
  const { category } = product;
  if (!acc[category]) acc[category] = [];
  acc[category].push(product);
  return acc;
}, {});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setActiveCategory(null);
  };

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
    setActiveCategory(null);
  };

  const toggleCategory = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  // Smooth scroll to section (works if on home or navigate first)
  const scrollToSection = (id) => {
    const scroll = () => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    };

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      // Delay to allow page load
      setTimeout(scroll, 200);
    } else {
      scroll();
    }
  };

  return (
    <header className="navbar glassy-navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Rtec Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        {/* Services Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() =>
            window.innerWidth > 768 && setActiveDropdown("services")
          }
          onMouseLeave={() =>
            window.innerWidth > 768 && setActiveDropdown(null)
          }
        >
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("services")}
          >
            Services{" "}
            {activeDropdown === "services" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          <div
            className={`dropdown-content ${
              activeDropdown === "services" ? "show" : ""
            }`}
          >
            {servicesData.map((service, index) => (
              <div className="service-item" key={index}>
                <Link to={`/services/${service.slug}`} onClick={closeMenu}>
                  {service.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Products Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() =>
            window.innerWidth > 768 && setActiveDropdown("products")
          }
          onMouseLeave={() =>
            window.innerWidth > 768 && setActiveDropdown(null)
          }
        >
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("products")}
          >
            Products{" "}
            {activeDropdown === "products" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          <div
            className={`dropdown-content ${
              activeDropdown === "products" ? "show" : ""
            }`}
          >
            {Object.keys(groupedProducts).map((category, idx) => (
              <div className="nested-dropdown" key={idx}>
                <button
                  className="nested-btn"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {activeCategory === category ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <div
                  className={`nested-content ${
                    activeCategory === category ? "show" : ""
                  }`}
                >
                  {groupedProducts[category].map((product, index) => (
                    <Link
                      key={index}
                      to={`/products/${product.slug}`}
                      onClick={closeMenu}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smooth Scroll Buttons */}
        <button
          className="scroll-link"
          onClick={() => scrollToSection("about-section")}
        >
          About Us
        </button>

        <button
          className="scroll-link nav-link-btn"
          onClick={() => scrollToSection("contact-section")}
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
