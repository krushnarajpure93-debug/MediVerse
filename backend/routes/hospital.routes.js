const express = require("express");
const { createHospital, getHospitals } = require("../controllers/hospital.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getHospitals);
router.post("/", protect, createHospital);

module.exports = router;
