import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import React from "react";
import { logout } from "../api/axios";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [menuOpen, setMenuOpen] = useState(false); // avatar dropdown
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Medicines", path: "/medicines" },
    { name: "Consult Doctor", path: "/consult" },
    { name: "Health Tracker", path: "/tracker" },
    { name: "Emergency", path: "/emergency", emergency: true },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold text-yellow-400">
          Seva<span className="text-white">Setu</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition
                ${
                  link.emergency
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : isActive
                      ? "bg-gray-700 text-yellow-400"
                      : "text-gray-200 hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <NavLink to="/login">
              <button className="bg-yellow-400 px-5 py-2 rounded font-semibold hover:bg-yellow-500">
                Get Started
              </button>
            </NavLink>
          ) : (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Avatar user={user} size={40} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow text-gray-900">
                  <p className="px-4 py-2 border-b font-semibold">
                    {user.name}
                  </p>

                  <Link
                    to={
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* ADMIN ONLY */}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/role-requests"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Role Requests
                    </Link>
                  )}

                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-gray-900 z-50 p-6
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="self-end mb-6 text-4xl text-white"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        {user?.role === "admin" && (
          <NavLink
            to="/admin/role-requests"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 my-2 rounded-lg text-lg font-medium text-white hover:bg-gray-700"
          >
            Role Requests
          </NavLink>
        )}

        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 my-2 rounded-lg text-lg font-medium
              ${
                link.emergency
                  ? "bg-red-600 text-white"
                  : isActive
                    ? "bg-yellow-100 text-gray-900"
                    : "text-white hover:bg-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {!user ? (
          <NavLink to="/login" className="mt-6 block">
            <button className="w-full bg-yellow-400 py-3 rounded-lg font-semibold">
              Get Started
            </button>
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-gray-800 py-3 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
