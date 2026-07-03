import React from "react";

export default function ChatOrVideoCall({ doctor }) {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 bg-[#F9FAFB] rounded-lg">
      <h2 className="text-2xl font-bold text-[#111827] mb-4">
        Chat / Video Call with {doctor.name}
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex-1 bg-[#FACC15] text-[#111827] py-3 rounded-lg font-semibold hover:opacity-90">
          Start Chat
        </button>
        <button className="flex-1 bg-[#111827] text-white border border-[#FACC15] py-3 rounded-lg font-semibold hover:opacity-90">
          Start Video Call
        </button>
      </div>
    </section>
  );
}
