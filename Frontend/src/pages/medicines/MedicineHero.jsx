import React, { useState } from "react";
import { searchMedicines } from "../../api/pharmacy.api"; // import your API helper
import MedicineList from "../medicines/MedicineList"; // component to display results

export default function Hero() {
  const [area, setArea] = useState("");
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query && !area) {
      setError("Please enter area or medicine name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await searchMedicines(query); // calls /api/medicines/search?q=...
      setMedicines(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Heading + Search */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Order Medicines Online
            </h1>
            <p className="mt-4 text-gray-600 text-lg sm:text-xl">
              Buy genuine medicines from registered local pharmacies at
              affordable prices.
            </p>

            {/* Search */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <input
                type="text"
                placeholder="Enter Area / PIN Code"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
              />
              <input
                type="text"
                placeholder="Search medicine name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
              />
              <button
                onClick={handleSearch}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-sm transition"
              >
                Search
              </button>
            </div>

            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-5 text-xs sm:text-sm text-gray-500">
              <span>✔ Government Verified Pharmacies</span>
              <span>✔ No Extra Charges</span>
              <span>✔ Secure Payments</span>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              Illustration
            </div>
          </div>
        </div>
      </section>

      {/* Display search results */}
      {loading && (
        <div className="text-center py-6 text-gray-500">
          Loading medicines...
        </div>
      )}
      {!loading && medicines.length > 0 && (
        <MedicineList medicines={medicines} />
      )}
      {!loading && !medicines.length && query && (
        <div className="text-center py-6 text-gray-500">
          No medicines found for "{query}"
        </div>
      )}
    </>
  );
}
