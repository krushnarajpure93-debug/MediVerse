import React from "react";
import { HeartPulse, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

export default function AboutPage() {
    const values = [
        { title: "Trusted Care", text: "Verified doctors, secure records, and transparent service." },
        { title: "Fast Access", text: "Book appointments, labs, and medicines in minutes." },
        { title: "Digital First", text: "Modern health journeys with premium digital experiences." },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
            <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">About SevaSetu</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">A modern healthcare platform for every citizen.</h1>
                    <p className="mt-5 text-lg text-slate-600">SevaSetu brings medical care, appointments, diagnostics, and wellness support into one premium digital experience built for speed, trust, and convenience.</p>
                </div>
                <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur">
                    <div className="grid gap-4">
                        {values.map((item) => (
                            <div key={item.title} className="rounded-2xl bg-slate-900 p-4 text-white">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-6">
                {[{ icon: HeartPulse, title: "Patient First", text: "Every journey is designed to reduce friction and improve trust." }, { icon: ShieldCheck, title: "Secure & Private", text: "Your data is protected with modern security practices." }, { icon: Stethoscope, title: "Expert Access", text: "Connect with doctors, hospitals, and diagnostics in one place." }].map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><Icon /></div>
                            <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-2 text-slate-600">{item.text}</p>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
