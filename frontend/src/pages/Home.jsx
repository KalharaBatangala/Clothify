import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => {
      console.log("Products API response:", res.data);
      setProducts(res.data.products);
    });
  }, []);

  return (
    <main style={{
      width: "100%",
      padding: "32px"
    }}>
      <h1 style={{ marginBottom: "24px" }}>Products</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
}
