// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User.model");

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/aipp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  const password = "krushnakaale"; // change if you want
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const admin = await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    phone: "9999999999",
    password: hashedPassword,
    role: "admin",
    isEmailVerified: true,
    isActive: true,
  });

  console.log("Admin created successfully:", admin);
  process.exit(0);
}

createAdmin();
