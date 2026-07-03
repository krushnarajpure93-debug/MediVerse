import { Pill, Stethoscope, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const services = [
  {
    title: "Medicines",
    desc: "Order affordable medicines from verified local pharmacies through the SevaSetu platform.",
    icon: Pill,
    link: "/medicines",
  },
  {
    title: "Doctor Consultation",
    desc: "Consult registered medical practitioners via online chat or video consultation.",
    icon: Stethoscope,
    link: "/consult",
  },
  {
    title: "Health Tracker",
    desc: "Monitor basic health parameters such as heart rate and oxygen levels securely.",
    icon: Activity,
    link: "/tracker",
  },
];

export default function Services() {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-6 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Healthcare Services Available on SevaSetu
          </h2>
          <p className="mt-2 text-gray-700">
            A unified digital platform providing essential healthcare services
            for citizens in a simple and secure manner.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded">
                    <Icon className="text-gray-800" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {s.title}
                  </h3>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {s.desc}
                </p>

                <Link
                  to={s.link}
                  className="inline-flex items-center gap-2 mt-5
                  text-sm font-semibold text-gray-900
                  hover:underline"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
