const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User.model");
const Doctor = require("../models/Doctor.model");
const Pharmacy = require("../models/Pharmacy.model");
const { sendTokenResponse } = require("../utils/generateToken");
const { sendEmail, emailTemplates } = require("../utils/sendEmail");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email or phone already exists",
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role || "user",
  });

  // Send welcome email
  try {
    await sendEmail({
      email: user.email,
      subject: "Welcome to AIPP Healthcare!",
      html: emailTemplates.welcome(user.name),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }

  // Send token response
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  // Check for user (include password)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Check if account is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: "Your account has been deactivated. Please contact support.",
    });
  }

  // Update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // Send token response
  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  // Get additional profile based on role
  let profile = null;

  if (user.role === "doctor") {
    profile = await Doctor.findOne({ user: user._id });
  } else if (user.role === "pharmacy") {
    profile = await Pharmacy.findOne({ user: user._id });
  }

  res.status(200).json({
    success: true,
    data: {
      user,
      profile,
    },
  });
});

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    bloodGroup: req.body.bloodGroup,
    emergencyContact: req.body.emergencyContact,
  };

  const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  // Generate reset token (simplified - you should use crypto for production)
  const resetToken = Math.random().toString(36).substring(7);

  // In production, save this token with expiry in database
  // user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  // await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    <h2>Password Reset Request</h2>
    <p>You are receiving this email because you (or someone else) has requested a password reset.</p>
    <p>Please click on the following link to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <p>This link will expire in 10 minutes.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Email could not be sent",
    });
  }
});
