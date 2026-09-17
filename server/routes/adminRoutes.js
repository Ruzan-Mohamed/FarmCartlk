const express = require("express");
const {
    getAdminStats,
    getUsers,
    toggleUserStatus
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/users", protect, adminOnly, getUsers);
router.put("/users/:id/status", protect, adminOnly, toggleUserStatus);

module.exports = router;
