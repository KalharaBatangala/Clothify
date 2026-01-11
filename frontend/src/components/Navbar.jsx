import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      width: "100%",
      padding: "16px 32px",
      background: "#0000A3",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>Clothify</h2>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        <Link to="/cart" style={{ color: "#fff" }}>Cart</Link>
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      </div>
    </nav>
  );
}
