const express = require("express");
const multer = require("multer");

const {
  // Pharmacy Profile
  createOrUpdateProfile,
  getProfile,
  getAllPharmacies,
  getPharmacyById,
  getDashboard,
  updateAvailability,

  // Pharmacy Order Management
  getOrders,
  updateOrderStatus,
  verifyPrescription,

  // User Order APIs
  createOrder,
  getOrderById,
  cancelOrder,

  // Medicine APIs
  getAllMedicines,
  getMedicineById,

  // Prescription
  uploadPrescription,
} = require("../controllers/pharmacy.controller");

const { protect, authorize } = require("../middlewares/auth.middleware");
const { checkPharmacyVerification } = require("../middlewares/role.middleware");

const router = express.Router();

/* =====================================================
   📌 PUBLIC ROUTES
===================================================== */

// Medicines (specific routes first)
router.get("/medicines", getAllMedicines);
router.get("/medicines/:id", getMedicineById);

// Pharmacy browsing
router.get("/all", getAllPharmacies);
router.get("/:id", getPharmacyById);

/* =====================================================
   📌 USER ORDER ROUTES (Logged-in Users)
===================================================== */

router.post("/orders", protect, createOrder);
router.get("/orders/:id", protect, getOrderById);
router.put("/orders/:id/cancel", protect, cancelOrder);

/* =====================================================
   📌 PRESCRIPTION UPLOAD
===================================================== */

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/prescriptions/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/prescriptions",
  protect,
  upload.single("prescription"),
  uploadPrescription,
);

/* =====================================================
   📌 PHARMACY PRIVATE ROUTES
===================================================== */

router.use(protect);
router.use(authorize("pharmacy"));

router.post("/profile", createOrUpdateProfile);
router.get("/profile/me", getProfile);

router.get("/dashboard", checkPharmacyVerification, getDashboard);
router.get("/my-orders", checkPharmacyVerification, getOrders);
router.put(
  "/my-orders/:id/status",
  checkPharmacyVerification,
  updateOrderStatus,
);
router.put(
  "/my-orders/:id/verify-prescription",
  checkPharmacyVerification,
  verifyPrescription,
);
router.put("/availability", checkPharmacyVerification, updateAvailability);

module.exports = router;
