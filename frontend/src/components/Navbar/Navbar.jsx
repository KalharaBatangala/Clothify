import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Clothify</h2>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>
          Cart
        </Link>
        <Link to="/checkout" className="nav-link" onClick={() => setMenuOpen(false)}>
          Checkout
        </Link>
        <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
          Login
        </Link>
      </div>
    </nav>
  );
}
