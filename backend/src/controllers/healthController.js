const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { isEmailServiceConfigured } = require("../config/smtp");

const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
    environment: process.env.NODE_ENV || "development",
    emailService: isEmailServiceConfigured() ? "configured" : "not_configured",
    services: {
      api: "running",
      mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      cloudinary: cloudinary.config().cloud_name ? "configured" : "not_configured"
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  healthCheck
};
