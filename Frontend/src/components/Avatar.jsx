import React from "react";

export default function Avatar({ user, size = 40 }) {
  if (!user) return null;

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900 uppercase"
    >
      {user?.data?.user?.name ? user.data.user.name.charAt(0) : "U"}
    </div>
  );
}
