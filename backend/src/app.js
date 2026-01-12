const express = require("express");
const cors = require("cors");

const app = express();

// Serve static files
const path = require("path");
app.use("/images", express.static(path.join(process.cwd(), "public"))); // Serve /public as /images

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Product routes
const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

// Cart routes
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

// Order routes
const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);


// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Clothify API is running" });
});

module.exports = app;
