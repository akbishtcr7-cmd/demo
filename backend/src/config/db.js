const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  if (process.env.MONGO_URI.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  });

  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

module.exports = connectDB;
