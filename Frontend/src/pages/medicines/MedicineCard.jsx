import React from "react";

export default function MedicineCard({ medicine, onAdd }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
      <p className="text-sm text-gray-600">{medicine.brand}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold">₹{medicine.price}</span>
        <button
          onClick={() => onAdd(medicine)}
          className="px-4 py-1.5 border rounded-md hover:bg-gray-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
