import axios from "./axios";

/* =====================================================
   📌 ORDER APIs
===================================================== */

// Create Order
export const createOrder = async (orderData) => {
  const res = await axios.post("/orders", orderData);
  return res.data;
};

// Get Order By ID
export const getOrderById = async (id) => {
  const res = await axios.get(`/orders/${id}`);
  return res.data;
};

// Get Recent User Orders (Dashboard)
export const fetchUserOrders = async (limit = 5) => {
  const res = await axios.get(`/user/orders?limit=${limit}`);
  return res.data;
};
