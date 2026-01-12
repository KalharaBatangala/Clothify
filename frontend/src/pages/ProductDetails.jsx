import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: "32px" }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.name} style={styles.image} />

      <div style={styles.info}>
        <h1>{product.name}</h1>
        <p style={styles.price}>Rs. {product.price}</p>
        <p>{product.description}</p>

        <div style={styles.sizes}>
          {product.sizes.map((size) => (
            <button key={size} style={styles.sizeBtn}>{size}</button>
          ))}
        </div>

        <button style={styles.cartBtn}>Add to Cart</button>
      </div>
    </div>
  );
}



const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "32px",
    maxWidth: "1200px",
    margin: "auto",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  info: {
    flex: 1,
    minWidth: "280px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "12px 0",
  },
  sizes: {
    display: "flex",
    gap: "10px",
    margin: "16px 0",
  },
  sizeBtn: {
    padding: "8px 14px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  cartBtn: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#0000A3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
  },
};
