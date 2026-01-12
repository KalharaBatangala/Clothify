// import { Link } from "react-router-dom";
// import { useState } from "react";
// import "./Navbar.css";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));

//   const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   // Optionally redirect to home page
//   navigate("/", { replace: true });
// };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">Clothify</h2>

//       {/* Hamburger */}
//       <button
//         className="hamburger"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         ☰
//       </button>

//       {/* Links */}
//       <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//         <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Home
//         </Link>
//         <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Cart
//         </Link>
//         <Link to="/checkout" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Checkout
//         </Link>
//         <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
//           {user ? (
//             <button onClick={logout}>Logout</button>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}

//         </Link>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Clothify</h2>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

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

        {user ? (
          <>
            <span className="nav-link">Hi, {user.name}</span>
            <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
