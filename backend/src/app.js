const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Product routes
const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);


// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Clothify API is running" });
});

module.exports = app;
