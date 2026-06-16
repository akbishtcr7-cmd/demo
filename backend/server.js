require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const configureCloudinary = require("./src/config/cloudinary");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    configureCloudinary();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the other server or choose a different PORT.`);
        process.exit(1);
      }

      throw error;
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
