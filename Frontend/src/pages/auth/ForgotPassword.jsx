import { useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../api/axios";
import React from 'react';
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/forgotpassword", { email });
      setMessage(res.data.message || "Reset link sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-gray-300 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Reset Password
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your registered email to receive reset link
        </p>

        {message && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-600 text-sm">{message}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            placeholder="Registered Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 font-semibold rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          <NavLink
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            ← Back to Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
