const asyncHandler = require("../utils/asyncHandler");
const Hospital = require("../models/Hospital.model");

exports.createHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
});

exports.getHospitals = asyncHandler(async (req, res) => {
    const hospitals = await Hospital.find({ isActive: true }).sort("-createdAt");
    res.status(200).json({ success: true, count: hospitals.length, data: hospitals });
});
