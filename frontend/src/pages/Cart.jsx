// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";


// export default function Cart() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {

//     if (localStorage.getItem("token")) {
//       // logged in user
//       try {
//         const { data } = await api.get("/cart");
//         setCart(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }

//     } else {
//       // guest user
//       const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//       setCart({ items: guestCart });
//       setLoading(false);
//     }
//   };

//   const updateQty = async (productId, size, quantity) => {
//   if (quantity < 1) return;

//   if (localStorage.getItem("token")) {
//      // logged in user
//      try {
//        await api.put("/cart/update", { productId, size, quantity });
//        fetchCart(); // refresh UI
//      } catch (err) {
//        console.error(err);
//      }

//   } else {
//      // guest user 
//      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//     const item = guestCart.find((i) => i.productId === productId);
//     if (item) item.qty = quantity;
//     localStorage.setItem("guestCart", JSON.stringify(guestCart));
//     fetchCart();
//   }
// };

// const removeItem = async (productId, size) => {

//   if (localStorage.getItem("token")) {
//     // logged in user
//     try {
//       await api.delete("/cart/remove", { data: { productId, size } });
//       fetchCart();
//     } catch (err) {
//       console.error(err);
//     }

//   } else {
//     // guest user
//     let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//     guestCart = guestCart.filter((i) => i.productId !== productId);
//     localStorage.setItem("guestCart", JSON.stringify(guestCart));
//     fetchCart();
//   }
// };


//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <p style={{ padding: 32 }}>Loading cart...</p>;

//   if (!cart || cart.items.length === 0) {
//     return <p style={{ padding: 32 }}>Your cart is empty.</p>;
//   }

//   // const total = cart.items.reduce(
//   //   (sum, item) => sum + item.product.price * item.quantity,
//   //   0
//   // );
 
//   // const total = cart.items
//   // .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
//   // .toFixed(2); // round to 2 decimal places


//   const total = cart.items.reduce((sum, item) => {
//   const price = item.product ? item.product.price : item.price; // support guest
//   const quantity = item.quantity || 1;
//   return sum + price * quantity;
// }, 0);


//   // return (
//   //   <div style={styles.container}>
//   //     <h1>Your Cart</h1>

//   //     {cart.items.map((item) => (
//   //       <div key={item._id} style={styles.item}>
//   //         <img
//   //           src={`http://localhost:5000${item.product.imageUrl}`}
//   //           alt={item.product.name}
//   //           style={styles.image}
//   //         />

//   //         <div style={styles.details}>
//   //           <h3>{item.product.name}</h3>
//   //           <p>Size: {item.size}</p>
//   //           <p>Price: ${item.product.price}</p>
//   //         </div>

//   //         {/* <div style={styles.actions}>
//   //           <input
//   //             type="number"
//   //             min="1"
//   //             value={item.qty}
//   //             style={styles.qty}
//   //             readOnly
//   //           />
//   //           <p>${item.product.price * item.qty}</p>
//   //         </div> */}

//   //         <div style={styles.actions}>
//   //           <input
//   //             type="number"
//   //             min="1"
//   //             value={item.quantity}
//   //             style={styles.quantity}
//   //             onChange={(e) => updateQty(item.product._id, item.size, Number(e.target.value))}
//   //           />

//   //           <p>${item.product.price * item.quantity}</p>

//   //           <button
//   //             onClick={() => removeItem(item.product._id, item.size)}
//   //             style={styles.removeBtn}
//   //           >
//   //             Remove
//   //           </button>
//   //         </div>



//   //       </div>
//   //     ))}

//   //     <h2>Total: ${total}</h2>
//   //     <button style={styles.checkoutBtn} onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
//   //   </div>
//   // );


//   return (
//   <div style={styles.container}>
//     <h1>Your Cart</h1>

//     {cart.items.map((item) => {
//       // Determine if it's logged-in cart or guest cart
//       const product = item.product ? item.product : item; 
//       const quantity = item.quantity ? item.quantity : 1;

//       return (
//         <div key={item._id || item.productId} style={styles.item}>
//           <img
//             src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` :`http://localhost:5000/products${product.image}`}
//             alt={product.name}
//             style={styles.image}
//           />

//           <div style={styles.details}>
//             <h3>{product.name}</h3>
//             <p>Size: {item.size || product.size || "N/A"}</p>
//             <p>Price: ${product.price}</p>
//           </div>

//           <div style={styles.actions}>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               style={styles.qty}
//               onChange={(e) => updateQty(item._id || item.productId, item.size, Number(e.target.value))}
//             />
//             <p>${(product.price * quantity).toFixed(2)}</p>

//             <button
//               onClick={() => removeItem(item._id || item.productId, item.size)}
//               style={styles.removeBtn}
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       );
//     })}

//     <h2>
//       Total: $
//       {cart.items
//         .reduce((sum, item) => {
//           const product = item.product ? item.product : item;
//           const quantity = item.qty || item.quantity || 1;
//           return sum + product.price * quantity;
//         }, 0)
//         .toFixed(2)}
//     </h2>

//     <button
//       style={styles.checkoutBtn}
//       onClick={() => navigate("/checkout")}
//     >
//       Proceed to Checkout
//     </button>
//   </div>
// );

// }


// const styles = {
//   container: {
//     padding: "32px",
//     maxWidth: "1000px",
//     margin: "0 auto",
//   },
//   item: {
//     display: "flex",
//     gap: "16px",
//     padding: "16px",
//     borderBottom: "1px solid #ddd",
//     flexWrap: "wrap",
//   },
//   image: {
//     width: "120px",
//     borderRadius: "8px",
//   },
//   details: {
//     flex: 1,
//   },
//   actions: {
//     textAlign: "right",
//   },
//   qty: {
//     width: "60px",
//     marginBottom: "8px",
//   },
//   checkoutBtn: {
//     marginTop: "24px",
//     padding: "12px 24px",
//     background: "#0000A3",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   },
//   removeBtn: {
//   background: "transparent",
//   border: "none",
//   color: "red",
//   cursor: "pointer",
//   marginTop: "8px",
// },

// };

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize cart items
  const normalizeCart = (items, isGuest = false) => {
    return items.map((item) => {
      if (isGuest) {
        return {
          id: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: item.image ? `/products${item.image}` : "",
          size: item.size || "N/A",
          quantity: item.qty || 1,
        };
      } else {
        const product = item.product;
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl ? product.imageUrl : product.image ? `/products${product.image}` : "",
          size: item.size || "N/A",
          quantity: item.quantity || 1,
        };
      }
    });
  };

  const fetchCart = async () => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      // logged in user
      try {
        const { data } = await api.get("/cart");
        setCart(normalizeCart(data.items));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      // guest user
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(normalizeCart(guestCart, true));
      setLoading(false);
    }
  };

  const updateQty = async (id, quantity, size = null) => {
    if (quantity < 1) return;

    if (localStorage.getItem("token")) {
      // logged in user
      try {
        await api.put("/cart/update", { productId: id, size, quantity });
        fetchCart();
      } catch (err) {
        console.error(err);
      }
    } else {
      // guest user
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const item = guestCart.find((i) => i.productId === id && i.size === size);
      if (item) item.qty = quantity;
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      fetchCart();
    }
  };

  const removeItem = async (id, size = null) => {
    if (localStorage.getItem("token")) {
      // logged in user
      try {
        await api.delete("/cart/remove", { data: { productId: id, size } });
        fetchCart();
      } catch (err) {
        console.error(err);
      }
    } else {
      // guest user
      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      guestCart = guestCart.filter((i) => i.productId !== id && i.size === size);
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p style={{ padding: 32 }}>Loading cart...</p>;

  if (cart.length === 0) return <p style={{ padding: 32 }}>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} style={styles.item}>
          <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} style={styles.image} />

          <div style={styles.details}>
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <p>Price: ${item.price}</p>
          </div>

          <div style={styles.actions}>
            <input
              type="number"
              min="1"
              value={item.quantity}
              style={styles.qty}
              onChange={(e) => updateQty(item.id, Number(e.target.value), item.size)}

            />
            <p>${(item.price * item.quantity).toFixed(2)}</p>

            <button onClick={() => removeItem(item.id, item.size)} style={styles.removeBtn}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ${total}</h2>
      <button style={styles.checkoutBtn} onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
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
