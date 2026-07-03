import { Link } from "react-router-dom";
import React from "react";

export default function HealthTrackerPreview() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* TEXT CONTENT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Digital Health Monitoring
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed max-w-xl">
            SevaSetu enables citizens to monitor key health parameters such as
            heart rate, blood pressure, and oxygen levels through integrated
            health tracking systems.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 text-sm list-disc list-inside">
            <li>Real-time vitals monitoring</li>
            <li>Early health alerts & notifications</li>
            <li>Secure health data storage</li>
          </ul>

          <Link
            to="/tracker"
            className="inline-block mt-6
            border border-gray-800
            text-gray-900
            px-6 py-3
            rounded-md
            font-semibold
            hover:bg-gray-800 hover:text-white
            transition"
          >
            Access Health Tracker
          </Link>
        </div>

        {/* OPTIONAL IMAGE (SUBTLE) */}
        <div className="hidden md:flex justify-center">
          <video
            src="/videos/health.mp4" // place your video in public/videos folder
            autoPlay
            loop
            muted
            className="max-h-68 rounded object-contain opacity-90"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
