import MedicineHero from "./MedicineHero";
import CategoryFilter from "./CategoryFilter";
import PharmacySelector from "./PharmacySelector";
import MedicineList from "./MedicineList";
import CartPreview from "./CartPreview";
import PrescriptionUpload from "./PrescriptionUpload";
import React from "react";
export default function MedicinesPage() {
  return (
    <div className="relative">
      <MedicineHero />
      <CategoryFilter />
      <PharmacySelector />
      <MedicineList />
      <PrescriptionUpload />
      <CartPreview />
    </div>
  );
}
