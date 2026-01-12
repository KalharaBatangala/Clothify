import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart");
        setCart(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleInput = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      const { data } = await api.post("/orders/checkout", { shipping });
      alert("Order placed successfully! Order ID: " + data._id);
      navigate("/"); // redirect to home after order
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!cart || cart.items.length === 0)
    return <p>Your cart is empty. Add items first.</p>;

  const total = cart.items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Checkout</h1>

      <h2>Shipping Information</h2>
      <input
        name="name"
        placeholder="Full Name"
        value={shipping.name}
        onChange={handleInput}
      />
      <input
        name="address"
        placeholder="Address"
        value={shipping.address}
        onChange={handleInput}
      />
      <input
        name="city"
        placeholder="City"
        value={shipping.city}
        onChange={handleInput}
      />
      <input
        name="zip"
        placeholder="Zip Code"
        value={shipping.zip}
        onChange={handleInput}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={shipping.phone}
        onChange={handleInput}
      />

      <h2>Order Summary</h2>
      {cart.items.map((item) => (
        <div key={item._id}>
          {item.product.name} | Size: {item.size} | Qty: {item.quantity} | $
          {(item.product.price * item.quantity).toFixed(2)}
        </div>
      ))}
      <h3>Total: ${total}</h3>

      <button onClick={placeOrder} style={{ marginTop: "16px" }}>
        Place Order
      </button>
    </div>
  );
}
