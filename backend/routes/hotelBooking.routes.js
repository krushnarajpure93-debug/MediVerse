const express = require("express");
const { createHotelBooking, getHotelBookings } = require("../controllers/hotelBooking.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getHotelBookings);
router.post("/", protect, createHotelBooking);

module.exports = router;
