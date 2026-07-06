const express = require("express");
const { createBusBooking, getBusBookings } = require("../controllers/busBooking.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getBusBookings);
router.post("/", protect, createBusBooking);

module.exports = router;
