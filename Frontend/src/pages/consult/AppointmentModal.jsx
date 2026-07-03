import React, { useState } from "react";
import { createAppointment } from "../../api/appointments.api";

export default function AppointmentModal({ doctor, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConfirm = async () => {
    if (!date || !time) {
      setError("Please select date and time");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createAppointment({
        doctor: doctor._id,
        appointmentDate: date,
        appointmentTime: time,
        consultationType: "video",
        symptoms: "General consultation",
      });

      setSuccess("✅ Appointment booked successfully");

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Book Appointment with {doctor?.user?.name || doctor?.name || "Doctor"}
        </h2>

        {/* Date */}
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />

        {/* Time */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />

        {/* Error */}
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        {/* Success */}
        {success && <p className="text-sm text-green-600 mb-2">{success}</p>}

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>

        {/* Cancel */}
        <button
          disabled={loading}
          className="mt-2 w-full border border-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
