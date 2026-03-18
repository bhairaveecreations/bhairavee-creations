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

  /* FETCH ORDERS */
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

  /* INIT */
  useEffect(() => {
    const load = async () => {

      if (!user) await fetchProfile();

      const currentUser = user || useAuthStore.getState().user;

      if (!currentUser) return router.replace("/login");
      if (currentUser.role !== "admin") return router.replace("/");

      fetchOrders();
    };

    load();
  }, []);

  /* UPDATE STATUS */
  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api.put(`/orders/${id}`, { status });
      const updated = res.data.order || res.data;

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? updated : o))
      );
    } catch {
      alert("Failed to update order");
    }
  };

  /* REQUEST PAYMENT */
  const requestRemainingPayment = async (id: string) => {
    try {
      await api.post(`/orders/request-payment/${id}`);
      alert("Payment request sent");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  /* FILTER */
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (o) =>
            o.orderStatus?.toLowerCase() === filter.toLowerCase()
        );

  /* LOADING */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-[#7a6a58]">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#2B1B14] font-serif">
          Orders
        </h1>
        <span className="text-sm text-[#7a6a58]">
          {orders.length} orders
        </span>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 overflow-x-auto pb-1">

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
            className={`
              px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition
              backdrop-blur border
              ${
                filter === status
                  ? "bg-[#2B1B14] text-white"
                  : "bg-white/40 text-[#6b5c4c] border-white/30 hover:bg-white/60"
              }
            `}
          >
            {status.replaceAll("-", " ")}
          </button>

        ))}

      </div>

      {/* ORDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {filteredOrders.length === 0 && (
          <div className="col-span-full text-center text-[#8a7a65] py-10">
            No orders found
          </div>
        )}

        {filteredOrders.map((order) => {

          /* 🔥 NORMALIZATION FIX */
          const status = order.orderStatus?.toLowerCase();
          const payment = order.paymentStatus
            ?.toLowerCase()
            .replace(/[\s_]/g, "-");

          return (

            <div
              key={order._id}
              className="
                p-5 rounded-2xl
                bg-white/30 backdrop-blur-xl
                border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                transition hover:-translate-y-1
              "
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-3">

                <p className="text-xs text-[#7a6a58] truncate max-w-[70%]">
                  {order._id}
                </p>

                <StatusBadge status={status} />

              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">

                <Info label="Total" value={`₹${order.totalAmount}`} bold />
                <Info label="Payment" value={order.paymentStatus} />
                <Info label="Advance" value={`₹${order.advanceAmount}`} />
                <Info label="Remaining" value={`₹${order.remainingAmount}`} />

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3">

                <select
                  value={status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="
                    w-full px-3 py-2 text-sm rounded-xl
                    bg-white/50 backdrop-blur border border-white/30
                    focus:outline-none
                  "
                >
                  <option value="processing">Processing</option>
                  <option value="ready-for-shipping">Ready For Shipping</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* 🔥 FIXED CONDITION */}
                {status === "ready-for-shipping" &&
                 payment === "advance-paid" && (

                  <button
                    onClick={() =>
                      requestRemainingPayment(order._id)
                    }
                    className="
                      w-full py-2 rounded-xl text-sm font-medium text-white
                      bg-gradient-to-r from-[#d4af37] to-[#b8962e]
                      hover:opacity-90 active:scale-[0.98] transition
                    "
                  >
                    Request Remaining Payment
                  </button>

                )}

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}

/* INFO */
function Info({ label, value, bold }: any) {
  return (
    <div>
      <p className="text-xs text-[#7a6a58]">{label}</p>
      <p className={`${bold ? "font-semibold text-base" : ""} text-[#2B1B14]`}>
        {value}
      </p>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: any) {

  const map: any = {
    processing: "bg-yellow-100 text-yellow-800",
    "ready-for-shipping": "bg-[#f5e6c8] text-[#8a6d3b]",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}