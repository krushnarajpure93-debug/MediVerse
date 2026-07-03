import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-50 py-24 border-b">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
          24/7 Emergency Services
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Emergency Medical Assistance
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-lg">
          Immediate, reliable emergency care with experienced doctors and
          advanced medical facilities—because every second matters.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="tel:108"
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Call Emergency
          </a>

          <a
            href="/contact"
            className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Contact Hospital
          </a>
        </div>
      </div>
    </section>
  );
}
