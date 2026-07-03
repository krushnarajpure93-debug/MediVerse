const express = require("express");
const {
  getDashboard,
  getAllUsers,
  getPendingDoctors,
  verifyDoctor,
  rejectDoctor,
  getPendingPharmacies,
  verifyPharmacy,
  rejectPharmacy,
  deleteUser,
  getAllAppointments,
  getAllOrders,
  getRoleRequests, // ✅ New
  reviewRoleRequest, // ✅ New
} = require("../controllers/admin.controller"); // import controller

const { protect, authorize } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));
router.use(adminOnly);

router.get("/dashboard", getDashboard);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/doctors/pending", getPendingDoctors);
router.put("/doctors/:id/verify", verifyDoctor);
router.put("/doctors/:id/reject", rejectDoctor);

router.get("/pharmacies/pending", getPendingPharmacies);
router.put("/pharmacies/:id/verify", verifyPharmacy);
router.put("/pharmacies/:id/reject", rejectPharmacy);

router.get("/appointments", getAllAppointments);
router.get("/orders", getAllOrders);

// ✅ Role Requests
router.get("/role-requests", getRoleRequests);
// router.put("/role-requests/:id", reviewRoleRequest);
router.patch("/role-requests/:id", reviewRoleRequest);

module.exports = router;
