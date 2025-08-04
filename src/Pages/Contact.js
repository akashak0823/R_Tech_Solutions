import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, we will contact you soon!`);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <motion.h2
          className="gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch With Us
        </motion.h2>

        <div className="contact-grid">
          {/* Left: Form */}
          <motion.form
            className="contact-form premium-card"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Write a message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <motion.button
              type="submit"
              className="send-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>

          {/* Right: Map & Contact Info */}
          <motion.div
            className="contact-info premium-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="gradient-text">RTEC SOLUTION PVT LTD</h4>
            <p className="office-address">
              NO 42 - D2 COSMAFAN BUILDING, <br />
              NAVA INDIA ROAD, PEELAMEDU, <br />
              COIMBATORE 641004
            </p>

            <div className="direct-details">
              <p>
                Email:{" "}
                <a href="mailto:ramkumar10727@gmail.com">
                  ramkumar10727@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+917339663777">+91 73396 63777</a>
              </p>
            </div>

            {/* Google Maps Embed with Real Location */}
            <motion.iframe
              title="Google Map"
              className="map-frame"
              src="https://www.google.com/maps?q=NO+42+D2+COSMAFAN+BUILDING+NAVA+INDIA+ROAD+PEELAMEDU+COIMBATORE+641004&output=embed"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.iframe>

            <motion.div
              className="call-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="tel:+917339663777">Contact Now</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
