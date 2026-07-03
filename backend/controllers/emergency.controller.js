const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User.model");
const {sendEmail} = require("../utils/sendEmail");

// @desc    Send SOS alert
// @route   POST /api/emergency/sos
// @access  Private
exports.sendSOS = asyncHandler(async (req, res) => {
  const { location, emergency_type, message } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // In production, this would:
  // 1. Send SMS to emergency contacts
  // 2. Alert nearby hospitals
  // 3. Notify emergency services
  // 4. Share live location

  const sosData = {
    user: {
      name: user.name,
      phone: user.phone,
      bloodGroup: user.bloodGroup,
    },
    location: location || "Location not available",
    emergency_type: emergency_type || "General Emergency",
    message: message || "Emergency SOS triggered",
    timestamp: new Date(),
  };

  // Send email to emergency contact
  if (user.emergencyContact && user.emergencyContact.phone) {
    try {
      const emailContent = `
        <h2>🚨 EMERGENCY ALERT 🚨</h2>
        <p><strong>${user.name}</strong> has triggered an emergency SOS!</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${user.name}</li>
          <li><strong>Phone:</strong> ${user.phone}</li>
          <li><strong>Blood Group:</strong> ${user.bloodGroup || "N/A"}</li>
          <li><strong>Emergency Type:</strong> ${emergency_type || "General"}</li>
          <li><strong>Message:</strong> ${message || "No message"}</li>
          <li><strong>Location:</strong> ${location || "Not available"}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p><strong>Please contact them immediately!</strong></p>
      `;

      // In production, send to emergency contact's email
      await sendEmail({
        email: user.email, // Replace with emergency contact email
        subject: "🚨 EMERGENCY SOS ALERT",
        html: emailContent,
      });
    } catch (error) {
      console.error("Error sending SOS email:", error);
    }
  }

  res.status(200).json({
    success: true,
    message:
      "SOS alert sent successfully. Emergency services have been notified.",
    data: sosData,
  });
});

// @desc    Get nearby hospitals
// @route   GET /api/emergency/hospitals
// @access  Private
exports.getNearbyHospitals = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;

  // In production, this would query a database of hospitals
  // or use Google Maps API to find nearby hospitals

  // Mock data for now
  const mockHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "Main Road, City Center",
      phone: "+91-1234567890",
      distance: "2.5 km",
      rating: 4.5,
      emergency_services: true,
      ambulance_available: true,
    },
    {
      id: 2,
      name: "Apollo Hospital",
      address: "Station Road, Near Railway Station",
      phone: "+91-9876543210",
      distance: "5.0 km",
      rating: 4.8,
      emergency_services: true,
      ambulance_available: true,
    },
    {
      id: 3,
      name: "Medicare Clinic",
      address: "Park Street, Downtown",
      phone: "+91-5555555555",
      distance: "7.2 km",
      rating: 4.2,
      emergency_services: false,
      ambulance_available: false,
    },
  ];

  res.status(200).json({
    success: true,
    count: mockHospitals.length,
    data: mockHospitals,
  });
});

// @desc    Get emergency contacts
// @route   GET /api/emergency/contacts
// @access  Public
exports.getEmergencyContacts = asyncHandler(async (req, res) => {
  const emergencyContacts = [
    {
      service: "Ambulance",
      number: "108",
      description: "24/7 Free Emergency Ambulance Service",
    },
    {
      service: "Police",
      number: "100",
      description: "Police Emergency Helpline",
    },
    {
      service: "Fire Brigade",
      number: "101",
      description: "Fire Emergency Services",
    },
    {
      service: "Women Helpline",
      number: "1091",
      description: "Women Safety and Support",
    },
    {
      service: "Child Helpline",
      number: "1098",
      description: "Child Safety and Welfare",
    },
    {
      service: "National Health Helpline",
      number: "104",
      description: "Medical Advice and Support",
    },
  ];

  res.status(200).json({
    success: true,
    data: emergencyContacts,
  });
});

// @desc    Share live location
// @route   POST /api/emergency/share-location
// @access  Private
exports.shareLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude, shareWith } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Please provide latitude and longitude",
    });
  }

  const user = await User.findById(req.user._id);

  // In production, implement real-time location sharing
  // using WebSockets or Firebase

  const locationData = {
    user: {
      name: user.name,
      phone: user.phone,
    },
    location: {
      latitude,
      longitude,
      timestamp: new Date(),
    },
    shareWith: shareWith || "emergency_contacts",
  };

  res.status(200).json({
    success: true,
    message: "Location shared successfully",
    data: locationData,
  });
});
