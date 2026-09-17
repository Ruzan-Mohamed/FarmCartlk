const express = require("express");
const {
    getFarms,
    getFarmById,
    getFarmByFarmerId,
    updateFarm
} = require("../controllers/farmController");
const { protect } = require("../middleware/authMiddleware");
const { farmerOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getFarms);
router.get("/:id", getFarmById);
router.get("/farmer/:farmerId", getFarmByFarmerId);
router.put("/my-farm", protect, farmerOnly, updateFarm);

module.exports = router;
