import React, { useEffect, useRef } from "react";
import "../Styles/Services.css";
import { servicesData, iconMap } from "../utils/servicesData";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  // ✅ Handle Learn More Click
  const handleLearnMoreClick = (service) => {
    console.log("Navigating to service:", service.title);
    // Optional: store in state, context, or localStorage
    // localStorage.setItem("selectedService", JSON.stringify(service));
  };

  return (
    <section className="services-section">
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h4>What We Offer</h4>
        <h2 className="gradient-text">Our Services</h2>
        <p className="services-subtitle">
          Rtec blends industrial expertise with smart technology to power modern manufacturing.
        </p>
      </motion.div>

      <div className="services-grid">
        {servicesData.map((service, idx) => (
          <motion.div
            key={idx}
            className="service-card"
            ref={(el) => (cardsRef.current[idx] = el)}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0px 18px 28px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
          >
            <div className="service-icon">{iconMap[service.icon]}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <Link
              to={`/services/${service.slug}`}
              className="learn-more-btn"
              onClick={() => handleLearnMoreClick(service)}
            >
              <button className="learn-more-button">Learn more →</button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
