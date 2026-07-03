const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User.model");
const Appointment = require("../models/Appointment.model");
const Order = require("../models/Order.model");
const HealthRecord = require("../models/HealthRecord.model");
const RoleRequest = require("../models/roleRequest.model");

// @desc    Get user dashboard overview
// @route   GET /api/user/dashboard
// @access  Private
exports.getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // ✅ FETCH USER
  const user = await User.findById(userId).select("name avatar");

  // counts
  const totalAppointments = await Appointment.countDocuments({
    patient: userId,
  });
  const upcomingAppointments = await Appointment.countDocuments({
    patient: userId,
    status: "scheduled",
    appointmentDate: { $gte: new Date() },
  });
  const completedAppointments = await Appointment.countDocuments({
    patient: userId,
    status: "completed",
  });

  const totalOrders = await Order.countDocuments({ user: userId });
  const pendingOrders = await Order.countDocuments({
    user: userId,
    orderStatus: {
      $in: ["pending", "confirmed", "processing", "out_for_delivery"],
    },
  });

  const recentAppointments = await Appointment.find({ patient: userId })
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name avatar" },
    })
    .sort("-createdAt")
    .limit(5);

  const recentOrders = await Order.find({ user: userId })
    .populate("pharmacy", "pharmacyName")
    .sort("-createdAt")
    .limit(5);

  const healthRecord = await HealthRecord.findOne({ user: userId });

  res.status(200).json({
    success: true,
    data: {
      user, // ✅ NOW VALID
      stats: {
        totalAppointments,
        upcomingAppointments,
        completedAppointments,
        totalOrders,
        pendingOrders,
      },
      recentAppointments,
      recentOrders,
      healthRecord,
    },
  });
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    bloodGroup: req.body.bloodGroup,
    emergencyContact: req.body.emergencyContact,
    avatar: req.body.avatar,
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(
    (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key],
  );

  const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get user appointments
// @route   GET /api/user/appointments
// @access  Private
exports.getAppointments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { patient: req.user._id };
  if (status) filter.status = status;

  const appointments = await Appointment.find(filter)
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name avatar email phone" },
    })
    .sort("-appointmentDate")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: appointments.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: appointments,
  });
});

// @desc    Get user orders
// @route   GET /api/user/orders
// @access  Private
exports.getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };
  if (status) filter.orderStatus = status;

  const orders = await Order.find(filter)
    .populate("pharmacy", "pharmacyName contactNumber address")
    .sort("-createdAt")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: orders,
  });
});

// @desc    Get user health records
// @route   GET /api/user/health-records
// @access  Private
exports.getHealthRecords = asyncHandler(async (req, res) => {
  let healthRecord = await HealthRecord.findOne({ user: req.user._id });

  // Create empty record if doesn't exist
  if (!healthRecord) {
    healthRecord = await HealthRecord.create({
      user: req.user._id,
      vitals: {},
      allergies: [],
      chronicConditions: [],
      medications: [],
    });
  }

  res.status(200).json({
    success: true,
    data: healthRecord,
  });
});

// @desc    Update health vitals
// @route   PUT /api/user/health-records/vitals
// @access  Private
exports.updateVitals = asyncHandler(async (req, res) => {
  const { vitalType, value, unit } = req.body;

  if (!vitalType || value === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide vital type and value",
    });
  }

  let healthRecord = await HealthRecord.findOne({ user: req.user._id });

  if (!healthRecord) {
    healthRecord = await HealthRecord.create({ user: req.user._id });
  }

  // Update specific vital
  const vitalData = {
    value,
    recordedAt: new Date(),
  };
  if (unit) vitalData.unit = unit;

  // Handle blood pressure separately (has systolic/diastolic)
  if (vitalType === "bloodPressure") {
    healthRecord.vitals.bloodPressure = {
      systolic: req.body.systolic,
      diastolic: req.body.diastolic,
      unit: "mmHg",
      recordedAt: new Date(),
    };
  } else if (vitalType === "bloodSugar") {
    healthRecord.vitals.bloodSugar = {
      value,
      type: req.body.type || "random",
      unit: unit || "mg/dL",
      recordedAt: new Date(),
    };
  } else {
    healthRecord.vitals[vitalType] = vitalData;
  }

  // Calculate BMI if height and weight are available
  if (healthRecord.vitals.height?.value && healthRecord.vitals.weight?.value) {
    const heightInMeters = healthRecord.vitals.height.value / 100;
    const bmi = (
      healthRecord.vitals.weight.value /
      (heightInMeters * heightInMeters)
    ).toFixed(2);
    healthRecord.vitals.bmi = {
      value: parseFloat(bmi),
      recordedAt: new Date(),
    };
  }

  await healthRecord.save();

  res.status(200).json({
    success: true,
    message: "Vitals updated successfully",
    data: healthRecord,
  });
});

// @desc    Add allergy
// @route   POST /api/user/health-records/allergies
// @access  Private
exports.addAllergy = asyncHandler(async (req, res) => {
  const { allergen, severity, reaction } = req.body;

  if (!allergen) {
    return res.status(400).json({
      success: false,
      message: "Please provide allergen name",
    });
  }

  let healthRecord = await HealthRecord.findOne({ user: req.user._id });

  if (!healthRecord) {
    healthRecord = await HealthRecord.create({ user: req.user._id });
  }

  healthRecord.allergies.push({ allergen, severity, reaction });
  await healthRecord.save();

  res.status(200).json({
    success: true,
    message: "Allergy added successfully",
    data: healthRecord,
  });
});

// @desc    Add medication
// @route   POST /api/user/health-records/medications
// @access  Private
exports.addMedication = asyncHandler(async (req, res) => {
  const { name, dosage, frequency, startDate, prescribedBy } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please provide medication name",
    });
  }

  let healthRecord = await HealthRecord.findOne({ user: req.user._id });

  if (!healthRecord) {
    healthRecord = await HealthRecord.create({ user: req.user._id });
  }

  healthRecord.medications.push({
    name,
    dosage,
    frequency,
    startDate,
    prescribedBy,
    isActive: true,
  });

  await healthRecord.save();

  res.status(200).json({
    success: true,
    message: "Medication added successfully",
    data: healthRecord,
  });
});

// @desc    Upload medical document
// @route   POST /api/user/health-records/documents
// @access  Private
exports.uploadDocument = asyncHandler(async (req, res) => {
  const { documentType, documentName, documentUrl } = req.body;

  if (!documentType || !documentName || !documentUrl) {
    return res.status(400).json({
      success: false,
      message: "Please provide all document details",
    });
  }

  let healthRecord = await HealthRecord.findOne({ user: req.user._id });

  if (!healthRecord) {
    healthRecord = await HealthRecord.create({ user: req.user._id });
  }

  healthRecord.medicalDocuments.push({
    documentType,
    documentName,
    documentUrl,
    uploadedAt: new Date(),
  });

  await healthRecord.save();

  res.status(200).json({
    success: true,
    message: "Document uploaded successfully",
    data: healthRecord,
  });
});

// @desc    Get user settings
// @route   GET /api/user/settings
// @access  Private
exports.getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    data: {
      notifications: {
        email: user.isEmailVerified || false,
        sms: user.isPhoneVerified || false,
      },
      privacy: {
        profileVisibility: "private",
        shareHealthData: false,
      },
    },
  });
});

// @desc    Update user settings
// @route   PUT /api/user/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res) => {
  const { notifications, privacy } = req.body;

  // Update settings logic here
  // For now, just return success

  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: {
      notifications,
      privacy,
    },
  });
});

exports.submitRoleRequest = asyncHandler(async (req, res) => {
  const { requestedRole, formData } = req.body;
  const userId = req.user._id;

  if (!["doctor", "pharmacy"].includes(requestedRole)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid role requested" });
  }

  const existingRequest = await RoleRequest.findOne({
    user: userId,
    status: "pending",
  });
  if (existingRequest) {
    return res
      .status(400)
      .json({ success: false, message: "You already have a pending request" });
  }

  const roleRequest = await RoleRequest.create({
    user: userId,
    requestedRole,
    formData,
  });

  res.status(201).json({
    success: true,
    message: "Role request submitted successfully",
    data: roleRequest,
  });
});
