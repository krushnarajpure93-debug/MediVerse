import {
  FaPills,
  FaSyringe,
  FaHeart,
  FaHospital,
  FaBaby,
  FaFirstAid,
} from "react-icons/fa";
import React, { useState } from "react";
import MedicineList from "../medicines/MedicineList"; // Component to display medicines
import { getAllMedicines } from "../../api/pharmacy.api"; // Backend API helper

const categories = [
  { name: "Tablets", icon: <FaPills /> },
  { name: "Syrups", icon: <FaSyringe /> },
  { name: "Diabetes", icon: <FaHeart /> },
  { name: "BP", icon: <FaHospital /> },
  { name: "First Aid", icon: <FaFirstAid /> },
  { name: "Baby Care", icon: <FaBaby /> },
];

export default function CategoryFilter() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = async (categoryName) => {
    setActiveCategory(categoryName);
    setLoading(true);
    setError("");
    try {
      // Fetch medicines from backend by category
      const data = await getAllMedicines({ category: categoryName });
      setMedicines(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medicines for this category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>

          <div className="flex flex-wrap justify-between gap-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-sm font-semibold transition transform ${
                  activeCategory === cat.name
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Display medicines for selected category */}
      {loading && (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      )}
      {!loading && error && (
        <div className="text-center py-6 text-red-500">{error}</div>
      )}
      {!loading && !error && medicines.length > 0 && (
        <MedicineList medicines={medicines} />
      )}
      {!loading && !error && medicines.length === 0 && activeCategory && (
        <div className="text-center py-6 text-gray-500">
          No medicines found for "{activeCategory}"
        </div>
      )}
    </>
  );
}
