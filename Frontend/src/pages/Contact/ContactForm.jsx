import { useState } from "react";
import React from "react";
import axios from "axios";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/contact", form, {
        withCredentials: true,
      });

      if (response.data?.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(response.data?.message || "Unable to send message right now.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          Send us a message
        </h2>
        <p className="text-center text-gray-500 mb-8">
          We usually respond within 24 hours. Your message is saved in the backend and emailed to our team.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 rounded shadow-lg max-w-6xl mx-auto space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Appointment / Support / Other"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="+91 9860894960"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="+91 9860894960"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center font-medium mt-2 animate-pulse">
              Message sent successfully ✅
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center font-medium mt-2">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
