const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String, // "10:00 AM"
      required: true,
    },
    consultationType: {
      type: String,
      enum: ["video", "chat", "in-person"],
      default: "video",
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    symptoms: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    prescription: {
      medicines: [
        {
          name: String,
          dosage: String,
          frequency: String,
          duration: String,
          instructions: String,
        },
      ],
      diagnosis: String,
      notes: String,
      tests: [String],
      followUpDate: Date,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "wallet", "cash"],
    },
    transactionId: String,
    meetingLink: String, // For video calls
    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", "admin"],
    },
    cancellationReason: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
