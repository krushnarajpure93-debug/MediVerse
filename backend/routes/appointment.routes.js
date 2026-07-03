const express = require("express");
const {
  createAppointment,
  getAppointmentById,
  getUserAppointments,
  cancelAppointment,
  rateAppointment,
} = require("../controllers/appointment.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// All routes are protected
router.use(protect);

// Create appointment (book consultation)
router.post("/", createAppointment);

// Get user's appointments
router.get("/my-appointments", getUserAppointments);

// Get specific appointment
router.get("/:id", getAppointmentById);

// Cancel appointment
router.put("/:id/cancel", cancelAppointment);

// Rate appointment
router.post("/:id/rate", rateAppointment);

module.exports = router;
