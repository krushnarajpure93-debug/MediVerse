import Hero from "./Hero";
import VitalsCard from "./VitalsCard";
import VitalsForm from "./VitalsForm";
import GraphView from "./GraphView";
import DeviceConnect from "./DeviceConnect";
import HealthAlerts from "./HealthAlerts";
import React from "react";
export default function TrackerPage() {
  const vitalsData = [
    { date: "Jan 1", heartRate: 72 },
    { date: "Jan 2", heartRate: 75 },
    { date: "Jan 3", heartRate: 70 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Device Connection */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DeviceConnect />
      </div>

      {/* Vitals Form */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VitalsForm />
      </div>

      {/* Vitals Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <VitalsCard label="Heart Rate" value={72} unit="bpm" icon="❤️" />
        <VitalsCard
          label="Blood Pressure"
          value="120/80"
          unit="mmHg"
          icon="🩺"
        />
        <VitalsCard label="Oxygen Level" value={98} unit="%" icon="🫁" />
      </div>

      {/* Graph */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GraphView data={vitalsData} />
      </div>

      {/* Health Alerts */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HealthAlerts />
      </div>
    </div>
  );
}
