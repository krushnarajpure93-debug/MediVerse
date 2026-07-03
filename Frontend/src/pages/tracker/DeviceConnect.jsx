import React from "react";

export default function DeviceConnect() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 rounded-xl shadow-sm bg-white">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Connect Your Device
          </h2>
          <p className="text-gray-700 mb-6">
            Sync your smartwatch or smart band to monitor your vitals
            automatically and stay updated in real-time.
          </p>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition">
            Connect Device
          </button>
        </div>

        {/* Video Section */}
        <div className="flex-1 flex justify-center">
          <video
            src="/videos/health.mp4"
            autoPlay
            loop
            muted
            className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
