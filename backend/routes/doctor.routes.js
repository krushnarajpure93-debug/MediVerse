// const express = require("express");
// const {
//   createOrUpdateProfile,
//   getProfile,
//   getAllDoctors,
//   getDoctorById,
//   getAppointments,
//   updateAppointmentStatus,
//   addPrescription,
//   updateAvailability,
//   getDashboard,
// } = require("../controllers/doctor.controller");
// const { protect, authorize } = require("../middlewares/auth.middleware"); // ✅ Fixed
// const { checkDoctorVerification } = require("../middlewares/role.middleware"); // ✅ Fixed

// const router = express.Router();

// router.get("/all", getAllDoctors);
// router.get("/:id", getDoctorById);

// router.use(protect);
// router.use(authorize("doctor"));

// router.post("/profile", createOrUpdateProfile);
// router.get("/profile/me", getProfile);

// router.get("/dashboard", checkDoctorVerification, getDashboard);
// router.get("/appointments", checkDoctorVerification, getAppointments);
// router.put(
//   "/appointments/:id/status",
//   checkDoctorVerification,
//   updateAppointmentStatus,
// );
// router.post(
//   "/appointments/:id/prescription",
//   checkDoctorVerification,
//   addPrescription,
// );
// router.put("/availability", checkDoctorVerification, updateAvailability);

// module.exports = router;

const express = require("express");
const {
  createOrUpdateProfile,
  getProfile,
  getAllDoctors,
  getDoctorById,
  getAppointments,
  updateAppointmentStatus,
  addPrescription,
  updateAvailability,
  getDashboard,
} = require("../controllers/doctor.controller");

const { protect, authorize } = require("../middlewares/auth.middleware");
const { checkDoctorVerification } = require("../middlewares/role.middleware");

const router = express.Router();

// -------------------
// Public routes
// -------------------
router.get("/all", getAllDoctors); // Get all verified doctors
router.get("/:id", getDoctorById); // Get doctor by ID (public)

// -------------------
// Protected doctor routes
// -------------------
router.use(protect); // User must be logged in
router.use(authorize("doctor")); // Only role "doctor"

// Profile routes
router.post("/profile", createOrUpdateProfile);
router.get("/profile/me", getProfile);

// Verified doctor routes
const verifyDoctor = [checkDoctorVerification]; // Reusable middleware

router.get("/dashboard", verifyDoctor, getDashboard);
router.get("/appointments", verifyDoctor, getAppointments);
router.put("/appointments/:id/status", verifyDoctor, updateAppointmentStatus);
router.post("/appointments/:id/prescription", verifyDoctor, addPrescription);
router.put("/availability", verifyDoctor, updateAvailability);

module.exports = router;
