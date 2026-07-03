import React from "react";

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <section
      className="bg-white text-gray-900 rounded shadow-sm hover:shadow-md transition p-4 cursor-pointer flex flex-col justify-between min-h-[180px]"
      onClick={() => onSelect(doctor)}
    >
      {/* Top: Avatar + Name + Specialization */}
      <div className="flex items-center gap-4">
        <img
          src={doctor.user?.avatar || "/images/doctor.png"}
          alt={doctor.user?.name || "Doctor"}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {doctor.user?.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {doctor.specialization || "General Practitioner"}
          </p>
          {/* {doctor.rating && (
            <p className="mt-1 text-sm text-yellow-500 font-medium">
              ⭐ {doctor.rating.toFixed(1)}
            </p>
          )} */}
        </div>
      </div>

      {/* About */}
      <p className="mt-2 text-gray-700 text-sm line-clamp-3">
        {doctor.about || "Experienced doctor available for consultation."}
      </p>

      {/* Footer: Fee + Book Button */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-gray-900 font-semibold text-sm">
          ₹{doctor.consultationFee || "0"}
        </span>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(doctor);
          }}
        >
          Book
        </button>
      </div>
    </section>
  );
}
