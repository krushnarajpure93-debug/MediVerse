import React from "react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="max-w-5xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
                <p className="mt-4 text-slate-600">SevaSetu respects your privacy and is committed to protecting your personal and medical information.</p>
                <div className="mt-8 space-y-6 text-slate-700">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Information we collect</h2>
                        <p className="mt-2">We collect your name, contact details, medical history, appointment information, and communication preferences when you use the platform.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">How we use it</h2>
                        <p className="mt-2">Your information is used to provide consultations, manage bookings, process payments, send reminders, and improve the service.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Security</h2>
                        <p className="mt-2">We use access controls and secure infrastructure to protect your data from unauthorized access.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
