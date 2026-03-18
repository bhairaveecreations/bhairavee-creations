"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CustomOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/custom-orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/custom-orders/${id}`, { status });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status } : order
      )
    );
  };

  return (

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-3xl font-serif text-[#2B1B14]">
          Custom Orders
        </h1>
        <p className="text-sm text-[#7a6a58] mt-1">
          Manage personalized handcrafted requests
        </p>
      </div>

      {/* 💎 ORDERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {orders.length === 0 && (
          <p className="text-[#8a7a65]">
            No custom orders yet
          </p>
        )}

        {orders.map((order) => (

          <div
            key={order._id}
            className="
              p-5 rounded-2xl
              bg-white/40 backdrop-blur-xl
              border border-white/30
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)]
              transition hover:-translate-y-1
            "
          >

            {/* 🔥 TOP */}
            <div className="flex justify-between items-center mb-4">

              <p className="text-xs text-[#7a6a58] truncate max-w-[60%]">
                {order._id}
              </p>

              <StatusBadge status={order.status} />

            </div>

            {/* 💎 DETAILS */}
            <div className="space-y-3 text-sm">

              <Info label="Product Type" value={order.productType} />
              <Info label="Budget" value={`₹${order.budget}`} />

            </div>

            {/* 🔥 ACTION */}
            <div className="mt-5">

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="
                  w-full px-3 py-2 rounded-xl text-sm
                  bg-white/50 backdrop-blur
                  border border-white/30
                  focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40
                "
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
              </select>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* 💎 INFO ROW */
function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-[#7a6a58]">{label}</p>
      <p className="text-[#2B1B14] font-medium">{value}</p>
    </div>
  );
}

/* 💎 STATUS BADGE */
function StatusBadge({ status }: any) {

  const map: any = {
    pending: "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-medium capitalize
        ${map[status] || "bg-gray-100 text-gray-600"}
      `}
    >
      {status}
    </span>
  );
}