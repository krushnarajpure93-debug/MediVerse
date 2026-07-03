import { ArrowRight, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function CallToAction() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* CTA Card */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center
          justify-between gap-8
          border border-gray-200
          rounded-xl px-8 py-8 bg-white shadow-sm"
        >
          {/* LEFT CONTENT */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-md bg-yellow-100 flex items-center justify-center">
                <HeartPulse className="text-yellow-500" size={20} />
              </div>
              <span className="text-yellow-600 font-semibold tracking-wide text">
                SevaSetu Healthcare
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Trusted Healthcare, Simplified
            </h2>

            <p className="mt-2 text-gray-600 leading-relaxed">
              Order medicines from nearby pharmacies, consult verified doctors,
              and monitor your health securely from one platform.
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/medicines"
              className="inline-flex items-center gap-2
              bg-yellow-500 text-gray-900
              px-6 py-3 rounded-lg font-semibold
              hover:bg-yellow-600 transition"
            >
              Get Medicines
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/consult"
              className="inline-flex items-center gap-2
              border border-yellow-500 text-yellow-600
              px-6 py-3 rounded-lg font-semibold
              hover:bg-yellow-50 transition"
            >
              Consult Doctor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
