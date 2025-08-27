// Main.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";

const Main = () => {
  return (
    <Router>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Page Routes */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Sticky Footer */}
      <Footer />
    </Router>
  );
};

export default Main;
