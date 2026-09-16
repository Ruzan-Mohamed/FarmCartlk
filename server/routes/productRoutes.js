const express = require("express");

const { createProduct} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { farmerOnly } = require("..//middleware/roleMiddleware")

const router = express.Router();

router.post("/", protect, farmerOnly, createProduct);

module.exports = router;