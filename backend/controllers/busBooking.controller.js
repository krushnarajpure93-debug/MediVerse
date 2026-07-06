const asyncHandler = require("../utils/asyncHandler");
const BusBooking = require("../models/BusBooking.model");

exports.createBusBooking = asyncHandler(async (req, res) => {
    const booking = await BusBooking.create(req.body);
    res.status(201).json({ success: true, data: booking });
});

exports.getBusBookings = asyncHandler(async (req, res) => {
    const bookings = await BusBooking.find().sort("-createdAt");
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
});
