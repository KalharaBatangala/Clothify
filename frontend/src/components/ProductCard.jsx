export default function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      width: "250px"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
