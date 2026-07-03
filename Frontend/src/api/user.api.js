import axios from "./axios";

/* =====================================================
   📌 USER APIs
===================================================== */

// User Dashboard
export const fetchUserDashboard = async () => {
  const res = await axios.get("/user/dashboard");
  return res.data;
};
