const cloudinary = require("cloudinary").v2;

const configureCloudinary = () => {
  const requiredVars = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET"
  ];

  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.warn(
      `Cloudinary not configured. Missing ${missingVars.join(", ")}. Upload routes may be unavailable.`
    );
    return null;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  console.log("Cloudinary configured");
  return cloudinary;
};

module.exports = configureCloudinary;
