// const mongoose = require("mongoose");

// const pharmacySchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     pharmacyName: {
//       type: String,
//       required: [true, "Please provide pharmacy name"],
//     },
//     licenseNumber: {
//       type: String,
//       required: [true, "Please provide pharmacy license number"],
//       unique: true,
//     },
//     gstNumber: {
//       type: String,
//       unique: true,
//     },
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//       landmark: String,
//     },
//     contactNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     operatingHours: {
//       opening: String, // "08:00"
//       closing: String, // "22:00"
//     },
//     workingDays: [String], // ['Monday', 'Tuesday', ...]
//     serviceType: {
//       type: [String],
//       enum: ["home_delivery", "pickup", "both"],
//       default: ["both"],
//     },
//     deliveryRadius: {
//       type: Number, // in km
//       default: 10,
//     },
//     minimumOrderAmount: {
//       type: Number,
//       default: 0,
//     },
//     deliveryCharges: {
//       type: Number,
//       default: 50,
//     },
//     // Verification Fields
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     verificationStatus: {
//       type: String,
//       enum: ["pending", "verified", "rejected"],
//       default: "pending",
//     },
//     documents: {
//       pharmacyLicense: String, // URL
//       gstCertificate: String,
//       ownerIdProof: String,
//       shopImage: String,
//     },
//     rejectionReason: String,
//     verifiedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     verifiedAt: Date,
//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//     },
//     totalRatings: {
//       type: Number,
//       default: 0,
//     },
//     totalOrders: {
//       type: Number,
//       default: 0,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// module.exports = mongoose.model("Pharmacy", pharmacySchema);



const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacyName: {
      type: String,
      required: [true, "Please provide pharmacy name"],
    },
    licenseNumber: {
      type: String,
      required: [true, "Please provide pharmacy license number"],
      unique: true,
    },
    gstNumber: {
      type: String,
      unique: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    operatingHours: {
      opening: String, // "08:00"
      closing: String, // "22:00"
    },
    workingDays: [String], // ['Monday', 'Tuesday', ...]
    serviceType: {
      type: [String],
      enum: ["home_delivery", "pickup", "both"],
      default: ["both"],
    },
    deliveryRadius: {
      type: Number, // in km
      default: 10,
    },
    minimumOrderAmount: {
      type: Number,
      default: 0,
    },
    deliveryCharges: {
      type: Number,
      default: 50,
    },

    // Verification & Documents
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
        type: { type: String }, // e.g., "Pharmacy License", "GST Certificate"
        url: String,
      },
    ],
    rejectionReason: String,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: Date,

    // Ratings & Reviews
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// Optional Indexes
pharmacySchema.index({ user: 1, pharmacyName: 1 });

module.exports = mongoose.model("Pharmacy", pharmacySchema);
