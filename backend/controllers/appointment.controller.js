const asyncHandler = require("../utils/asyncHandler");
const Appointment = require("../models/Appointment.model");
const Doctor = require("../models/Doctor.model");
const User = require("../models/User.model"); // ✅ Add this import
const sendEmail = require("../utils/sendEmail");
const { emailTemplates } = require("../utils/sendEmail");

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = asyncHandler(async (req, res) => {
  const {
    doctor,
    appointmentDate,
    appointmentTime,
    consultationType,
    symptoms,
    medicalHistory,
  } = req.body;

  // Validate required fields
  if (!doctor || !appointmentDate || !appointmentTime || !symptoms) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // Check if doctor exists and is verified
  const doctorDoc = await Doctor.findById(doctor).populate("user");
  if (!doctorDoc || !doctorDoc.isVerified) {
    return res.status(400).json({
      success: false,
      message: "Doctor not available",
    });
  }

  // ✅ Get patient details with name
  const patient = await User.findById(req.user._id).select("name email");

  if (!patient) {
    return res.status(400).json({
      success: false,
      message: "Patient not found",
    });
  }

  // Create appointment
  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    appointmentDate,
    appointmentTime,
    consultationType: consultationType || "video",
    symptoms,
    medicalHistory,
    consultationFee: doctorDoc.consultationFee,
    paymentStatus: "pending",
  });

  // Populate appointment details
  await appointment.populate([
    { path: "patient", select: "name email phone" },
    { path: "doctor", populate: { path: "user", select: "name email" } },
  ]);

  // Send confirmation email
  try {
    // ✅ Use the patient variable we fetched
    await sendEmail({
      email: patient.email,
      subject: "Appointment Confirmed - AIPP Healthcare",
      html: emailTemplates.appointmentConfirmation(
        patient.name || "Patient", // ✅ Fallback to "Patient" if name is null
        doctorDoc.user?.name || "Doctor", // ✅ Safe navigation
        new Date(appointmentDate).toLocaleDateString(),
        appointmentTime,
      ),
    });
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
    // ✅ Don't fail the appointment creation if email fails
  }

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    data: appointment,
  });
});

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("patient", "name email phone bloodGroup")
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name email avatar" },
    });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }

  // Check ownership
  if (appointment.patient._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to access this appointment",
    });
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

// @desc    Get user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
exports.getUserAppointments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { patient: req.user._id };
  if (status) filter.status = status;

  const appointments = await Appointment.find(filter)
    .populate({
      path: "doctor",
      populate: { path: "user", select: "name avatar email" },
    })
    .sort("-appointmentDate")
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

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
exports.cancelAppointment = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }

  // Check ownership
  if (appointment.patient.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this appointment",
    });
  }

  // Check if can be cancelled
  if (["completed", "cancelled"].includes(appointment.status)) {
    return res.status(400).json({
      success: false,
      message: `Appointment cannot be cancelled. Current status: ${appointment.status}`,
    });
  }

  appointment.status = "cancelled";
  appointment.cancelledBy = "patient";
  appointment.cancellationReason = reason || "Cancelled by patient";
  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
    data: appointment,
  });
});

// @desc    Rate appointment
// @route   POST /api/appointments/:id/rate
// @access  Private
exports.rateAppointment = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid rating (1-5)",
    });
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });
  }

  // Check ownership
  if (appointment.patient.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to rate this appointment",
    });
  }

  // Check if completed
  if (appointment.status !== "completed") {
    return res.status(400).json({
      success: false,
      message: "Can only rate completed appointments",
    });
  }

  // Check if already rated
  if (appointment.rating) {
    return res.status(400).json({
      success: false,
      message: "Appointment already rated",
    });
  }

  appointment.rating = rating;
  appointment.review = review || "";
  await appointment.save();

  // Update doctor rating
  const doctor = await Doctor.findById(appointment.doctor);
  if (doctor) {
    const totalRatings = doctor.totalRatings + 1;
    const newRating =
      (doctor.rating * doctor.totalRatings + rating) / totalRatings;
    doctor.rating = parseFloat(newRating.toFixed(1));
    doctor.totalRatings = totalRatings;
    await doctor.save();
  }

  res.status(200).json({
    success: true,
    message: "Thank you for rating!",
    data: appointment,
  });
});
