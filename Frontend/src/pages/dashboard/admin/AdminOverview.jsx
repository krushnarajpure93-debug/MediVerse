// pages/admin/AdminOverview.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import DashboardCard from "../user/DashboardCard";

export default function AdminOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    doctors: 0,
    pharmacies: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard");
      const stats = res.data.data.stats;

      console.log("ADMIN STATS 👉", stats); // MUST CHECK

      setStats({
        totalUsers: stats.totalUsers,
        doctors: stats.totalDoctors,
        pharmacies: stats.totalPharmacies,
        pendingRequests: stats.pendingDoctors + stats.pendingPharmacies,
      });
    } catch (err) {
      console.error(
        "Admin dashboard fetch failed ",
        err.response?.status,
        err.response?.data,
      );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers ?? "_"}
          onClick={() => navigate("/admin/users")}
        />
        <DashboardCard
          title="Doctors"
          value={stats.doctors ?? "_"}
          onClick={() => navigate("/admin/users?role=doctor")}
        />
        <DashboardCard
          title="Pharmacies"
          value={stats.pharmacies ?? "_"}
          onClick={() => navigate("/admin/users?role=pharmacies")}
        />
        <DashboardCard
          title="Pending Requests"
          value={stats.pendingRequests ?? "_"}
          highlight={(stats.pendingRequests ?? 0) > 0}
          onClick={() => navigate("/admin/role-requests")}
        />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/admin/role-requests")}
          className="px-3 py-1.5 text-sm font-medium
                   bg-blue-600 text-white rounded
                   hover:bg-blue-700"
        >
          View Role Requests ({stats.pendingRequests})
        </button>
      </div>
    </section>
  );
}
