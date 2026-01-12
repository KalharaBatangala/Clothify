import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductCard/product.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: "32px" }}>Loading products...</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
