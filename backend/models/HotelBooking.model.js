const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
    {
        guestName: { type: String, required: true },
        phone: { type: String, required: true },
        hotelName: { type: String, required: true },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        rooms: { type: Number, default: 1 },
        status: { type: String, default: "booked" },
    },
    { timestamps: true },
);

module.exports = mongoose.model("HotelBooking", hotelBookingSchema);
