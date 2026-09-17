const express = require("express");
const { 
    getProducts, 
    getProductById, 
    getFarmerProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { farmerOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/farmer/:farmerId", getFarmerProducts);

// Protected routes (Farmers & Admins)
router.get("/my/list", protect, farmerOnly, getFarmerProducts);
router.post("/", protect, farmerOnly, createProduct);
router.put("/:id", protect, farmerOnly, updateProduct);
router.delete("/:id", protect, farmerOnly, deleteProduct);

module.exports = router;