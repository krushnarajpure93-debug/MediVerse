const mongoose = require("mongoose");

const busBookingSchema = new mongoose.Schema(
  {
    passengerName: { type: String, required: true },
    phone: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    travelDate: { type: Date, required: true },
    seats: { type: Number, default: 1 },
    status: { type: String, default: "booked" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BusBooking", busBookingSchema);
