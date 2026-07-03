import { Heart, Activity, Droplet } from "lucide-react";
import React from "react";
const VITALS_PREVIEW = [
  {
    id: "heart-rate",
    label: "Heart Rate",
    value: 72,
    unit: "bpm",
    icon: Heart,
    color: "text-red-600",
  },
  {
    id: "blood-pressure",
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    icon: Activity,
    color: "text-blue-600",
  },
  {
    id: "oxygen-level",
    label: "Oxygen Level",
    value: 98,
    unit: "%",
    icon: Droplet,
    color: "text-teal-600",
  },
];

export default function Hero() {
  return (
    <section className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Monitor Your Health
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-xl">
            Track your vital signs in real time and take control of your health
            with smart, connected monitoring.
          </p>

          <button
            aria-label="Connect health monitoring device"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Connect Device
          </button>
        </div>

        {/* Right: Vitals Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VITALS_PREVIEW.map((vital) => {
            const Icon = vital.icon;

            return (
              <div
                key={vital.id}
                className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition"
              >
                <Icon className={`w-6 h-6 mb-3 ${vital.color}`} />

                <h3 className="text-sm font-medium text-gray-600">
                  {vital.label}
                </h3>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {vital.value}{" "}
                  <span className="text-sm font-medium text-gray-500">
                    {vital.unit}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
