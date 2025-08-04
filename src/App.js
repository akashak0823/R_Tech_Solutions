// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from "./Pages/AllProducts";
import Home from './Pages/Home';
import Services from './Pages/Services';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ServiceDetails from './Pages/ServiceDetails'; // ✅ Import the new page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} /> {/* ✅ Dynamic route added */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
