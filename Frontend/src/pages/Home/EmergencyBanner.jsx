import { Link } from "react-router-dom";
import React from "react";

export default function EmergencyBanner() {
  return (
    <section className="bg-red-700 text-white py-8 border-t-2 border-red-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          Medical Emergency Assistance
        </h2>

        {/* Sub text */}
        <p className="mt-3 text-red-100 text-lg max-w-2xl mx-auto">
          In case of a medical emergency, connect instantly with nearby
          hospitals, ambulance services, and emergency contacts.
        </p>

        {/* CTA */}
        <div className="mt-6">
          <Link
            to="/emergency"
            className="inline-flex items-center justify-center
            bg-white text-red-700
            px-8 py-2
            rounded
            font-bold text-lg
            shadow-md
            hover:bg-red-100
            transition"
          >
            Access Emergency Services
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-sm text-red-200">
          * This service is intended for immediate assistance only.
        </p>
      </div>
    </section>
  );
}
