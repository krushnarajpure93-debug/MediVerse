const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: [true, "Please provide specialization"],
      enum: [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Gynecologist",
        "Orthopedic",
        "Neurologist",
        "Psychiatrist",
        "Dentist",
        "ENT Specialist",
        "Ophthalmologist",
        "Radiologist",
        "Surgeon",
        "Other",
      ],
    },
    qualifications: [
      {
        degree: String,
        institution: String,
        year: Number,
        type: { type: String }, // Optional: MBBS, MD, Diploma etc.
      },
    ],
    experience: {
      type: Number, // in years
      required: [true, "Please provide years of experience"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Please provide medical registration number"],
      unique: true,
    },
    registrationCouncil: {
      type: String,
      required: true,
    },
    clinicHospitalName: String,
    clinicAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 500,
    },
    currency: { type: String, default: "INR" },
    availability: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        slots: [
          {
            startTime: Date,
            endTime: Date,
            booking: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment",
            },
          },
        ],
      },
    ],
    languages: [
      {
        type: String,
        enum: ["English", "Hindi", "Marathi", "Telugu", "Tamil", "Other"],
      },
    ],
    about: {
      type: String,
      maxlength: 500,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    totalConsultations: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    // Verification Fields
    isVerified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verificationLogs: [
      {
        status: { type: String, enum: ["pending", "verified", "rejected"] },
        reason: String,
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
      },
    ],
    documents: [
      {
        type: { type: String },
        url: { type: String },
      },
    ],
    rejectionReason: String,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: Date,
    contact: {
      phone: String,
      email: String,
      website: String,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  },
);

// Optional Indexes for faster queries
doctorSchema.index({ user: 1, specialization: 1 });

module.exports = mongoose.model("Doctor", doctorSchema);
