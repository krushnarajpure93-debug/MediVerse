import React from "react";
import { FaAmbulance, FaPhoneAlt, FaUserShield } from "react-icons/fa";

const contacts = [
  {
    name: "Ambulance",
    number: "108",
    icon: <FaAmbulance />,
    type: "Emergency Service",
    color: "bg-red-50 text-red-600 border-red-200",
  },
  {
    name: "Police",
    number: "100",
    icon: <FaPhoneAlt />,
    type: "Emergency Service",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    name: "Family Member",
    number: "9876543210",
    icon: <FaUserShield />,
    type: "Personal Contact",
    color: "bg-green-50 text-green-600 border-green-200",
  },
];

export default function EmergencyContacts() {
  return (
    <section className="py-8 max-w-6xl mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            🚨 Emergency Contacts
          </h2>
          <p className="text-sm text-gray-500">
            Tap to call immediately in case of emergency
          </p>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {contacts.map((c, i) => (
            <li
              key={i}
              className={`flex items-center justify-between rounded-lg border p-4 transition hover:shadow ${c.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{c.icon}</div>

                <div>
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.type}</p>
                  <p className="text-sm font-semibold">{c.number}</p>
                </div>
              </div>

              <a
                href={`tel:${c.number}`}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black transition"
              >
                <FaPhoneAlt />
                Call Now
              </a>
            </li>
          ))}
        </ul>

        {/* Footer note */}
        <div className="mt-5 text-xs text-gray-500">
          ⚠️ In case of life-threatening emergency, call ambulance immediately.
        </div>
      </div>
    </section>
  );
}
