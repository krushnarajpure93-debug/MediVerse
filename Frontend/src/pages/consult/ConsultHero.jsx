import React, { useState } from "react";

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query); // Pass search query up to parent
    }
  };

  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-4xl font-extrabold">
          Consult Doctors Online
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Talk to verified doctors from the comfort of your home.
        </p>

        {/* Search */}
        <div className="mt-4 flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            className="px-5 py-3 w-72 rounded-l-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter key
          />
          <button
            className="px-6 py-3 rounded-r-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-6 text-gray-500 text-sm">
          <span
            onClick={() => {
              setQuery("Cardiology");
              handleSearch();
            }}
            className="cursor-pointer"
          >
            Cardiology
          </span>
          <span
            onClick={() => {
              setQuery("Dermatology");
              handleSearch();
            }}
            className="cursor-pointer"
          >
            Dermatology
          </span>
          <span
            onClick={() => {
              setQuery("Pediatrics");
              handleSearch();
            }}
            className="cursor-pointer"
          >
            Pediatrics
          </span>
          <span
            onClick={() => {
              setQuery("Neurology");
              handleSearch();
            }}
            className="cursor-pointer"
          >
            Neurology
          </span>
        </div>
      </div>
    </section>
  );
}
