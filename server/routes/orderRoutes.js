const express = require("express");
const {
    createOrder,
    getBuyerOrders,
    getFarmerOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { farmerOnly, adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getBuyerOrders);
router.get("/farmer-orders", protect, farmerOnly, getFarmerOrders);
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;
