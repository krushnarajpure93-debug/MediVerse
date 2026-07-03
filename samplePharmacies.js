const mongoose = require("mongoose");
const Pharmacy = require("./backend/models/Pharmacy.model");
const User = require("./backend/models/User.model");

mongoose
  .connect("mongodb://localhost:27017/aipp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const createSample = async () => {
  try {
    // Step 1: Create 5 dummy users with required fields
    const dummyUsers = Array.from({ length: 5 }, (_, i) => ({
      _id: new mongoose.Types.ObjectId(),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `900000000${i + 1}`,
      password: "Password123!",
      role: "user",
    }));

    // Clear old users and insert new ones
    await User.deleteMany();
    await User.insertMany(dummyUsers);
    console.log("Dummy users inserted");

    // Step 2: Create 5 sample pharmacies
    const pharmacies = [
      {
        user: dummyUsers[0]._id,
        pharmacyName: "HealthPlus Pharmacy",
        licenseNumber: "PHAR12345",
        gstNumber: "GST123456",
        address: {
          street: "MG Road",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001",
        },
        contactNumber: "9876543210",
        email: "contact@healthplus.com",
        operatingHours: { opening: "08:00", closing: "22:00" },
        workingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        serviceType: ["both"],
        deliveryRadius: 15,
        documents: [
          { type: "Pharmacy License", url: "https://example.com/license1.pdf" },
          { type: "GST Certificate", url: "https://example.com/gst1.pdf" },
        ],
        isVerified: true,
        verificationStatus: "verified",
      },
      {
        user: dummyUsers[1]._id,
        pharmacyName: "MediCare Pharmacy",
        licenseNumber: "PHAR23456",
        gstNumber: "GST234567",
        address: {
          street: "FC Road",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411004",
        },
        contactNumber: "9876543211",
        email: "contact@medicare.com",
        operatingHours: { opening: "09:00", closing: "21:00" },
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        documents: [],
      },
      {
        user: dummyUsers[2]._id,
        pharmacyName: "CityCare Pharmacy",
        licenseNumber: "PHAR34567",
        gstNumber: "GST345678",
        address: {
          street: "Camp",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001",
        },
        contactNumber: "9876543212",
        email: "contact@citycare.com",
        operatingHours: { opening: "08:30", closing: "20:30" },
        workingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      {
        user: dummyUsers[3]._id,
        pharmacyName: "Wellness Pharmacy",
        licenseNumber: "PHAR45678",
        gstNumber: "GST456789",
        address: {
          street: "Juhu",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400049",
        },
        contactNumber: "9876543213",
        email: "contact@wellness.com",
        operatingHours: { opening: "07:00", closing: "23:00" },
        workingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        isVerified: true,
        verificationStatus: "verified",
      },
      {
        user: dummyUsers[4]._id,
        pharmacyName: "GoodHealth Pharmacy",
        licenseNumber: "PHAR56789",
        gstNumber: "GST567890",
        address: {
          street: "Linking Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400050",
        },
        contactNumber: "9876543214",
        email: "contact@goodhealth.com",
        operatingHours: { opening: "08:00", closing: "22:00" },
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    ];

    // Clear old pharmacies and insert new ones
    await Pharmacy.deleteMany();
    const result = await Pharmacy.insertMany(pharmacies);
    console.log("Sample pharmacies inserted:", result);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

createSample();
