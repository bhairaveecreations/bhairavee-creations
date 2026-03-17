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

  useEffect(() => {
    const load = async () => {
      if (!user) await fetchProfile();

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

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.put(`/orders/${id}`, { status });
      const updatedOrder = res.data.order || res.data;

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? updatedOrder : o))
      );
    } catch {
      alert("Failed to update");
    }
  };

  const requestRemainingPayment = async (id: string) => {
    try {
      await api.post(`/orders/request-payment/${id}`);
      alert("Request sent");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  return (

    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 pb-28">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Orders</h1>
        <span className="text-xs text-gray-400">
          {orders.length}
        </span>
      </div>

      {/* Filters (FIXED SCROLL) */}
      <div className="overflow-x-auto -mx-3 px-3 mb-4">
        <div className="flex gap-2 min-w-max">

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
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0
                ${
                  filter === status
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {status.replaceAll("-", " ")}
            </button>

          ))}

        </div>
      </div>

      {/* Orders */}
      <div className="space-y-3">

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-10">
            No orders
          </p>
        )}

        {filteredOrders.map((order) => (

          <div
            key={order._id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-3"
          >

            {/* Top */}
            <div className="flex justify-between items-center mb-2">

              <p className="text-[10px] text-gray-400 truncate max-w-[65%]">
                {order._id}
              </p>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 capitalize">
                {order.orderStatus}
              </span>

            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">

              <div>
                <p className="text-gray-400 text-xs">Total</p>
                <p className="font-semibold">₹{order.totalAmount}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Payment</p>
                <p className="text-xs capitalize">{order.paymentStatus}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Advance</p>
                <p className="text-xs">₹{order.advanceAmount}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Remaining</p>
                <p className="text-xs">₹{order.remainingAmount}</p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="w-full border rounded-md px-3 py-2 text-xs bg-gray-50"
              >
                <option value="processing">Processing</option>
                <option value="ready-for-shipping">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {order.orderStatus === "ready-for-shipping" &&
               order.paymentStatus === "advance-paid" && (

                <button
                  onClick={() =>
                    requestRemainingPayment(order._id)
                  }
                  className="w-full bg-orange-500 text-white py-2 rounded-md text-xs active:scale-[0.98]"
                >
                  Request Payment
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}