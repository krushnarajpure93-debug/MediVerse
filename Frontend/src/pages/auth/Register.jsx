import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../api/axios";
import React from "react";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      return setError("All fields are mandatory");
    }

    try {
      setLoading(true);
      const result = await register({ ...formData, role: "user" });

      if (result.success) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-gray-300 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Citizen Registration
        </h1>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            pattern="[0-9]{10}"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Create Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            minLength={6}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 font-semibold rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Already registered?
          <NavLink
            to="/login"
            className="ml-1 text-yellow-600 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
