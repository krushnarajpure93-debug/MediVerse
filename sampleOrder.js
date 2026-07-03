// sampleOrder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const Order = require("./backend/models/Order.model");
const User = require("./backend/models/User.model");
const Pharmacy = require("./backend/models/Pharmacy.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aipp";

// Connect to MongoDB
// Connect to MongoDB
mongoose
  .connect(MONGO_URI) // no extra options needed in v7+
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
  try {
    // Fetch some users and pharmacies
    const users = await User.find().limit(3); // at least 3 users
    const pharmacies = await Pharmacy.find().limit(3); // at least 3 pharmacies

    if (users.length === 0 || pharmacies.length === 0) {
      console.log("Please make sure you have users and pharmacies in DB.");
      process.exit(0);
    }

    const sampleOrders = Array.from({ length: 5 }, (_, i) => ({
      user: users[i % users.length]._id,
      pharmacy: pharmacies[i % pharmacies.length]._id,
      orderNumber: `ORD${Date.now()}${i + 1}`, // manually assign orderNumber
      items: [
        {
          medicineName: `Medicine ${i + 1}`,
          quantity: 1 + i,
          price: 50 + i * 10,
          manufacturer: `Pharma Inc ${i + 1}`,
          expiryDate: new Date(2025, 11, 31),
        },
      ],
      prescription: {
        required: i % 2 === 0,
        imageUrl:
          i % 2 === 0 ? `https://example.com/prescription${i + 1}.jpg` : "",
      },
      deliveryAddress: {
        name: users[i % users.length].name || `User ${i + 1}`,
        phone: users[i % users.length].phone || `98765432${i}`,
        street: `Street ${i + 1}`,
        city: "Pune",
        state: "Maharashtra",
        pincode: "4110" + i,
        landmark: `Landmark ${i + 1}`,
      },
      pricing: {
        subtotal: 50 + i * 10,
        deliveryCharges: 50,
        discount: 0,
        total: 100 + i * 10,
      },
      paymentMethod: i % 2 === 0 ? "cod" : "online",
      paymentStatus: i % 2 === 0 ? "pending" : "paid",
      orderStatus: "pending",
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
    }));

    // Insert orders
    await Order.insertMany(sampleOrders);
    console.log("Sample orders inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error inserting sample orders:", err);
    process.exit(1);
  }
}

createSampleOrders();
