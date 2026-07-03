import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login, getCurrentUser } from "../../api/axios";
import React from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // ✅ Immediately update App state
        const userData = await getCurrentUser();
        setUser(userData);

        // Redirect based on role
        const role = result.data.user.role;
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "doctor") navigate("/doctor/dashboard");
        else if (role === "pharmacy") navigate("/pharmacy/dashboard");
        else navigate("/dashboard");
      } else {
        setError(result.message || "Login failed");
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
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Citizen Login
        </h1>
        <p className="text-sm text-gray-600 text-center mt-1">
          Access your registered account
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="********"
              required
            />
          </div>

          <div className="text-right">
            <NavLink
              to="/forgot-password"
              className="text-sm text-yellow-600 hover:underline"
            >
              Forgot Password?
            </NavLink>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 font-semibold rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          New user?
          <NavLink
            to="/register"
            className="ml-1 text-yellow-600 font-semibold hover:underline"
          >
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
}
