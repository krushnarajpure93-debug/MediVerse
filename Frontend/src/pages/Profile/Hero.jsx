import React from "react";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Your Profile
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Manage your personal information, account settings, and track your
          activity all in one place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
            Edit Profile
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300">
            View Activity
          </button>
        </div>
      </div>
    </section>
  );
}
