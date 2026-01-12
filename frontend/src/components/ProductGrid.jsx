

import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductCard/product.css";
import { RotatingLines } from 'react-loader-spinner';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products?page=${page}&limit=10`);
      setProducts(data.products);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  if (loading)
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="1"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Container */}
      <div style={styles.paginationContainer}>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => fetchProducts(currentPage - 1)}
          style={{ ...styles.pageButton, ...styles.prevNextButton }}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => fetchProducts(i + 1)}
            style={{
              ...styles.pageButton,
              ...(currentPage === i + 1 ? styles.activePage : {}),
            }}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchProducts(currentPage + 1)}
          style={{ ...styles.pageButton, ...styles.prevNextButton }}
        >
          Next
        </button>
      </div>
    </>
  );
}

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  pageButton: {
    padding: "8px 14px",
    border: "1px solid #0000A3",
    background: "#fff",
    color: "#0000A3",
    cursor: "pointer",
    borderRadius: "4px",
    minWidth: "36px",
    transition: "all 0.2s ease",
  },
  activePage: {
    background: "#0000A3",
    color: "#fff",
    fontWeight: "bold",
  },
  prevNextButton: {
    fontWeight: "bold",
  },
};
