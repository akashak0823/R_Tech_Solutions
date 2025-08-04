import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import productsData from "../utils/productsData";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/AllProducts.css";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')                  // Replace & with "and"
    .replace(/[^\w\s-]/g, '')              // Remove special chars except dash and space
    .replace(/\s+/g, '-')                  // Replace spaces with dashes
    .replace(/--+/g, '-')                  // Avoid double dashes
    .trim();


const AllProducts = () => {
  const categorized = {};
  const { hash } = useLocation();

  // Group products by category
  productsData.forEach((product) => {
    if (!categorized[product.category]) {
      categorized[product.category] = [];
    }
    categorized[product.category].push(product);
  });

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -140; // Adjust this to match your navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      <div className="all-products-page">
        <h1 className="page-title">All Products</h1>

        {Object.entries(categorized).map(([category, products]) => (
          <div className="category-section" key={category} id={slugify(category)}>
            <h2 className="category-title">{category}</h2>
            <div className="category-grid">
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  className="product-card"
                  key={product.slug}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="product-img"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
