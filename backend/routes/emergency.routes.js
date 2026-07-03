const express = require("express");
const {
  sendSOS,
  getNearbyHospitals,
  getEmergencyContacts,
  shareLocation,
} = require("../controllers/emergency.controller");
const { protect, optionalAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/contacts", getEmergencyContacts);
router.get("/hospitals", optionalAuth, getNearbyHospitals);

router.post("/sos", protect, sendSOS);
router.post("/share-location", protect, shareLocation);

module.exports = router;
