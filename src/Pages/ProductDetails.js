import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { fetchProducts } from "../api"; // 🔁 API function to get all products
import axios from "axios";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Get the current product by slug
        const { data } = await axios.get(`https://r-tech-backend.onrender.com/api/products/slug/${slug}`);
        setProduct(data);

        // Get all products and filter related and others
        const allProductsRes = await fetchProducts();
        const allProducts = allProductsRes.data;

        const related = allProducts.filter(
          (p) => p.category === data.category && p.slug !== data.slug
        );

        const others = allProducts.filter(
          (p) => p.slug !== data.slug && p.category !== data.category
        );

        setRelatedProducts(related);
        setOtherProducts(others);

        // Scroll to top on load
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
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

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <div className="product-header large">
          <div className="product-image-container">
            <img src={product.images?.[0]?.url || product.images?.[0] || product.img} alt={product.name} />
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
                  <img src={item.images?.[0]?.url || item.images?.[0] || item.img} alt={item.name} />
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
              <img src={item.images?.[0]?.url || item.images?.[0] || item.img} alt={item.name} />
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
