import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
