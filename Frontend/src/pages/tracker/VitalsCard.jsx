import { Heart, Activity, Thermometer, Droplet } from "lucide-react";
import React from "react";

const iconMap = {
  "Heart Rate": <Heart className="w-6 h-6 text-red-600" />,
  "Blood Pressure": <Activity className="w-6 h-6 text-blue-600" />,
  "Oxygen Level": <Droplet className="w-6 h-6 text-teal-600" />,
};

export default function VitalsCard({ label, value, unit, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      <div className="mb-3">{icon ? icon : iconMap[label]}</div>
      <h3 className="text-gray-900 font-semibold text-lg">{label}</h3>
      <p className="text-gray-700 mt-1 text-xl font-medium">
        {value} {unit}
      </p>
    </div>
  );
}
