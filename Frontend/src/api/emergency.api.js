import axios from "./axios";

/* =====================================================
   📌 EMERGENCY APIs
===================================================== */

// Send SOS
export const sendSOS = async (payload) => {
  const res = await axios.post("/emergency/sos", payload);
  return res.data;
};

// Share Live Location
export const shareLiveLocation = async (payload) => {
  const res = await axios.post("/emergency/share-location", payload);
  return res.data;
};
