const asyncHandler = require("../utils/asyncHandler");
const RoleRequest = require("../models/RoleRequest.model");
const User = require("../models/User.model");

// User submits role request
exports.submitRoleRequest = asyncHandler(async (req, res) => {
  const { requestedRole, formData } = req.body;

  if (!requestedRole || !formData) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  const existing = await RoleRequest.findOne({
    user: req.user._id,
    status: "pending",
  });

  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "You already have a pending request" });
  }

  const request = await RoleRequest.create({
    user: req.user._id,
    requestedRole,
    formData,
  });

  res
    .status(200)
    .json({ success: true, message: "Role request submitted", data: request });
});

// // Admin reviews request
// exports.reviewRoleRequest = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { action, rejectionReason } = req.body; // 'approve' | 'reject'

//   const request = await RoleRequest.findById(id).populate("user");
//   if (!request)
//     return res
//       .status(404)
//       .json({ success: false, message: "Request not found" });

//   if (action === "approve") {
//     request.user.role = request.requestedRole;
//     await request.user.save();

//     request.status = "approved";
//     request.reviewedBy = req.user._id;
//     request.reviewedAt = new Date();
//     await request.save();

//     return res.status(200).json({ success: true, message: "Role approved" });
//   }

//   if (action === "reject") {
//     request.status = "rejected";
//     request.rejectionReason = rejectionReason;
//     request.reviewedBy = req.user._id;
//     request.reviewedAt = new Date();
//     await request.save();

//     return res
//       .status(200)
//       .json({ success: true, message: "Role request rejected" });
//   }

//   res.status(400).json({ success: false, message: "Invalid action" });
// });

// // Admin lists all role requests
// exports.getRoleRequests = asyncHandler(async (req, res) => {
//   const requests = await RoleRequest.find()
//     .populate("user", "name email role")
//     .sort("-submittedAt");

//   res.status(200).json({ success: true, data: requests });
// });
