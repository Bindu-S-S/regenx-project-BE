const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
    return db;
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
