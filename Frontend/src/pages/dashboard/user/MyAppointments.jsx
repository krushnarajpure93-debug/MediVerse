import React, { useEffect, useState } from "react";
import { fetchUserAppointments } from "../../../api/userAppointments";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await fetchUserAppointments();

        if (res?.success && res.data?.length) {
          setAppointments(res.data);
        } else {
          // 🔹 Temporary sample data
          setAppointments([
            {
              _id: "1",
              doctor: { user: { name: "Dr. Rahul Sharma" } },
              appointmentDate: "2026-01-15",
              mode: "Video Consultation",
              status: "scheduled",
            },
            {
              _id: "2",
              doctor: { user: { name: "Dr. Neha Patil" } },
              appointmentDate: "2026-01-05",
              mode: "Clinic Visit",
              status: "completed",
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading) {
    return (
      <section className="p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-gray-500">Loading appointments...</p>
      </section>
    );
  }

  return (
    <section className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-500">
          You don’t have any appointments yet.
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <AppointmentCard key={appt._id} appointment={appt} />
          ))}
        </div>
      )}
    </section>
  );
}

/* 🔹 Appointment Card */
function AppointmentCard({ appointment }) {
  const statusColor = {
    scheduled: "text-blue-600 bg-blue-50",
    completed: "text-green-600 bg-green-50",
    cancelled: "text-red-600 bg-red-50",
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div className="space-y-1 text-sm">
        <p>
          <strong>Doctor:</strong> {appointment.doctor?.user?.name || "—"}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(appointment.appointmentDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Mode:</strong> {appointment.mode || "—"}
        </p>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
          statusColor[appointment.status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {appointment.status}
      </span>
    </div>
  );
}
