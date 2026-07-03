import React, { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import {
  Calendar,
  ShoppingBag,
  HeartPulse,
  AlertTriangle,
  Heart,
  Thermometer,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axios";

export default function DashboardOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(
          "http://localhost:8080/api/user/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Dashboard API Response:", response.data);
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error: {error}
        </div>
      </section>
    );
  }

  const stats = data?.stats || {};
  const vitals = data?.healthRecord?.vitals || {};
  const recentAppointments = data?.recentAppointments || [];
  const recentOrders = data?.recentOrders || [];
  const userName = data?.user?.name || "User";

  return (
    <section className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back <span className="text-blue-600">{userName}</span>
        </h1>
        <p className="text-sm text-gray-600">
          Here's a snapshot of your health & activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 rounded">
        <DashboardCard
          title="Total Appointments"
          value={stats.totalAppointments ?? 0}
          icon={<Calendar className="w-6 h-6 text-blue-700 opacity-80" />}
          gradient="from-blue-50 to-blue-100"
        />

        <DashboardCard
          title="Medicine Orders"
          value={stats.totalOrders ?? 0}
          icon={<ShoppingBag className="w-6 h-6 text-purple-700 opacity-80" />}
          gradient="from-purple-50 to-purple-100"
        />

        <DashboardCard
          title="Active Prescriptions"
          value={stats.activePrescriptions ?? 0}
          icon={<HeartPulse className="w-6 h-6 text-emerald-700 opacity-80" />}
          gradient="from-emerald-50 to-emerald-100"
        />

        <DashboardCard
          title="Pending Actions"
          value={stats.pendingOrders ?? 0}
          icon={<AlertTriangle className="w-6 h-6 text-amber-700 opacity-80" />}
          highlight
          gradient="from-amber-50 to-orange-100"
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 text-gray-800 text-lg">
            Health Summary
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <HealthStat
              label="Blood Pressure"
              value={
                vitals.bloodPressure
                  ? `${vitals.bloodPressure.systolic} / ${vitals.bloodPressure.diastolic} ${vitals.bloodPressure.unit}`
                  : "—"
              }
              icon={<Heart className="w-5 h-5 text-red-500" />}
            />
            <HealthStat
              label="Blood Sugar"
              value={
                vitals.bloodSugar
                  ? `${vitals.bloodSugar.value} ${vitals.bloodSugar.unit}`
                  : "—"
              }
              icon={<Thermometer className="w-5 h-5 text-orange-500" />}
            />
            <HealthStat
              label="BMI"
              value={vitals.bmi?.value ?? "—"}
              icon={<Activity className="w-5 h-5 text-green-500" />}
            />
            <HealthStat
              label="Heart Rate"
              value={
                vitals.heartRate
                  ? `${vitals.heartRate.value} ${vitals.heartRate.unit}`
                  : "—"
              }
              icon={<Heart className="w-5 h-5 text-pink-500" />}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 text-gray-800 text-lg">
            Quick Actions
          </h2>
          <ul className="space-y-3 text-sm">
            <QuickAction text="Book Doctor Appointment" to="/consult" />
            <QuickAction text="Order Medicines" to="/medicines" />
            <QuickAction text="Update Health Vitals" to="/tracker" />
            <QuickAction text="Emergency SOS" to="/emergency" danger />
          </ul>
        </div>
      </div>

      {/* Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <ActivityCard title="Recent Appointments">
          {recentAppointments.length > 0 ? (
            recentAppointments.map((a) => (
              <div
                key={a._id ?? Math.random()}
                className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {a.doctor?.user?.name ?? a.doctor?.name ?? "—"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {a.appointmentType
                      ? a.appointmentType
                      : "General Consultation"}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span>
                    {a.appointmentDate
                      ? new Date(a.appointmentDate).toLocaleString()
                      : "—"}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      a.status === "pending"
                        ? "text-yellow-600"
                        : a.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {a.status ?? "—"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No recent appointments</p>
          )}
        </ActivityCard>

        <ActivityCard title="Recent Orders">
          {recentOrders.length > 0 ? (
            recentOrders.map((o) => (
              <ActivityItem
                key={o._id ?? Math.random()}
                left={o.pharmacy?.pharmacyName ?? "—"}
                right={o.orderStatus ?? "—"}
                status
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No recent orders</p>
          )}
        </ActivityCard>
      </div>
    </section>
  );
}

/* --- helpers --- */
function HealthStat({ label, value, icon }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      {icon}
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function QuickAction({ text, to, danger }) {
  return (
    <li>
      <Link
        to={to}
        className={`block px-4 py-3 rounded-lg shadow-sm font-medium text-center transition
          ${danger ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
      >
        {text}
      </Link>
    </li>
  );
}

function ActivityCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-h-80 overflow-y-auto">
      <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ActivityItem({ left, right, status }) {
  return (
    <div className="flex justify-between text-sm border-b pb-2 last:border-b-0">
      <span>{left}</span>
      <span
        className={
          status
            ? right === "pending"
              ? "text-yellow-600"
              : "text-green-600"
            : "text-gray-500"
        }
      >
        {right}
      </span>
    </div>
  );
}
