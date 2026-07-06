import React from "react";

const articles = [
    { title: "How to build healthy daily habits", category: "Wellness", excerpt: "Simple routines that improve physical and mental wellbeing." },
    { title: "When to consult a doctor urgently", category: "Healthcare", excerpt: "Recognize the signs that need immediate medical attention." },
    { title: "Managing stress with practical steps", category: "Lifestyle", excerpt: "Learn effective techniques for better mental resilience." },
];

export default function ArticlesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Health Articles</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">Expert health insights for everyday living</h1>
                </div>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div key={article.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-semibold text-amber-600">{article.category}</p>
                            <h3 className="mt-3 text-xl font-semibold text-slate-900">{article.title}</h3>
                            <p className="mt-3 text-slate-600">{article.excerpt}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
