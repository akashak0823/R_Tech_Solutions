import React, { useEffect, useState } from "react";
import "../Styles/Footer.css";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import axios from "axios";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get("https://r-tech-backend.onrender.com/api/services");
        setServices(servicesRes.data);

        const productsRes = await axios.get("https://r-tech-backend.onrender.com/api/products");
        const grouped = productsRes.data.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section company-info">
          <img src={Logo} alt="Rtec Solutions Logo" className="footer-logo" />
          <p>
            Rtec Solutions Pvt Ltd is your trusted industrial solution partner,
            providing high-quality hardware, filtration, precision components,
            and smart sensor integration.
          </p>
          <div className="footer-contact">
            <p>Email: <a href="mailto:rtecsolutionss@gmail.com">rtecsolutionss@gmail.com</a></p>
            <p>Phone: <a href="tel:+917339663777">+91 73396 63777</a></p>
            <p>Location: Tamil Nadu, India</p>
          </div>
        </div>

        {/* Products & Services */}
        <div className="footer-section">
          <h4 className="footer-title gradient-text">Products & Services</h4>
          <ul>
            {/* Dynamic services */}
            {services.map((service) => (
              <li
                key={service._id}
                onClick={() => handleRedirect(`/services/${service.slug}`)}
              >
                {service.title}
              </li>
            ))}

            {/* Dynamic product categories */}
            {Object.keys(groupedProducts).map((category, idx) => (
              <li
                key={idx}
                onClick={() =>
                  handleRedirect(`/products/${groupedProducts[category][0].slug}`)
                }
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-section">
          <h4 className="footer-title gradient-text">Policies & Info</h4>
          <ul>
            <li onClick={() => handleRedirect("/terms")}>Terms & Conditions</li>
            <li onClick={() => handleRedirect("/privacy")}>Privacy Policy</li>
            <li onClick={() => handleRedirect("/shipping")}>Shipping & Delivery</li>
            <li onClick={() => handleRedirect("/return")}>Return & Refund Policy</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h4 className="footer-title gradient-text">Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rtec Solutions Pvt Ltd | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
