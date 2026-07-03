const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI); // ⚠️ Removed deprecated options

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Mongoose events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB Error: ${err}`);
});

module.exports = connectDB;
