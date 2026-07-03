import React, { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../api/userOrders";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchUserOrders();

        if (res?.success && res.data?.length) {
          setOrders(res.data);
        } else {
          // 🔹 Temporary sample data
          setOrders([
            {
              _id: "1",
              orderNumber: "ORD-1023",
              createdAt: "2026-01-12",
              orderStatus: "delivered",
              pharmacy: { pharmacyName: "Apollo Pharmacy" },
            },
            {
              _id: "2",
              orderNumber: "ORD-1041",
              createdAt: "2026-01-18",
              orderStatus: "pending",
              pharmacy: { pharmacyName: "MedPlus" },
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <section className="p-6 bg-white rounded-xl shadow">
        <p className="text-sm text-gray-500">Loading orders...</p>
      </section>
    );
  }

  return (
    <section className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}

/* 🔹 Order Card */
function OrderCard({ order }) {
  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-blue-50 text-blue-700",
    processing: "bg-indigo-50 text-indigo-700",
    out_for_delivery: "bg-purple-50 text-purple-700",
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div className="space-y-1 text-sm">
        <p className="font-medium text-gray-900">
          {order.pharmacy?.pharmacyName || "Pharmacy"}
        </p>

        <p className="text-gray-500">
          Order ID: <span className="font-medium">{order.orderNumber}</span>
        </p>

        <p className="text-gray-500">
          Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${
            statusStyles[order.orderStatus] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.orderStatus.replaceAll("_", " ")}
        </span>

        {/* Future Actions */}
        {order.orderStatus === "pending" && (
          <button className="text-xs text-red-600 hover:underline">
            Cancel Order
          </button>
        )}

        {order.orderStatus !== "cancelled" && (
          <button className="text-xs text-blue-600 hover:underline">
            Track Order
          </button>
        )}
      </div>
    </div>
  );
}
