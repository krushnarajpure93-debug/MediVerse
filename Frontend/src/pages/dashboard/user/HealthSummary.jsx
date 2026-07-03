import React, { useEffect, useState } from "react";
import { fetchUserDashboard } from "../../../api/userDashboard";

export default function HealthSummary() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchUserDashboard();

        if (res?.success && res.data?.healthRecord?.vitals) {
          setHealth(res.data.healthRecord.vitals);
        } else {
          // 🔹 fallback sample (first time user)
          setHealth({
            bloodPressure: {
              systolic: 120,
              diastolic: 80,
              unit: "mmHg",
              recordedAt: new Date(),
            },
            heartRate: { value: 72, unit: "bpm", recordedAt: new Date() },
            bloodSugar: { value: 98, unit: "mg/dL", recordedAt: new Date() },
            bmi: { value: 23.4 },
          });
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load health data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-gray-500">Loading health summary...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Health Summary</h2>
        <p className="text-xs text-gray-400">
          Last updated:{" "}
          {health?.bloodPressure?.recordedAt
            ? new Date(health.bloodPressure.recordedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <StatCard
          label="Blood Pressure"
          value={
            health?.bloodPressure
              ? `${health.bloodPressure.systolic}/${health.bloodPressure.diastolic} ${health.bloodPressure.unit}`
              : "—"
          }
          color="blue"
        />

        <StatCard
          label="Heart Rate"
          value={
            health?.heartRate
              ? `${health.heartRate.value} ${health.heartRate.unit}`
              : "—"
          }
          color="green"
        />

        <StatCard
          label="Blood Sugar"
          value={
            health?.bloodSugar
              ? `${health.bloodSugar.value} ${health.bloodSugar.unit}`
              : "—"
          }
          color="purple"
        />

        <StatCard
          label="BMI"
          value={health?.bmi?.value ?? "—"}
          color="orange"
        />
      </div>
    </section>
  );
}

/* 🔹 Reusable stat card */
function StatCard({ label, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className={`p-4 rounded-lg ${colors[color]}`}>
      <p className="text-gray-500">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
