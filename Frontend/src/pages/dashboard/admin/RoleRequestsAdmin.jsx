import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axios";

export default function RoleRequests() {
  const [requests, setRequests] = useState([]); // ✅ Empty array initially
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  }); // ✅ Default values

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.role) params.append("role", filters.role);
      params.append("page", filters.page);

      const { data } = await axiosInstance.get(
        `/admin/role-requests?${params.toString()}`,
      );

      // ✅ Safety check
      setRequests(data.data || []);
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        pages: data.pages || 1,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch requests");
      setRequests([]); // ✅ Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, action) => {
    const rejectionReason =
      action === "reject" ? prompt("Enter rejection reason:") : null;

    if (action === "reject" && !rejectionReason) return;

    try {
      await axiosInstance.patch(`/admin/role-requests/${id}`, {
        action,
        rejectionReason,
      });

      toast.success(`Request ${action}ed successfully`);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error("Review error:", error);
      toast.error(error.response?.data?.message || "Action failed");
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Role Requests</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value, page: 1 })
          }
          className="px-4 py-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value, page: 1 })
          }
          className="px-4 py-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="doctor">Doctor</option>
          <option value="pharmacy">Pharmacy</option>
        </select>

        <button
          onClick={() => setFilters({ status: "", role: "", page: 1 })}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      {/* Requests Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading requests...</p>
        </div>
      ) : !Array.isArray(requests) || requests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">No requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Requested Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {request.user?.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.user?.email || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {request.requestedRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReview(request._id, "approve")}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(request._id, "reject")}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">
                        {request.status === "approved"
                          ? "✓ Approved"
                          : "✗ Rejected"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
              <div className="text-sm text-gray-700">
                Showing page {pagination.page} of {pagination.pages}
                <span className="text-gray-500 ml-2">
                  ({pagination.total} total)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  disabled={filters.page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                  disabled={filters.page === pagination.pages}
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
