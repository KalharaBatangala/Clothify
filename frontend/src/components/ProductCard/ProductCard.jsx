import { Link } from "react-router-dom";
import "./product.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">Rs. {product.price}</p>

        <Link to={`/product/${product._id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
