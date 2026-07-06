import React, { useState } from "react";

export default function BookAppointmentPage() {
    const [form, setForm] = useState({ name: "", doctor: "", hospital: "", department: "", date: "", time: "", symptoms: "", emergency: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Appointment request captured. Please check the backend admin panel or connect your MongoDB instance.");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Book Appointment</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">Premium booking for doctors, labs, and hospitals.</h1>
                    <p className="mt-4 text-lg text-slate-600">Choose a specialist, pick a slot, and receive confirmation with your token number and appointment status.</p>
                </div>

                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                    <div className="grid gap-4">
                        <input className="rounded-xl border border-slate-200 px-4 py-3" name="name" placeholder="Patient Name" value={form.name} onChange={handleChange} required />
                        <input className="rounded-xl border border-slate-200 px-4 py-3" name="doctor" placeholder="Doctor Name" value={form.doctor} onChange={handleChange} required />
                        <input className="rounded-xl border border-slate-200 px-4 py-3" name="hospital" placeholder="Hospital" value={form.hospital} onChange={handleChange} required />
                        <input className="rounded-xl border border-slate-200 px-4 py-3" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
                        <div className="grid md:grid-cols-2 gap-4">
                            <input type="date" className="rounded-xl border border-slate-200 px-4 py-3" name="date" value={form.date} onChange={handleChange} required />
                            <input type="time" className="rounded-xl border border-slate-200 px-4 py-3" name="time" value={form.time} onChange={handleChange} required />
                        </div>
                        <textarea className="rounded-xl border border-slate-200 px-4 py-3" name="symptoms" placeholder="Symptoms / Notes" value={form.symptoms} onChange={handleChange} rows="4" />
                        <label className="flex items-center gap-3 text-sm text-slate-600"><input type="checkbox" name="emergency" checked={form.emergency} onChange={handleChange} /> Mark as emergency appointment</label>
                        <button type="submit" className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-900">Book Appointment</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
