import React from "react";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
