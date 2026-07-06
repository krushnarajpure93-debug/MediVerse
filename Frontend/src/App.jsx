import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

import HomePage from "./pages/Home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/about/AboutPage";
import FAQPage from "./pages/faq/FAQPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import LabTestsPage from "./pages/lab/LabTestsPage";
import BookAppointmentPage from "./pages/appointment/BookAppointmentPage";

// Core Modules
import MedicinesPage from "./pages/medicines/MedicinesPage";
import ConsultPage from "./pages/consult/ConsultPage";
import TrackerPage from "./pages/tracker/TrackerPage";
import EmergencyPage from "./pages/emergency/EmergencyPage";

// User Pages
import ProfilePage from "./pages/Profile/ProfilePage";
import Settings from "./pages/settings/Settings";

// Dashboards
import UserDashboard from "./pages/dashboard/user/DashboardOverview";
import AdminDashboard from "./pages/dashboard/admin/AdminOverview";
import RoleRequestsAdmin from "./pages/dashboard/admin/RoleRequestsAdmin";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { getCurrentUser } from "./api/axios";
import UsersList from "./pages/dashboard/admin/UsersList";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
    }

    fetchUser();

    const handleStorage = () => fetchUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/lab-tests" element={<LabTestsPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            {/* Core Health Features */}
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            {/* Auth */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* User Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user} role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <ProfilePage user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute user={user}>
                  <Settings user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute user={user} role="admin">
                  <UsersList />
                </ProtectedRoute>
              }
            />
            {/* Admin Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/role-requests"
              element={
                <ProtectedRoute user={user} role="admin">
                  <RoleRequestsAdmin />
                </ProtectedRoute>
              }
            />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}