import React from "react";

const tests = [
    { name: "Complete Blood Count", price: "₹499" },
    { name: "Thyroid Profile", price: "₹799" },
    { name: "Diabetes Screening", price: "₹599" },
];

export default function LabTestsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Lab Tests</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">Trusted diagnostics with home collection.</h1>
                    <p className="mt-4 text-lg text-slate-600">Book routine tests, health packages, and specialist screenings from your phone.</p>
                </div>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div key={test.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900">{test.name}</h3>
                            <p className="mt-3 text-slate-600">Fast report delivery and certified sample collection.</p>
                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-2xl font-bold text-amber-600">{test.price}</span>
                                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
