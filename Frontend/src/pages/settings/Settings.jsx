import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import React from "react";

export default function Settings({ user, setUser }) {
  // ✅ Extract actual user data - correct path is user.data.user
  const userData = user?.data?.user || {};

  // console.log("User object:", user);
  // console.log("User data:", userData);
  // console.log("User role:", userData.role);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    visibility: "public",
    learningMode: "video",
    emailNotifications: true,
    adminNotes: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  // ✅ Role Request Form
  const [roleRequest, setRoleRequest] = useState({
    requestedRole: "",
    // Doctor fields
    specialization: "",
    qualification: "",
    experience: "",
    registrationNumber: "",
    consultationFee: "",
    // Pharmacy fields
    pharmacyName: "",
    licenseNumber: "",
    gstNumber: "",
    pharmacyAddress: "",
    // Common
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userData && userData.name) {
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        bio: userData.bio || "",
        visibility: userData.visibility || "public",
        learningMode: userData.learningMode || "video",
        emailNotifications: userData.emailNotifications ?? true,
        adminNotes: userData.adminNotes || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleRoleRequestChange = (e) => {
    const { name, value } = e.target;
    setRoleRequest({ ...roleRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.put("/user/settings", {
        ...form,
        password: password.new || undefined,
        currentPassword: password.current || undefined,
      });

      setUser(res.data);
      setSuccess("Settings updated successfully ✅");
      setPassword({ current: "", new: "" });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleRequestSubmit = async (e) => {
    e.preventDefault();

    if (!roleRequest.requestedRole) {
      alert("Please select a role");
      return;
    }

    // Validation based on role
    if (roleRequest.requestedRole === "doctor") {
      if (
        !roleRequest.specialization ||
        !roleRequest.qualification ||
        !roleRequest.registrationNumber
      ) {
        alert("Please fill all required doctor fields");
        return;
      }
    }

    if (roleRequest.requestedRole === "pharmacy") {
      if (
        !roleRequest.pharmacyName ||
        !roleRequest.licenseNumber ||
        !roleRequest.pharmacyAddress
      ) {
        alert("Please fill all required pharmacy fields");
        return;
      }
    }

    try {
      setLoading(true);

      // Prepare formData based on role
      let formData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        additionalInfo: roleRequest.additionalInfo,
      };

      if (roleRequest.requestedRole === "doctor") {
        formData = {
          ...formData,
          specialization: roleRequest.specialization,
          qualification: roleRequest.qualification,
          experience: roleRequest.experience,
          registrationNumber: roleRequest.registrationNumber,
          consultationFee: roleRequest.consultationFee,
          registrationCouncil: roleRequest.registrationCouncil,
          about: roleRequest.about,
        };
      } else if (roleRequest.requestedRole === "pharmacy") {
        formData = {
          ...formData,
          pharmacyName: roleRequest.pharmacyName,
          licenseNumber: roleRequest.licenseNumber,
          gstNumber: roleRequest.gstNumber,
          pharmacyAddress: roleRequest.pharmacyAddress,
          email: userData.email, // ✅ add this
          contactNumber: userData.phone, // ✅ add this
        };
      }

      await axiosInstance.post("/user/role-request", {
        requestedRole: roleRequest.requestedRole,
        formData,
      });

      alert("Role request submitted successfully! Admin will review it.");

      // Reset form
      setRoleRequest({
        requestedRole: "",
        specialization: "",
        qualification: "",
        experience: "",
        registrationNumber: "",
        consultationFee: "",
        pharmacyName: "",
        licenseNumber: "",
        gstNumber: "",
        pharmacyAddress: "",
        additionalInfo: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit role request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Account Settings
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your personal information and preferences
            </p>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
              Change Avatar
            </button>
          </div>
        </div>

        {/* MAIN SETTINGS FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROFILE + PREFERENCES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT - Profile Information */}
            <Section title="Profile Information">
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input label="Email" value={form.email} disabled />
              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <Textarea
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </Section>

            {/* RIGHT - Preferences */}
            <Section title="Preferences">
              <Select
                label="Profile Visibility"
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                options={[
                  { label: "Public", value: "public" },
                  { label: "Private", value: "private" },
                ]}
              />

              {userData?.role === "user" && (
                <>
                  <Select
                    label="Learning Mode"
                    name="learningMode"
                    value={form.learningMode}
                    onChange={handleChange}
                    options={[
                      { label: "Video", value: "video" },
                      { label: "Reading", value: "reading" },
                      { label: "Live Sessions", value: "live" },
                    ]}
                  />
                  <Checkbox
                    label="Email Notifications"
                    name="emailNotifications"
                    checked={form.emailNotifications}
                    onChange={handleChange}
                  />
                </>
              )}

              {(userData?.role === "doctor" ||
                userData?.role === "pharmacy") && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-800">
                    ✅ Current Role: {userData.role.toUpperCase()}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    You have verified access
                  </p>
                </div>
              )}

              {userData?.role === "admin" && (
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm font-semibold text-purple-800">
                    👑 Administrator
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Full System Control
                  </p>
                </div>
              )}
            </Section>
          </div>

          {/* PASSWORD SECTION */}
          <Section title="Security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
                placeholder="Enter new password"
              />
            </div>
          </Section>

          {/* SAVE BUTTON */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50 font-semibold shadow-md transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {success && (
            <p className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg">
              {success}
            </p>
          )}
        </form>

        {/* ✅✅✅ ROLE UPGRADE SECTION - VISIBLE FOR USER ROLE ✅✅✅ */}
        {userData?.role === "user" && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  Upgrade Your Role
                </h3>
                <p className="text-sm text-gray-600">
                  Become a verified Doctor or Pharmacy partner
                </p>
              </div>
            </div>

            <form onSubmit={handleRoleRequestSubmit} className="space-y-6">
              {/* ROLE SELECTION */}
              <Section title="Request Role Upgrade">
                <Select
                  label="Requested Role"
                  name="requestedRole"
                  value={roleRequest.requestedRole}
                  onChange={handleRoleRequestChange}
                  options={[
                    { label: "Select role", value: "" },
                    { label: "Doctor", value: "doctor" },
                    { label: "Pharmacy", value: "pharmacy" },
                  ]}
                />
              </Section>

              {/* DOCTOR FORM */}
              {roleRequest.requestedRole === "doctor" && (
                <Section title="Doctor Verification Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Specialization"
                      name="specialization"
                      value={roleRequest.specialization}
                      onChange={handleRoleRequestChange}
                      required
                    />

                    <Input
                      label="Qualification"
                      name="qualification"
                      value={roleRequest.qualification}
                      onChange={handleRoleRequestChange}
                      required
                    />

                    <Input
                      label="Experience (Years)"
                      type="number"
                      name="experience"
                      value={roleRequest.experience}
                      onChange={handleRoleRequestChange}
                    />

                    <Input
                      label="Consultation Fee"
                      type="number"
                      name="consultationFee"
                      value={roleRequest.consultationFee}
                      onChange={handleRoleRequestChange}
                    />

                    <Input
                      label="Registration Council"
                      name="registrationCouncil"
                      value={roleRequest.registrationCouncil || ""}
                      onChange={handleRoleRequestChange}
                      placeholder="e.g., Medical Council of India"
                    />
                  </div>

                  <Input
                    label="Medical Registration Number"
                    name="registrationNumber"
                    value={roleRequest.registrationNumber}
                    onChange={handleRoleRequestChange}
                    required
                  />

                  <Textarea
                    label="About / Bio"
                    name="about"
                    value={roleRequest.about || ""}
                    onChange={handleRoleRequestChange}
                    placeholder="Write a short bio about your expertise..."
                    rows={4}
                  />
                </Section>
              )}

              {/* PHARMACY FORM */}
              {roleRequest.requestedRole === "pharmacy" && (
                <Section title="Pharmacy Verification Details">
                  <Input
                    label="Pharmacy Name"
                    name="pharmacyName"
                    value={roleRequest.pharmacyName}
                    onChange={handleRoleRequestChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="License Number"
                      name="licenseNumber"
                      value={roleRequest.licenseNumber}
                      onChange={handleRoleRequestChange}
                      required
                    />

                    <Input
                      label="GST Number"
                      name="gstNumber"
                      value={roleRequest.gstNumber}
                      onChange={handleRoleRequestChange}
                    />
                  </div>

                  {/* NEW FIELDS ADDED */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={roleRequest.email || userData.email || ""}
                      onChange={handleRoleRequestChange}
                      required
                    />
                    <Input
                      label="Contact Number"
                      name="contactNumber"
                      type="text"
                      value={roleRequest.contactNumber || userData.phone || ""}
                      onChange={handleRoleRequestChange}
                      required
                    />
                  </div>

                  <Textarea
                    label="Pharmacy Address"
                    name="pharmacyAddress"
                    value={roleRequest.pharmacyAddress}
                    onChange={handleRoleRequestChange}
                    required
                  />
                </Section>
              )}

              {/* ADDITIONAL INFO */}
              {roleRequest.requestedRole && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Textarea
                    label="Notes for Admin (Optional)"
                    name="additionalInfo"
                    value={roleRequest.additionalInfo}
                    onChange={handleRoleRequestChange}
                    rows={4}
                  />
                </div>
              )}

              {/* SUBMIT BUTTON */}
              {roleRequest.requestedRole && (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Role Request"}
                </button>
              )}
            </form>
          </div>
        )}

        {/* DANGER ZONE */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-2 border-red-200">
          <h3 className="font-semibold text-red-600 mb-2">⚠️ Danger Zone</h3>
          <button
            disabled
            className="text-sm text-red-400 cursor-not-allowed hover:text-red-500"
          >
            Delete Account (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE UI COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        rows={props.rows || 3}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
