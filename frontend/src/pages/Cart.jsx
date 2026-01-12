import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const updateQty = async (itemId, qty) => {
  if (qty < 1) return;

  try {
    await api.put("/cart", { itemId, qty });
    fetchCart(); // refresh UI
  } catch (err) {
    console.error(err);
  }
};

const removeItem = async (itemId) => {
  try {
    await api.delete(`/cart/${itemId}`);
    fetchCart();
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p style={{ padding: 32 }}>Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return <p style={{ padding: 32 }}>Your cart is empty.</p>;
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div style={styles.container}>
      <h1>Your Cart</h1>

      {cart.items.map((item) => (
        <div key={item._id} style={styles.item}>
          <img
            src={item.product.image}
            alt={item.product.name}
            style={styles.image}
          />

          <div style={styles.details}>
            <h3>{item.product.name}</h3>
            <p>Size: {item.size}</p>
            <p>Price: ${item.product.price}</p>
          </div>

          {/* <div style={styles.actions}>
            <input
              type="number"
              min="1"
              value={item.qty}
              style={styles.qty}
              readOnly
            />
            <p>${item.product.price * item.qty}</p>
          </div> */}

          <div style={styles.actions}>
            <input
              type="number"
              min="1"
              value={item.qty}
              style={styles.qty}
              onChange={(e) =>
                updateQty(item._id, Number(e.target.value))
              }
            />

            <p>${item.product.price * item.qty}</p>

            <button
              onClick={() => removeItem(item._id)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>



        </div>
      ))}

      <h2>Total: ${total}</h2>
      <button style={styles.checkoutBtn}>Proceed to Checkout</button>
    </div>
  );
}


const styles = {
  container: {
    padding: "32px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  item: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    borderBottom: "1px solid #ddd",
    flexWrap: "wrap",
  },
  image: {
    width: "120px",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
  actions: {
    textAlign: "right",
  },
  qty: {
    width: "60px",
    marginBottom: "8px",
  },
  checkoutBtn: {
    marginTop: "24px",
    padding: "12px 24px",
    background: "#0000A3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  removeBtn: {
  background: "transparent",
  border: "none",
  color: "red",
  cursor: "pointer",
  marginTop: "8px",
},

};

