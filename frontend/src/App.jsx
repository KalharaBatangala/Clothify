import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* other routes later */}
        </Routes>
        <Footer />
      </Router>
    
  );
}

export default App;
