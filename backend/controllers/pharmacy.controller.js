const asyncHandler = require("../utils/asyncHandler");
const Pharmacy = require("../models/Pharmacy.model");
const Order = require("../models/Order.model");
const User = require("../models/User.model");
const { sendEmail, emailTemplates } = require("../utils/sendEmail");

/* =====================================================
   1️⃣ PHARMACY PROFILE SECTION
===================================================== */

// Create or Update Pharmacy Profile
exports.createOrUpdateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let pharmacy = await Pharmacy.findOne({ user: userId });

  const profileData = {
    user: userId,
    pharmacyName: req.body.pharmacyName,
    licenseNumber: req.body.licenseNumber,
    gstNumber: req.body.gstNumber,
    address: req.body.address,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    operatingHours: req.body.operatingHours,
    workingDays: req.body.workingDays,
    serviceType: req.body.serviceType,
    deliveryRadius: req.body.deliveryRadius,
    minimumOrderAmount: req.body.minimumOrderAmount,
    deliveryCharges: req.body.deliveryCharges,
    documents: req.body.documents,
  };

  if (pharmacy) {
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== undefined) {
        pharmacy[key] = profileData[key];
      }
    });
    await pharmacy.save();
  } else {
    pharmacy = await Pharmacy.create(profileData);
    await User.findByIdAndUpdate(userId, { role: "pharmacy" });
  }

  res.status(200).json({
    success: true,
    message: "Pharmacy profile saved successfully",
    data: pharmacy,
  });
});

// Get Pharmacy Profile
exports.getProfile = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id }).populate(
    "user",
    "name email phone",
  );

  if (!pharmacy) {
    return res
      .status(404)
      .json({ success: false, message: "Profile not found" });
  }

  res.status(200).json({ success: true, data: pharmacy });
});

// Get All Pharmacies (Public)
exports.getAllPharmacies = asyncHandler(async (req, res) => {
  const { city, search, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { isActive: true };

  if (city) filter["address.city"] = { $regex: city, $options: "i" };
  if (search) {
    filter.$or = [
      { pharmacyName: { $regex: search, $options: "i" } },
      { "address.city": { $regex: search, $options: "i" } },
    ];
  }

  const pharmacies = await Pharmacy.find(filter)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Pharmacy.countDocuments(filter);

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: pharmacies,
  });
});

// Get Pharmacy By ID
exports.getPharmacyById = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy || !pharmacy.isActive) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy not available",
    });
  }

  res.status(200).json({ success: true, data: pharmacy });
});

// Update Availability
exports.updateAvailability = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy)
    return res
      .status(404)
      .json({ success: false, message: "Profile not found" });

  if (isActive !== undefined) pharmacy.isActive = isActive;

  await pharmacy.save();

  res.status(200).json({
    success: true,
    message: "Availability updated",
    data: pharmacy,
  });
});

/* =====================================================
   2️⃣ USER ORDER SECTION
===================================================== */

// Create Order
exports.createOrder = asyncHandler(async (req, res) => {
  const { pharmacy, items, deliveryAddress, pricing, paymentMethod } = req.body;

  if (!pharmacy || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  const pharmacyDoc = await Pharmacy.findById(pharmacy);
  if (!pharmacyDoc || !pharmacyDoc.isActive) {
    return res
      .status(400)
      .json({ success: false, message: "Pharmacy unavailable" });
  }

  const order = await Order.create({
    user: req.user._id,
    pharmacy,
    items,
    deliveryAddress,
    pricing,
    paymentMethod: paymentMethod || "cod",
    orderStatus: "pending",
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

// Get Order By ID
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ success: false, message: "Order not found" });

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  res.status(200).json({ success: true, data: order });
});

// Cancel Order
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ success: false, message: "Order not found" });

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  order.orderStatus = "cancelled";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled",
    data: order,
  });
});

/* =====================================================
   3️⃣ PHARMACY ORDER MANAGEMENT
===================================================== */

// Get Pharmacy Orders
exports.getOrders = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  const orders = await Order.find({ pharmacy: pharmacy._id }).sort(
    "-createdAt",
  );

  res.status(200).json({ success: true, data: orders });
});

// Update Order Status
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ success: false, message: "Order not found" });

  order.orderStatus = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Status updated",
    data: order,
  });
});

/* =====================================================
   3️⃣ PHARMACY DASHBOARD
===================================================== */

exports.getDashboard = asyncHandler(async (req, res) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  const totalOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
  });

  const pendingOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
    orderStatus: "pending",
  });

  const completedOrders = await Order.countDocuments({
    pharmacy: pharmacy._id,
    orderStatus: "delivered",
  });

  res.status(200).json({
    success: true,
    data: {
      pharmacyName: pharmacy.pharmacyName,
      totalOrders,
      pendingOrders,
      completedOrders,
      isActive: pharmacy.isActive,
    },
  });
});

/* =====================================================
   4️⃣ MEDICINE SECTION (Mock)
===================================================== */

const mockMedicines = [
  { _id: "1", name: "Paracetamol 500mg", price: 25 },
  { _id: "2", name: "Amoxicillin 250mg", price: 120 },
];

exports.getAllMedicines = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: mockMedicines });
});

exports.getMedicineById = asyncHandler(async (req, res) => {
  const medicine = mockMedicines.find((m) => m._id === req.params.id);

  if (!medicine)
    return res.status(404).json({ success: false, message: "Not found" });

  res.status(200).json({ success: true, data: medicine });
});

/* =====================================================
   5️⃣ PRESCRIPTION SECTION
===================================================== */

exports.uploadPrescription = asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "File required" });

  res.status(201).json({
    success: true,
    message: "Prescription uploaded",
    file: req.file.path,
  });
});

exports.verifyPrescription = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.prescriptionVerified = true;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Prescription verified successfully",
    data: order,
  });
});
