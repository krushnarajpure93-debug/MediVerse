const jwt = require("jsonwebtoken");
const config = require("../config/env");

/**
 * Generate JWT Token
 * @param {String} userId - User's MongoDB _id
 * @returns {String} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire, // '7d' from .env
  });
};

/**
 * Send token response with cookie
 * @param {Object} user - User object from database
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Generate JWT token
  const token = generateToken(user._id);

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    ),
    httpOnly: true, // Cannot be accessed by JavaScript (XSS protection)
    secure: config.nodeEnv === "production", // Only HTTPS in production
    sameSite: "strict", // CSRF protection
  };

  // Send response with cookie and JSON
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isActive: user.isActive,
        // Don't send password
      },
    });
};

/**
 * Verify JWT Token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Decode JWT Token without verification (for debugging)
 * @param {String} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate refresh token (for future implementation)
 * @param {String} userId - User's MongoDB _id
 * @returns {String} Refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "30d", // Refresh token valid for 30 days
  });
};

module.exports = {
  generateToken,
  sendTokenResponse,
  verifyToken,
  decodeToken,
  generateRefreshToken,
};
