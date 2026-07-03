import React from "react";

export default function ContactMap() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Our Office Location
        </h2>
        <p className="text-center text-gray-500 mb-6">Find us here</p>

        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.123456789!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf123456789%3A0xabcdef123456789!2sPune!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
