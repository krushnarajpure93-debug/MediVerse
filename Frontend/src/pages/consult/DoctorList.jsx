import DoctorCard from "./DoctorCard";
import React from "react";

export default function DoctorList({ doctors = [], loading, onSelectDoctor }) {
  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">
        Loading doctors...
      </p>
    );

  if (!doctors.length)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">
        No doctors available at the moment.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
        Available Doctors
      </h2>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} onSelect={onSelectDoctor} />
        ))}
      </div>
    </section>
  );
}
