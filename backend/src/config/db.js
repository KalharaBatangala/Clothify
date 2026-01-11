const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`🟢 MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("🔴 MongoDB connection failed");
    throw error;
    //console.error(error.message);
    //process.exit(1); // Exit process if DB fails
  }
};

module.exports = connectDB;
