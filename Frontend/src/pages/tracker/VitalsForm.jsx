import React from "react";
export default function VitalsForm() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Add Vitals
      </h2>
      <form className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Heart Rate (bpm)"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Blood Pressure (mmHg)"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Oxygen Level (%)"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
        />
        <button
          type="submit"
          className="mt-4 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Save Vitals
        </button>
      </form>
    </section>
  );
}
