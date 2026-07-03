import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";

export default function UsersList({ initialRole }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole || "user");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const roleColors = {
    user: "bg-blue-100 text-blue-800",
    doctor: "bg-green-100 text-green-800",
    pharmacy: "bg-yellow-100 text-yellow-800",
    admin: "bg-purple-100 text-purple-800",
  };

  // Filter users by selected role
  const filteredUsers = users.filter((u) => u.role === selectedRole);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} List
      </h1>

      {/* Role Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["user", "doctor", "pharmacy"].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-3 py-1 rounded font-semibold text-sm ${
              selectedRole === role
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-500">No {selectedRole} found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Name</th>
                <th className="text-left p-3 border-b">Email</th>
                <th className="text-left p-3 border-b">Phone</th>
                <th className="text-left p-3 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.phone || "-"}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        roleColors[user.role] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
