const cloudinary = require("cloudinary").v2;

const testConnection = (req, res) => {
  res.json({
    success: true,
    message: "Frontend connected to backend successfully"
  });
};

const testCloudinary = (req, res) => {
  res.json({
    success: true,
    message: "Cloudinary is configured successfully",
    cloudName: cloudinary.config().cloud_name
  });
};

module.exports = {
  testConnection,
  testCloudinary
};
