import axios from "./axios";

/* =====================================================
   📌 MEDICINE APIs (Under Pharmacy)
===================================================== */

// Get All Medicines
export const getAllMedicines = async (params = {}) => {
  const res = await axios.get("/pharmacy/medicines", { params });
  return res.data.data;
};

// Get Medicine By ID
export const getMedicineById = async (id) => {
  const res = await axios.get(`/pharmacy/medicines/${id}`);
  return res.data.data;
};

// Search Medicines
export const searchMedicines = async (query) => {
  const res = await axios.get("/pharmacy/medicines/search", {
    params: { q: query },
  });
  return res.data.data;
};

/* =====================================================
   📌 PHARMACY APIs
===================================================== */

// Get All Pharmacies
export const getPharmacies = async (params = {}) => {
  const res = await axios.get("/pharmacy/all", { params });
  return res.data.data;
};
