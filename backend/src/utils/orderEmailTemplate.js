

const orderEmailTemplate = (order, user) => {
  return `
    <h2>Thank you for your order, ${user.name}!</h2>

    <p>Your order has been placed successfully.</p>

    <h3>Order Summary</h3>
    <ul>
      ${order.items
        .map(
          (item) => `
          <li>
            ${item.name} — ${item.size} × ${item.qty} — $${item.price}
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
