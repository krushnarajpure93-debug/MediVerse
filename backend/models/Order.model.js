const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        medicineName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        manufacturer: String,
        expiryDate: Date,
      },
    ],
    prescription: {
      required: {
        type: Boolean,
        default: false,
      },
      imageUrl: String, // Prescription image
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
      },
    },
    deliveryAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
      },
      deliveryCharges: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online", "wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    transactionId: String,
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],
    estimatedDelivery: Date,
    deliveredAt: Date,
    cancelledBy: {
      type: String,
      enum: ["user", "pharmacy", "admin"],
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

// Generate unique order number
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD${Date.now()}${count + 1}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
