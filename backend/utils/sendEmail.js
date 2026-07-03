const nodemailer = require("nodemailer");
const config = require("../config/env");

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });

  // Email options
  const mailOptions = {
    from: `AIPP Healthcare <${config.email.user}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error("Email could not be sent");
  }
};

// Email Templates
const emailTemplates = {
  welcome: (name) => `
    <h2>Welcome to AIPP Healthcare, ${name}! 🏥</h2>
    <p>Your account has been created successfully.</p>
    <p>You can now access our services:</p>
    <ul>
      <li>Consult with doctors</li>
      <li>Order medicines</li>
      <li>Track your health</li>
      <li>Emergency services</li>
    </ul>
    <p>Thank you for choosing AIPP!</p>
  `,

  appointmentConfirmation: (patientName, doctorName, date, time) => `
    <h2>Appointment Confirmed ✅</h2>
    <p>Dear ${patientName},</p>
    <p>Your appointment has been confirmed with <strong>Dr. ${doctorName}</strong></p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p>Please join on time. You will receive a reminder 30 minutes before.</p>
  `,

  orderConfirmation: (name, orderNumber, total) => `
    <h2>Order Confirmed 🎉</h2>
    <p>Dear ${name},</p>
    <p>Your order <strong>#${orderNumber}</strong> has been confirmed.</p>
    <p><strong>Total Amount:</strong> ₹${total}</p>
    <p>Your medicines will be delivered soon.</p>
  `,

  doctorVerified: (doctorName) => `
    <h2>Congratulations Dr. ${doctorName}! 🎉</h2>
    <p>Your profile has been <strong>verified</strong> by our admin team.</p>
    <p>You can now:</p>
    <ul>
      <li>Accept patient appointments</li>
      <li>Provide consultations</li>
      <li>Prescribe medicines</li>
    </ul>
    <p>Welcome to AIPP Healthcare Platform!</p>
  `,

  doctorRejected: (doctorName, reason) => `
    <h2>Profile Verification Update</h2>
    <p>Dear Dr. ${doctorName},</p>
    <p>Unfortunately, your profile verification was not successful.</p>
    <p><strong>Reason:</strong> ${reason}</p>
    <p>Please update your documents and resubmit for verification.</p>
    <p>Contact support if you need assistance.</p>
  `,

  pharmacyVerified: (pharmacyName) => `
    <h2>Congratulations ${pharmacyName}! 🎉</h2>
    <p>Your pharmacy has been <strong>verified</strong> by our admin team.</p>
    <p>You can now:</p>
    <ul>
      <li>Receive medicine orders</li>
      <li>Manage inventory</li>
      <li>Process prescriptions</li>
    </ul>
    <p>Welcome to AIPP Healthcare Platform!</p>
  `,
};

module.exports = { sendEmail, emailTemplates };
