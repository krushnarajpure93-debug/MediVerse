import React, { useEffect, useState } from "react";
import { getPharmacies } from "../../api/pharmacy.api";
import {
  FaStar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMotorcycle,
} from "react-icons/fa";

export default function PharmacySelector() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPharmacies() {
      try {
        setLoading(true);
        const data = await getPharmacies();
        setPharmacies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading pharmacies...
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Nearby Pharmacies
        </h2>

        <div className="grid grid-flow-col auto-cols-[300px] gap-6 overflow-x-auto py-4 px-2">
          {pharmacies.map((ph) => (
            <div
              key={ph._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out min-w-[300px] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {ph.pharmacyName}
                  </h3>
                  {ph.isVerified && (
                    <FaCheckCircle
                      className="text-green-500"
                      title="Verified Pharmacy"
                    />
                  )}
                </div>

                {/* Location */}
                {ph.address?.city && (
                  <p className="flex items-center text-sm text-gray-500 gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />{" "}
                    {ph.address.city}
                  </p>
                )}

                {/* Rating */}
                <p className="flex items-center text-sm text-gray-500 gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">
                    {ph.rating?.toFixed(1) || "N/A"}
                  </span>
                  ({ph.totalRatings || 0})
                </p>

                {/* Delivery Info */}
                {ph.deliveryRadius && (
                  <p className="flex items-center text-sm text-gray-500 gap-1">
                    <FaMotorcycle className="text-gray-400" />
                    Delivery: {ph.deliveryRadius} km
                  </p>
                )}
              </div>

              {/* Footer */}
              <button className="mt-auto m-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-medium hover:from-green-600 hover:to-green-800 transition">
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
