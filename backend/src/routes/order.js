const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const sendEmail = require("../utils/sendEmail");
const orderEmailTemplate = require("../utils/orderEmailTemplate");
const adminOnly = require("../middleware/admin");

// POST /api/orders/checkout
router.post("/checkout", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    const orderItems = cart.items.map((item) => {
      totalPrice += item.product.price * item.quantity;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
    });

    // Send order confirmation email
    try {
    await sendEmail({
    to: req.user.email,
    subject: "Order Confirmation",
    html: orderEmailTemplate(order, req.user),
    });

    } catch (emailError) {
    console.error("Email failed:", emailError.message);
    }


    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/my
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET /api/orders (Admin)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/orders/:id/status (Admin)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
