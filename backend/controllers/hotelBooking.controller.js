const asyncHandler = require("../utils/asyncHandler");
const HotelBooking = require("../models/HotelBooking.model");

exports.createHotelBooking = asyncHandler(async (req, res) => {
    const booking = await HotelBooking.create(req.body);
    res.status(201).json({ success: true, data: booking });
});

exports.getHotelBookings = asyncHandler(async (req, res) => {
    const bookings = await HotelBooking.find().sort("-createdAt");
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
});
