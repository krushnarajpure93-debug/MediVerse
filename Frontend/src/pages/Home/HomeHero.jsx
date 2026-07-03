import { Link } from "react-router-dom";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Government of India Initiative
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Affordable Healthcare Services
            <br />
            <span className="text-gray-700">For Every Citizen</span>
          </h1>

          <p className="mt-5 text-gray-700 max-w-xl">
            SevaSetu provides access to affordable medicines, online doctor
            consultation, and basic health monitoring through a single
            government-supported digital platform.
          </p>

          {/* ACTIONS */}
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              to="/medicines"
              className="bg-gray-900 text-white px-6 py-3 rounded
              text-sm font-semibold hover:bg-gray-800 transition"
            >
              Order Medicines
            </Link>

            <Link
              to="/consult"
              className="border border-gray-900 text-gray-900 px-6 py-3 rounded
              text-sm font-semibold hover:bg-gray-100 transition"
            >
              Consult Doctor
            </Link>
          </div>

          {/* INFO STRIP */}
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-gray-600">
            <span>✔ Verified Doctors</span>
            <span>✔ Local Pharmacies</span>
            <span>✔ Secure Health Data</span>
          </div>
        </div>

        {/* RIGHT – SIMPLE IMAGE */}
        <div className="hidden md:flex justify-center">
          <img
            src="images/seva.png"
            alt="Healthcare Services"
            className="max-w-md border border-gray-200"
          />
        </div>
      </div>
    </section>
  );
}
