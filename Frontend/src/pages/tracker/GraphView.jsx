import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import React from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function GraphView({ data }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Heart Rate",
        data: data.map((d) => d.heartRate),
        borderColor: "#1F2937", // dark gray for formal look
        backgroundColor: "rgba(31,41,55,0.1)", // subtle fill
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#374151",
        pointBorderColor: "#374151",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ensures full responsiveness
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#111827", // dark gray
          font: { size: 14 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#4B5563", font: { size: 13 } }, // subtle gray
        grid: { color: "#E5E7EB" },
      },
      y: {
        ticks: { color: "#4B5563", font: { size: 13 } },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Health Trends
      </h2>
      <div
        className="bg-white p-6 rounded-lg shadow-md"
        style={{ minHeight: "300px" }}
      >
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
}
