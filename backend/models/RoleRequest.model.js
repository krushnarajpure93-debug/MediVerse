const mongoose = require("mongoose");

const roleRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestedRole: {
    type: String,
    enum: ["doctor", "pharmacy"],
    required: true,
  },
  formData: { type: Object, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  submittedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewedAt: { type: Date },
  rejectionReason: { type: String },
});

module.exports =
  mongoose.models.RoleRequest ||
  mongoose.model("RoleRequest", roleRequestSchema);
