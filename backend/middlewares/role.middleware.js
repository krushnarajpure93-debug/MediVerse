const asyncHandler = require("../utils/asyncHandler");
const Doctor = require("../models/Doctor.model");
const Pharmacy = require("../models/Pharmacy.model");

// Check if doctor is verified
exports.checkDoctorVerification = asyncHandler(async (req, res, next) => {
  // Find doctor profile
  const doctor = await Doctor.findOne({ user: req.user._id });

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor profile not found",
    });
  }

  // Check verification status
  if (!doctor.isVerified || doctor.verificationStatus !== "verified") {
    return res.status(403).json({
      success: false,
      message:
        "Your profile is pending verification. You cannot access this feature yet.",
      verificationStatus: doctor.verificationStatus,
    });
  }

  // Attach doctor to request
  req.doctor = doctor;
  next();
});

// Check if pharmacy is verified
exports.checkPharmacyVerification = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findOne({ user: req.user._id });

  if (!pharmacy) {
    return res.status(404).json({
      success: false,
      message: "Pharmacy profile not found",
    });
  }

  if (!pharmacy.isVerified || pharmacy.verificationStatus !== "verified") {
    return res.status(403).json({
      success: false,
      message:
        "Your pharmacy is pending verification. You cannot access this feature yet.",
      verificationStatus: pharmacy.verificationStatus,
    });
  }

  if (!pharmacy.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your pharmacy account is currently inactive.",
    });
  }

  req.pharmacy = pharmacy; // Attach pharmacy info to request
  next();
});

// Admin only routes
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// Check if user owns the resource
exports.checkOwnership = (model) => {
  return asyncHandler(async (req, res, next) => {
    const resourceId = req.params.id;
    const resource = await model.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    const isOwner = resource.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    req.resource = resource;
    next();
  });
};
