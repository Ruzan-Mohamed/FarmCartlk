const express = require("express");
const multer = require("multer");

const {
  uploadProductImage,
} = require("../controllers/uploadController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/product-image",
  upload.single("image"),
  uploadProductImage
);

module.exports = router;