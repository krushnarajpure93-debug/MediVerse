import React from "react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="max-w-5xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
                <p className="mt-4 text-slate-600">By using SevaSetu, you agree to the following terms and conditions.</p>
                <div className="mt-8 space-y-6 text-slate-700">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Use of the platform</h2>
                        <p className="mt-2">You may use SevaSetu for booking appointments, ordering medicines, accessing health services, and contacting support.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Account responsibility</h2>
                        <p className="mt-2">You are responsible for keeping your account information accurate and secure.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Medical information</h2>
                        <p className="mt-2">The platform provides informational services and does not replace professional medical advice.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
