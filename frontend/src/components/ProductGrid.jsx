

import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductCard/product.css";
import { RotatingLines } from "react-loader-spinner";

export default function ProductGrid() {
  /* =======================
     STATE
  ======================= */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* =======================
     HELPERS
  ======================= */
  const buildQuery = (page) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", 10);

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (size) params.append("size", size);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    return params.toString();
  };

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products?${buildQuery(page)}`);
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

  if (loading) {
    return (
      <div style={styles.loader}>
        <RotatingLines height="96" width="96" color="#0000A3" strokeWidth="4" />
      </div>
    );
  }

  return (
    <div>
      {/* 🔍 Search Bar */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for products, brands or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => fetchProducts(1)} style={styles.searchBtn}>
          Search
        </button>
      </div>

      <div style={styles.layout}>
        {/* 🧰 Filters */}
        <aside style={styles.filters}>
          <h3 style={styles.filterTitle}>Filters</h3>

          <FilterSection title="Category">
            {["Men", "Women", "Kids"].map((cat) => (
              <FilterOption
                key={cat}
                label={cat}
                checked={category === cat}
                onClick={() => setCategory(cat)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Size">
            {["S", "M", "L", "XL"].map((s) => (
              <FilterOption
                key={s}
                label={s}
                checked={size === s}
                onClick={() => setSize(s)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Price Range">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={styles.priceInput}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={styles.priceInput}
            />
          </FilterSection>

          <button style={styles.applyBtn} onClick={() => fetchProducts(1)}>
            Apply Filters
          </button>

          <button
            style={styles.clearBtn}
            onClick={() => {
              setSearch("");
              setCategory("");
              setSize("");
              setMinPrice("");
              setMaxPrice("");
              fetchProducts(1);
            }}
          >
            Clear All
          </button>
        </aside>

        {/* 🛍 Products */}
        <main style={{ flex: 1 }}>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* 📄 Pagination */}
          <div style={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => fetchProducts(currentPage - 1)}
              style={styles.pageBtn}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => fetchProducts(i + 1)}
                style={{
                  ...styles.pageBtn,
                  ...(currentPage === i + 1 ? styles.activePage : {}),
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchProducts(currentPage + 1)}
              style={styles.pageBtn}
            >
              ›
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =======================
   SMALL REUSABLE UI
======================= */
const FilterSection = ({ title, children }) => (
  <div style={{ marginBottom: "24px" }}>
    <h4 style={styles.sectionTitle}>{title}</h4>
    {children}
  </div>
);

const FilterOption = ({ label, checked, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.filterOption,
      ...(checked ? styles.filterActive : {}),
    }}
  >
    {label}
  </div>
);

/* =======================
   STYLES (Premium)
======================= */
const styles = {
  loader: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  searchWrapper: {
    display: "flex",
    gap: "12px",
    marginBottom: "32px",
  },
  searchInput: {
    flex: 1,
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },
  searchBtn: {
    padding: "14px 22px",
    background: "#0000A3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  layout: {
    display: "flex",
    gap: "32px",
  },

  filters: {
    width: "260px",
    background: "#fafafa",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #eee",
    height: "fit-content",
  },
  filterTitle: {
    fontSize: "18px",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  filterOption: {
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "6px",
    border: "1px solid transparent",
  },
  filterActive: {
    background: "#0000A3",
    color: "#fff",
  },
  priceInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  applyBtn: {
    width: "100%",
    padding: "10px",
    background: "#0000A3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "12px",
  },
  clearBtn: {
    width: "100%",
    padding: "10px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "8px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "32px",
  },
  pageBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  activePage: {
    background: "#0000A3",
    color: "#fff",
    borderColor: "#0000A3",
  },
};
