import React, { useState } from "react";
import "../Styles/Testimonial.css";
import QuoteIcon from "../assets/quote.png";
import testimonialsData from "../utils/testimonialsData";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonialsData.length;

  const goToPreviousTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalTestimonials - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, position, message, video } = testimonialsData[currentIndex];

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">Clients Testimonials</h2>

      <div className="testimonial-container">
        {/* LEFT: Video Background */}
        <div className="testimonial-video-container">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="testimonial-video"
          />
        </div>

        {/* RIGHT: TEXT CONTENT */}
        <div className="testimonial-text">
          <img src={QuoteIcon} alt="Quote" className="quote-icon" />
          <p className="testimonial-message">{message}</p>
          <h3 className="client-name">{name}</h3>
          <p className="client-position">{position}</p>

          <div className="testimonial-nav">
            <span className="arrow left" onClick={goToPreviousTestimonial}>
              ←
            </span>
            <span className="arrow right" onClick={goToNextTestimonial}>
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
