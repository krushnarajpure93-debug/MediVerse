import { useState } from "react";
import axios from "axios";

export default function PrescriptionUpload() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("notes", notes);

    try {
      // ✅ Use full backend URL
      const { data } = await axios.post(
        "http://localhost:5000/api/prescriptions", // <- your backend URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // only if backend uses cookies/auth
        },
      );
      setMessage(data.message);
      setFile(null);
      setNotes("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-3xl font-semibold mb-2">Upload Prescription</h2>
      <p className="text-gray-600 mb-6">
        Upload prescription for restricted medicines.
      </p>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border rounded-md p-3 mb-4"
      />

      <textarea
        placeholder="Notes for pharmacy (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded-md p-3 h-24 resize-none mb-4"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-md font-semibold"
      >
        Upload Prescription
      </button>

      {message && <p className="mt-3 text-gray-700">{message}</p>}
    </section>
  );
}
