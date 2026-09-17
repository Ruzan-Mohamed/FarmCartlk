require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/authRoute.js");
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const farmRoutes = require("./routes/farmRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / Test Route
app.get("/", (req, res) => {
  res.json({ status: "online", message: "FarmCartLK Agricultural Marketplace API is running..." });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled API Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// DB Connection + Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farmcartlk";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Successfully");
    app.listen(PORT, () => {
      console.log(`FarmCartLK Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    // Start server anyway so API endpoints can respond if DB is optional or being configured
    app.listen(PORT, () => {
      console.log(`FarmCartLK Server running on port ${PORT} (MongoDB disconnected)`);
    });
  });