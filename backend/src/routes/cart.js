const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/auth");

// GET user's cart
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD item to cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    // Check if item with same product & size exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE item quantity
router.put("/update", protect, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// REMOVE item from cart
router.delete("/remove", protect, async (req, res) => {
  try {
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
