const express = require("express");
const { register } = require("../controllers/authController.js");

const router = express.Router();

router.post ("/register", register);

export default router;