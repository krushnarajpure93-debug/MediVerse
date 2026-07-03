const asyncHandler = require("../utils/asyncHandler");
const Doctor = require("../models/Doctor.model");
const User = require("../models/User.model");
const Appointment = require("../models/Appointment.model");

// @desc    Create/Update doctor profile
// @route   POST /api/doctor/profile
// @access  Private/Doctor
exports.createOrUpdateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check if profile already exists
  let doctor = await Doctor.findOne({ user: userId });

  const profileData = {
    user: userId,
    specialization: req.body.specialization,
    qualifications: req.body.qualifications,
    experience: req.body.experience,
    registrationNumber: req.body.registrationNumber,
    registrationCouncil: req.body.registrationCouncil,
    clinicHospitalName: req.body.clinicHospitalName,
    clinicAddress: req.body.clinicAddress,
    consultationFee: req.body.consultationFee,
    availability: req.body.availability,
    languages: req.body.languages,
    about: req.body.about,
    documents: req.body.documents,
  };

  if (doctor) {
    // Update existing profile
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== undefined) {
        doctor[key] = profileData[key];
      }
    });
    await doctor.save();
  } else {
    // Create new profile
    doctor = await Doctor.create(profileData);

    // Update user role to doctor
    // await User.findByIdAndUpdate(userId, { role: "doctor" });

    if (doctor) {
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== undefined) {
          doctor[key] = profileData[key];
        }
      });
      await doctor.save();
    } else {
      doctor = await Doctor.create(profileData);
    }
  }

  res.status(200).json({
    success: true,
    message: doctor.isNew
      ? "Profile created successfully. Waiting for admin verification."
      : "Profile updated successfully",
    data: doctor,
  });
});

// @desc    Get doctor profile
// @route   GET /api/doctor/profile
// @access  Private/Doctor
exports.getProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user._id }).populate(
    "user",
    "name email phone avatar",
  );

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor profile not found",
    });
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

// @desc    Get all doctors (for patients to browse)
// @route   GET /api/doctor/all
// @access  Public
exports.getAllDoctors = asyncHandler(async (req, res) => {
  const {
    specialization,
    search,
    minFee,
    maxFee,
    language,
    page = 1,
    limit = 12,
  } = req.query;

  const skip = (page - 1) * limit;

  // Build filter - only show verified doctors
  const filter = { isVerified: true, verificationStatus: "verified" };

  if (specialization) filter.specialization = specialization;
  if (language) filter.languages = language;
  if (minFee || maxFee) {
    filter.consultationFee = {};
    if (minFee) filter.consultationFee.$gte = parseInt(minFee);
    if (maxFee) filter.consultationFee.$lte = parseInt(maxFee);
  }

  // Search in name or specialization
  if (search) {
    const users = await User.find({
      name: { $regex: search, $options: "i" },
      role: "doctor",
    }).select("_id");

    const userIds = users.map((u) => u._id);
    filter.$or = [
      { user: { $in: userIds } },
      { specialization: { $regex: search, $options: "i" } },
    ];
  }

  const doctors = await Doctor.find(filter)
    .populate("user", "name email phone avatar")
    .sort("-rating -totalConsultations")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Doctor.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: doctors.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: doctors,
  });
});

// @desc    Get doctor by ID
// @route   GET /api/doctor/:id
// @access  Public
exports.getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate(
    "user",
    "name email phone avatar",
  );

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }

  // Only show if verified
  if (!doctor.isVerified) {
    return res.status(403).json({
      success: false,
      message: "Doctor profile is not verified yet",
    });
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

// @desc    Get doctor appointments
// @route   GET /api/doctor/appointments
// @access  Private/Doctor (Verified)
exports.getAppointments = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user._id });

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor profile not found",
    });
  }

  const { status, date, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { doctor: doctor._id };
  if (status) filter.status = status;
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    filter.appointmentDate = { $gte: startDate, $lte: endDate };
  }

  const appointments = await Appointment.find(filter)
    .populate("patient", "name email phone avatar bloodGroup")
    .sort("appointmentDate appointmentTime")
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Appointment.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: appointments.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: appointments,
  });
});

// @desc    Update appointment status
// @route   PUT /api/doctor/appointments/:id/status
// @access  Private/Doctor (Verified)
exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Please provide status",
    });
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }

  // Verify doctor owns this appointment
  const doctor = await Doctor.findOne({ user: req.user._id });
  if (appointment.doctor.toString() !== doctor._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this appointment",
    });
  }

  appointment.status = status;
  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment status updated",
    data: appointment,
  });
});

// @desc    Add prescription to appointment
// @route   POST /api/doctor/appointments/:id/prescription
// @access  Private/Doctor (Verified)
exports.addPrescription = asyncHandler(async (req, res) => {
  const { medicines, diagnosis, notes, tests, followUpDate } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }

  // Verify doctor owns this appointment
  const doctor = await Doctor.findOne({ user: req.user._id });
  if (appointment.doctor.toString() !== doctor._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to add prescription",
    });
  }

  appointment.prescription = {
    medicines: medicines || [],
    diagnosis,
    notes,
    tests: tests || [],
    followUpDate,
  };

  appointment.status = "completed";
  await appointment.save();

  // Update doctor's consultation count
  doctor.totalConsultations += 1;
  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Prescription added successfully",
    data: appointment,
  });
});

// @desc    Update availability
// @route   PUT /api/doctor/availability
// @access  Private/Doctor (Verified)
exports.updateAvailability = asyncHandler(async (req, res) => {
  const { availability } = req.body;

  if (!availability || !Array.isArray(availability)) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid availability data",
    });
  }

  const doctor = await Doctor.findOne({ user: req.user._id });

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor profile not found",
    });
  }

  doctor.availability = availability;
  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Availability updated successfully",
    data: doctor,
  });
});

// @desc    Get doctor dashboard stats
// @route   GET /api/doctor/dashboard
// @access  Private/Doctor (Verified)
exports.getDashboard = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ user: req.user._id });

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor profile not found",
    });
  }

  const totalAppointments = await Appointment.countDocuments({
    doctor: doctor._id,
  });

  const todayAppointments = await Appointment.countDocuments({
    doctor: doctor._id,
    appointmentDate: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    },
  });

  const upcomingAppointments = await Appointment.countDocuments({
    doctor: doctor._id,
    status: "scheduled",
    appointmentDate: { $gte: new Date() },
  });

  const completedAppointments = await Appointment.countDocuments({
    doctor: doctor._id,
    status: "completed",
  });

  const recentAppointments = await Appointment.find({ doctor: doctor._id })
    .populate("patient", "name email phone avatar")
    .sort("-createdAt")
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      doctorInfo: doctor,
      stats: {
        totalAppointments,
        todayAppointments,
        upcomingAppointments,
        completedAppointments,
        rating: doctor.rating,
        totalRatings: doctor.totalRatings,
      },
      recentAppointments,
    },
  });
});
