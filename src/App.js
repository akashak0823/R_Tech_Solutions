// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './Components/Loader'; // ✅ Your bouncing dots loader


// ✅ Lazy load all pages
const Home = lazy(() => import('./Pages/Home'));
const Services = lazy(() => import('./Pages/Services'));
const ServiceDetails = lazy(() => import('./Pages/ServiceDetails'));
const Products = lazy(() => import('./Pages/Products'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const AllProducts = lazy(() => import('./Pages/AllProducts'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));

// ✅ Lazy load admin routes too
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));

function App() {
  return (
    <Router>
      <div className="App">
        {/* Suspense wraps all routes to show loader while lazy components load */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 🔒 Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
