import React from "react";

const alerts = [
  {
    type: "High Heart Rate",
    message: "Heart rate exceeded 120 bpm",
    color: "red-600",
  },
  {
    type: "Low Oxygen",
    message: "Oxygen level dropped below 90%",
    color: "yellow-500",
  },
];

export default function HealthAlerts() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Health Alerts
      </h2>
      <div className="flex flex-col gap-4">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`border-l-4 pl-4 p-3 rounded-md bg-gray-50 border-${alert.color} shadow-sm`}
          >
            <strong className="text-gray-900">{alert.type}:</strong>{" "}
            <span className="text-gray-700">{alert.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
