import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaHeartbeat,
  FaPills,
  FaUserMd,
  FaAmbulance,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Find Doctors", path: "/consult" },
    { name: "Medicines", path: "/medicines" },
    { name: "Health Tracker", path: "/tracker" },
    { name: "Emergency", path: "/emergency" },
  ];

  const resources = [
    { name: "Health Articles", path: "/articles" },
    { name: "FAQs", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const services = [
    { name: "Consult Doctor", path: "/consult" },
    { name: "Book Appointment", path: "/consult" },
    { name: "Order Medicines", path: "/medicines" },
    { name: "Lab Tests", path: "/lab-tests" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/krushna_kaale/",
      icon: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/krushnakaale",
      icon: <FaLinkedinIn />,
    },
    {
      name: "GitHub",
      href: "https://github.com/krushnakaale",
      icon: <FaGithub />,
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <FaHeartbeat className="text-red-500 text-3xl" />
                <h2 className="text-3xl font-bold text-white tracking-wide">
                  SevaSetu
                </h2>
              </div>
            </NavLink>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Your trusted healthcare companion. Connecting you with the best
              doctors, pharmacies, and health services for a healthier tomorrow.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div className="flex items-center gap-2">
                <FaUserMd className="text-yellow-400" />
                <span className="text-gray-400">Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPills className="text-yellow-400" />
                <span className="text-gray-400">Trusted Pharmacies</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="hover:text-yellow-400 transition"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="mt-8 bg-red-900/20 border border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FaAmbulance className="text-red-500 text-2xl" />
            <div>
              <h4 className="text-white font-semibold">Medical Emergency?</h4>
              <p className="text-sm text-gray-400">
                Call <span className="text-red-400 font-bold">108</span> or use
                our{" "}
                <NavLink
                  to="/emergency"
                  className="text-yellow-400 hover:underline"
                >
                  Emergency Feature
                </NavLink>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">SevaSetu</span>. All rights
            reserved. Made with ❤️ for healthier India.
          </p>

          <div className="flex gap-6">
            <NavLink to="/privacy" className="hover:text-yellow-400 transition">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="hover:text-yellow-400 transition">
              Terms
            </NavLink>
            <NavLink to="/contact" className="hover:text-yellow-400 transition">
              Contact Us
            </NavLink>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-xs text-gray-500 max-w-4xl mx-auto">
          <p>
            ⚕️ <strong>Medical Disclaimer:</strong> The information provided on
            SevaSetu is for informational purposes only and should not be
            considered as medical advice. Always consult with a qualified
            healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
}
