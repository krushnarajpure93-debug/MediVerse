import React from "react";

const hospitals = [
  { name: "Civil Hospital", distance: "1.2 km", phone: "108" },
  { name: "City Care Hospital", distance: "2.5 km", phone: "020-123456" },
  { name: "LifeLine Hospital", distance: "3 km", phone: "020-987654" },
];

export default function NearbyHospitals() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Nearby Hospitals
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Hospital List */}
        <div className="space-y-2">
          {hospitals.map((h, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900">{h.name}</h3>

              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-gray-600 text">Distance: {h.distance}</p>

                <a
                  href={`tel:${h.phone}`}
                  className="bg-red-600 text-white px-4 py-1 rounded-md text font-medium hover:bg-red-700 whitespace-nowrap"
                >
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="w-full h-[350px] flex items-center justify-center">
          <div className="w-full max-w-xl h-full rounded-lg overflow-hidden border">
            <iframe
              title="Nearby Hospitals Map"
              src="https://www.google.com/maps?q=hospitals%20near%20me&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
