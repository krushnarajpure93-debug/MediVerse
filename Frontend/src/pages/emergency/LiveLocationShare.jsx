import { useState } from "react";
import React from "react";
import { shareLiveLocation } from "../../api/emergency.api";

export default function LiveLocationShare() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          // 🔴 BACKEND CALL
          await shareLiveLocation({
            latitude,
            longitude,
            shareWith: "emergency_contacts",
          });

          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

          setLocation({ latitude, longitude, mapsLink });
        } catch (err) {
          console.error("Location share failed:", err);
          setError("Failed to share location. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to access location. Please enable GPS.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <section
      className="py-14 text-center max-w-xl mx-auto px-4"
      aria-label="Live Location Sharing"
    >
      <button
        onClick={shareLocation}
        disabled={loading}
        className="bg-gray-900 text-white px-7 py-3 rounded-lg font-semibold shadow hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? "Sharing Location..." : "Share Live Location"}
      </button>

      <p className="mt-4 text-gray-600 text-sm">
        Your live location will be shared securely with emergency responders.
      </p>

      {location && (
        <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg text-left">
          <p className="text-green-800 font-medium">
            📍 Location Shared Successfully
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Latitude: {location.latitude.toFixed(5)} <br />
            Longitude: {location.longitude.toFixed(5)}
          </p>

          <a
            href={location.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-green-700 font-semibold underline"
          >
            View on Google Maps
          </a>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
          {error}
        </div>
      )}
    </section>
  );
}
