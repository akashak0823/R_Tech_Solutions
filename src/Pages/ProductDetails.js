import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productsData from "../utils/productsData";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = productsData.find((p) => p.slug === slug);
    setProduct(found);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-detail">
          <h2>Product not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = productsData.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );

  const otherProducts = productsData.filter(
    (p) => p.slug !== product.slug && p.category !== product.category
  );

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <div className="product-header large">
          <div className="product-image-container">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.details}</p>
            <button className="back-btn" onClick={() => navigate("/products")}>
              See more
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <>
            <h3 className="related-heading">Related {product.category}</h3>
            <div className="all-products-grid">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  to={`/products/${item.slug}`}
                  className="related-card"
                >
                  <img src={item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        <h3 className="related-heading">All Products</h3>
        <div className="all-products-grid">
          {otherProducts.map((item) => (
            <Link
              key={item.slug}
              to={`/products/${item.slug}`}
              className="related-card"
            >
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
