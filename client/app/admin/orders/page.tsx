"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminOrdersPage() {

  const router = useRouter();
  const { user, fetchProfile } = useAuthStore();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  /* Fetch Orders */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /* Initial Load */
  useEffect(() => {
    const load = async () => {

      if (!user) {
        await fetchProfile();
      }

      const currentUser = user || useAuthStore.getState().user;

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (currentUser.role !== "admin") {
        router.replace("/");
        return;
      }

      fetchOrders();
    };

    load();
  }, []);

  /* Update Status */
  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.put(`/orders/${id}`, { status });
      const updatedOrder = res.data.order || res.data;

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? updatedOrder : order
        )
      );
    } catch {
      alert("Failed to update order");
    }
  };

  /* Request Remaining Payment */
  const requestRemainingPayment = async (id: string) => {
    try {
      await api.post(`/orders/request-payment/${id}`);
      alert("Payment request sent");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Failed to send request"
      );
    }
  };

  /* Filter */
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  /* Loading */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading orders...
      </div>
    );
  }

  return (

    <div className="w-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Orders</h1>
        <span className="text-sm text-gray-500">
          {orders.length} orders
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto mb-5">

        {[
          "all",
          "processing",
          "ready-for-shipping",
          "delivered",
          "cancelled"
        ].map((status) => (

          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition
              ${
                filter === status
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {status.replaceAll("-", " ")}
          </button>

        ))}

      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5  mx-6">

        {filteredOrders.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">
            No orders found
          </div>
        )}

        {filteredOrders.map((order) => (

          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
          >

            {/* Top */}
            <div className="flex justify-between items-center mb-3">

              <p className="text-xs text-gray-400 truncate max-w-[70%]">
                {order._id}
              </p>

              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 capitalize">
                {order.orderStatus}
              </span>

            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">

              <div>
                <p className="text-gray-400 text-xs">Total</p>
                <p className="font-semibold text-base">₹{order.totalAmount}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Payment</p>
                <p className="capitalize">{order.paymentStatus}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Advance</p>
                <p>₹{order.advanceAmount}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Remaining</p>
                <p>₹{order.remainingAmount}</p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
              >
                <option value="processing">Processing</option>
                <option value="ready-for-shipping">Ready For Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {order.orderStatus === "ready-for-shipping" &&
               order.paymentStatus === "advance-paid" && (

                <button
                  onClick={() =>
                    requestRemainingPayment(order._id)
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition text-white py-2 rounded-lg text-sm font-medium"
                >
                  Request Remaining Payment
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}