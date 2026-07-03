import React, { useEffect, useState } from "react";
import { getAllMedicines } from "../../api/pharmacy.api";
import MedicineCard from "./MedicineCard";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const data = await getAllMedicines(); // call backend
        setMedicines(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedicines();
  }, []);

  if (loading) return <p>Loading medicines...</p>;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Available Medicines</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} onAdd={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
}
