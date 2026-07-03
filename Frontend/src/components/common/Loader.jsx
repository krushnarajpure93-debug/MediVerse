
import React from "react";

export default function Loader({ text = "Loading, please wait..." }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      {/* Spinner */}
      <div className="h-10 w-10 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin" />

      {/* Text */}
      <p className="mt-4 text-sm text-gray-600">{text}</p>
    </div>
  );
}
