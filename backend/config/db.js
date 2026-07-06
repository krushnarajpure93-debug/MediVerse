const mongoose = require("mongoose");

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sevasetu";
  const fallbackUri = "mongodb://127.0.0.1:27017/sevasetu";
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    family: 4,
  };

  try {
    const conn = await mongoose.connect(primaryUri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    try {
      const fallbackConn = await mongoose.connect(fallbackUri, options);
      console.log(`✅ MongoDB Connected (fallback): ${fallbackConn.connection.host}`);
      console.log(`📊 Database: ${fallbackConn.connection.name}`);
      return true;
    } catch (fallbackError) {
      console.error("❌ MongoDB fallback connection failed:", fallbackError.message);
      console.warn("⚠️ Start a local MongoDB service or verify the Atlas URI before using data persistence.");
      return false;
    }
  }
};

mongoose.connection.on("connected", () => {
  console.log("🟢 MongoDB Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("🔴 MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err.message);
});

module.exports = connectDB;