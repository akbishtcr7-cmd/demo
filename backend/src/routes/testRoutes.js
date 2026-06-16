const express = require("express");
const {
  testConnection,
  testCloudinary
} = require("../controllers/testController");

const router = express.Router();

router.get("/", testConnection);
router.get("/cloudinary", testCloudinary);

module.exports = router;
