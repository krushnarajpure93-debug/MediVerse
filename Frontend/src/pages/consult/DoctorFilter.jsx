import { Heart, Thermometer, Baby, Stethoscope } from "lucide-react";
import React from "react";

const specialties = [
  { name: "Cardiologist", icon: <Heart className="w-5 h-5 text-red-500" /> },
  {
    name: "Dermatologist",
    icon: <Thermometer className="w-5 h-5 text-orange-500" />,
  },
  { name: "Pediatrician", icon: <Baby className="w-5 h-5 text-blue-500" /> },
  {
    name: "General Physician",
    icon: <Stethoscope className="w-5 h-5 text-green-500" />,
  },
];

export default function DoctorFilter({ onSelectSpecialty }) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 justify-center">
        {specialties.map((spec, i) => (
          <button
            key={i}
            onClick={() => onSelectSpecialty(spec.name)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-100 transition font-medium text-gray-900"
          >
            {spec.icon}
            <span className="text-sm sm:text-base">{spec.name}</span>
          </button>
        ))}

        {/* Clear filter */}
        <button
          onClick={() => onSelectSpecialty("")}
          className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:bg-gray-100 transition text-sm sm:text-base"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
