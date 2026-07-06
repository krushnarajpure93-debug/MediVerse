import React, { useState } from "react";

const faqs = [
    { q: "How do I book a doctor consultation?", a: "You can visit the Consult Doctor page, choose a specialist, and book a slot instantly." },
    { q: "Can I upload a prescription for medicines?", a: "Yes, the medicines checkout flow allows prescription upload for safer delivery." },
    { q: "Do you offer home sample collection for lab tests?", a: "Yes, premium lab packages include home sample collection in eligible cities." },
    { q: "Is my data secure?", a: "Absolutely. SevaSetu uses secure authentication, encrypted storage practices, and role-based access control." },
    { q: "How quickly will I receive my order?", a: "Most orders are dispatched within 24 hours and delivered based on your location." },
    { q: "Can I access appointment history?", a: "Yes, your dashboard stores appointment history, upcoming visits, and documents." },
    { q: "Do you support emergency booking?", a: "Yes, emergency appointments can be requested directly from the booking flow." },
    { q: "How can I contact support?", a: "Use the contact page or call the support number listed on the website." },
    { q: "Can I pay online?", a: "Yes, secure online payments are supported for appointments, medicines, and labs." },
    { q: "Is there a mobile-friendly experience?", a: "Yes, the interface is fully responsive and optimized for mobile devices." },
    { q: "Can I book appointments for family members?", a: "Yes, if you are logged in, you can book for yourself or for a dependent with the right details." },
    { q: "Do I need a doctor referral for tests?", a: "No, most routine tests can be booked directly. Some specialist tests may require a doctor note." },
    { q: "Can I reschedule an appointment?", a: "Yes, you can manage or cancel existing appointments from your dashboard." },
    { q: "How are doctors verified?", a: "Doctors are reviewed and verified before appearing in the consult directory." },
    { q: "Do you offer follow-up care?", a: "Yes, follow-up scheduling and prescriptions are available after consultation." },
    { q: "How does prescription upload work?", a: "You can upload a photo or PDF during order checkout for pharmacy review." },
    { q: "How are lab reports shared?", a: "Reports are shared digitally in your dashboard once they are ready." },
    { q: "What if I miss my appointment?", a: "You can contact support to reschedule or re-book at the next available slot." },
    { q: "How do I update my profile?", a: "Use the profile page in your dashboard to update personal details and contact information." },
    { q: "Can I switch between light and dark themes?", a: "Yes, the interface includes a premium dark and light experience." },
    { q: "Do you support Hindi and English?", a: "The experience is designed for bilingual users and is being expanded further." },
    { q: "How do notifications work?", a: "You will receive email and in-app updates for appointments, medicine orders, and lab tests." },
    { q: "What is the consultation fee?", a: "Fees vary by doctor and specialty, and are displayed on the doctor profile page." },
    { q: "Can I get a second opinion?", a: "Yes, you can consult another specialist through the same platform." },
    { q: "Is ambulance booking available?", a: "Yes, emergency services include ambulance and hospital assistance options." },
    { q: "How do I contact a doctor?", a: "You can book a chat or video consultation directly from the doctor profile." },
    { q: "Can I order medicines without an account?", a: "An account helps with order tracking and prescription management, but guest checkout is available where supported." },
    { q: "Are specialist doctors available?", a: "Yes, the directory includes physicians, pediatricians, dermatologists, and more." },
    { q: "How do I get lab test packages?", a: "Visit the Lab Tests page and choose the package that best fits your needs." },
    { q: "Do you provide telemedicine?", a: "Yes, video and chat consultations are available for eligible doctors." },
    { q: "How are payments secured?", a: "Payments are processed through secure and verified channels with encrypted transactions." },
];

export default function FAQPage() {
    const [open, setOpen] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">FAQs</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">Frequently asked questions</h1>
                    <p className="mt-4 text-lg text-slate-600">Everything you need to know about appointments, medicines, labs, and patient support.</p>
                </div>

                <div className="mt-10 space-y-3">
                    {faqs.map((item, index) => {
                        const isOpen = open === index;
                        return (
                            <div key={item.q} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <button className="w-full flex justify-between items-center px-6 py-4 text-left" onClick={() => setOpen(isOpen ? -1 : index)}>
                                    <span className="font-semibold text-slate-800">{item.q}</span>
                                    <span className="text-2xl text-amber-600">{isOpen ? "−" : "+"}</span>
                                </button>
                                {isOpen && <p className="px-6 pb-5 text-slate-600">{item.a}</p>}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
