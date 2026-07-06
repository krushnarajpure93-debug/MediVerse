// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/error.middleware");

// Import routes
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const doctorRoutes = require("./routes/doctor.routes");
const pharmacyRoutes = require("./routes/pharmacy.routes");
const emergencyRoutes = require("./routes/emergency.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const busBookingRoutes = require("./routes/busBooking.routes");
const hotelBookingRoutes = require("./routes/hotelBooking.routes");

// Create Express app
const app = express();

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cookie parser
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/* =====================================================
   API ROUTES
===================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/bus-bookings", busBookingRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AIPP Backend Server is running!",
    timestamp: new Date().toISOString(),
  });
});

/* =====================================================
   ROOT ROUTE
===================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AIPP Healthcare API",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      user: "/api/user",
      doctor: "/api/doctor",
      pharmacy: "/api/pharmacy",
      emergency: "/api/emergency",
      appointments: "/api/appointments",
    },
  });
});

/* =====================================================
   ERROR HANDLING
===================================================== */

app.use(notFound);
app.use(errorHandler);

module.exports = app;
