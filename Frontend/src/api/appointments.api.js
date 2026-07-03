import axios from "./axios";

/* =====================================================
   📌 APPOINTMENT APIs
===================================================== */

// Create Appointment
export const createAppointment = async (data) => {
  const res = await axios.post("/appointments", data);
  return res.data;
};

// Get All My Appointments
export const getMyAppointments = async () => {
  const res = await axios.get("/appointments/my-appointments");
  return res.data;
};

// Get Recent User Appointments (Dashboard)
export const fetchUserAppointments = async (limit = 5) => {
  const res = await axios.get(`/user/appointments?limit=${limit}`);
  return res.data;
};

// Cancel Appointment
export const cancelAppointment = async (id, reason) => {
  const res = await axios.put(`/appointments/${id}/cancel`, { reason });
  return res.data;
};

// Rate Appointment
export const rateAppointment = async (id, rating, review) => {
  const res = await axios.post(`/appointments/${id}/rate`, {
    rating,
    review,
  });
  return res.data;
};
