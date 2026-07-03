import React from "react";

const steps = [
  {
    title: "User Registration / Login",
    desc: "Citizens can securely register or log in using basic personal details.",
  },
  {
    title: "Select Required Service",
    desc: "Choose from available services such as medicines, doctor consultation, or health tracking.",
  },
  {
    title: "Avail Healthcare Service",
    desc: "Order medicines, consult certified doctors, or upload health information online.",
  },
  {
    title: "Monitor & Follow Up",
    desc: "Track health records and receive updates through the SevaSetu platform.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            How SevaSetu Works
          </h2>
          <p className="mt-2 text-gray-700">
            A simple step-by-step process designed to make healthcare services
            easily accessible to all citizens.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center
                  border border-gray-400 rounded-full
                  font-bold text-gray-900"
                >
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
