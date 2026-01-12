// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [shipping, setShipping] = useState({
//     name: "",
//     address: "",
//     city: "",
//     zip: "",
//     phone: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const { data } = await api.get("/cart");
//         setCart(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, []);

//   const handleInput = (e) => {
//     setShipping({ ...shipping, [e.target.name]: e.target.value });
//   };

//   const placeOrder = async () => {
//     try {
//       const { data } = await api.post("/orders/checkout", { shipping });
//       alert("Order placed successfully! Order ID: " + data._id);
//       navigate("/"); // redirect to home after order
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!cart || cart.items.length === 0)
//     return <p>Your cart is empty. Add items first.</p>;

//   const total = cart.items
//     .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
//     .toFixed(2);

//   return (
//     <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
//       <h1>Checkout</h1>

//       <h2>Shipping Information</h2>
//       <input
//         name="name"
//         placeholder="Full Name"
//         value={shipping.name}
//         onChange={handleInput}
//       />
//       <input
//         name="address"
//         placeholder="Address"
//         value={shipping.address}
//         onChange={handleInput}
//       />
//       <input
//         name="city"
//         placeholder="City"
//         value={shipping.city}
//         onChange={handleInput}
//       />
//       <input
//         name="zip"
//         placeholder="Zip Code"
//         value={shipping.zip}
//         onChange={handleInput}
//       />
//       <input
//         name="phone"
//         placeholder="Phone Number"
//         value={shipping.phone}
//         onChange={handleInput}
//       />

//       <h2>Order Summary</h2>
//       {cart.items.map((item) => (
//         <div key={item._id}>
//           {item.product.name} | Size: {item.size} | Qty: {item.quantity} | $
//           {(item.product.price * item.quantity).toFixed(2)}
//         </div>
//       ))}
//       <h3>Total: ${total}</h3>

//       <button onClick={placeOrder} style={{ marginTop: "16px" }}>
//         Place Order
//       </button>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


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
      //alert("Order placed successfully! Order ID: " + data.order._id);

      Swal.fire({
      title: "Order Placed!",
      html: `
        <p>Order ID: <strong>${data.order._id}</strong></p>
        <p>Total: <strong>$${data.order.totalPrice.toFixed(2)}</strong></p>
      `,
      icon: "success",
      confirmButtonText: "OK",
    });
    
      navigate("/"); // redirect to home after order
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <p style={{ padding: "32px", textAlign: "center" }}>Loading...</p>;
  if (!cart || cart.items.length === 0)
    return <p style={{ padding: "32px", textAlign: "center" }}>Your cart is empty. Add items first.</p>;

  const total = cart.items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        {/* Shipping Form */}
        <div className="shipping-card">
          <h2 className="section-title">Shipping Information</h2>
          <form className="shipping-form">
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
          </form>
        </div>

        {/* Order Summary */}
        <div className="summary-card">
          <h2 className="section-title">Order Summary</h2>
          <div className="order-items">
            {cart.items.map((item) => (
              <div key={item._id} className="order-item">
                <img
                  src={`http://localhost:5000${item.product.imageUrl}`}
                  alt={item.product.name}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-info">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="item-price">Rs. {(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total:</span>
            <span>Rs. {total}</span>
          </div>

          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .checkout-container {
          padding: 32px 16px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1f2937;
        }

        .checkout-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 40px;
          color: #111827;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }

        .shipping-card,
        .summary-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 16px;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          color: #111827;
        }

        .shipping-form input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .shipping-form input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 24px;
        }

        .order-item {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-name {
          font-weight: 600;
          font-size: 1rem;
          color: #111827;
        }

        .item-info {
          font-size: 0.9rem;
          color: #6b7280;
        }

        .item-price {
          font-weight: 600;
          color: #111827;
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 24px;
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
        }

        .place-order-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .place-order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
