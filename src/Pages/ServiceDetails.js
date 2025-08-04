import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { servicesData } from "../utils/servicesData";
import productsData from "../utils/productsData";
import "../Styles/ServiceDetails.css";

const categoryKeywordsMap = {
  "Process Engineering": [
    "Filter Bags",
    "Filter Cages",
    "Filter Cartridges",
    "Bag Filter Housings",
    "Dust Collector Systems",
    "Air Intake Filters",
    "Filter Accessories",
  ],
  "Industrial Supply": ["Industrial Hardware & Fasteners"],
  "Precision Engineering": ["Auto Components & Precision Parts"],
  "Industrial Automation": ["Industrial Smart Sensors"],
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="service-not-found">Service not found.</div>
        </div>
        <Footer />
      </>
    );
  }

  const matchKeywords = categoryKeywordsMap[service.category] || [];
  const relatedProducts = productsData.filter((product) =>
    matchKeywords.includes(product.category)
  );

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        {/* Hero Section with Background */}
        <section
          className="service-hero"
          style={{
            backgroundImage: `url(${encodeURI(service.image)})`,
          }}
        >
          <div className="hero-content">
            <h1 className="details-title">{service.title}</h1>
            <p className="details-description">{service.description}</p>

            <h3>Key Features</h3>
            <ul className="features-list">
              {service.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Products */}
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="related-products-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product, idx) => (
                <div className="related-product-card" key={idx}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="related-product-image"
                  />
                  <h4 className="related-product-name">{product.name}</h4>
                  <p className="related-product-description">
                    {product.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetails;
