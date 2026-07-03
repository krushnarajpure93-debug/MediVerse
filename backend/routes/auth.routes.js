const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  forgotPassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware"); // ✅ Fixed

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);

router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
