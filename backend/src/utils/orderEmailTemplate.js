

const orderEmailTemplate = (order, user) => {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleString(); // fallback if createdAt missing

  return `
    <h2>Thank you for your order, ${user.name}!</h2>

    <p>Your order has been placed successfully.</p>

    <h3>Order Details</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Order Date:</strong> ${orderDate}</p>

    <h3>Order Summary</h3>
    <ul>
      ${order.items
        .map(
          (item) => `
          <li>
            ${item.name} — ${item.size} × ${item.quantity} — $${item.price}
          </li>`
        )
        .join("")}
    </ul>

    <p><strong>Total:</strong> $${order.totalPrice}</p>

    <p>Status: ${order.status}</p>

    <p>We’ll notify you when your order is shipped.</p>
  `;
};

module.exports = orderEmailTemplate;
