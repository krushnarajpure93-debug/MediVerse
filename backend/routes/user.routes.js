const express = require("express");
const {
  getDashboard,
  getProfile,
  updateProfile,
  getAppointments,
  getOrders,
  getHealthRecords,
  updateVitals,
  addAllergy,
  addMedication,
  uploadDocument,
  updateSettings,
  getSettings,
  submitRoleRequest, // ✅ New
} = require("../controllers/user.controller"); // import controller
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/dashboard", getDashboard);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/appointments", getAppointments);
router.get("/orders", getOrders);

router.get("/health-records", getHealthRecords);
router.put("/health-records/vitals", updateVitals);
router.post("/health-records/allergies", addAllergy);
router.post("/health-records/medications", addMedication);
router.post("/health-records/documents", uploadDocument);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// ✅ Role request route
router.post("/role-request", protect, submitRoleRequest);

module.exports = router;
