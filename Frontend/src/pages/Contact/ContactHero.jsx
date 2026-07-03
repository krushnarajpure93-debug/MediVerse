import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text + Buttons */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Get in touch with us for queries, technical support, or
            collaboration opportunities. Our team is here to help you.
          </p>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <button
              onClick={() => {
                const el = document.getElementById("contact-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Contact Now
            </button>

            <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg border shadow-sm transition">
              View Support Options
            </button>
          </div>
        </div>

        {/* Right: Illustration / Placeholder */}
        <div className="flex justify-center md:justify-end">
          <div className="w-72 h-72 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Illustration
          </div>
        </div>
      </div>
    </section>
  );
}
