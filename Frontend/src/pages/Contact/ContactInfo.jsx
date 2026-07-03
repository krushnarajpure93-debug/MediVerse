import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import React from "react";
export default function ContactInfo() {
  const items = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "hello@example.com",
      subtitle: "Write to us anytime",
      href: "mailto:hello@example.com",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 98765 43210",
      subtitle: "Mon – Fri, 10AM – 6PM",
      href: "tel:+919876543210",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Pune, India",
      subtitle: "Visit our office",
      href: "https://goo.gl/maps/your-office-location", // replace with actual URL
    },
    {
      icon: FaGithub,
      title: "GitHub",
      value: "github.com/yourusername",
      subtitle: "Check out my projects",
      href: "https://github.com/yourusername",
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      subtitle: "Connect with me",
      href: "https://linkedin.com/in/yourprofile",
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      value: "@yourhandle",
      subtitle: "Follow me",
      href: "https://instagram.com/yourhandle",
    },
    {
      icon: FaGlobe,
      title: "Portfolio",
      value: "yourwebsite.com",
      subtitle: "Visit my portfolio",
      href: "https://yourwebsite.com",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Contact Information
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Reach out to us through any of the following ways.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {items.map(({ icon: Icon, value, subtitle, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-6 rounded-xl border shadow-sm bg-white w-64 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center p-4 rounded-lg bg-yellow-100 text-yellow-600">
                <Icon size={28} />
              </div>
              <p className="font-semibold text-gray-800">{value}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
